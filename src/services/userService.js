import { httpService } from "./httpService"



const baseUrl = '/auth'

export const userService = {
    signup,
    loggin,
    logout,
    getUsers,
    getUser,
}

async function signup(userToAdd) {
    try {
        const user = await httpService.post(baseUrl + '/signup', userToAdd)
        if (user){
            localStorage.setItem('loggedUser', JSON.stringify(user))
        }
        return user
    } catch (err) {
        console.log(err)
    }
}

async function loggin(userToLog) {
    try {
        const user = await httpService.post(baseUrl + '/login', userToLog)
        userToLog.isStayLogged && localStorage.setItem('loggedUser', JSON.stringify(user))
        sessionStorage.setItem('loggedUser', JSON.stringify(user))
        return user
    } catch (err) {
        console.log(err)
    }
}

async function logout(){
    try{
        await httpService.post(baseUrl + '/logout')
        localStorage.removeItem('loggedUser')
        sessionStorage.removeItem('loggedUser')
    } catch(err) {
        console.log(err)
    }

}

async function getUsers(){
    try{
       const users =  await httpService.get('/user')
       return users
    } catch(err) {
        console.log(err)
    }
}

async function getUser(userId){
    try{
       const users =  await httpService.get('/user/' + userId)
       return users
    } catch(err) {
        console.log(err)
    }
}