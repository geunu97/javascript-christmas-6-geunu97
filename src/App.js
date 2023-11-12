import { DESSERT, MAIN } from "./constant/menu.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import Orders from "./Orders.js";
import GiftManager from "./GiftManager.js";
import DiscountDateManager from "./DiscountDateManager.js";
import DiscountManager from "./DiscountManager.js";
import BadgeManager from "./BadgeManager.js";
import Calculator from "./utils/Calculator.js";
import Formatter from "./utils/Formatter.js";
    
class App {
  constructor() {
    OutputView.printEventTitle();
  }

  async run() {
    const { dateManager, inputDate } = await this.createDateManager();
    const orders = await this.createOrders(inputDate);
    const totalOrderPrice = this.calculateTotalOrderPrice(orders);
    const giftDetails = this.calculateGiftDetails(totalOrderPrice);
    const totalDiscountDetails = this.calculateTotalBenefit(orders, giftDetails, dateManager);
    const totalDiscount =  Calculator.sumObjectValues(totalDiscountDetails)    

    this.printDiscountDetails(totalDiscount, totalDiscountDetails);
    OutputView.printTotalBenefitPrice(totalDiscount);
    this.printDiscountedPrice(totalOrderPrice, totalDiscount, giftDetails);
    this.printDecemberBadge(totalDiscount);
  }

  async createDateManager() {
    try {
      const inputDate = await InputView.readDate();
      const dateManager = new DiscountDateManager(Number(inputDate));
      return { dateManager, inputDate };
    } catch (error) {
      OutputView.printErrorMessage(error)      
      return await this.createDateManager();
    }
  }

  async createOrders(inputDate) {
    try {
      const inputMenu = await InputView.readMenu();
      OutputView.printPreviewEventTitle(inputDate);
      OutputView.printMenuTitle();
      return new Orders(Formatter.splitComma(inputMenu));
    } catch (error) {
      OutputView.printErrorMessage(error)
      return await this.createOrders(inputDate);
    }
  }

  calculateTotalOrderPrice(orders) {
    const totalOrderPrice = orders.calculateTotalOrderPrice();
    OutputView.printTotalOrderPrice(totalOrderPrice);
    return totalOrderPrice;
  }

  calculateGiftDetails(totalOrderPrice) {
    const giftManager = new GiftManager(totalOrderPrice);
    const gift = giftManager.getGift();
    OutputView.printBenefit(gift);
    return giftManager.getGiftDetails();
  }

  calculateTotalBenefit(orders, giftDetails, dateManager) {
    const discountManager = new DiscountManager(dateManager);
    const dessertMenuCount = orders.getMenuItemCount(DESSERT);
    const mainMenuCount = orders.getMenuItemCount(MAIN);
    const discountDetails = discountManager.discountDetails(dessertMenuCount, mainMenuCount);
    const totalDiscountDetails = { ...discountDetails, ...giftDetails };    
    return totalDiscountDetails;    
  }

  printDiscountDetails(totalDiscount, totalDiscountDetails) {
    OutputView.printDiscountTitle();
    if (!totalDiscount) {
      OutputView.printNothing();
      return;
    }

    this.printDiscountDetailsLoop(totalDiscountDetails);
  }

  printDiscountDetailsLoop(totalDiscountDetails) {
    Object.entries(totalDiscountDetails).forEach(([event, discountPrice]) => {
      if (discountPrice) {
        OutputView.printDiscountPrice(discountPrice, event);
      }
    });
  }

  printDiscountedPrice(totalOrderPrice, totalDiscount, giftDetails) {
    const discountedPrice = totalOrderPrice - totalDiscount + giftDetails['증정 이벤트'];
    OutputView.printDiscountedPrice(discountedPrice);
  }

  printDecemberBadge(totalDiscount) {
    const badgeManager = new BadgeManager(totalDiscount);
    const badge = badgeManager.getBadge();
    OutputView.printBadge(badge);
  }
}

export default App;