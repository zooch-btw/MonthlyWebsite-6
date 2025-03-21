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
let wrongGuess = 0;
let guessedLetters = [];
const maxMistakes = 6;

function startGame(level) {
    selectedWord = getRandomWord(level)

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