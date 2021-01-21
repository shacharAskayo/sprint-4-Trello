// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'
const SCORE_FOR_REVIEW = 10
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg"
}

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    increaseScore,
    getUser,
    getUserActivities,
    getUserCards
}
function getUser() {
    console.log('user', user);
    return Promise.resolve(user)
}


//NOT FROM NOW:  !!!
window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})

function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function getById(userId) {
    // return storageService.get('user', userId)
    return httpService.get(`user/${userId}`)
}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // return storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

async function increaseScore(by = SCORE_FOR_REVIEW) {
    const user = getLoggedinUser()
    user.score = user.score + by || by
    await update(user)
    return user.score
}

async function login(userCred) {
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // return _handleLogin(user)

    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}

function getUserActivities(board, user) {
    const userActivities = []
    board.activities.forEach(activity => (activity.createdBy === user) ? userActivities.push(...activity) : userActivities.push(''))
    console.log('userActivities:', userActivities);
    // return userActivities
    return [...board.activities] //for now the user has no activities so i returned all the board's activities
}
function getUserCards(board, user) {
    const userCards = []
    board.groups.forEach(group => group.cards.forEach(card => {
        if (card.createdBy === user) userCards.push(card)
    }))
    console.log('userCards:', userCards);
    // return userCards
    console.log(board.groups[0].cards[0]);
    return board.groups[0].cards[0]
}



