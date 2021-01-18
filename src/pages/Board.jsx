import { Component } from 'react'
//cmps:
import { GroupList } from "../cmps/GroupList"
import { connect } from 'react-redux'
import { Menu } from '../cmps/menu/Menu'
import { getBoardById, addGroup, updateGroupLoaction, updateCardLocation } from '../store/actions/boardAction'
import { Card } from '../cmps/card/Card'
import { BoardHeader } from '../cmps/BoardHeader'


//functions:


class _Board extends Component {

  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.props.getBoardById(boardId)

  }
 
  render() {
    if (!this.props.board) return null

    const { board, updateGroupLoaction, updateCardLocation, addGroup } = this.props
    const { groups } = board

    return (
      <div className="main-board" >
        <BoardHeader />
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

