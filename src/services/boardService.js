import {utilService} from './utilService'
import {httpService} from './httpService'


// const { board } = require('../data/db.json')
var db  = require('../db.json')
const {board}=db

var gBoards = [board]
export const boardService = {
    query,
    getById,
    addCard,
    addGroup
}

test()
function test(){
   httpService.get('/board')
    .then(res =>{
        console.log('dasjhdaskjdvasjkdvasj,',res)
    })
}



function query() {
    const board =httpService.get('/board')
    return board
}

function getById(id) {
    const currBoard = gBoards.find(board => board._id === id)
    const copy =JSON.parse(JSON.stringify(currBoard)) 
    // return Promise.resolve(copy)
    return Promise.resolve(currBoard)

}
function addCard(boardId, groupId, card) {
    var copy = JSON.parse(JSON.stringify(gBoards))
    var newCard = { ...card, id: utilService.makeId() }
    const boardIdx = gBoards.findIndex(board => board._id === boardId)
    const groupIdx = copy[boardIdx].groups.findIndex(group => group.id === groupId)
    copy[boardIdx].groups[groupIdx].cards.push(newCard)
    gBoards=copy
    return gBoards[boardIdx]
}



async function addGroup(boardId,group){
    try{
        const currBoard = await getById(boardId)
        // const copy = JSON.parse(JSON.stringify(currBoard))
        const newGroup = {...group,id:utilService.makeId()}
        currBoard.groups.push(newGroup)
        return Promise.resolve(currBoard)
    }
    catch(err){
        console.log('err in service:',err);
    }
}
