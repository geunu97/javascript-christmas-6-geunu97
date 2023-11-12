import { DRINK, MENU } from "../constant/Menu.js";
import Formatter from "../utils/Formatter.js";
import ERROR_MESSAGE from "../constant/ErrorMessage.js";

class OrderValidator {
  static validateDuplicateMenu(orders) {
    const uniqueMenus = new Set();

    orders.forEach((order) => {
      const menu = Formatter.splitDash(order)[0];
      if (uniqueMenus.has(menu)) {
        throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
      }
      uniqueMenus.add(menu);
    });
  }

  static validateOnlyDrinkMenu(orders) {
    const count = orders.reduce((count, order) => {
      const menu = Formatter.splitDash(order)[0];
      if (!DRINK.hasOwnProperty(menu)) {
        return count + 1;
      }
      return count;
    }, 0);

    if (!count) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  }

  static validateMaxCount(orders) {
    const totalCount = orders.reduce((sum, order) => {
      const count = Formatter.splitDash(order)[1];
      return (sum += Formatter.convertToNumber(count));
    }, 0);

    if (totalCount > 20) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  }

  static validateLength(order) {
    if (order.length !== 2) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  }

  static validateBlankOrder([menu, count]) {
    if (menu.includes(" ") || count.includes(" ")) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  }

  static validateNotExistMenu([menu, count]) {
    if (!MENU.hasOwnProperty(menu)) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  }

  static validateRangeCount([menu, count]) {
    if (isNaN(count) || Formatter.convertToNumber(count) < 1) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  }

  static validateIntegerCount([menu, count]) {
    if (!Number.isInteger(Formatter.convertToNumber(count))) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  }
}

export default OrderValidator;
