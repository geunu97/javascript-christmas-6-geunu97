import BadgeManager from "../src/BadgeManager.js";

describe("BadgeManager 클래스 테스트", () => {
  test.each([
    [20000, "산타"],
    [10000, "트리"],
    [5000, "별"],
    [0, "없음"],
  ])(
    "할인 금액에 따라 12월 이벤트 배지를 반환한다.",
    (discountPrice, badge) => {
      const badgeManager = new BadgeManager(discountPrice);
      const result = badgeManager.getBadge();

      expect(result).toBe(badge);
    }
  );
});
