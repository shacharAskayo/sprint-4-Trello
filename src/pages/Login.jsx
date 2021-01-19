import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  loadUsers,
  removeUser,
  login,
  logout,
} from '../store/actions/userActions'

class _Login extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }



  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } })
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
    this.props.history.push('/board')
  }


  removeUser = userId => {
    this.props.removeUser(userId)
  }
  render() {

    const { loggedInUser } = this.props
    let loginSection = (
      <form className="frm" onSubmit={this.doLogin}>
        <h2>Login</h2>
        {/* <select
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
        >
          <option value="">Select User</option>
          {this.props.users && this.props.users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
        </select> */}

        <input className="input-log" autoFocus
          type="text"
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          placeholder="Username"
        />
        <br />
        <input className="input-log"
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
    )


    return (
      <div className="login">
        <p>{this.state.msg}</p>
        {loggedInUser && (
          <div>
            <h3>
              Welcome {loggedInUser.fullname}
              <button onClick={this.props.logout}>Logout</button>
            </h3>
            <Link to="/board">Get In</Link>   |
            <Link to={`user/${loggedInUser._id}`}>
              {loggedInUser.fullname}'s Details
            </Link>
          </div>
        )}
        {!loggedInUser && loginSection}


        <hr />
        {/* <section className="admin">
          <details>
            <summary>Admin</summary>
            <button onClick={this.props.loadUsers}>Refresh Users</button>
            {this.props.isLoading && 'Loading...'}
            {this.props.users && <ul>

              {this.props.users.map(user => (
                <li key={user._id}>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                  <button
                    onClick={() => {
                      this.removeUser(user._id)
                    }}
                  >
                    Remove {user.username}
                  </button>
                </li>
              ))}
            </ul>}
          </details>
        </section> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  login,
  logout,
  removeUser,
  loadUsers
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)