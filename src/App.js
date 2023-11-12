import InputView from "./utils/InputView.js";
import OutputView from "./utils/OutputView.js";
import Orders from "./Orders.js";
import GiftManager from "./GiftManager.js";
import DiscountDateManager from "./DiscountDateManager.js";
import DiscountManager from "./DiscountManager.js";

class App {
  constructor() {
    OutputView.printEventTitle();
  }

  async run() {
    const inputDate = await InputView.readDate();    
    const inputMenu = await InputView.readMenu();

    OutputView.printPreviewEventTitle(inputDate);  
    OutputView.printMenuTitle(); 

    const orders = new Orders(inputMenu.split(','));

    const totalOrderPrice = this.totalOrderPriceResult(orders);

    const giftDetails  = this.giftResult(totalOrderPrice)

    const dateManager = new DiscountDateManager(Number(inputDate));
    const totalBenefitDetailResult = this.totalBenefitDetailResult(orders, giftDetails, dateManager);
    const totalDiscount = totalBenefitDetailResult.totalDiscount;
    this.printDiscountDetails(totalDiscount, totalBenefitDetailResult.totalDiscountDetails);
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
}

export default App;
