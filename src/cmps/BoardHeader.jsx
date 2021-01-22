import { Component } from 'react'
import { connect } from 'react-redux'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {updateBoard} from '../store/actions/boardAction';


class _BoardHeader extends Component {

    state = {
        title: this.props.board.title
    }

    saveBoard = (boardToUpdate) =>  {
        const {board} = this.props
        updateBoard(board, boardToUpdate)
    }


    render() {
        const { openArchive, board, toggleMenu } = this.props
        const style = board.isPrivate ? {color:'white'} : {}
        if (!board) return
        return (
            <div className="board-header flex align-center space-bt" >
                <div className="flex">
                    <span className="flex align-center" style={style}>
                    <LockOutlinedIcon/>
                    Private
                    </span>
                    <input type="text" name="title" value={this.state.title} autoComplete="off" />
                </div>

                <div className="flex align center">
                    <span onClick={openArchive}><ArchiveOutlinedIcon /></span>
                    <button onClick={toggleMenu} className="flex align-center"><MoreHorizIcon />Show Menu</button>
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