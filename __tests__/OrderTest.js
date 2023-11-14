import ERROR_MESSAGE from "../src/constant/ErrorMessage.js";
import { APPETIZER, MAIN } from "../src/constant/Menu.js";
import Order from "../src/Order.js";

describe("Order 클래스 테스트", () => {
  test.each([[["양송이수프", "1", "3"]], [["양송이수프"]], [["1"]]])(
    "메뉴와 수량이 존재하지 않다면 예외를 발생시킨다.",
    (orderItem) => {
      expect(() => {
        new Order(orderItem);
      }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
    }
  );

  test.each([
    [[" 양송이수프", "1"]],
    [["양송이수프 ", "1"]],
    [["양송이수프", " 1"]],
    [["양송이수프", "1 "]],
    [["양송이수프", " "]],
    [[" ", "1"]],
  ])("주문에 공백이 포함되어 있다면 예외를 발생시킨다.", (orderItem) => {
    expect(() => {
      new Order(orderItem);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("존재하지 않은 메뉴라면 예외를 발생시킨다.", () => {
    const orderItem = ["초콜릿", "1"];

    expect(() => {
      new Order(orderItem);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("수량의 형식이 숫자가 아니라면 예외를 발생시킨다.", () => {
    const orderItem = ["초콜릿", "a"];

    expect(() => {
      new Order(orderItem);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("수량이 1보다 작다면 예외를 발생시킨다.", () => {
    const orderItem = ["초콜릿", "0"];

    expect(() => {
      new Order(orderItem);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("수량이 정수가 아니라면 예외를 발생시킨다.", () => {
    const orderItem = ["초콜릿", "1.1"];

    expect(() => {
      new Order(orderItem);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_ORDER);
  });

  test("주문한 메뉴의 가격과 수량을 곱하여 값을 구한다.", () => {
    const orderItem = ["크리스마스파스타", "2"];

    const order = new Order(orderItem);
    const price = order.getTotalPrice();

    expect(price).toBe(50000);
  });

  test.each([
    [APPETIZER, ["양송이수프", "1"], 1],
    [MAIN, ["바비큐립", "3"], 3],
    [MAIN, ["초코케이크", "4"], 0],
  ])(
    "해당하는 메뉴 종류에 속하면 수량을 반환한다.",
    (menuType, orderItem, count) => {
      const order = new Order(orderItem);
      const result = order.getCountIncludedMenuType(menuType);

      expect(result).toBe(count);
    }
  );
});
