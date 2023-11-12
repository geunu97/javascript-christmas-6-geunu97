import { MENU } from "./constant/menu.js";
import OutputView from "./utils/OutputView.js";

class Order {  
  #menu;
  #count;

  constructor(menu, count) {
    this.#menu = menu
    this.#count = count;
    OutputView.printMenu(menu, count);
  }

  getTotalPrice() {
    return MENU[this.#menu] * this.#count;
  }

  getCountIncludedMenuType(menuType){
    if (menuType.hasOwnProperty(this.#menu)) {
      return this.#count;
    }
    return 0;
  }
}

export default Order;
