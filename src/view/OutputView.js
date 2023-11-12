import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printEventTitle() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },

  printPreviewEventTitle(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },

  printMenuTitle() {
    Console.print("\n<주문 메뉴>");
  },

  printMenu(menu, count) {
    Console.print(`${menu} ${count}개`);    
  },

  printTotalOrderPriceTitle() {
    Console.print("\n<할인 전 총주문 금액>");    
  },

  printTotalOrderPrice(totalOrderPrice) {    
    Console.print(`${totalOrderPrice}원`);    
  },

  printBenefitTitle() {
    Console.print("\n<증정 메뉴>");    
  },

  printBenefit(gift) {    
    Console.print(`${gift}`);
  },

  printDiscountTitle() {
    Console.print("\n<혜택 내역>");
  },

  printDiscountPrice(discountPrice, event) {    
    Console.print(`${event}: ${-discountPrice}원`);    
  },

  printTotalBenefitPriceTitle() {
    Console.print("\n<총혜택 금액>");    
  },

  printTotalBenefitPrice(price) {    
    Console.print(`${-price}원`);    
  },

  printDiscountedPriceTitle() {
    Console.print("\n<할인 후 예상 결제 금액>");    
  },

  printDiscountedPrice(price) {    
    Console.print(`${price}`);    
  },

  printBadgeTitle() {
    Console.print("\n<12월 이벤트 배지>");    
  },

  printBadge(badge) {    
    Console.print(`${badge}`);
  },

  printNothing(){
    Console.print("없음");
  },

  printErrorMessage(error) {
    Console.print(error.message);
  }
};

export default OutputView;
