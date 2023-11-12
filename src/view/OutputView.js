import { Console } from "@woowacourse/mission-utils";
import OUTPUT_MESSAGE from "../constant/OutputMessage.js";

const OutputView = {
  printEventTitle() {
    Console.print(OUTPUT_MESSAGE.EVENT_TITLE);
  },

  printPreviewEventTitle(date) {
    Console.print(OUTPUT_MESSAGE.PREVIEW_EVENT_TITLE(date));
  },

  printMenuTitle() {
    Console.print(OUTPUT_MESSAGE.MENU_TITLE);
  },

  printMenu(order) {
    Console.print(OUTPUT_MESSAGE.MENU_ITEM(order));
  },

  printTotalOrderPriceTitle() {
    Console.print(OUTPUT_MESSAGE.TOTAL_ORDER_PRICE_TITLE);
  },

  printTotalOrderPrice(price) {
    Console.print(OUTPUT_MESSAGE.PRICE(price));
  },

  printBenefitTitle() {
    Console.print(OUTPUT_MESSAGE.BENEFIT_TITLE);
  },

  printBenefit(gift) {
    Console.print(gift);
  },

  printDiscountTitle() {
    Console.print(OUTPUT_MESSAGE.DISCOUNT_TITLE);
  },

  printChristmasDiscountPrice(price) {
    Console.print(OUTPUT_MESSAGE.CHRISTMAS_DISCOUNT_PRICE(-price));
  },

  printWeekdayDiscountPrice(price) {
    Console.print(OUTPUT_MESSAGE.WEEKDAY_DISCOUNT_PRICE(-price));
  },

  printWeekendDiscountPrice(price) {
    Console.print(OUTPUT_MESSAGE.WEEKEND_DISCOUNT_PRICE(-price));
  },

  printSpecialDiscountPrice(price) {
    Console.print(OUTPUT_MESSAGE.SPECIAL_DISCOUNT_PRICE(-price));
  },

  printGiftDiscountPrice(price) {
    Console.print(OUTPUT_MESSAGE.GIFT_DISCOUNT_PRICE(-price));
  },

  printTotalBenefitPriceTitle() {
    Console.print(OUTPUT_MESSAGE.TOTAL_BENEFIT_PRICE_TITLE);
  },

  printTotalBenefitPrice(price) {
    Console.print(OUTPUT_MESSAGE.PRICE(-price));
  },

  printDiscountedPriceTitle() {
    Console.print(OUTPUT_MESSAGE.DISCOUNTED_PRICE_TITLE);
  },

  printDiscountedPrice(price) {
    Console.print(OUTPUT_MESSAGE.PRICE(price));
  },

  printBadgeTitle() {
    Console.print(OUTPUT_MESSAGE.BADGE_TITLE);
  },

  printBadge(badge) {
    Console.print(badge);
  },

  printNothing() {
    Console.print(OUTPUT_MESSAGE.NOTHING);
  },

  printErrorMessage(error) {
    Console.print(error.message);
  },
};

export default OutputView;
