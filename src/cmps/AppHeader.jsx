import { Component } from 'react'
import { Link } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home';


export class AppHeader extends Component {

    render() {
        const { startHere } = this.props

        return (
            <nav className="home-nav">
                <div className="nav-btns">
                    <button className="login-btn">Login</button>
                    <button className="signup-btn">Signup</button>
                    <Link to="/"><button className="go-back-home"><HomeIcon /></button></Link>
                </div>
                <h3>Trello</h3>
            </nav>
        )
    }
}