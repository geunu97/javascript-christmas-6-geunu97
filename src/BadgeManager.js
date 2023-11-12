class BadgeManager {
  #totalDiscount;

  constructor(totalDiscount) {
    this.#totalDiscount = totalDiscount;
  }

  getBadge() {
    if (this.#totalDiscount >= 20000) {
      return "산타";
    }
    if (this.#totalDiscount >= 10000) {
      return "트리";
    }
    if (this.#totalDiscount >= 5000) {
      return "별";
    }
    return "없음";
  }
}

export default BadgeManager;
