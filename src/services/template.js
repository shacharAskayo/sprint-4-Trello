const templates = require('../Templates/templates.json')


export const templateService = {
    query,

}

function query(){
    return templates.boards
}