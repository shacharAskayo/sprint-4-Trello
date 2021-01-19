import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    signup
} from '../store/actions/userActions'
class _Signup extends Component {
    state = {
        msg: '',
        signupCred: {
            username: '',
            password: '',
            fullname: ''
        }
    }
    signupHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }))
    }


    doSignup = async ev => {
        ev.preventDefault()
        const { username, password, fullname } = this.state.signupCred
        if (!username || !password || !fullname) {
            return this.setState({ msg: 'All inputs are required' })
        }
        const signupCreds = { username, password, fullname }
        this.props.signup(signupCreds)
        this.setState({ signupCred: { username: '', password: '', fullname: '' } })
        this.props.history.push('/board')
    }
    render() {
        const { loggedInUser } = this.props

        let signupSection = (
            <form className="frm" onSubmit={this.doSignup}>
                <h2>Signup</h2>
                <input className="input-log" autoFocus
                    type="text"
                    name="fullname"
                    value={this.state.signupCred.fullname}
                    onChange={this.signupHandleChange}
                    placeholder="Full name"
                    autoComplete="fullname"
                />
                <input className="input-log"
                    name="password"
                    type="password"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <input className="input-log"
                    type="text"
                    name="username"
                    value={this.state.signupCred.username}
                    onChange={this.signupHandleChange}
                    placeholder="Username"
                    autoComplete="username"
                />
                <br />
                <button>Signup</button>
            </form>
        )
        return (
            <div className="signup">
                {!loggedInUser && signupSection}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    signup
}
export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)