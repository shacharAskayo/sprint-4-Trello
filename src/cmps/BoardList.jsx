import { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoards,addBoard } from '../store/actions/boardAction.js'
import { BoardPreview } from './BoardPreview'
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { BoardsPick } from '../pages/BoardsPick'
import { HomePickModal } from './HomePickModal'
import { Link } from 'react-router-dom';

class _BoardList extends Component {

    state = {
        userBoards: [],
        isModalOpen: false
    }

    componentDidMount() {
        this.props.loadBoards()
        const { boards, loggedUser } = this.props
        if(boards&&loggedUser){
            const userBoards = boards.filter(board => board.createdBy?._id === loggedUser?._id)
            this.setState({ userBoards })
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const { boards, loggedUser } = this.props
            console.log('boards!!!!!', boards);
            const userBoards = boards.filter(board => board.createdBy?._id === loggedUser?._id)
            this.setState({ userBoards })
        }
    }

    closeModal=(ev)=>{
            ev.stopPropagation()
            ev.preventDefault()
            this.setState({ isModalOpen: false })
    }

    openModal=(ev)=>{
        ev.preventDefault()
        ev.stopPropagation()
         this.setState({ isModalOpen: true })
    }

    openTemplates=()=>{

    }

    render() {
        const { boards, loggedUser,addBoard } = this.props
        const { userBoards, isModalOpen } = this.state
        if (!boards) return null
        if (!userBoards) return null
        return (
            <div className='home-container' onClick={this.closeModal}>
                {/* <BoardsPick/> */}

                <aside>

                    <div  className='aside-btn'>
                        <span> <DashboardIcon /></span>
                        <span>Boards </span>
                    </div>

                    <div onClick={this.openTemplates} className='aside-btn'>
                        <span><FileCopyIcon /></span>
                        <span>Templates </span>
                    </div>

                </aside>

                <div className="boards-list">


                    <span>My Boards</span>
                    <div  className='flex wrap'>
                        {userBoards.map(board => <Link to={`/board/${board._id}`}>  <div className='board-preview' style={{ color: 'white', ...board.style}} >{board.title || 'No Title...'}</div> </Link>)}
                        <div className='board-preview' onClick={this.openBoardModal} onClick={ this.openModal} > Add New Board... </div>

                    </div>


                    <span>All Boards</span>
                    <div className='flex wrap' >
                        {boards.map(board => <Link to={`/board/${board._id}`}> <div className='board-preview' style={{ color: 'white',  ...board.style }} >{board.title || 'No Title...'}</div> </Link>)}

                        <div className='board-preview' onClick={this.openBoardModal} onClick={ this.openModal} > Add New Board... </div>
                    </div>


                </div>

                {isModalOpen && <HomePickModal loggedUser={loggedUser} addBoard={addBoard} />}

            </div>


        )
    }
}





const mapStateToProps = (state) => {
    return {
        boards: state.boardModule.boards,
        loggedUser: state.userModule.loggedUser
    }
}
const mapDispatchToProps = {
    loadBoards,
    addBoard
}
export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)