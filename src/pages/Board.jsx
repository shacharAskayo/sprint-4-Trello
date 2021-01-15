import { Component } from 'react'
import { connect } from 'react-redux'

//cmps:
import { GroupList } from "../cmps/GroupList"
import { Header } from '../cmps/Header'
import { BoardHeader } from "../cmps/BoardHeader"
import { Card } from '../cmps/card/Card'


//functions:
import { getBoardById, addGroup } from '../store/actions/boardAction'


class _Board extends Component {


  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.props.getBoardById(boardId)

  }
  //   componentDidUpdate(prevProps) {
  //     if (prevProps.board._id !== this.props.board._id) this.props.getBoardById(board._id)

  // }


  render() {

    if (!this.props.board) return null
    const { style } = this.props.board
    console.log('board in board:', this.props.board);
    return (
      <div className="main-board" style={style} >
        <Header />
        <BoardHeader />
        <GroupList groups={this.props.board.groups} board={this.props.board} addGroup={this.props.addGroup} />
        <Card id={this.match?.params.cardId} />

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

