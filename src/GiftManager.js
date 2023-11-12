class GiftManager {
  #hasGiftQualification

  constructor(totalOrderPrice) {
    this.#hasGiftQualification = this.#hasGift(totalOrderPrice); 
  }

  #hasGift(totalOrderPrice) {
    return totalOrderPrice >= 120000;
  }

  #getGiftPrice(){
    if (this.#hasGiftQualification){
      return 25000;
    }
    return 0;
  }

  getGift() {    
    if (this.#hasGiftQualification) {
      return '샴페인 1개'
    }
    return '없음';
  }  

  getGiftDetails(){     
    return { '증정 이벤트': this.#getGiftPrice()}
  }    
}

export default GiftManager;
