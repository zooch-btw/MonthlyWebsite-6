


const wordList = [
    'gold', 'silver', 'copper', 'iron', 'tin', 'lead', 'zinc', 'mercury', 'antimony', 'bismuth', 'thallium', 'cadmium',
    'indium', 'tantalum', 'tungsten', 'molybdenum', 'rhenium', 'osmium', 'iridium', 'platinum', 'palladium',
    'rhodium', 'ruthenium', 'oxygen', 'nitrogen', 'carbon', 'hydrogen', 'helium', 'lithium', 'sodium', 'potassium',
    'rubidium', 'caesium', 'francium', 'beryllium', 'magnesium', 'aluminium', 'sulphur', 'phosphorus', 'selenium',
    'tellurium', 'polonium', 'astatine', 'radon', 'radium', 'actinium', 'thorium', 'protactinium', 'uranium',
    'neptunium', 'plutonium', 'americium', 'curium', 'berkelium', 'californium', 'einsteinium', 'fermium',
    'mendelevium', 'nobelium', 'lawrencium', 'rutherfordium', 'dubnium', 'seaborgium', 'bohrium', 'hassium',
    'meitnerium', 'darmstadtium', 'roentgenium', 'copernicium', 'nihonium', 'flerovium', 'moscovium', 'livermorium',
    'tennessine', 'oganesson'
];
//define variables
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
let slots = [];
const maxMistakes = 6;
let wins = 0;
let losses = 0;
let lives = 6;

function startGame(level) {
    selectedWord = getRandomWord(level);
    slots = Array(selectedWord.length).fill("_");
    updateDifficultyDisplay(level);
    displayedWord = '_'.repeat(selectedWord.length);
    document.getElementById('wordDisplay').textContent = slots.join(' ');
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');
    document.getElementById('gameArea').classList.add('d-block');
    document.getElementById('greeting').classList.add('d-none');
    document.getElementById('greeting2').classList.add('d-none');
    lives = 6;
    document.getElementById('lives').textContent = `Lives: ${lives}`;
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4;
        if (level === 'medium') return word.length >= 5 && word.length <= 7;
        if (level === 'hard') return word.length >= 8;
    });
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox');
    difficultyBox.classList.remove('easy', 'medium', 'hard');
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
    difficultyBox.classList.add(level);
}

function guessLetter() {
    let inputField = document.getElementById('LetterInput');
    let guessedLetter = inputField.value.toLowerCase();
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a letter');
        inputField.value = '';
        return;
    }
    if (guessedLetters.includes(guessedLetter)) {
        inputField.value = '';
        return;
    }
    guessedLetters.push(guessedLetter);
    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter);
    } else {
        wrongGuess(guessedLetter);
    }
    inputField.value = '';
}

function wrongGuess(guessedLetter) {
    wrongGuesses++;
    lives--;
    document.getElementById('lives').textContent = `Lives: ${lives}`;
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`;
    if (wrongGuesses === maxMistakes) {
        document.getElementById('LossTxt').classList.remove('d-none');
        endGame(false);
    }
}

function correctGuess(guessedLetter) {
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) slots[i] = guessedLetter;
    }
    document.getElementById("wordDisplay").textContent = slots.join(" ");
    if (!slots.includes("_")) {
        endGame(true);
    }
}

function endGame(won) {
    if (won) {
        setTimeout(() => document.getElementById('VictoryTxt').classList.remove('d-none'), 100);
    } else {
        setTimeout(() => document.getElementById('LossTxt').classList.remove('d-none'), 100);
    }
}

function restartGame() {
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-block');
    document.getElementById('gameArea').classList.remove('d-block');
    document.getElementById('greeting').classList.remove('d-none');
    document.getElementById('greeting2').classList.remove('d-none');
    lives = 6;
    wrongGuesses = 0;
    guessedLetters = [];
    document.getElementById('lives').textContent = `Lives: ${lives}`;
    document.getElementById('wrongLetters').textContent = "Wrong Guesses: ";
    document.getElementById('VictoryTxt').classList.add('d-none');
    document.getElementById('LossTxt').classList.add('d-none');
}

window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});
