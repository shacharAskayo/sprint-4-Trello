import { Component } from 'react'
//cmps:
import { GroupList } from "../cmps/GroupList"
import { Header } from '../cmps/Header'
import { connect } from 'react-redux'
import { Menu } from '../cmps/menu/Menu'
import { getBoardById, addGroup, updateGroupLoaction, updateCardLocation } from '../store/actions/boardAction'
import { Card } from '../cmps/card/Card'
import { boardService } from '../services/boardService'
// import {Dnd} from '../cmps/Dnd'


//functions:


class _Board extends Component {

  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.props.getBoardById(boardId)

  }
  // get groups() {
  //   const { groups } = this.props.board
  //   const { filterBy } = this.props
  //   const groupsForDisplay = boardService.getGroupsForDisplay(groups, filterBy)
  //   return groupsForDisplay
  // }
  render() {
    if (!this.props.board) return null

    const { board, updateGroupLoaction, updateCardLocation, addGroup } = this.props
    const { groups } = board

    return (
      <div className="main-board"  >
        <Header />
        <Menu board={board} />
        <GroupList groups={groups} updateCardLocation={updateCardLocation} updateGroupLoaction={updateGroupLoaction} board={board} addGroup={addGroup} />
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
  updateCardLocation
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

