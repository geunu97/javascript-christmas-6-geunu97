import Formatter from "../utils/Formatter.js";

const OUTPUT_MESSAGE = {
  EVENT_TITLE: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  PREVIEW_EVENT_TITLE: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  MENU_TITLE: "\n<주문 메뉴>",
  MENU_ITEM: ([menu, count]) => `${menu} ${count}개`,
  TOTAL_ORDER_PRICE_TITLE: "\n<할인 전 총주문 금액>",
  BENEFIT_TITLE: "\n<증정 메뉴>",
  DISCOUNT_TITLE: "\n<혜택 내역>",
  CHRISTMAS_DISCOUNT_PRICE: (price) => `크리스마스 디데이 할인: ${OUTPUT_MESSAGE.PRICE(price)}`,
  WEEKDAY_DISCOUNT_PRICE: (price) => `평일 할인: ${OUTPUT_MESSAGE.PRICE(price)}`,
  WEEKEND_DISCOUNT_PRICE: (price) => `주말 할인: ${OUTPUT_MESSAGE.PRICE(price)}`,
  SPECIAL_DISCOUNT_PRICE: (price) => `특별 할인: ${OUTPUT_MESSAGE.PRICE(price)}`,
  GIFT_DISCOUNT_PRICE: (price) => `증정 이벤트: ${OUTPUT_MESSAGE.PRICE(price)}`,
  TOTAL_BENEFIT_PRICE_TITLE: "\n<총혜택 금액>",
  DISCOUNTED_PRICE_TITLE: "\n<할인 후 예상 결제 금액>",
  BADGE_TITLE: "\n<12월 이벤트 배지>",
  PRICE: (price) => `${Formatter.splitThousands(price)}원`,
  ERROR_MESSAGE: (error) => error.message,
  NOTHING: "없음",
};

export default OUTPUT_MESSAGE;
