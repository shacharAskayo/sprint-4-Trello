import { Component } from 'react'
//cmps:
import { GroupList } from "../cmps/GroupList"
import { connect } from 'react-redux'
import { Menu } from '../cmps/menu/Menu'
import { getBoardById, addGroup, updateGroupLoaction, updateCardLocation, cleanBoard } from '../store/actions/boardAction'
import { Card } from '../cmps/card/Card'
import { BoardHeader } from '../cmps/BoardHeader'
import { Archive } from '../cmps/Archive'


//functions:


class _Board extends Component {

  state = {
    isArchiveOpen: false,
    isMenuOpen: false,
  }


  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.props.getBoardById(boardId)

  }

  componentWillUnmount() {
    this.props.cleanBoard()
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

    if (!this.props.board) return null
    const { board, updateGroupLoaction, updateCardLocation, addGroup } = this.props
    const { groups } = board
    const { isArchiveOpen, isMenuOpen } = this.state
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
  cleanBoard
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

