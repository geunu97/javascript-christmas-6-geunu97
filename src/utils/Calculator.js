class Calculator {
  static sumObjectValues(obj) {
    return Object.values(obj).reduce(
      (accumulator, value) => accumulator + value,
      0
    );
  }
}
export default Calculator;
