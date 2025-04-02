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
let flawlessVictory = true;
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
let slots = [];
const maxMistakes = 6;
let wins = 0;
let losses = 0;
let lives = 6;
let wordHistory = [];
let isCustomGame = false;

function initializeDisplay() {
    document.getElementById('winsDisplay').textContent = `Wins: ${wins}`;
    document.getElementById('lossesDisplay').textContent = `Losses: ${losses}`;
    document.getElementById('lives').textContent = `Lives: ${lives}`;
}

function updateGraveyard(word, won) {
    wordHistory.push({ word, won });
    const listItem = document.createElement('li');
    listItem.classList.add('graveyard-word', won ? 'won-word' : 'lost-word');
    listItem.innerHTML = `${word} <span>${won ? 'Won ✓' : 'Lost ✗'}</span>`;
    document.getElementById('graveyardList').appendChild(listItem);
}

function startGame(level) {
    isCustomGame = false;
    selectedWord = getRandomWord(level);
    slots = Array(selectedWord.length).fill('_');
    updateDifficultyDisplay(level);
    initializeGame();
}

function startCustomGame() {
    const customWord = document.getElementById('customWordInput').value.toLowerCase().trim();
    if (!customWord || !customWord.match(/^[a-z]+$/)) {
        document.getElementById('enterlet').play();
        return;
    }
    isCustomGame = true;
    selectedWord = customWord;
    slots = Array(selectedWord.length).fill('_');
    updateDifficultyDisplay('custom');
    initializeGame();
}

function initializeGame() {
    displayedWord = slots.join(' ');
    document.getElementById('wordDisplay').textContent = displayedWord;
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('customWordSection').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('winsDisplay').classList.add('d-none');
    document.getElementById('lossesDisplay').classList.add('d-none');
    lives = 6;
    wrongGuesses = 0;
    guessedLetters = [];
    flawlessVictory = true;
    document.getElementById('lives').textContent = `Lives: ${lives}`;
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';
    updateHealthDisplay();
}

function getRandomWord(level) {
    const filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4;
        if (level === 'medium') return word.length >= 5 && word.length <= 7;
        if (level === 'hard') return word.length >= 8;
    });
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
    const difficultyBox = document.getElementById('difficultyBox');
    difficultyBox.classList.remove('easy', 'medium', 'hard', 'custom');
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
    difficultyBox.classList.add(level);
}

function guessLetter() {
    const inputField = document.getElementById('letterInput');
    const guessedLetter = inputField.value.toLowerCase();
    if (!guessedLetter.match(/^[a-z]$/)) {
        document.getElementById('enterlet').play();
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
        document.getElementById('correctSound').play();
    } else {
        wrongGuess(guessedLetter);
        document.getElementById('wrongSound').play();
    }
    inputField.value = '';
}

function wrongGuess(guessedLetter) {
    wrongGuesses++;
    lives--;
    flawlessVictory = false;
    document.getElementById('lives').textContent = `Lives: ${lives}`;
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`;
    updateHealthDisplay();
    if (wrongGuesses === maxMistakes) {
        document.getElementById('lossText').classList.remove('d-none');
        endGame(false);
    }
}

function updateHealthDisplay() {
    const healthContainer = document.querySelector('.health-container');
    for (let i = 1; i <= 6; i++) {
        const healthImg = document.getElementById(`healthImage${i}`);
        if (i <= wrongGuesses) {
            healthImg.classList.remove('d-none');
        } else {
            healthImg.classList.add('d-none');
        }
    }
    if (wrongGuesses === 6) {
        healthContainer.classList.add('full-image');
    } else {
        healthContainer.classList.remove('full-image');
    }
}

function correctGuess(guessedLetter) {
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) slots[i] = guessedLetter;
    }
    displayedWord = slots.join(' ');
    document.getElementById('wordDisplay').textContent = displayedWord;
    if (!slots.includes('_')) endGame(true);
}

function endGame(won) {
    document.getElementById('guessBtn').disabled = true;
    if (won) {
        wins++;
        setTimeout(() => {
            document.getElementById('victoryText').classList.remove('d-none');
            if (flawlessVictory) {
                document.getElementById('flawlessVictoryText').classList.remove('d-none');
                document.getElementById('flawvicsnd').play();
            }
            document.getElementById('winSound').play();
        }, 100);
        setTimeout(() => {
            document.getElementById('wonWord').textContent = selectedWord;
            document.getElementById('victoryReveal').classList.remove('d-none');
        }, 1000);
        updateGraveyard(selectedWord, true);
    } else {
        losses++;
        setTimeout(() => {
            document.getElementById('lossText').classList.remove('d-none');
            document.getElementById('loseSound').play();
        }, 100);
        setTimeout(() => {
            document.getElementById('lostWord').textContent = selectedWord;
            document.getElementById('revealedWord').classList.remove('d-none');
        }, 1000);
        updateGraveyard(selectedWord, false);
    }
    initializeDisplay();
}

function restartGame() {
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('customWordSection').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('winsDisplay').classList.remove('d-none');
    document.getElementById('lossesDisplay').classList.remove('d-none');

    lives = 6;
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = '';
    displayedWord = '';
    slots = [];
    flawlessVictory = true;

    document.getElementById('lives').textContent = `Lives: ${lives}`;
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';
    document.getElementById('victoryText').classList.add('d-none');
    document.getElementById('flawlessVictoryText').classList.add('d-none');
    document.getElementById('lossText').classList.add('d-none');
    document.getElementById('revealedWord').classList.add('d-none');
    document.getElementById('victoryReveal').classList.add('d-none');
    document.getElementById('wordDisplay').textContent = '';
    document.getElementById('letterInput').value = '';
    document.getElementById('guessBtn').disabled = false;
    updateHealthDisplay();
}

window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !document.getElementById('gameArea').classList.contains('d-none')) {
        guessLetter();
    }
});

document.getElementById('customWordInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') startCustomGame();
});

initializeDisplay();