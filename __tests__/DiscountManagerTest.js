import DiscountDateManager from "../src/DiscountDateManager.js";
import DiscountManager from "../src/DiscountManager.js";

describe("DiscountManager 클래스 테스트", () => {
  test("크리스마스 디데이 이벤트의 할인율을 계산한다.", () => {
    const day = "25";
    const discountDateManager = new DiscountDateManager(day);
    const discountManager = new DiscountManager(discountDateManager);

    const result = discountManager.calculateChristmasDiscount();

    expect(result).toBe(3400);
  });

  test("평일 이벤트의 할인율을 계산한다.", () => {
    const day = "19";
    const discountDateManager = new DiscountDateManager(day);
    const discountManager = new DiscountManager(discountDateManager);

    const result = discountManager.calculateWeekdayDiscount(3);

    expect(result).toBe(6069);
  });

  test("주말 이벤트의 할인율을 계산한다.", () => {
    const day = "23";
    const discountDateManager = new DiscountDateManager(day);
    const discountManager = new DiscountManager(discountDateManager);

    const result = discountManager.calculateWeekendDiscount(3);

    expect(result).toBe(6069);
  });

  test("특별 이벤트의 할인율을 계산한다.", () => {
    const day = "17";
    const discountDateManager = new DiscountDateManager(day);
    const discountManager = new DiscountManager(discountDateManager);

    const result = discountManager.calculateSpecialDiscount();

    expect(result).toBe(1000);
  });
});
