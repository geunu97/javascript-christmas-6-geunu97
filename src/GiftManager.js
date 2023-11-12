class GiftManager {
  #hasGiftQualification

  constructor(totalOrderPrice) {
    this.#hasGiftQualification = this.#hasGift(totalOrderPrice); 
  }

  #hasGift(totalOrderPrice) {
    return totalOrderPrice >= 120000;
  }

  getGift() {    
    if (this.#hasGiftQualification) {
      return '샴페인 1개'
    }
    return '없음';
  }  
}

export default GiftManager;
