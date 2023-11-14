import ERROR_MESSAGE from "../src/constant/ErrorMessage.js";
import { APPETIZER, DRINK, MAIN, DESSERT } from "../src/constant/Menu.js";
import Orders from "../src/Orders.js";

describe("Orders 클래스 테스트", () => {
  test("메뉴가 중복되었다면 예외를 발생시킨다.", () => {
    const orderItems = ["양송이수프-1", "티본스테이크-2", "양송이수프-3"];

    expect(() => {
      new Orders(orderItems);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("음료만 주문되었다면 예외를 발생시킨다.", () => {
    const orderItems = ["제로콜라-1", "레드와인-2", "샴페인-3"];

    expect(() => {
      new Orders(orderItems);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("총 주문한 메뉴의 개수가 20개를 초과했다면 예외를 발생시킨다.", () => {
    const orderItems = ["양송이수프-19", "티본스테이크-2"];

    expect(() => {
      new Orders(orderItems);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("할인전 총주문 금액을 계산한다.", () => {
    const orderItems = ["양송이수프-1", "티본스테이크-2", "시저샐러드-1"];

    const orders = new Orders(orderItems);
    const totalOrderPrice = orders.calculateTotalOrderPrice();

    expect(totalOrderPrice).toBe(124000);
  });

  test.each([
    [APPETIZER, 4],
    [MAIN, 3],
    [DESSERT, 3],
    [DRINK, 4],
  ])("해당하는 메뉴 종류에 속하는 총 갯수를 구한다.", (menuType, count) => {
    const orderItems = [
      "양송이수프-1",
      "타파스-3",
      "바비큐립-1",
      "티본스테이크-2",
      "초코케이크-3",
      "제로콜라-4",
    ];

    const orders = new Orders(orderItems);
    const result = orders.getMenuItemCount(menuType);

    expect(result).toBe(count);
  });
});
