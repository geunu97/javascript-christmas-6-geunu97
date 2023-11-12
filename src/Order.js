import OutputView from "./utils/OutputView.js";

class Order {  
  #menu;
  #count;

  constructor(menu, count) {
    this.#menu = menu
    this.#count = count;
    OutputView.printMenu(menu, count);
  }
}

export default Order;
