class Formatter {  
  static splitComma(value) {
    return value.split(',');    
  }

  static splitDash(value) {
    return value.split('-');
  }

  static convertToNumber(value) {
    return Number(value);
  }

  static splitThousands(value) {    
    if (value) {      
      return value.toLocaleString();
    }    
    return 0;
  }
}

export default Formatter;