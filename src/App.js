import InputView from "./utils/InputView.js";
import OutputView from "./utils/OutputView.js";
import Orders from "./Orders.js";
import GiftManager from "./GiftManager.js";

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
}

export default App;
