import InputView from "./utils/InputView.js";
import OutputView from "./utils/OutputView.js";
import GiftManager from "./GiftManager.js";
import BadgeManager from "./BadgeManager.js";
import DiscountDateManager from "./DiscountDateManager.js";
import DiscountManager from "./DiscountManager.js";
import { DESSERT, MAIN, MENU } from "./constant/menu.js";
import BENEFIT from "./constant/Benefit.js";
import { Console } from "@woowacourse/mission-utils";
import Orders from "./Orders.js";

class App {
  constructor() {
    OutputView.printEventTitle();
  }

  async run() {
    const inputDate = await InputView.readDate();    
  }
}

export default App;
