import Order from "./Order.js";
import Formatter from "./utils/Formatter.js";
import OrderValidator from "./validator/OrderValidator.js";

class Orders {
  #items;

  constructor(orderItems) {
    this.#validate(orderItems);
    this.#items = this.#createOrders(orderItems);
  }

  #validate(orderItems) {
    OrderValidator.validateBlankOrders(orderItems);
    OrderValidator.validateBlankOrder(orderItems);
    OrderValidator.validateDuplicateMenu(orderItems);
    OrderValidator.validateNotExistMenu(orderItems);
    OrderValidator.validateOnlyDrinkMenu(orderItems);
    OrderValidator.validateCountType(orderItems);
    OrderValidator.validateMaxCount(orderItems);
  }

  #createOrders(orderItems) {
    return orderItems.map(order => this.#createOrder(order))    
  }

  #createOrder(order) {
    const [menu, count] = Formatter.splitDash(order);    
    return new Order(menu, Number(count));
  }

  calculateTotalOrderPrice() {
    const totalOrderPrice = this.#items.reduce(
      (acc, order) => acc + order.getTotalPrice(),0);
    return totalOrderPrice;
  }

  getMenuItemCount(menuType) {
    const itemCount = this.#items.reduce(
      (acc, order) => acc + order.getCountIncludedMenuType(menuType),0 );
    return itemCount;
  }
}

export default Orders;
