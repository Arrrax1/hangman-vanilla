let current_row_index = 0
let current_col_index = 0
let correctWord = 'tests'
let inPlay = false

populateTable()
populateKeyboard()
eventListenerKeys()

document.addEventListener('keydown', (event) => {
    input(event.key)
})



async function populateTable() {
    // try {
    //     const response = await fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en');
    //     const result = await response.text();
    //     correctWord = result.split('"')[1];
    //     correctWord = correctWord.toUpperCase();
    //     console.log(correctWord);
    // } catch (error) {
    //     console.error(error);
    // }
    for (let i = 0; i < 6; i++) {
        let line = document.createElement('div')
        line.classList.add('letter-Box-container')
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement('div')
            tile.classList.add('letter-Box')
            let content_tile = document.createElement('p')
            content_tile.classList.add('content-tile')
            tile.append(content_tile)
            line.append(tile)
        }
        document.getElementById('rootGrid').append(line)
    }
}

// Function for Entering values
function input(param) {
    let key = param                //Letters Key Value

    let current_row = document.querySelectorAll('.letter-Box-container')[current_row_index]

    if (key.length == 1 && key.match(/[a-z]{1}|[A-Z]{1}/) && current_col_index < 5 && inPlay) {
        current_row.children[current_col_index].animate({ scale: "1.2" }, { duration: 100 })
        current_row.children[current_col_index].firstChild.textContent = key;
        current_col_index++;
    }
    else if (key.match('Enter') && current_col_index == 5 && inPlay) {
        inPlay = false //can't input keys until  it's set back to true
        console.log("answer submitted")
        let my_word = []
        for (let i = 0; i < 5; i++) {
            my_word.push(current_row.children[i].firstChild.textContent)
        }
        my_word = my_word.join('').toUpperCase()
        console.log(my_word)
        checkAnswer(my_word, current_row)
        current_row_index++
        current_col_index = 0;
    }
    else if ((key.match('Backspace') || key.match('Delete')) && current_col_index > 0 && inPlay) {
        current_row.children[current_col_index - 1].animate({ scale: "1.05" }, { duration: 100 })
        current_row.children[current_col_index - 1].firstChild.textContent = '';
        current_col_index--;
    }
}

//Func to check answer
// Checks answer on Enter press 
function checkAnswer(my_word, row) {
    // idk why I called a function just to call another function inside 
    setAnimationTimeout(row, my_word, correctWord, 0)
}
let correctL = []
let almostL = []
let wrongL = []
// Loop with Delay
function setAnimationTimeout(row, my_word, correctWord, i) {
    if (i < 5) {
        setTimeout(() => {
            if (row.children[i].firstChild.textContent.toUpperCase() == correctWord[i].toUpperCase()) {
                row.children[i].classList.add('correct')
                correctL.push(row.children[i].firstChild.textContent)
            } else if (correctWord.toUpperCase().match(row.children[i].firstChild.textContent.toUpperCase())) {
                row.children[i].classList.add('almost')
                almostL.push(row.children[i].firstChild.textContent)
            } else {
                row.children[i].classList.add('wrong')
                wrongL.push(row.children[i].firstChild.textContent)
            }
            setAnimationTimeout(row, my_word, correctWord, i + 1)
        }, 700);
    }
    // check if the entire word is correct
    if (i == 5) {
        if (correctWord.toUpperCase() == my_word.toUpperCase()) {
            inPlay = false
            // if the entire word matches then animate all letters
            setTimeout(() => {
                correctAnswerAnimation(row, 0)
            }, 400);
        } else {
            inPlay = true
            // draw a partition of the hangman
            hangAnimate(current_row_index)
        }
        // written with a timeout so it waits for the last letter to finish animation
        setTimeout(() => {
            styleKeys(correctL, almostL, wrongL)
        }, 700);
    }
}

function correctAnswerAnimation(row, i) {
    // recursion again to animate all letters
    if (i < 5) {
        setTimeout(() => {
            row.children[i].animate({ scale: "1.3" }, { duration: 200, easing: "ease" })
            correctAnswerAnimation(row, i + 1)
        }, 100);
    }
    if (i == 5) saveAnimate()
}

// Create Keyboard
function populateKeyboard() {
    let keyboard = document.getElementById("keyboard")
    let keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete'];

    for (let i = 0; i < 3; i++) {
        let row = document.createElement("div")
        row.classList.add('keyboard-row')
        let x = 0
        i == 0 ? x = 10 : x = 9
        for (let j = 0; j < x; j++) {
            let key = document.createElement("div")
            key.textContent = keys.shift()
            key.classList.add('keyboard-key')
            row.append(key)
        }
        keyboard.append(row)
    }
    inPlay = true
}

// Virtual Keyboard Keys
function eventListenerKeys() {
    document.querySelectorAll('.keyboard-key').forEach(element => {
        element.addEventListener('click', () => {
            input(element.textContent)
        })
    });
}

function styleKeys(correctLetters, almostLetters, wrongLetters) {
    document.querySelectorAll('.keyboard-key').forEach(element => {
        let key = element.textContent
        let currentColor = getComputedStyle(element).backgroundColor
        if (wrongL.includes(key)) {
            element.style.backgroundColor = '#252525'
            element.style.color = 'white'
        }
        if (almostL.includes(key) && currentColor == 'rgb(245, 245, 245)') {
            element.style.backgroundColor = '#b59f3b'
            element.style.color = 'white'
        }
        if (correctL.includes(key)) {
            element.style.backgroundColor = '#538d4e'
            element.style.color = 'white'
        }
    });
    correctL = []
    almostL = []
    wrongL = []
}


// Hangin Man Animation
function hangAnimate(part) {
    switch (part) {
        case 1:
            document.querySelector('.base').style.opacity = 1
            break;
        case 2:
            document.querySelector('.pole').style.opacity = 1
            break;
        case 3:
            document.querySelector('.rope').style.opacity = 1
            break;
        case 4:
            document.querySelector('.chair').style.opacity = 1
            break;
        case 5:
            document.querySelector('.man').style.opacity = 1
            document.querySelector('#stickman').src = 'dead.svg'
            break;
        case 6:
            document.querySelector('.chair').style.opacity = 0
            document.querySelector('#stickman').classList.add('deadMan')
            setTimeout(() => {
                document.querySelector('body').style.transform = 'rotate(2deg)'
            }, 70);
            setTimeout(() => {
                document.querySelector('body').style.transform = 'rotate(-2deg)'
            }, 140);
            setTimeout(() => {
                document.querySelector('body').style.transform = 'rotate(2deg)'
            }, 210);
            setTimeout(() => {
                document.querySelector('body').style.transform = 'rotate(0deg)'
            }, 280);
            document.querySelector('.gameOverContainer').style.display = 'grid'
            document.querySelector('#message').textContent = "You lost!, the word was '" + correctWord.toUpperCase() + "!'💀"
            break;

        default:
            console.log('error')
            break;
    }
}

function saveAnimate() {
    document.querySelector('.base').style.opacity = 1
    document.querySelector('.pole').style.opacity = 1
    document.querySelector('.rope').style.opacity = 0
    document.querySelector('.chair').style.opacity = 1
    document.querySelector('.man').style.opacity = 1
    document.querySelector('#stickman').src = 'saved.svg'
    document.querySelector('#stickman').classList.add('savedMan')
    document.querySelector('.gameOverContainer').style.display = 'grid'
    document.querySelector('#message').textContent = "You won!, the word was '" + correctWord.toUpperCase() + "!'🎉"
}

document.getElementById('startAgain').addEventListener('click', async () => {
    document.getElementById('loading').style.display = 'grid'
    // document.querySelector('.gameOverContainer').style.display = 'none'
    inPlay = false
    //hide all animations    
    document.querySelector('.base').style.opacity = 0
    document.querySelector('.pole').style.opacity = 0
    document.querySelector('.rope').style.opacity = 0
    document.querySelector('.chair').style.opacity = 0
    document.querySelector('.man').style.opacity = 0
    document.querySelector('#stickman').classList.remove('deadMan')
    document.querySelector('#stickman').classList.remove('savedMan')
    // set All to 0
    current_row_index = 0
    current_col_index = 0
    // Destroy then Recreate
    document.querySelector('#rootGrid').innerHTML = ''
    document.querySelector('#keyboard').innerHTML = ''
    setTimeout(() => {
        populateTable()
        populateKeyboard()
        eventListenerKeys()
        document.getElementById('loading').style.display = 'none'
    }, 3000);
})

document.getElementById('closeEndgame').addEventListener('click', () => {
    document.querySelector('.gameOverContainer').style.display = 'none'
})

// TODO: Add boolean check, inPlay=false if clicked enter and if the answer is correct ----ADDED
// inPlay=true after clicked enter and checked validity and the answer is wrong or new game ----ADDED
// TODO: check if word in dictionary

// ADD GameOver/WinnerScreen
// you Lost, the word was " "/ You Won, the word was " "/ --Close--
// unComment new Word API

// while (true) {
//     switch (inPlay) {
//         case false:
//             document.getElementById('startAgain').disabled = true;
//             break;

//         case true:
//             document.getElementById('startAgain').disabled = false;
//             break;
//         default:
//             break;
//     }
// }