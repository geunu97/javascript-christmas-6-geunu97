import Order from "./Order.js";

class Orders {
  #items;

  constructor(orderItems) {    
    this.#items = this.#createOrders(orderItems);
  }

  #createOrders(orderItems) {
    return orderItems.map(order => this.#createOrder(order))    
  }

  #createOrder(order) {
    const [menu, count] = order.split("-");
    return new Order(menu, Number(count));
  }
}

export default Orders;
