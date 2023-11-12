import { DRINK, MENU } from "../constant/menu.js";
import Formatter from "../utils/Formatter.js";

class OrderValidator {
  static validateDuplicateMenu(orders) {
    const uniqueMenus = new Set();

    orders.forEach((order) => {
      const menu = Formatter.splitDash(order)[0];
      if (uniqueMenus.has(menu)) {
        throw new Error(
          "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
        );
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
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  static validateMaxCount(orders) {
    const totalCount = orders.reduce((sum, order) => {
      const count = Formatter.splitDash(order)[1];
      return (sum += Formatter.convertToNumber(count));
    }, 0);

    if (totalCount > 20) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  static validateLength(order) {
    if (order.length !== 2) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  static validateBlankOrder([menu, count]) {
    if (menu.includes(" ") || count.includes(" ")) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  static validateNotExistMenu([menu, count]) {
    if (!MENU.hasOwnProperty(menu)) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  static validateRangeCount([menu, count]) {
    if (isNaN(count) || Formatter.convertToNumber(count) < 1) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }

  static validateIntegerCount([menu, count]) {
    if (!Number.isInteger(Formatter.convertToNumber(count))) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }
}

export default OrderValidator;
