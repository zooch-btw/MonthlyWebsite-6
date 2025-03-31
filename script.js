const wordList = [
    'gold',
    'silver',
    'copper',
    'iron',
    'tin',
    'lead',
    'zinc',
    'mercury',
    'antimony',
    'bismuth',
    'thallium',
    'cadmium',
    'indium',
    'tantalum',
    'tungsten',
    'molybdenum',
    'rhenium',
    'osmium',
    'iridium',
    'platinum',
    'palladium',
    'rhodium',
    'ruthenium',
    'oxygen',
    'nitrogen',
    'carbon',
    'hydrogen',
    'helium',
    'lithium',
    'sodium',
    'potassium',
    'rubidium',
    'caesium',
    'francium',
    'beryllium',
    'magnesium',
    'aluminium',
    'sulphur',
    'phosphorus',
    'selenium',
    'tellurium',
    'polonium',
    'astatine',
    'radon',
    'radium',
    'actinium',
    'thorium',
    'protactinium',
    'uranium',
    'neptunium',
    'plutonium',
    'americium',
    'curium',
    'berkelium',
    'californium',
    'einsteinium',
    'fermium',
    'mendelevium',
    'nobelium',
    'lawrencium',
    'rutherfordium',
    'dubnium',
    'seaborgium',
    'bohrium',
    'hassium',
    'meitnerium',
    'darmstadtium',
    'roentgenium',
    'copernicium',
    'nihonium',
    'flerovium',
    'moscovium',
    'livermorium',
    'tennessine',
    'oganesson',
]
//selecting Game Variables
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
let slots = [];
const maxMistakes = 6;
let wins = 0
let losses = 0

function startGame(level) {
    selectedWord = getRandomWord(level)
    slots = new Array(selectedWord.length);
    for (let i = 0; i < slots.length; i++) {
        slots[i] = "_"
    }
    //Update diff display div
    updateDifficultyDisplay(level)

    //Create placeholder's for the selected word
    displayedWord = '_'.repeat(selectedWord.length)

    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')


    //hide diff selection and show game area & diff box
    document.getElementById('difficultySelection').classList.add('d-none')

    document.getElementById('difficultyBox').classList.remove('d-none')

    document.getElementById('gameArea').classList.remove('d-none')

    document.getElementById('difficultyBox').classList.add('d-block')

    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('greeting').classList.add('d-none')

    document.getElementById('greeting2').classList.add('d-none')

}

function getRandomWord(level) {
    let filteredwords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })

    return filteredwords[Math.floor(Math.random() * filteredwords.length)]
}

function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')

    //Remove any previous diff classes (easy, med, hard)
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    // Set text & apply class dynamically using template literals
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`

    //apply the approprite CSS style for chosen difficulty
    difficultyBox.classList.add(level)
}
function guessLetter() {
    let inputField = document.getElementById('LetterInput')
    let guessedLetter = inputField.value.toLowerCase()

    //Check if input is valid letter (a-z)
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a letter')
        inputField.value = ''
        return
    }
    // Check If letter was akready guessed using .includes()
    if (guessedLetters.includes(guessedLetter)) {
        endGame(won)
        inputField.value = ''
        return
    } else {
        // add guessed letter to the array of guessedletters
        guessedLetters.push(guessedLetter)
    }
    //Check if letter is in word
    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter)
    } else wrongGuess(guessedLetter)

    inputField.value = ''



}
function wrongGuess(guessedLetter) {
    //increment the number of wrong guesses
    wrongGuesses++
    // add the guessed letter to HTML div
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`

    document.getElementById('tube').src = `imgs/tube${6 - wrongGuesses}.webp`



    // Check to see if wrongGuesses ===  MaxMistakes if it is, call endgame(false)
    if (wrongGuesses === maxMistakes) {
        endGame(false)
    }
}
function correctGuess(guessedLetter) {
    let newDisplayedWord = ''
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] == guessedLetter) slots[i] = guessedLetter;
    }
    document.getElementById("wordDisplay").textContent = slots.join(" ");
    if (!slots.includes("_")) {
        endGame(true)
    }

}
function endGame(won) {
    console.log(won);
    if (won === true) {
        setTimeout(() => document.getElementById('VictoryTxt').classList.remove('d-none'), 100, document)
    } else {
        setTimeout(() => document.getElementById('LossTxt').classList.remove('d-none'), 100, document)
    }
}
// /Restart Game - Reloads the page to reset everything
function restartGame() {
    document.getElementById('difficultySelection').classList.remove('d-none')

    document.getElementById('difficultyBox').classList.add('d-none')

    document.getElementById('gameArea').classList.add('d-none')

    document.getElementById('difficultyBox').classList.remove('d-block')

    document.getElementById('gameArea').classList.remove('d-block')

    document.getElementById('greeting').classList.remove('d-none')

    document.getElementById('greeting2').classList.remove('d-none')
}
// Added event listener to detect "Enter" key press in the input
window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
        // Calls the guessLetter function when Enter is pressed
    }
})

document.getElementById("greeting").innerHTML = `Number of wins: ${wins}`;
document.getElementById("greeting2").innerHTML = `Number of losses: ${losses}`;