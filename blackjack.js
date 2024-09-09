
// Здесь задала объект для каждой карты в колоде: объявила карту как константу с определенной мастью и значением
//Для масти червей (сердечки)
const twoOfHearts = { value: 2, suit: 'hearts' };
const threeOfHearts = { value: 3, suit: 'hearts' };
const fourOfHearts = { value: 4, suit: 'hearts' };
const fiveOfHearts = { value: 5, suit: 'hearts' };
const sixOfHearts = { value: 6, suit: 'hearts' };
const sevenOfHearts = { value: 7, suit: 'hearts' };
const eightOfHearts = { value: 8, suit: 'hearts' };
const nineOfHearts = { value: 9, suit: 'hearts' };
const tenOfHearts = { value: 10, suit: 'hearts' };
const queenOfHearts = { value: 10, suit: 'hearts' };
const kingOfHearts = { value: 10, suit: 'hearts' };
const jackOfHearts = { value: 10, suit: 'hearts' };
const aceOfHearts = { value: 10, suit: 'hearts' }; // как задать, что у туза может быть 2 значения?
//Для масти пики
const twoOfSpades = { value: 2, suit: 'spades' };
const threeOfSpades = { value: 3, suit: 'spades' };
const fourOfSpades = { value: 4, suit: 'spades' };
const fiveOfSpades = { value: 5, suit: 'spades' };
const sixOfSpades = { value: 6, suit: 'spades' };
const sevenOfSpades = { value: 7, suit: 'spades' };
const eightOfSpades = { value: 8, suit: 'spades' };
const nineOfSpades = { value: 9, suit: 'spades' };
const tenOfSpades = { value: 10, suit: 'spades' };
const queenOfSpades = { value: 10, suit: 'spades' };
const kingOfSpades = { value: 10, suit: 'spades' };
const jackOfSpades = { value: 10, suit: 'spades' };
const aceOfSpades = { value: 10, suit: 'spades' }; // как задать, что у туза может быть 2 значения?
//Для масти бубны (ромбик)
const twoOfDiamonds = { value: 2, suit: 'diamonds' };
const threeOfDiamonds = { value: 3, suit: 'diamonds' };
const fourOfDiamonds = { value: 4, suit: 'diamonds' };
const fiveOfDiamonds = { value: 5, suit: 'diamonds' };
const sixOfDiamonds = { value: 6, suit: 'diamonds' };
const sevenOfDiamonds = { value: 7, suit: 'diamonds' };
const eightOfDiamonds = { value: 8, suit: 'diamonds' };
const nineOfDiamonds = { value: 9, suit: 'diamonds' };
const tenOfDiamonds = { value: 10, suit: 'diamonds' };
const queenOfDiamonds = { value: 10, suit: 'diamonds' };
const kingOfDiamonds = { value: 10, suit: 'diamonds' };
const jackOfDiamonds = { value: 10, suit: 'diamonds' };
const aceOfDiamonds = { value: 10, suit: 'diamonds' }; // как задать, что у туза может быть 2 значения?
//Для масти трефы (ромбик)
const twoOfClubs = { value: 2, suit: 'clubs' };
const threeOfClubs = { value: 3, suit: 'clubs' };
const fourOfClubs = { value: 4, suit: 'clubs' };
const fiveOfClubs = { value: 5, suit: 'clubs' };
const sixOfClubs = { value: 6, suit: 'clubs' };
const sevenOfClubs = { value: 7, suit: 'clubs' };
const eightOfClubs = { value: 8, suit: 'clubs' };
const nineOfClubs = { value: 9, suit: 'clubs' };
const tenOfClubs = { value: 10, suit: 'clubs' };
const queenOfClubs = { value: 10, suit: 'clubs' };
const kingOfClubs = { value: 10, suit: 'clubs' };
const jackOfClubs = { value: 10, suit: 'clubs' };
const aceOfClubs = { value: 10, suit: 'clubs' }; // как задать, что у туза может быть 2 значения?
// Теперь создаю массив из карт в колоде
const deck = [twoOfHearts, threeOfHearts, fourOfHearts, fiveOfHearts, sixOfHearts, sevenOfHearts, eightOfHearts, nineOfHearts, tenOfHearts, queenOfHearts, kingOfHearts, jackOfHearts,
    aceOfHearts, twoOfSpades, threeOfSpades, fourOfSpades, fiveOfSpades, sixOfSpades, sevenOfSpades, eightOfSpades, nineOfSpades, tenOfSpades, queenOfSpades, kingOfSpades,
    jackOfSpades, aceOfSpades,  twoOfDiamonds, threeOfDiamonds, fourOfDiamonds, fiveOfDiamonds, sixOfDiamonds, sevenOfDiamonds, eightOfDiamonds, nineOfDiamonds, tenOfDiamonds, queenOfDiamonds,
    kingOfDiamonds, jackOfDiamonds, aceOfDiamonds, twoOfClubs, threeOfClubs, fourOfClubs, fiveOfClubs, sixOfClubs, sevenOfClubs, eightOfClubs, nineOfClubs, tenOfClubs, queenOfClubs,
    kingOfClubs, jackOfClubs, aceOfClubs];
// Теперь нужно объявить функцию, которая будет перемешивать колоду.
//* Буквально говорим следующее: вот есть длина колоды, пока она больше нуля, нужно из нее брать 1 карту. Этот цикл завершится, когда переменная i станет равна нулю.
// оператор for создаёт цикл, состоящий из трех необязательных выражений, заключенных в круглые скобки
// и разделенных точкой с запятой, за которыми следует инструкция (часто блок инструкций), которая должна выполняться в цикле. i это переменная,
// а і++ это увеличение числа в переменной на 1 при каждой итерации цикла.*//
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Math.random возвращает псевдослучайное число в диапазоне от 0 (включительно) до 1 (но не включая 1)
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

shuffleDeck(deck); // вызвали функцию перемешивания колоды
console.log(deck); // вывели результат

// Объявляем класс, представляющий игрока в игре класс - это разновидность функции. Т.е. мы создали функцию с именем Player, внутри нее есть конструктор.
// В методе constructor() можно инициализировать объект (туда закинем имя, "руку", т.е. те, карты, что у игрока на руках и счет., this используется для вызова метода
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
}
