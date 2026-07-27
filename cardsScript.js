let originalDeck = [
            [1, 'fence'],
            [1, 'purple'],
            [1, 'park'],
            [2, 'fence'],
            [2, 'purple'],
            [2, 'park'],
            [3, 'fence'],
            [3, 'pool'],
            [3, 'bis'],
            [3, 'orange'],
            [4, 'purple'],
            [4, 'park'],
            [4, 'pool'],
            [4, 'bis'],
            [4, 'orange'],
            [5, 'fence'],
            [5, 'fence'],
            [5, 'purple'],
            [5, 'purple'],
            [5, 'park'],
            [5, 'park'],
            [6, 'fence'],
            [6, 'fence'],
            [6, 'purple'],
            [6, 'park'],
            [6, 'pool'],
            [6, 'bis'],
            [6, 'orange'],
            [7, 'fence'],
            [7, 'purple'],
            [7, 'purple'],
            [7, 'park'],
            [7, 'park'],
            [7, 'pool'],
            [7, 'bis'],
            [7, 'orange'],
            [8, 'fence'],
            [8, 'fence'],
            [8, 'purple'],
            [8, 'purple'],
            [8, 'park'],
            [8, 'park'],
            [8, 'pool'],
            [8, 'bis'],
            [8, 'orange'],
            [9, 'fence'],
            [9, 'purple'],
            [9, 'purple'],
            [9, 'park'],
            [9, 'park'],
            [9, 'pool'],
            [9, 'bis'],
            [9, 'orange'],
            [10, 'fence'],
            [10, 'fence'],
            [10, 'purple'],
            [10, 'park'],
            [10, 'pool'],
            [10, 'bis'],
            [10, 'orange'],
            [11, 'fence'],
            [11, 'fence'],
            [11, 'purple'],
            [11, 'purple'],
            [11, 'park'],
            [11, 'park'],
            [12, 'purple'],
            [12, 'park'],
            [12, 'pool'],
            [12, 'bis'],
            [12, 'orange'],
            [13, 'fence'],
            [13, 'pool'],
            [13, 'bis'],
            [13, 'orange'],
            [14, 'fence'],
            [14, 'purple'],
            [14, 'park'],
            [15, 'fence'],
            [15, 'purple'],
            [15, 'park'],
           ];

let moonDeck = [
            [1, 'robot'],
            [1, 'energy'],
            [2, 'robot'],
            [2, 'plant'],
            [3, 'water'],
            [3, 'astronaut'],
            [3, 'planning'],
            [4, 'energy'],
            [4, 'plant'],
            [4, 'astronaut'],
            [4, 'planning'],
            [5, 'robot'],
            [5, 'robot'],
            [5, 'energy'],
            [5, 'energy'],
            [5, 'plant'],
            [6, 'robot'],
            [6, 'energy'],
            [6, 'plant'],
            [6, 'water'],
            [6, 'astronaut'],
            [6, 'planning'],
            [7, 'robot'],
            [7, 'energy'],
            [7, 'energy'],
            [7, 'plant'],
            [7, 'plant'],
            [7, 'water'],
            [8, 'robot'],
            [8, 'robot'],
            [8, 'plant'],
            [8, 'plant'],
            [8, 'water'],
            [8, 'astronaut'],
            [8, 'planning'],
            [9, 'robot'],
            [9, 'energy'],
            [9, 'energy'],
            [9, 'plant'],
            [9, 'plant'],
            [9, 'water'],
            [10, 'robot'],
            [10, 'energy'],
            [10, 'plant'],
            [10, 'water'],
            [10, 'astronaut'],
            [10, 'planning'],
            [11, 'robot'],
            [11, 'robot'],
            [11, 'energy'],
            [11, 'energy'],
            [11, 'plant'],
            [12, 'energy'],
            [12, 'plant'],
            [12, 'astronaut'],
            [12, 'planning'],
            [13, 'water'],
            [13, 'astronaut'],
            [13, 'planning'],
            [14, 'robot'],
            [14, 'plant'],
            [15, 'robot'],
            [15, 'energy'],
           ]

// define the total number of each action
let actionNumberDict = {
    'orange': 9,
    'bis': 9,
    'pool': 9,
    'park': 18,
    'purple': 18,
    'fence': 18,
    'robot': 14,
    'energy': 14,
    'plant': 14,
    'planning': 7,
    'astronaut': 7,
    'water': 7
}

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

function splitIntoThree(array){
    const size = Math.ceil(array.length / 3);
    const first = array.slice(0, size);
    const second = array.slice(size, size * 2);
    const third = array.slice(size * 2);
    return [first, second, third];
}

let numberRowCards;
let actionRowCards;

// current index of the action card row
let currentIndex = 0;
let roundsRemaining = 0;

// array to hold the count of each number revealed
let numberCounter;

// dict to hold the count of each action revealed
let actionCountDict;

// variable to hold shuffled and split deck
let deck;

// variable to hold the correct round counter
let roundCounter;

// variables to control correct histograms
let numberHistogram;
let actionHistogram;

// this array says how many times the index appears in the deck
// for example there are 3 ones in the deck, so totalOfEachNumber[0] == 3 (0 indexed so index 0 is really 1)
let totalOfEachNumber;

let whichGame;

function initializeGame(){
    let gameDeck = whichGame === 'original' ? originalDeck : moonDeck;

    // initial shuffle
    shuffleArray(gameDeck);

    // split deck into three smaller decks
    deck = splitIntoThree(gameDeck); 

    currentIndex = 0;
    roundsRemaining = whichGame === 'original' ? 26 : 20;

    // reset the number counter
    numberCounter = Array(15).fill(0);

    // reset the count of each 
    if(whichGame === 'original'){
        actionCountDict = {
                        'orange': 0,
                        'bis': 0,
                        'pool': 0,
                        'park': 0,
                        'purple': 0,
                        'fence': 0
                    }
    }else if(whichGame === 'moon'){
        actionCountDict = {
                        'astronaut': 0,
                        'water': 0,
                        'planning': 0,
                        'robot': 0,
                        'plant': 0,
                        'energy': 0
                    }
    }

    let button = document.getElementById(`${whichGame}DrawButton`);
    button.textContent = 'Next Cards';

    // set the cards to be the correct ones for the given game
    numberRowCards = document.getElementById(`${whichGame}NumberRow`).querySelectorAll('.card');
    actionRowCards = document.getElementById(`${whichGame}ActionRow`).querySelectorAll('.card');

    // set round counter to correct one based on selected game
    roundCounter = document.getElementById(`${whichGame}RoundCounter`);

    // get correct histograms
    numberHistogram = document.getElementById(`${whichGame}NumberHistogram`);
    actionHistogram = document.getElementById(`${whichGame}ActionHistogram`);

    // set correct values of the total number of each number
    totalOfEachNumber = whichGame === 'original' ? [3,3,4,5,6,7,8,9,8,7,6,5,4,3,3] : [2,2,3,4,5,6,6,7,6,6,5,4,3,2,2];

    button.onclick = function(){
        showNextCards(button);
    }

    // show initial cards
    showNextCards();

    // show the correct game block
    document.getElementById('originalBlock').style.display = whichGame === 'moon' ? 'none' : 'block';
    document.getElementById('moonBlock').style.display = whichGame === 'moon' ? 'block' : 'none';
}

function showNextCards(button){
    // set the numbers in the number row
    numberRowCards[0].querySelector('.number').textContent = deck[0][currentIndex + 1][0];
    numberRowCards[1].querySelector('.number').textContent = deck[1][currentIndex + 1][0];
    numberRowCards[2].querySelector('.number').textContent = deck[2][currentIndex + 1][0];

    // set the actions corner of the number row
    numberRowCards[0].querySelector('img').src = `images/${deck[0][currentIndex + 1][1]}.png`;
    numberRowCards[1].querySelector('img').src = `images/${deck[1][currentIndex + 1][1]}.png`;
    numberRowCards[2].querySelector('img').src = `images/${deck[2][currentIndex + 1][1]}.png`;

    // set the action in the action row
    actionRowCards[0].querySelector('img').src = `images/${deck[0][currentIndex][1]}.png`;
    actionRowCards[1].querySelector('img').src = `images/${deck[1][currentIndex][1]}.png`;
    actionRowCards[2].querySelector('img').src = `images/${deck[2][currentIndex][1]}.png`;

    // increment the counter for each of the numbers
    numberCounter[deck[0][currentIndex + 1][0] - 1] += 1;
    numberCounter[deck[1][currentIndex + 1][0] - 1] += 1;
    numberCounter[deck[2][currentIndex + 1][0] - 1] += 1;

    // increment the action counter for each card
    actionCountDict[deck[0][currentIndex][1]] += 1;
    actionCountDict[deck[1][currentIndex][1]] += 1;
    actionCountDict[deck[2][currentIndex][1]] += 1;

    // if first cards of shuffle, need to add the hidden numbers
    // if(currentIndex === 0){
    //     numberCounter[deck[0][currentIndex][0]] += 1;
    //     numberCounter[deck[1][currentIndex][0]] += 1;
    //     numberCounter[deck[2][currentIndex][0]] += 1;
    // }

    // check if need shuffle
    if(currentIndex === deck[0].length - 2){
        // change button to shuffle
        button.textContent = 'Shuffle Deck';

        button.onclick = function(){
            initializeGame();
        }
    }

    // increment index
    currentIndex += 1;

    roundsRemaining -= 1;

    // set the number of rounds until shuffle in the counter
    roundCounter.textContent = roundsRemaining;

    // after each draw, refresh the histogram
    updateHistogram();

}

function toggleStatistics(button, isShow){
    // toggle statistics
    numberHistogram.parentNode.classList.toggle('active');
    actionHistogram.parentNode.classList.toggle('active');

    // change button text
    button.textContent = isShow ? 'Hide Statistics' : 'Show Statistics';

    // change button function
    button.onclick = function(){
        toggleStatistics(button, !isShow);
    }

}

function updateHistogram(){
    // update the histogram based on the number of each card drawn

    // get all the histogram bars
    let barContainers = numberHistogram.querySelectorAll('.bar-container');

    for(let i = 0; i < barContainers.length; i++){
        // get the bar container
        let container = barContainers[i];

        // determine how many are left of that number
        let numberRemaining = totalOfEachNumber[i] - numberCounter[i];

        // update the number at the top
        container.querySelector('.number-count').textContent = numberRemaining;

        // determine the percentage drawn
        let percentageDrawn = numberCounter[i] * 100 / totalOfEachNumber[i];

        // update the height of the full-bar
        container.querySelector('.full-bar').style.height = `${percentageDrawn}%`;

        // update the color of the numbers
        if(percentageDrawn >= 50){
            if(numberRemaining == 0){
                container.querySelector('.number-count').classList.remove('yellow');
                container.querySelector('.number-count').classList.add('red');

                container.querySelector('.card-num').classList.add('finished');
            }else{
                container.querySelector('.number-count').classList.add('yellow');
            }
        }else{
            container.querySelector('.number-count').classList.remove('yellow');
            container.querySelector('.number-count').classList.remove('red');

            container.querySelector('.card-num').classList.remove('finished');
        }

    }

    // now update the action histogram

    // get all the histogram bars
    let actionBarContainers = actionHistogram.querySelectorAll('.bar-container');

    for(let i = 0; i < actionBarContainers.length; i++){
        // get the bar container
        let container = actionBarContainers[i];

        // determine how many are left of that number
        let totalNumber = actionNumberDict[container.id];
        let numberRemaining = totalNumber - actionCountDict[container.id];

        // update the number at the top
        container.querySelector('.number-count').textContent = numberRemaining;

        // determine the percentage drawn
        let percentageDrawn = actionCountDict[container.id] * 100 / totalNumber;

        // update the height of the full-bar
        container.querySelector('.full-bar').style.height = `${percentageDrawn}%`;

        // update the color of the numbers
        if(percentageDrawn >= 50){
            if(numberRemaining == 0){
                container.querySelector('.number-count').classList.remove('yellow');
                container.querySelector('.number-count').classList.add('red');
            }else{
                container.querySelector('.number-count').classList.add('yellow');
            }
        }else{
            container.querySelector('.number-count').classList.remove('yellow');
            container.querySelector('.number-count').classList.remove('red');
        }

    }

}

function toggleAnimations(button){
    button.closest('.game-block').querySelector('main').classList.toggle('animated');

    button.querySelector('img').src = button.closest('.game-block').querySelector('main').classList.contains('animated') ? 'images/waves-white.png' : 'images/waves-gray.png';
}

function startGame(gameSelected){
    // set game selected
    whichGame = gameSelected;

    // hide the selection wrapper
    document.getElementById('selectionWrapper').style.display = 'none';

    // show the game wrapper
    document.getElementById('gameWrapper').style.display = 'block';

    // initialize the game
    initializeGame();
}


function backToHome(){
    // hide the game wrapper 
    document.getElementById('gameWrapper').style.display = 'none';

    // show the selection wrapper
    document.getElementById('selectionWrapper').style.display = 'block';
}