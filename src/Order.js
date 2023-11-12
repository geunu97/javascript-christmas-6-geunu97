import { MENU } from "./constant/menu.js";
import OutputView from "./view/OutputView.js";
import OrderValidator from "./validator/OrderValidator.js";
import Formatter from "./utils/Formatter.js";

class Order {  
  #menu;
  #count;

  constructor(order) {    
    this.#validate(order);        
    this.#menu = order[0];
    this.#count = Formatter.convertToNumber(order[1]);    
    OutputView.printMenu(order);
  }

  #validate(order) {   
    OrderValidator.validateLength(order);
    OrderValidator.validateBlankOrder(order);
    OrderValidator.validateNotExistMenu(order);
    OrderValidator.validateRangeCount(order);
    OrderValidator.validateIntegerCount(order);
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
