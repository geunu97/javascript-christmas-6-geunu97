import { GIFT_MIN_ORDER_PRICE, GIFT_TYPES } from "./constant/Gift.js";

class GiftManager {
  #hasGiftQualification;

  constructor(totalOrderPrice) {
    this.#hasGiftQualification = this.#hasGift(totalOrderPrice);
  }

  #hasGift(totalOrderPrice) {
    return totalOrderPrice >= GIFT_MIN_ORDER_PRICE;
  }

  getGift() {
    if (this.#hasGiftQualification) {
      return GIFT_TYPES.CHAMPAGNE;
    }
    return GIFT_TYPES.NONE;
  }
}

export default GiftManager;
