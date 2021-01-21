import { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

//icons:
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RoomIcon from '@material-ui/icons/Room';
import InfoIcon from '@material-ui/icons/Info';

//cmps:
import { MenuMapShow } from './menu/menuFirstSee/MenuMapShow';
import { UserModalFromHeader } from './UserModalFromHeader';

class _Header extends Component {
    
    state = {
        isMapOpen: false,
        isUserModalOpen: false
    }


    toggleMap = () => { this.setState({ isMapOpen: !this.state.isMapOpen }) }

    closeModal = () => { this.setState({ isUserModalOpen: false }) }

    render() {
        const { isMapOpen, isUserModalOpen } = this.state
        const { board } = this.props
        const { createdBy } = board
        console.log('user', createdBy, 'board', board);
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

                    <div style={{fontWeight:'700',position:'absolute',left:'50%',transform:'translateX(-50%)',fontFamily:'serif'}}>
                        Trello
                    </div>

                <div className="icons-container">
                    <span className="apps-icon" onClick={this.toggleMap}>
                        <Link to="/map"></Link>
                        <RoomIcon />
                        {isMapOpen && <MenuMapShow />}
                    </span>

                    <span className="apps-icon">
                        <AddIcon />
                    </span>

                    <span className="apps-icon info" >
                        <Link to="/dashboard"><InfoIcon /></Link>
                    </span>


                    <span className="apps-icon" onClick={() => this.setState({ isUserModalOpen: true })}>
                        <AccountCircleIcon />
                    </span>

                    {isUserModalOpen && <UserModalFromHeader closeModal={this.closeModal} board={board} user={createdBy} />}
                </div>
                {/* <div className="login-signup">
                    <Link to="/login"> <button className="login"><span>Login</span></button></Link>
                    <Link to="/signup"><button className="signup"><span>Signup</span></button></Link>
                </div> */}
            </header>
        )

    }


}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)