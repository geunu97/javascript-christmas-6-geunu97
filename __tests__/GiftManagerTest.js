import { GIFT_TYPES } from "../src/constant/Gift.js";
import GiftManager from "../src/GiftManager.js";

describe("GiftManager 클래스 테스트", () => {
  test("할인전 총주문 금액이 12만원 이상일 때, 샴페인 1개를 제공한다.", () => {
    const totalOrderPrice = 130000;

    const giftManager = new GiftManager(totalOrderPrice);
    const result = giftManager.getGift();

    expect(result).toBe(GIFT_TYPES.CHAMPAGNE);
  });
});
