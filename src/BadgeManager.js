import { BADGE_THRESHOLDS, BADGE_TYPES } from "./constant/Badge.js";

class BadgeManager {
  #totalDiscountPrice;

  constructor(totalDiscountPrice) {
    this.#totalDiscountPrice = totalDiscountPrice;
  }

  getBadge() {
    if (this.#totalDiscountPrice >= BADGE_THRESHOLDS.SANTA) {
      return BADGE_TYPES.SANTA;
    }
    if (this.#totalDiscountPrice >= BADGE_THRESHOLDS.TREE) {
      return BADGE_TYPES.TREE;
    }
    if (this.#totalDiscountPrice >= BADGE_THRESHOLDS.STAR) {
      return BADGE_TYPES.STAR;
    }
    return BADGE_TYPES.NONE;
  }
}

export default BadgeManager;
