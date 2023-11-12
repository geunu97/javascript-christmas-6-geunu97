import Order from "./Order.js";
import Formatter from "./utils/Formatter.js";
import OrderValidator from "./validator/OrderValidator.js";

class Orders {
  #items;

  constructor(orderItems) {
    this.#validate(orderItems);
    this.#items = this.#createOrders(orderItems);
  }

  #validate(orders) {    
    OrderValidator.validateDuplicateMenu(orders);
    OrderValidator.validateOnlyDrinkMenu(orders);
    OrderValidator.validateMaxCount(orders);
  }

  #createOrders(orders) {
    return orders.map(order => this.#createOrder(order))    
  }

  #createOrder(order) {
    const splittedOrder = Formatter.splitDash(order);
    return new Order(splittedOrder);             
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
