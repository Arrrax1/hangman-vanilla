let current_row_index = 0
let current_col_index = 0
let correctWord = 'tests'

populateTable()

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

    if (key.length == 1 && key.match(/[a-z]{1}|[A-Z]{1}/) && current_col_index < 5) {
        current_row.children[current_col_index].animate({ scale: "1.2" }, { duration: 100 })
        current_row.children[current_col_index].firstChild.textContent = key;
        current_col_index++;
    }
    else if (key.match('Enter') && current_col_index == 5) {
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
    else if ((key.match('Backspace') || key.match('Delete')) && current_col_index > 0) {
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

// Loop with Delay
function setAnimationTimeout(row, my_word, correctWord, i) {
    if (i < 5) {
        setTimeout(() => {
            if (row.children[i].firstChild.textContent.toUpperCase() == correctWord[i].toUpperCase()) {
                row.children[i].classList.add('correct')
                console.log("first")
            } else if (correctWord.toUpperCase().match(row.children[i].firstChild.textContent.toUpperCase())) {
                row.children[i].classList.add('almost')
            } else {
                row.children[i].classList.add('wrong')
            }
            setAnimationTimeout(row, my_word, correctWord, i + 1)
        }, 700);
    }
    // check if the entire word is correct
    if (i == 5) {
        if (correctWord.toUpperCase() == my_word.toUpperCase()) {
            // if the entire word matches then animate all letters
            setTimeout(() => {
                correctAnswerAnimation(row, 0)
            }, 400);
        }
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
}


// TODO: Add boolean check, inPlay=false if clicked enter and if the answer is correct
// inPlay=true after clicked enter and checked validity and the answer is wrong or new game
// TODO: check if word in dictionary