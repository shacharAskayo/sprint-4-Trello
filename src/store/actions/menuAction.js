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