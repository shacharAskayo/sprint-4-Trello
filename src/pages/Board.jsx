import { Component } from 'react'
//cmps:
import { GroupList } from "../cmps/GroupList"
import { Header } from '../cmps/Header'
import { BoardHeader } from "../cmps/BoardHeader"
import { connect } from 'react-redux'
import { Menu } from '../cmps/menu/Menu'
import { getBoardById, addGroup, updateGroupLoaction } from '../store/actions/boardAction'
import { Card } from '../cmps/card/Card'
// import {Dnd} from '../cmps/Dnd'


//functions:


class _Board extends Component {

  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.props.getBoardById(boardId)

  }

  render() {
    if (!this.props.board) return null

    const { board, updateGroupLoaction, addGroup, loggedUser } = this.props
    const { style, groups, } = board

    return (
      <div className="main-board" style={style} >
        <Header />
        <BoardHeader />
        <Menu board={board} loggedUser={loggedUser} />
        <GroupList groups={groups} updateGroupLoaction={updateGroupLoaction} board={board} addGroup={addGroup} />
        <Card />
      </ div>
    )
  }
}



const mapStateToProps = state => {
  return {
    reviews: state.reviewModule.reviews,
    board: state.boardModule.board,
    loggedUser: state.boardModule.loggedUser
  }
}
const mapDispatchToProps = {
  getBoardById,
  addGroup,
  updateGroupLoaction
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

