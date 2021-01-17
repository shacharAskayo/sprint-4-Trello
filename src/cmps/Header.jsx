import { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RoomIcon from '@material-ui/icons/Room';
import { MenuMapShow } from './menu/menuFirstSee/MenuMapShow';

class _Header extends Component {
    state = { isMapOpen: false }
    toggleMap = () => { this.setState({ isMapOpen: !this.state.isMapOpen }) }
    render() {
        const { isMapOpen } = this.state
        return (
            <header className="main-header">
                <div className="icons-container">

                    <span className="apps-icon">
                        <AppsIcon />
                    </span>
                    <span className="apps-icon">
                        <Link to="/">
                            <DashboardIcon />
                        </Link>
                    </span>
                </div>

                <h3>Trello</h3>
                <div className="icons-container">
                    <span className="apps-icon" onClick={this.toggleMap}>
                        {/* <Link to="/map"></Link> */}
                        <RoomIcon />
                        {isMapOpen && <MenuMapShow />}
                    </span>
                    <span className="apps-icon">
                        <AddIcon />
                    </span>
                    <span className="apps-icon">
                        <AccountCircleIcon />
                    </span>
                </div>
            </header>
        )

    }


}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)