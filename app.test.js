import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
import CalculatorManager from "./app.js";
describe("Test calculator Operations", function () {
  let testCalculator;
  //setting index.html to DOM
  document.body.innerHTML = html.toString();
  const sevenKey = document.querySelector(`#seven`);
  const fourKey = document.querySelector(`#four`);
  const decimalBtn = document.querySelector(`[data-action="decimal"]`);
  const calculator = document.querySelector(`.calculator`);

  const display = document.querySelector(`.calculator__display`);
  display.textContent = "";

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
    display.textContent = "";
    sevenKey.click();
    decimalBtn.click();
    fourKey.click();
    decimalBtn.click(); //user second time clicks decimal btn
    sevenKey.click();
    decimalBtn.click(); // user third time click decimal btn
    fourKey.click();
    const displayScreen = parseFloat(display.textContent); // retrieve value
    expect(displayScreen).toBe(7.474);
    expect(displayScreen).toBeLessThan(7.475);
  });
  test("If User Click Calculate Btn '=' then perfomr calculation and show output on screen ", function () {
    document.querySelector(`[data-action="clear"]`).click();
    sevenKey.click();
    document.querySelector(`[data-action="add"]`).click();
    fourKey.click();
    document.querySelector(`[data-action="calculate"]`).click();

    const displayScreen = parseFloat(display.textContent); // retrieve value
    expect(displayScreen).toBe(11);
  });
  //Calculate Button '=' testing cases
  test("If User Click Calculate Btn '=' then perform calculation and show output on screen ", function () {
    //
    const d = document.querySelector(`[data-action="clear"]`);
    d.click();
    d.click(); // clicking clear button to remove all previous data and clear calculator for new calculation
    sevenKey.click(); //click seven key
    document.querySelector(`[data-action="add"]`).click(); //click plus button
    fourKey.click(); //click four key
    document.querySelector(`[data-action="calculate"]`).click(); //click calcualte button

    const displayScreen = parseFloat(display.textContent); // retrieve value from screen
    expect(displayScreen).toBe(11);
  });
  test("If User Click Calculate Btn '=' second time move last calculation result to firstValue ", function () {
    //
    const d = document.querySelector(`[data-action="clear"]`);
    d.click();
    d.click(); // clicking clear button to remove all previous data and clear calculator for new calculation
    document.getElementById("three").click();
    const displayScreen = parseFloat(display.textContent); // retrieve value
    expect(displayScreen).toBe(3);
    document.querySelector(`[data-action="add"]`).click();
    fourKey.click();
    document.querySelector(`[data-action="calculate"]`).click(); //first time user click calculate btn
    expect(parseFloat(display.textContent)).toBe(7);
    document.querySelector(`[data-action="calculate"]`).click(); //second time user click calculate btn
    document.querySelector(`[data-action="calculate"]`).click(); //second time user click calculate btn
    const s = calculator.dataset.firstValue; //first valu after second time user click calculate btn
    expect(parseFloat(s)).toBe(7);
  });
});
