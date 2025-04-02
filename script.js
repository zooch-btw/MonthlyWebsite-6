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
let flawlessVictory = true;
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
let slots = [];
const maxMistakes = 6;
let wins = 0;        // Initialize at 0
let losses = 0;      // Initialize at 0
let lives = 6;
let wordHistory = []; // For Word Graveyard
let isCustomGame = false; // New flag to track custom game mode

document.getElementById('greeting').textContent = `Wins: ${wins}`;
document.getElementById('greeting2').textContent = `Losses: ${losses}`;

function updateGraveyard(word, won) {
    wordHistory.push({ word: word, won: won });
    const graveyardList = document.getElementById('graveyardList');
    const listItem = document.createElement('li');
    listItem.classList.add('graveyard-word');
    listItem.classList.add(won ? 'won-word' : 'lost-word');
    listItem.innerHTML = `
        ${word} 
        <span>${won ? '✓ Won' : '✗ Lost'}</span>
    `;
    graveyardList.appendChild(listItem);
}

function startGame(level) {
    isCustomGame = false; // Reset custom game flag
    selectedWord = getRandomWord(level);
    slots = Array(selectedWord.length).fill("_");
    updateDifficultyDisplay(level);
    initializeGame();
}

function startCustomGame() {
    const customWord = document.getElementById('customWordInput').value.toLowerCase().trim();
    if (!customWord || !customWord.match(/^[a-z]+$/)) {
        alert('Please enter a valid word using only letters (a-z)');
        return;
    }
}

function initializeGame() {
    displayedWord = '_'.repeat(selectedWord.length);
    document.getElementById('wordDisplay').textContent = slots.join(' ');
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('customWordSection').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');
    document.getElementById('gameArea').classList.add('d-block');
    document.getElementById('greeting').classList.add('d-none');
    document.getElementById('greeting2').classList.add('d-none');
    lives = 6;
    wrongGuesses = 0;
    guessedLetters = [];
    flawlessVictory = true; // Reset for a new game
    document.getElementById('lives').textContent = `Lives: ${lives}`;
    document.getElementById('wrongLetters').textContent = "Wrong Guesses: ";
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
    difficultyBox.classList.remove('easy', 'medium', 'hard', 'custom');
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
        document.getElementById('correctSound').play(); // Play correct sound
    } else {
        wrongGuess(guessedLetter);
        document.getElementById('wrongSound').play(); // Play wrong sound
    }
    inputField.value = '';
}

function wrongGuess(guessedLetter) {
    wrongGuesses++;
    lives--;
    flawlessVictory = false; // A wrong guess means no flawless victory
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
        wins++;
        document.getElementById('greeting').textContent = `Wins: ${wins}`;
        setTimeout(() => {
            document.getElementById('VictoryTxt').classList.remove('d-none');
            if (flawlessVictory) {
                document.getElementById('FlawlessVictoryTxt').classList.remove('d-none'); // Show Flawless Victory
            }
            document.getElementById('winSound').play(); // Play win sound
        }, 100);
        setTimeout(() => {
            const victoryReveal = document.getElementById('victoryReveal');
            document.getElementById('wonWord').textContent = selectedWord;
            victoryReveal.classList.remove('d-none');
        }, 1000);
        updateGraveyard(selectedWord, true);
    } else {
        losses++;
        document.getElementById('greeting2').textContent = `Losses: ${losses}`;
        setTimeout(() => {
            document.getElementById('LossTxt').classList.remove('d-none'); // Show Loss txt
            document.getElementById('loseSound').play(); // Play lose sound
        }, 100);
        setTimeout(() => {
            const revealedWord = document.getElementById('revealedWord');
            document.getElementById('lostWord').textContent = selectedWord; // Reveal the selected word as lost
            revealedWord.classList.remove('d-none'); // Reveal the word
        }, 1000);
        updateGraveyard(selectedWord, false); // Add to graveyard lost words
    }
    document.getElementById('guessBtn').disabled = true; // disable guess button
}

function restartGame() {
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('customWordSection').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultyBox').classList.remove('d-block');
    document.getElementById('gameArea').classList.remove('d-block');

    document.getElementById('greeting').classList.remove('d-none');
    document.getElementById('greeting').textContent = `Wins: ${wins}`;
    document.getElementById('greeting2').classList.remove('d-none');
    document.getElementById('greeting2').textContent = `Losses: ${losses}`;

    lives = 6;
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = '';
    displayedWord = '';
    slots = [];
    flawlessVictory = true; // Reset for next game

    document.getElementById('lives').textContent = `Lives: ${lives}`;
    document.getElementById('wrongLetters').textContent = "Wrong Guesses: ";
    document.getElementById('VictoryTxt').classList.add('d-none');
    document.getElementById('FlawlessVictoryTxt').classList.add('d-none'); // Hide Flawless Victory
    document.getElementById('LossTxt').classList.add('d-none');
    document.getElementById('revealedWord').classList.add('d-none');
    document.getElementById('victoryReveal').classList.add('d-none');

    document.getElementById('wordDisplay').textContent = '';

    const tubes = ['tube', 'tube2', 'tube3', 'tube4', 'tube5', 'tube6'];
    tubes.forEach(tubeId => {
        document.getElementById(tubeId).classList.add('d-none');
    });

    document.getElementById('LetterInput').value = '';
    document.getElementById('guessBtn').disabled = false;
}

window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});
document.getElementById('customWordInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        startCustomGame();
    }
});
