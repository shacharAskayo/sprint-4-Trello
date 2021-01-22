import { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions'

//icons:
import AppsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import InsertChartIcon from '@material-ui/icons/InsertChart';

//cmps:
import { MenuMapShow } from './menu/menuFirstSee/MenuMapShow';
import { UserMenuModal } from './UserMenuModal';
import { MyAvatar } from './MyAvatar';

class _Header extends Component {
    
    state = {
        isMapOpen: false,
        isUserModalOpen: false
    }


    toggleMap = () => { this.setState({ isMapOpen: !this.state.isMapOpen }) }

    closeModal = () => { this.setState({ isUserModalOpen: false }) }

    render() {
        const { isMapOpen, isUserModalOpen } = this.state
        const { board, loggedUser, logout } = this.props
        // console.log('user', createdBy, 'board', board);
        return (
            <header className="main-header flex space-bt">
                <div className="flex align-center">
                    <Link to="/"><AppsIcon /></Link>
                    <Link to="/"><HomeOutlinedIcon /></Link>
                    <span className="show-boards flex align-center"><InsertChartIcon style={{transform: 'rotate(180deg)'}}/> Boards</span>
                </div>

                <h2 className="app-logo">Fello</h2>

                <div className="flex align-center">
                    <Link to="/"><AddIcon /></Link>
                    <Link to="/dashboard"><DashboardIcon /></Link>
                    {loggedUser ? <div onClick={() => this.setState({ isUserModalOpen: true })}> <MyAvatar user={loggedUser} /></div>
                        :
                        <span onClick={() => this.setState({ isUserModalOpen: true })}> <AccountCircleIcon /></span>}
                    {isUserModalOpen && <UserMenuModal logout={logout} closeModal={this.closeModal} board={board} user={loggedUser} />}
                </div>
            </header>
        )

    }


}
const mapStateToProps = state => {
    return {
        loggedUser: state.userModule.loggedUser,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    logout
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)