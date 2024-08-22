// Объявляем класс, представляющий карту в колоде
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

// Объявляем класс, представляющий колоду карт
class Deck {
    constructor() {
        this.cards = [];
    }

    // Создаём стандартную колоду карт
    createDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    // Перетасовываем колоду
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Раздаем карту из колоды
    deal() {
        return this.cards.pop();
    }
}

// Объявляем класс, представляющий игрока в игре
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    // Добавляем карту в руку игрока
    hit(card) {
        this.hand.push(card);
        this.score = this.calculateScore();
    }

    // Завершаем ход игрока
    stand() {
        return this.score;
    }

    // Вычисляем текущий счет игрока
    calculateScore() {
        let score = 0;
        let aces = 0;

        for (let card of this.hand) {
            if (card.value === 'A') {
                aces++;
            } else {
                score += parseInt(card.value);
            }
        }

        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }

        return score;
    }
}

// Функция получения ввода от пользователя
function getInput(prompt) {
    return new Promise((resolve) => {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        let input = '';
        process.stdin.on('data', (data) => {
            input += data;
        });
        process.stdin.on('end', () => {
            resolve(input.trim());
        });
        console.log(prompt);
    });
}

// Функция сыграть в игру
async function playGame() {
    const deck = new Deck();
    deck.createDeck();
    deck.shuffle();

    const player = new Player('Player 1');
    player.hit(deck.deal());
    player.hit(deck.deal());

    // Отобразим руку игрока и счета. Рука игрока состоит из 2 и более карт, т.е. это те карты, что есть на руках игрока
    console.log(`Player's hand: ${player.hand}`);
    console.log(`Player's score: ${player.calculateScore()}`);

    // Продолжаем раздавать карты игроку до тех пор, пока его счет не станет не менее 17
    while (player.calculateScore() < 17) {
        player.hit(deck.deal());
        console.log(`Player's hand: ${player.hand}`);
        console.log(`Player's score: ${player.calculateScore()}`);
    }

    // Отобразим окончательный счет игрока
    console.log(`Final score: ${player.calculateScore()}`);

    // Получим решение игрока: продолжить или нет (hit - взять еще одну карту; stand - «Достаточно» — означает, что игрок не желает более брать карты
    const decision = await getInput('Do you want to hit or stand? (hit/stand): ');

    // Проверим решение игрока и обновим игру соответствующим образом
    if (decision.toLowerCase() === 'hit') {
        player.hit(deck.deal());
        console.log(`Player's hand: ${player.hand}`);
        console.log(`Player's score: ${player.calculateScore()}`);
        if (player.calculateScore() > 21) {
            console.log('You went over 21. You lose!');
        }
    } else if (decision.toLowerCase() === 'stand') {
        console.log('The bot\'s turn...');
        const bot = new Player('Bot');
        bot.hand = player.hand.slice(); // Скопируйте руку игрока для бота
        bot.score = player.calculateScore();

        // Раздавайте карты боту, пока его счет не станет не менее 17.
        while (bot.calculateScore() < 17) {
            bot.hit(deck.deal());
        }

        console.log(`Bot's hand: ${bot.hand}`);
        console.log(`Bot's score: ${bot.calculateScore()}`);

        if (bot.calculateScore() > 21) {
            console.log('The bot went over 21. You win!');
        } else if (player.calculateScore() > bot.calculateScore()) {
            console.log('The bot has a higher score. You lose!');
        } else if (player.calculateScore() < bot.calculateScore()) {
            console.log('You have a higher score. You win!');
        } else {
            console.log('It\'s a tie!');
        }
    } else {
        console.log('Invalid input. The game ends.');
    }
}

// Start the game
playGame();
