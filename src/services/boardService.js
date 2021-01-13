const { board } = require('../data/db.json')


var gBoards = [board]

export const boardService = {
    query,
    getById,
    selectImg,
    selectColor
}


function query() {
    console.log('query');
    var boards = gBoards
    return Promise.resolve(boards)
}

function getById(id) {
    const currBoard = gBoards.find(board => board._id === id)
    return Promise.resolve(currBoard)

}
function selectImg(imgSrc) {
    return imgSrc
}
function selectColor(color) {
    return color
}
