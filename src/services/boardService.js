
// var board = require('../JSON/data.json')

export const boardService = {
    query
}

var board =[1,2,3]

function  query() {
    console.log('here at query')
    return Promise.resolve(board)

  }
  