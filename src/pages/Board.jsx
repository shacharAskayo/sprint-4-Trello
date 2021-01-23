import { Component } from 'react'
//cmps:
import { GroupList } from "../cmps/GroupList"
import { connect } from 'react-redux'
import { Menu } from '../cmps/menu/Menu'
import { getBoardById, addGroup, updateGroupLoaction, updateCardLocation, cleanBoard, updateBoard } from '../store/actions/boardAction'
import { Card } from '../cmps/card/Card'
import { BoardHeader } from '../cmps/BoardHeader'
import { Archive } from '../cmps/Archive'
import { Loading } from '../cmps/Loading'


//functions:


class _Board extends Component {

  state = {
    isArchiveOpen: false,
    isMenuOpen: false,
    isPermited: true
  }

  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.loadBoard(boardId)
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params
    if (prevProps.match.params.boardId !== boardId) this.loadBoard(boardId)
  }

  componentWillUnmount() {
    this.props.cleanBoard()
  }

  saveBoard = (boardToUpdate) => {
    const { board } = this.props
    this.props.updateBoard(board, boardToUpdate)
  }

  loadBoard = async (boardId) => {
    const board = await this.props.getBoardById(boardId)
    const loggedUser = this.props.loggedUser
    if (board.isPrivate) {
      const membersIds = board.members.map(user => user?._id)
      if (!membersIds.includes(loggedUser?._id)) this.setState({ isPermited: false })
    } else {
      this.setState({ isPermited: true })
      const newBoard = { ...board, members: [...board.members, loggedUser] }
      this.saveBoard(newBoard)
    }
  }








  openArchive = () => {
    const { isArchiveOpen } = this.state
    this.setState({ isArchiveOpen: !isArchiveOpen })
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state
    this.setState({ isMenuOpen: !isMenuOpen })
  }

  render() {
    const { isArchiveOpen, isMenuOpen, isPermited } = this.state
    const { board, updateGroupLoaction, updateCardLocation, addGroup } = this.props
    if (!board) return <Loading />
    if (!isPermited) return <div className="locked-board flex center"><h1><span>This board is locked!</span><br />You can not access it as you are not a member.</h1></div>
    const { groups } = board

    return (
      <div className="main-board" >
        <BoardHeader board={board} toggleMenu={this.toggleMenu} openArchive={this.openArchive} />
        <Menu isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} board={board} />
        {!isArchiveOpen && <GroupList groups={groups} updateCardLocation={updateCardLocation} updateGroupLoaction={updateGroupLoaction} board={board} addGroup={addGroup} />}
        {isArchiveOpen && <Archive board={board} />}
        <Card />

      </ div>
    )
  }
}



const mapStateToProps = state => {
  return {
    reviews: state.reviewModule.reviews,
    board: state.boardModule.board,
    loggedUser: state.boardModule.loggedUser,
    filterBy: state.boardModule.filterBy

  }
}
const mapDispatchToProps = {
  getBoardById,
  addGroup,
  updateGroupLoaction,
  updateCardLocation,
  cleanBoard,
  updateBoard
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

