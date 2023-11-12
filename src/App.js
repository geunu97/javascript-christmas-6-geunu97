import InputView from "./utils/InputView.js";
import OutputView from "./utils/OutputView.js";

class App {
  constructor() {
    OutputView.printEventTitle();
  }

  async run() {
    const inputDate = await InputView.readDate();    
    const inputMenu = await InputView.readMenu();
  }
}

export default App;
