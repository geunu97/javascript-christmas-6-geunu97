import ERROR_MESSAGE from "../src/constant/ErrorMessage.js";
import DiscountDateManager from "../src/DiscountDateManager.js";

describe("DiscountDateManager 클래스 테스트", () => {
  test.each([" 1", "1 ", " "])(
    "날짜에 공백이 포함되어 있다면 예외를 발생시킨다.",
    (day) => {
      expect(() => {
        new DiscountDateManager(day);
      }).toThrow(ERROR_MESSAGE.NOT_VALID_DATE);
    }
  );

  test("날짜 형식이 숫자가 아니라면 예외를 발생시킨다.", () => {
    const day = "a";

    expect(() => {
      new DiscountDateManager(day);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_DATE);
  });

  test.each(["0", "-1", "32", "100"])(
    "날짜의 범위가 1이상 31이하의 숫자가 아니라면 예외를 발생시킨다.",
    (day) => {
      expect(() => {
        new DiscountDateManager(day);
      }).toThrow(ERROR_MESSAGE.NOT_VALID_DATE);
    }
  );

  test("수량이 정수가 아니라면 예외를 발생시킨다.", () => {
    const day = "1.2";

    expect(() => {
      new DiscountDateManager(day);
    }).toThrow(ERROR_MESSAGE.NOT_VALID_DATE);
  });

  test.each([
    ["1", true],
    ["25", true],
    ["26", false],
  ])("크리스마스 디데이 할인에 적용되는 날짜인지 확인한다.", (day, result) => {
    const discountDateManager = new DiscountDateManager(day);
    const eventResult = discountDateManager.isChristmasEvent();

    expect(eventResult).toBe(result);
  });

  test.each([
    ["1", false],
    ["4", true],
    ["9", false],
    ["17", true],
    ["22", false],
    ["31", true],
  ])("평일 할인에 적용되는 날짜인지 확인한다.", (day, result) => {
    const discountDateManager = new DiscountDateManager(day);
    const eventResult = discountDateManager.isWeekdayEvent();

    expect(eventResult).toBe(result);
  });

  test.each([
    ["1", true],
    ["2", true],
    ["10", false],
    ["22", true],
    ["27", false],
    ["31", false],
  ])("주말 할인에 적용되는 날짜인지 확인한다.", (day, result) => {
    const discountDateManager = new DiscountDateManager(day);
    const eventResult = discountDateManager.isWeekendEvent();

    expect(eventResult).toBe(result);
  });

  test.each([
    ["1", false],
    ["3", true],
    ["10", true],
    ["19", false],
    ["24", true],
    ["25", true],
  ])("특별 할인에 적용되는 날짜인지 확인한다.", (day, result) => {
    const discountDateManager = new DiscountDateManager(day);
    const eventResult = discountDateManager.isSpecialDayEvent();

    expect(eventResult).toBe(result);
  });
});
