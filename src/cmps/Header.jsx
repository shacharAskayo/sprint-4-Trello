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
import { UserBoardsModal } from './UserBoardsModal';

class _Header extends Component {
    
    state = {
        isUserModalOpen: false,
        isBoardsModalOpen: false
    }

    toggleMemberModal = () => { 
        const {isUserModalOpen} = this.state
        this.setState({ isUserModalOpen: !isUserModalOpen }) 
    }
    toggleBoardsModal = () => { 
        const {isBoardsModalOpen} = this.state
        this.setState({ isBoardsModalOpen: !isBoardsModalOpen }) 
    }

    render() {
        const { isUserModalOpen, isBoardsModalOpen } = this.state
        const { board, boards, loggedUser, logout, style } = this.props
        // console.log('user', createdBy, 'board', board);
        return (
            <header style={style} className="main-header flex space-bt">
                <div className="flex align-center">
                    <Link to="/"><AppsIcon /></Link>
                    <Link to="/"><HomeOutlinedIcon /></Link>
                    <span onClick={this.toggleBoardsModal} className="show-boards flex align-center"><InsertChartIcon style={{transform: 'rotate(180deg)'}}/> Boards</span>
                </div>

                <h2 className="app-logo">Fello</h2>

                <div className="flex align-center">
                    <Link to="/board"><AddIcon /></Link>
                    <Link to="/dashboard"><DashboardIcon /></Link>
                    {loggedUser ? <div onClick={this.toggleMemberModal}> <MyAvatar user={loggedUser} /></div>
                        :
                        <span onClick={this.toggleMemberModal}> <AccountCircleIcon /></span>}
                    {isUserModalOpen && <UserMenuModal logout={logout} closeModal={this.toggleMemberModal} board={board} user={loggedUser} />}
                    {isBoardsModalOpen && <UserBoardsModal logout={logout} closeModal={this.toggleBoardsModal} boards={boards} user={loggedUser}/>}
                </div>
            </header>
        )

    }


}
const mapStateToProps = state => {
    return {
        loggedUser: state.userModule.loggedUser,
        board: state.boardModule.board,
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    logout
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)