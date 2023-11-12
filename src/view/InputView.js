import { Console } from "@woowacourse/mission-utils";
import INPUT_MESSAGE from "../constant/InputMessage.js";

const InputView = {
  async readDate() {
    return await Console.readLineAsync(INPUT_MESSAGE.DATE);
  },

  async readMenu() {
    return await Console.readLineAsync(INPUT_MESSAGE.MENU);
  },
};

export default InputView;
