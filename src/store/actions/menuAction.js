import { boardService } from '../../services/boardService.js'
import { menuService } from '../../services/menuService.js'

export function setFilter(filterBy) {
    return (dispatch) => {
        const action = {
            type: 'FILTER_PHOTOS',
            filterBy
        }
        dispatch(action)
    }
}
export function saveBoardDesc(board, description) {
    return async dispatch => {
        try {
            const updatedBoard = await boardService.updateBoardDesc(board, description)
            dispatch({ type: 'SET_BOARD', board: updatedBoard })
        }
        catch (err) {
            console.log('boardActions: err:', err);
        }
    }
}
