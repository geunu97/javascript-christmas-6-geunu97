import { DRINK, MENU } from "../constant/menu.js";
import Formatter from "../utils/Formatter.js";

class OrderValidator {    
  static validateBlankOrders(orderItems) {
    if (orderItems.length === 0) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }
 
  static validateBlankOrder(orderItems){
    orderItems.forEach(order => {
      const splittedOrder = Formatter.splitDash(order);       

      if (splittedOrder.length !== 2) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    })
  }

  static validateDuplicateMenu(orderItems) {
    const uniqueMenus = new Set();

    orderItems.forEach(order => {
      const menu = Formatter.splitDash(order)[0];      

      if (uniqueMenus.has(menu)) {
        throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
      }

      uniqueMenus.add(menu);
    })
  }

  static validateNotExistMenu(orderItems) {
    orderItems.forEach(order => {
      const menu = Formatter.splitDash(order)[0];

      if (!MENU.hasOwnProperty(menu)) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    })
  }

  static validateOnlyDrinkMenu(orderItems){
    const drinkCount = orderItems.reduce((count, order) => {
      const menu = Formatter.splitDash(order)[0];      
      if (DRINK.hasOwnProperty(menu)) {
        return count + 1;
      }
      return count;
    }, 0);    

    if (drinkCount === orderItems.length) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  static validateCountType(orderItems) {
    orderItems.forEach(order => {
      const count = Formatter.splitDash(order)[1];
      
      if (!count || isNaN(count) || Number(count) < 1) {
        throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    })
  }

  static validateMaxCount(orderItems) {
    const totalCount = orderItems.reduce((sum,order) => {
      const count = Formatter.splitDash(order)[1];      

      return sum += Number(count)
    },0)

    if (totalCount > 20) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }
}


export default OrderValidator;
