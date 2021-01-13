import { boardService } from '../../services/boardService.js'
import { httpService } from '../../services/httpService.js'


export function getBoardById(id) {
    return async dispatch => {
        try {
            const board = await boardService.getById(id)
            dispatch({ type: 'SET_BOARD', board })
                // socketService.on('board-update',updatedBoard=>{
                //   dispatch({ type: 'SET_BOARD', updatedBoard })
                // })
        } catch (err) {
            console.log(' err in loadBoard', err)
        }
    }
}

export function updateBoardCard(board, card) {
    return async dispatch => {
        const newBoard = boardService.updateBoardCard(board, card)
            //const newBoard = await httpService.put('board/' + board._id,boardService.updateBoardCard(board,card))
        dispatch({ type: 'SET_BOARD', board: newBoard })

    }
}