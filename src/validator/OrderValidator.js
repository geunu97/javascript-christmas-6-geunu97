import { DRINK, MENU } from "../constant/menu.js";

const OrderValidator = {    
  validateBlankOrders(orderItems) {
    if (orderItems.length === 0) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  },
 
  validateBlankOrder(orderItems){
    orderItems.forEach(order => {
      const splittedOrder = order.split('-');

      if (splittedOrder.length !== 2) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    })
  },

  validateDuplicateMenu(orderItems) {
    const uniqueMenus = new Set();

    orderItems.forEach(order => {
      const menu = order.split('-')[0];      

      if (uniqueMenus.has(menu)) {
        throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
      }

      uniqueMenus.add(menu);
    })
  },

  validateNotExistMenu(orderItems) {
    orderItems.forEach(order => {
      const menu = order.split('-')[0];

      if (!MENU.hasOwnProperty(menu)) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    })
  },

  validateOnlyDrinkMenu(orderItems){
    const drinkCount = orderItems.reduce((count, order) => {
      const menu = order.split('-')[0];      
      if (DRINK.hasOwnProperty(menu)) {
        return count + 1;
      }
      return count;
    }, 0);    

    if (drinkCount === orderItems.length) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  },

  validateCountType(orderItems) {
    orderItems.forEach(order => {
      const count = order.split('-')[1];
      
      if (!count || isNaN(count) || Number(count) < 1) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    })
  },

  validateMaxCount(orderItems) {
    const totalCount = orderItems.reduce((sum,order) => {
      const count = order.split('-')[1];      

      return sum += Number(count)
    },0)

    if (totalCount > 20) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  },
}


export default OrderValidator;
