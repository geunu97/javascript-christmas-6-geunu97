import { DESSERT, MAIN } from "./constant/menu.js";
import { Console } from "@woowacourse/mission-utils";
import InputView from "./utils/InputView.js";
import OutputView from "./utils/OutputView.js";
import Orders from "./Orders.js";
import GiftManager from "./GiftManager.js";
import DiscountDateManager from "./DiscountDateManager.js";
import DiscountManager from "./DiscountManager.js";
import BadgeManager from "./BadgeManager.js";

class App {
  constructor() {
    OutputView.printEventTitle();
  }

  async run() {
    const {dateManager, inputDate} = await this.createDateManager(); 
    const inputMenu = await InputView.readMenu();

    OutputView.printPreviewEventTitle(inputDate);  
    OutputView.printMenuTitle(); 

    const orders = new Orders(inputMenu.split(','));

    const totalOrderPrice = this.totalOrderPriceResult(orders);

    const giftDetails  = this.giftResult(totalOrderPrice)
    
    const totalBenefitDetailResult = this.totalBenefitDetailResult(orders, giftDetails, dateManager);
    const totalDiscount = this.hasEventQualification(totalOrderPrice) ? totalBenefitDetailResult.totalDiscount : 0;
    this.printDiscountDetails(totalDiscount, totalBenefitDetailResult.totalDiscountDetails);

    OutputView.printTotalBenefitPrice(totalDiscount);

    this.DiscountedPriceResult(totalOrderPrice, totalDiscount, giftDetails)

    this.DecemberBadgeResult(totalDiscount)
  }

  async createDateManager() {
    try {
      const inputDate = await InputView.readDate();
      const dateManager = new DiscountDateManager(Number(inputDate));       
      return {dateManager, inputDate};
    } catch(error) {
      Console.print(error.message);
      return await this.createDateManager();
    }
  }

  totalOrderPriceResult(orders) {
    const totalOrderPrice = orders.calculateTotalOrderPrice();
    OutputView.printTotalOrderPrice(totalOrderPrice);
    return totalOrderPrice;
  }

  giftResult(totalOrderPrice) {
    const giftManager = new GiftManager(totalOrderPrice);
    const gift = giftManager.getGift();
    OutputView.printBenefit(gift);    
    const giftDetails = giftManager.getGiftDetails();        
    return giftDetails;
  }

  totalBenefitDetailResult(orders, giftDetails, dateManager){
    const discountManager = new DiscountManager(dateManager);
    const dessertMenuCount = orders.getMenuItemCount(DESSERT);
    const mainMenuCount = orders.getMenuItemCount(MAIN);
    const discountDetails = discountManager.discountDetails(dessertMenuCount,mainMenuCount);    

    const totalDiscountDetails = {...discountDetails, ...giftDetails};    
    const totalDiscount = this.calculateTotalDiscount(totalDiscountDetails);        
    return {totalDiscount, totalDiscountDetails} ;
  }

  DiscountedPriceResult(totalOrderPrice, totalDiscount, giftDetails){
    const discountedPrice = totalOrderPrice - totalDiscount + giftDetails['증정 이벤트'];    
    OutputView.printDiscountedPrice(discountedPrice);
  }

  DecemberBadgeResult(totalDiscount) {
    const badgeManager = new BadgeManager(totalDiscount);
    const badge = badgeManager.getBadge();
    OutputView.printBadge(badge);
  }

  calculateTotalDiscount(discountDetails) {
    return Object.values(discountDetails).reduce((sum, discount) => sum + discount, 0);
  }

  printDiscountDetails(totalDiscount, totalDiscountDetails) {
    OutputView.printDiscountTitle();    
    if (!totalDiscount) {      
      OutputView.printNothing();
      return;
    }

    Object.entries(totalDiscountDetails).forEach(([event, discountPrice]) => { 
      if (discountPrice) {                           
        OutputView.printDiscountPrice(discountPrice, event);
      }
    });    
  }  

  hasEventQualification(totalOrderPrice){
    return totalOrderPrice >= 10000;
  }
}

export default App;
