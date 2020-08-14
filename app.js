class calculatorManager {
  UiEventsHandler() {
    //grabbing the calculator div from DOM  to work with buttons and attach Event Listeners
    const calculator = document.querySelector(`.calculator`);
    //variable to hold all the calculator keys to attach listeners
    const keys = calculator.querySelector(`.calculator__keys`);
    //varaible holds the display screen to show calculation results on screen and to retrieve user input value as well
    const display = calculator.querySelector(`.calculator__display`);
    //attached event listeners to keys
    keys.addEventListener(`click`, (e) => {
      // to confimr if click was to a button and then fetch its action and values further
      if (e.target.matches(`button`)) {
        //retrieve actual target button
        const key = e.target;
        //retrieve the datasent attributes of the button and current display status in constant data types
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        let secondValue = displayedNum;
        const previousKeyType = calculator.dataset.previousKeyType;
        console.log(previousKeyType);
        //removing pressed class from the keys if applied
        Array.from(key.parentNode.children).forEach((k) =>
          k.classList.remove("is-depressed")
        );
        //if the button has to action attribute then it is a numeric value
        if (!action) {
          calculator.dataset.previousKeyType = "number";
          //if screen was at default zero value or the user is putting the second value of operation clear screen to new value
          if (displayedNum === "0" || previousKeyType === "operator") {
            display.textContent = keyContent;
          } else {
            display.textContent = displayedNum + keyContent;
          }
        }
        //if user clicks action buttons then following actions sequence should be executed
        if (
          action === "add" ||
          action === "subtract" ||
          action === "multiply" ||
          action === "divide"
        ) {
          const firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          secondValue = displayedNum;
          //first value exists and the operation to be performed exists then do calcualtion
          //but make sure last press of user was not the operator butn or calculate button
          if (
            firstValue &&
            operator &&
            previousKeyType !== "operator" &&
            previousKeyType !== "calculate"
          ) {
            const calcValue = this.performCalculation(
              firstValue,
              operator,
              secondValue
            );
            //display calculation to screen
            display.textContent = calcValue;
            // Update calculated value as firstValue
            calculator.dataset.firstValue = calcValue;
          } else {
            // If there are no calculations, set displayedNum as the firstValue
            calculator.dataset.firstValue = displayedNum;
          }
          //when user click operator key show it as pressed for better Uesr experience he know which operation he is performing
          key.classList.add("is-depressed");
          calculator.dataset.previousKeyType = "operator";
          calculator.dataset.operator = action;
        }
        //if user enters decimal ensure the screen does not contain a decimal already in value
        if (action === "decimal") {
          if (!displayedNum.includes(".")) {
            display.textContent = displayedNum + ".";
          } // if it is second value or start of value then show 0. on screen
          else if (
            previousKeyType === "operator" ||
            previousKeyType === "calculate"
          ) {
            display.textContent = "0.";
          }
          //set the previous click key status as decimal
          calculator.dataset.previousKeyType = "decimal";
        }
        //if user click clear screen button then clear the based on following conditions
        if (action === "clear") {
          //if clear button show AC all clear the remove first value second values and operator value to empty
          if (key.textContent === "AC") {
            calculator.dataset.firstValue = "";
            calculator.dataset.modValue = "";
            calculator.dataset.operator = "";
            calculator.dataset.previousKeyType = "";
            this.firstValue = "";
            this.secondValue = "";
          } else {
            key.textContent = "AC";
          }
          //set the screen to zero
          display.textContent = 0;
          calculator.dataset.previousKeyType = "clear";
        }
        if (action !== "clear") {
          const clearButton = calculator.querySelector("[data-action=clear]");
          clearButton.textContent = "CE";
        }
        //if user click on calculate operator =
        //then take following actions fetch first,last and operator value from calculator data-set attributes and screen
        if (action === "calculate") {
          let firstValue = calculator.dataset.firstValue;
          const operator = calculator.dataset.operator;
          let secondValue = displayedNum;
          //if user again clicks the calculate button previous output will be set as a firsst value
          //and 2nd value will be the last 2nd number which user input befor last calcualtion we save in modValue
          if (firstValue) {
            if (previousKeyType === "calculate") {
              firstValue = displayedNum;
              secondValue = calculator.dataset.modValue;
              console.log(
                firstValue + ":" + secondValue + calculator.dataset.modValue
              );
            }
            //calling calculation method on values
            display.textContent = this.performCalculation(
              firstValue,
              operator,
              secondValue
            );
          }

          // Set modValue attribute every time users click calcuation button it is saved if user want to repaeat same caluction
          //by clicking calculation button again
          calculator.dataset.modValue = secondValue;
          calculator.dataset.previousKeyType = "calculate";
        }
      }
    });
  }
  // this method performs calculation on given 2 values and the operator and returns output number
  performCalculation(n1, operator, n2) {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === "add") return firstNum + secondNum;
    if (operator === "subtract") return firstNum - secondNum;
    if (operator === "multiply") return firstNum * secondNum;
    if (operator === "divide") return firstNum / secondNum;
  }
}
//declaring class object
const calculator = new calculatorManager();
//calling method to handle click events
calculator.UiEventsHandler();
