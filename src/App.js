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
    const totalDiscountPrice =  Calculator.sumObjectValues(totalDiscountDetails)    

    this.printDiscountDetails(totalDiscountPrice, totalDiscountDetails);
    OutputView.printTotalBenefitPriceTitle();
    OutputView.printTotalBenefitPrice(-totalDiscountPrice);
    this.printDiscountedPrice(totalOrderPrice, totalDiscountPrice, giftDetails);
    this.printDecemberBadge(totalDiscountPrice);
  }

  async createDateManager() {
    try {
      const inputDate = await InputView.readDate();
      const dateManager = new DiscountDateManager(Formatter.convertToNumber(inputDate));
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
    OutputView.printTotalOrderPriceTitle();
    OutputView.printTotalOrderPrice(totalOrderPrice);
    return totalOrderPrice;
  }

  calculateGiftDetails(totalOrderPrice) {
    const giftManager = new GiftManager(totalOrderPrice);
    const gift = giftManager.getGift();
    OutputView.printBenefitTitle();
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

  printDiscountDetails(totalDiscountPrice, totalDiscountDetails) {
    OutputView.printDiscountTitle();
    if (!totalDiscountPrice) {
      OutputView.printNothing();
      return;
    }

    this.printDiscountDetailsLoop(totalDiscountDetails);
  }

  printDiscountDetailsLoop(totalDiscountDetails) {
    Object.entries(totalDiscountDetails).forEach(([event, discountPrice]) => {
      if (discountPrice) {
        OutputView.printDiscountPrice(-discountPrice, event);
      }
    });
  }

  printDiscountedPrice(totalOrderPrice, totalDiscountPrice, giftDetails) {
    const discountedPrice = totalOrderPrice - totalDiscountPrice + giftDetails['증정 이벤트'];
    OutputView.printDiscountedPriceTitle();
    OutputView.printDiscountedPrice(discountedPrice);
  }

  printDecemberBadge(totalDiscountPrice) {
    const badgeManager = new BadgeManager(totalDiscountPrice);
    const badge = badgeManager.getBadge();
    OutputView.printBadgeTitle();
    OutputView.printBadge(badge);
  }
}

export default App;