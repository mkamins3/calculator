// class constructor
class Calculator {
    constructor(previousOpTxt, currentOpTxt) {
        this.previousOpTxt = previousOpTxt;
        this.currentOpTxt = currentOpTxt;
        this.clear();
    }
    clear() {
        this.currentOp = '';
        this.previousOp = '';
        this.operator = undefined;
    }
    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1);
    }
    appendNum(num) {
        if (num === '.' && this.currentOp === '') {
            this.currentOp = `0${num}`;
            return;
        } else if (num === '.' && this.currentOp.includes('.')) return;
        this.currentOp = this.currentOp.toString() + num.toString();
    }
    chooseOperator(operator) {
        if (this.currentOp === '') return;
        if (this.previousOp !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOp = this.currentOp.toString() + ' ' + operator;
        this.currentOp = '';
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOp);
        const current = parseFloat(this.currentOp);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'X':
                computation = prev * current;
                break;
            case '÷':
                if (current == 0) {
                    computation = 'ERROR';
                } else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
        this.currentOp = computation;
        this.operator = undefined;
        this.previousOp = '';
    }
    updateDisplay() {
        this.currentOpTxt.innerText = this.currentOp;
        this.previousOpTxt.innerText = this.previousOp;
    }
}



// selecting the buttons & elements
const numButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-del]');
const clrButton = document.querySelector('[data-clr]');
const previousOpTxt = document.querySelector('[data-previous-op]');
const currentOpTxt = document.querySelector('[data-current-op]');

const calculator = new Calculator(previousOpTxt, currentOpTxt)

// wiring up the buttons
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clrButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

delButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});