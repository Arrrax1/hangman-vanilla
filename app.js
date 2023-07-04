let correctWord = ''

populateTable()

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