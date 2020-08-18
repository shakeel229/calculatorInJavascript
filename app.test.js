import CalculatorManager from "./app.js";
describe("Test calculator Operations", function () {
  let testCalculator;
  //using JSDom of jest Library below value contains html to build documnet based on actual content of index.html
  const innerbody = `  <div class="container">
  <div class="calculator">
    <div class="calculator__display">0</div>

    <div class="calculator__keys">
      <button class="key--operator" data-action="add">+</button>
      <button class="key--operator" data-action="subtract">-</button>
      <button class="key--operator" data-action="multiply">&times;</button>
      <button class="key--operator" data-action="divide">÷</button>
      <button id="seven">7</button>
      <button>8</button>
      <button>9</button>
      <button id="four">4</button>
      <button>5</button>
      <button>6</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>0</button>
      <button data-action="decimal">.</button>
      <button data-action="clear">AC</button>
      <button class="key--equal" data-action="calculate">=</button>
    </div>
  </div>
</div>`;
  //setting index.html to DOM
  document.body.innerHTML = innerbody;
  const sevenKey = document.querySelector(`#seven`);
  const fourKey = document.querySelector(`#four`);
  const decimalBtn = document.querySelector(`[data-action="decimal"]`);

  const display = document.querySelector(`.calculator__display`);

  beforeAll(function () {
    testCalculator = new CalculatorManager();
    testCalculator.UiEventsHandler();
  });
  test("It should Add two positive Numbers ", function () {
    const result = testCalculator.performCalculation(3, "add", 3);
    expect(result).toEqual(6);
  });
  test("It should Add two float Numbers ", function () {
    const result = testCalculator.performCalculation(3.5, "add", 3.45);
    expect(result).toBeLessThan(7);
    expect(result).toBeGreaterThan(6.94);
  });
  test("It should Parse two Numbers from String", function () {
    const result = testCalculator.performCalculation("8", "add", "45");
    expect(result).toBeGreaterThan(52.5);
    expect(result).toBeLessThan(53.01);
  });
  test("Divide Two positive Numbers", function () {
    const result = testCalculator.performCalculation("8", "divide", "45");
    expect(result).toBeGreaterThan(0.17);
    expect(result).toBeLessThan(0.18);
  });
  test("Divide Two float Numbers", function () {
    const result = testCalculator.performCalculation("3.75", "divide", "1.64");
    expect(result).toBeGreaterThan(2.28);
    expect(result).toBeLessThan(2.29);
  });
  test("Multiply Two simple Numbers", function () {
    const result = testCalculator.performCalculation(7, "multiply", 5);
    expect(result).toEqual(35);
  });
  test("Multiply Two Float Numbers", function () {
    const result = testCalculator.performCalculation(3.46, "multiply", 1.97);
    expect(result).toEqual(6.8162);
  });
  test("Subtract Two positive Numbers", function () {
    const result = testCalculator.performCalculation("8", "subtract", "45");
    expect(result).toBeGreaterThan(-38);
    expect(result).toBeLessThan(-36);
  });
  test("Subtract Two Float Numbers", function () {
    const myHTML = `<div><h1>Shakeel Anjum</h1></div>`;
    const result = testCalculator.performCalculation(3.46, "subtract", 1.97);
    const calculator = document.querySelector(`.calculator`);
    const p = parseInt(display.innerHTML);
    expect(result).toBe(1.49);
  });
  test("If User Click Decimal button when display already contain it Calculator will not register it ", function () {
    sevenKey.click();
    decimalBtn.click();
    fourKey.click();
    decimalBtn.click(); //user second time clicks decimal btn
    sevenKey.click();
    decimalBtn.click(); // user third time click decimal btn
    fourKey.click();
    const displayScreen = parseFloat(display.textContent); // retrieve value
    expect(displayScreen).toBe(7.474);
  });
  test("If User Click Decimal button after Operator key or calculate key save show 0. on screen ", function () {
    sevenKey.click();
    decimalBtn.click();
    fourKey.click();
    decimalBtn.click(); //user second time clicks decimal btn
    sevenKey.click();
    decimalBtn.click(); // user third time click decimal btn
    fourKey.click();
    const displayScreen = parseFloat(display.textContent); // retrieve value
    expect(displayScreen).toBe(7.474);
  });
});
