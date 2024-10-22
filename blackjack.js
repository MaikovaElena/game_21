// задаем начальные значение переменных (сумма дилера и игрока, код-во тузов у дилера и игрока) как ноль.
let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0; // тузы считаем отдельно, т.к. их вес зависит от очков.
let yourAceCount = 0;

let hidden; // карта дилера рубашкой вверх
let deck;

let canHit = true // позволяем игроку (себе) тянуть карты пока их сумма <= 21 очку
// при превышении 21 очка кнопка Hit дизейблится

//когда страница полностью загрузилась, мы вызываем функции создатния колоды карт, тасовки и начинаем игру
window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}
/* через функцию создаем массив колоды карт, прописываем значения и масти
 При этом записываем именно так, как у нас озаглавлены рисунки карт, это еще пригодится*/
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = []; // сохраняем это дело в переменную deck (колода)

/* Запускаем цикл for: for (начало; условие; шаг) {
  // ... тело цикла ...
}
Внутри инициализируем переменную i со значением 0, задаем условие, что i меньше длины массива мастей
и если условие верно, то выполняем цикл, при этом значение переменной i увеличивается на единицу. Цикл будет продолжаться до тех пор,
пока i не станет равной длине массива мастей (получим false).
Что происходит в этом цикле for (let j = 0; j < values.length; j++) {
 deck.push(values[j] + "-" + types[i]); - инициализируем переменную j со значением 0, задаем условие, что j меньше массива со значениями
 карт. Цикл по выполняется по аналогии с i. Если условие верно, то в массив deck добавляется карта, состоящая из значения и масти,
 разделенных знаком минус, пример: дама-червей (соответствует названиям картинок)*/
    for (let i= 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
        deck.push(values[j] + "-" + types[i]);
    }
  }
    //concole.log(deck);
}
/*
Что просходит внутри функции перемешать колоду: Инициализируем переменную i со значением 0.
Проверяется, что i меньше длины массива deck.
Если условие верно, то выполняет вложенный код:
1.Генерирует случайное целое число j в диапазоне от 0 до длины массива deck (включительно) с помощью функций Math.random() и Math.floor().
2.Создает временную переменную temp, которая хранит значение элемента массива deck в позиции i.
3.Заменяет элемент массива deck в позиции i на элемент массива deck в позиции j.
4.Заменяет элемент массива deck в позиции j на значение временной переменной temp.
5.Увеличивает значение переменной i на 1 и повторяет процесс до тех пор, пока i не станет равным длине массива deck.
В результате выполнения этой функции массив deck будет перемешан, и его элементы будут расположены в случайном порядке.*/
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
   }
    console.log(deck);
}
function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}
function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "Проиграв(";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "Проиграв(";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}