// var board = require('../JSON/data.json')
var currBoard = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    "style": { "backgroundImage": "url(someimg.jpg)" },
    "isPrivate": false,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "lables": [{ "id": "l101", "title": "important", "color": "#fffff" }],
    "members": [{
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u102",
            "fullname": "ron ohana",
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [{
        "id": "g101",
        "title": "Group 1",
        "style": { "backgroundColor": "#fgfgfg" },
        "cards": [{
                "id": "c101",
                "title": "Help me",
                "description": "description",
                "createdAt": 1590999730348,
                "dueDate": 16156215211,
                "style": { "backgroundColor": "#ffffff" },
                "comments": [{
                    "id": "ZdPnm",
                    "txt": "a comment",
                    "createdAt": 1590999817436.0,
                    "createdBy": {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    }
                }],
                "checklists": [{
                    "id": "YEhmF",
                    "title": "Checklist",
                    "createdAt": 1590999817436.0,
                    "createdBy": {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "todos": [{
                        "title": "To Do 1",
                        "isDone": false,
                        "id": "212jX"
                    }]
                }],
                "links": [{ "id": "lk101", "title": "some attachment", "url": "https://areawsomesite" }],
                "members": [{
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "https://www.google.com"
                    },
                    {
                        "_id": "u102",
                        "fullname": "ron ohana",
                        "imgUrl": "https://www.google.com"
                    }
                ],
                "labels": ["l101", "l102"],
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            },
            {
                "id": "c102",
                "title": "Help me",
                "description": "description",
                "createdAt": 1590999730348,
                "dueDate": 16156215211,
                "style": {
                    "backgroundColor": "#26de81"
                },
                "comments": [{
                        "id": "ZdPnm",
                        "txt": "a comment",
                        "createdAt": 1590999817436.0,
                        "createdBy": {
                            "_id": "u101",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    }

                ],
                "checklists": [{
                    "id": "YEhmF",
                    "title": "Checklist",
                    "createdAt": 1590999817436.0,
                    "createdBy": {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "todos": [{
                        "title": "To Do 1",
                        "isDone": false,
                        "id": "212jX"
                    }]
                }],
                "members": [{
                    "_id": "u101",
                    "username": "Tal",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }],
                "labels": [{
                    "id": "101",
                    "title": "done",
                    "color": "#61bd4f"
                }],
                "createdBy": {
                    "_id": "u101",
                    "username": "Tal",
                    "fullname": "Tal Tarablus",
                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                }
            }
        ]
    }],
    "activities": [{
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "card": {
            "id": "c101",
            "title": "Replace Logo"
        }
    }]
}

export const boardService = {
    query
}


function query() {
    console.log('here at query')
    return Promise.resolve(board)

}