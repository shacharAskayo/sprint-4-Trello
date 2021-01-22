import { userService } from '../../services/userService.js'

export function loggin(userToLogin) {
    return async dispatch => {
        try {
            const user = await userService.loggin(userToLogin)
            dispatch({ type: 'LOGIN', user })
            return user
        } catch (err) {
            console.log(err)
        }
    }
}

export function signup(userToSignup) {
    return async dispatch => {
        try {
            const user = await userService.signup(userToSignup)
            dispatch({ type: 'LOGIN', user })
        } catch (err) {
            console.log(err)
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            const user = await userService.logout()
            dispatch({ type: 'LOGOUT', user })
        } catch (err) {
            console.log(err)
        }
    }
}
