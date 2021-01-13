
const {board} = require('../data/db.json')
console.log(board);

var gBoard = [board]

export const boardService = {
    query,
    getById
}


function  query() {
    return Promise.resolve(gBoard)

  }
  function getById(id){
      const currBoard=gBoard.find(board=>board._id===id)
      return Promise.resolve(currBoard)
      
  }
  

