import { DESSERT, MAIN } from "./constant/Menu.js";
import { GIFT_PRICE } from "./constant/Gift.js";
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
    const gift = this.calculateGift(totalOrderPrice);
    const discountPrice = this.calculateDisCountPrice(orders, dateManager);
    const totalDiscountDetails = { ...discountPrice, giftPrice: GIFT_PRICE[gift] };
    const totalDiscountPrice = this.hasEventQualification(totalOrderPrice) ? Calculator.sumObjectValues(totalDiscountDetails) : 0;

    this.printDiscountDetails(totalDiscountPrice, totalDiscountDetails);
    OutputView.printTotalBenefitPriceTitle();
    OutputView.printTotalBenefitPrice(totalDiscountPrice);
    this.printDiscountedPrice(totalOrderPrice, totalDiscountPrice, GIFT_PRICE[gift]);
    this.printDecemberBadge(totalDiscountPrice);
  }

  async createDateManager() {
    try {
      const inputDate = await InputView.readDate();
      const dateManager = new DiscountDateManager(inputDate);
      return { dateManager, inputDate };
    } catch (error) {
      OutputView.printErrorMessage(error);
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
      OutputView.printErrorMessage(error);
      return await this.createOrders(inputDate);
    }
  }

  calculateTotalOrderPrice(orders) {
    const totalOrderPrice = orders.calculateTotalOrderPrice();
    OutputView.printTotalOrderPriceTitle();
    OutputView.printTotalOrderPrice(totalOrderPrice);
    return totalOrderPrice;
  }

  calculateGift(totalOrderPrice) {
    const giftManager = new GiftManager(totalOrderPrice);
    const gift = giftManager.getGift();
    OutputView.printBenefitTitle();
    OutputView.printBenefit(gift);
    return gift;
  }

  calculateDisCountPrice(orders, dateManager) {
    const discountManager = new DiscountManager(dateManager);
    const dessertMenuCount = orders.getMenuItemCount(DESSERT);
    const mainMenuCount = orders.getMenuItemCount(MAIN);
    const christmasDiscountPrice = discountManager.calculateChristmasDiscount();
    const weekdayDiscountPrice = discountManager.calculateWeekdayDiscount(dessertMenuCount);
    const weekendDiscountPrice = discountManager.calculateWeekendDiscount(mainMenuCount);
    const specialDayDiscountPrice = discountManager.calculateSpecialDiscount();

    return {
      christmasDiscountPrice,
      weekdayDiscountPrice,
      weekendDiscountPrice,
      specialDayDiscountPrice,
    };
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
    if (totalDiscountDetails.christmasDiscountPrice) {
      OutputView.printChristmasDiscountPrice(totalDiscountDetails.christmasDiscountPrice);
    }
    if (totalDiscountDetails.weekdayDiscountPrice) {
      OutputView.printWeekdayDiscountPrice(totalDiscountDetails.weekdayDiscountPrice);
    }
    if (totalDiscountDetails.weekendDiscountPrice) {
      OutputView.printWeekendDiscountPrice(totalDiscountDetails.weekendDiscountPrice);
    }
    if (totalDiscountDetails.specialDayDiscountPrice) {
      OutputView.printSpecialDiscountPrice(totalDiscountDetails.specialDayDiscountPrice);
    }
    if (totalDiscountDetails.giftPrice) {
      OutputView.printGiftDiscountPrice(totalDiscountDetails.giftPrice);
    }
  }

  printDiscountedPrice(totalOrderPrice, totalDiscountPrice, giftPrice) {
    const discountedPrice = totalOrderPrice - totalDiscountPrice + giftPrice;
    OutputView.printDiscountedPriceTitle();
    OutputView.printDiscountedPrice(discountedPrice);
  }

  printDecemberBadge(totalDiscountPrice) {
    const badgeManager = new BadgeManager(totalDiscountPrice);
    const badge = badgeManager.getBadge();
    OutputView.printBadgeTitle();
    OutputView.printBadge(badge);
  }

  hasEventQualification(totalOrderPrice) {
    return totalOrderPrice >= 10000;
  }
}

export default App;
