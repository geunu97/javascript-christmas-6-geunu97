class DateValidator  {  
  static isNumber(date) {
    if (!date || isNaN(date)) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }

  static range(date) {
    if (1 > date || date > 31) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }    
  }
}

export default DateValidator;