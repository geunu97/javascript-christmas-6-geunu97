import InputView from "./utils/InputView.js";
import OutputView from "./utils/OutputView.js";
import Orders from "./Orders.js";

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
  }

  totalOrderPriceResult(orders) {
    const totalOrderPrice = orders.calculateTotalOrderPrice();
    return totalOrderPrice;
  }
}

export default App;
