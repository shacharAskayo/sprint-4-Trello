const templates = require('../templates/templates.json')


export const templateService = {
    query,

}

function query(){
    return templates.boards
}