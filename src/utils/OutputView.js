import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printEventTitle() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },

  printPreviewEventTitle(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`
    );
  },

  printMenuTitle() {
    Console.print("\n<주문 메뉴>");
  },

  printMenu(menu, count) {
    Console.print(`${menu} ${count}개`);    
  },
};

export default OutputView;
