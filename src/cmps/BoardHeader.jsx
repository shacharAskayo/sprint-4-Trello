import { Component } from 'react'
import { connect } from 'react-redux'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { updateBoard } from '../store/actions/boardAction';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { MyAvatar } from './MyAvatar';
import { AddMembersModal } from './AddMembersModal';

class _BoardHeader extends Component {

    state = {
        title: '',
        isAddModalOpen: false
    }

    componentDidMount() {
        const { title } = this.props.board
        this.setState({ title })
    }

    onChangeTitle = () => {
        const { title } = this.state
        const { board } = this.props
        const newBoard = { ...board, title }
        this.saveBoard(newBoard)
    }

    saveBoard = (boardToUpdate) => {
        const { board } = this.props
        this.props.updateBoard(board, boardToUpdate)
    }

    handleChange = (ev) => {
        const { name, value } = ev.target
        this.setState({ [name]: value })
    }

    togglePrivate = () => {
        const { board } = this.props
        const newBoard = { ...board, isPrivate: !board.isPrivate }
        this.saveBoard(newBoard)
    }

    toggleAddModal = (ev) => {
        this.setState({ isAddModalOpen: !this.state.isAddModalOpen })
    }

    render() {
        const { openArchive, board, toggleMenu } = this.props
        const style = board.isPrivate ? { backgroundColor: 'rgb(152 255 155 / 42%)' } : {}
        const { isAddModalOpen } = this.state
        if (!board) return
        console.log(board);
        console.log(board.members?.length);
        return (
            <div className="board-header flex align-center space-bt" >
                <div className="flex">
                    <span onClick={this.togglePrivate} className="flex align-center" style={style}>
                        <LockOutlinedIcon />
                    Private
                    </span>
                    <div onClick={this.toggleAddModal} className="members flex">
                        {board.members?.map((user, idx) => <MyAvatar style={{ left: `${-4 * idx}px` }} user={user} />)}
                        <MyAvatar user={{ fullname: '+' }} style={{ left: `${-4 * board.members?.length}px` }} />
                    </div>
                    {isAddModalOpen && <AddMembersModal closeModal={this.toggleAddModal}/>}
                    <input onChange={this.handleChange} on onBlur={this.onChangeTitle} type="text" name="title" value={this.state.title} autoComplete="off" />
                </div>

                <div className="flex align center">
                    <span onClick={openArchive}><ArchiveOutlinedIcon /></span>
                    <button onClick={toggleMenu} className="menu-btn flex align-center"><MoreHorizIcon />Show Menu</button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
        boards: state.boardModule.boards,
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)