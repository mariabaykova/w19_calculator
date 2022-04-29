class Calculator  {
    static multiplication ( a, b ) {
        return a * b;
    }
    static division ( a, b ) {
        return a / b;
    }
    static subtraction ( a, b ) {
        return a - b;
    }
    static addition ( a, b ) {
        return a + b;
    }
}

function checkErrors() {
    clearErrorList();
    //получаем все инпуты (но, если честно, нам нужны только первые два)
    let inputs = document.querySelectorAll("input");

    //перебираем их и на каждый вызываем функцию валидации
    for (let input of inputs) {
        checkValidity(input);
    }
    showErrors();
}

function checkValidity( input ) {
    let validity = input.validity;
    if ( validity.patternMismatch ) {
        errorMessages.push(input.value + ' - неверный формат заполнения, допустимы только цифры'); 
    }
    if ( validity.valueMissing ) {
        errorMessages.push('Не заполнено обязательное поле'); 
    }
    if ( validity.typeMismatch ) {
        errorMessages.push(input.value + ' - несоответствие типу'); 
    }
}


function checkDivision() {
    if ( secondNumElem.value === "0" ) {
        errorMessages.push("На 0 делить нельзя!");
        resultElem.value = "";
        secondNumElem.style.color = "red";
        showErrors();
    }
}

let clearCalc = () => {
    resultElem.value = "";
    firstNumElem.value = "";
    secondNumElem.value = "";  
    hideErrorBlock();
}

// показать блок с ошибками
let showErrors = () => {
    errorMessageBlock.style.display = ( errorMessages.length ) ? "" : "none";
    errorMessageBlock.innerHTML = ( errorMessages.length ) ? errorMessages.join('<br>') : "";
    resultElem.value = ( errorMessages.length ) ? "" : resultElem.value;
}

// скрыть блок с ошибками и очистить список ошибок
let hideErrorBlock = () => {
    clearErrorList();
    errorMessageBlock.style.display = "none";
    errorMessageBlock.innerHTML = "";
}

// очистить список ошибок
let clearErrorList = () => {
    errorMessages = [];
    secondNumElem.style.color = "black";
}

let firstNumElem = document.getElementById("calculator__first-num");
let secondNumElem = document.getElementById("calculator__second-num");
let resultElem = document.getElementById("calculator__result");

// let firstNumVal = firstNumElem.value;
// let secondNumVal = secondNumElem.value;
// let resultVal = 


let errorMessageBlock = document.getElementById("errorMessages");
errorMessageBlock.style.display = "none";

let errorMessages = [];

let sumButton = document.getElementById("sum");
sumButton.addEventListener("click", checkErrors);

let subtrButton = document.getElementById("subtr");
subtrButton.addEventListener("click", checkErrors);

let multButton = document.getElementById("mult");
multButton.addEventListener("click", checkErrors);

let divisionButton = document.getElementById("division");
divisionButton.addEventListener("click", checkErrors);

divisionButton.addEventListener("click", checkDivision);

sumButton.addEventListener("click", (event) => {
    // если нет ошибок при заполнении
    if ( !errorMessages.length ) {
        resultElem.value = Calculator.addition(Number(firstNumElem.value), Number(secondNumElem.value) );
    }
});

subtrButton.addEventListener("click", (event) => {
    if ( !errorMessages.length ) {
        resultElem.value = Calculator.subtraction(Number(firstNumElem.value), Number(secondNumElem.value));    
    }
});

divisionButton.addEventListener("click", (event) => {
    if ( !errorMessages.length ) {
        resultElem.value = Calculator.division(Number(firstNumElem.value), Number(secondNumElem.value));
    }
});

multButton.addEventListener( "click", (event) => {
    if ( !errorMessages.length ) {
        resultElem.value = Calculator.multiplication(Number(firstNumElem.value), Number(secondNumElem.value));
    }        
});


firstNumElem.addEventListener("click", hideErrorBlock );
secondNumElem.addEventListener("click", hideErrorBlock ); 