import { Component } from 'react'
import { connect } from 'react-redux'

//cmps:
import { GroupList } from "../cmps/GroupList"
import { Header } from '../cmps/Header'
import { BoardHeader } from "../cmps/BoardHeader"
import { Card } from '../cmps/card/Card'


//functions:
import { getBoardById, addGroup } from '../store/actions/boardAction'
import { Menu } from '../cmps/menu/Menu'


class _Board extends Component {

  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.props.getBoardById(boardId)

  }

  render() {
    if (!this.props.board) return null

    const {board} = this.props
    const { style, groups, } = board

    return (
      <div className="main-board" style={style} >
        <Header />
        <BoardHeader/>
        <Menu board={board}/>
        <GroupList groups={groups} board={board} addGroup={this.props.addGroup} />
        <Card/>
      </ div>
    )
  }
}



const mapStateToProps = state => {
  return {
    reviews: state.reviewModule.reviews,
    board: state.boardModule.board,
  }
}
const mapDispatchToProps = {
  getBoardById,
  addGroup
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

