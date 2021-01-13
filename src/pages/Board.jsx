import { Component } from 'react'
import { GroupList } from "../cmps/GroupList"
import { BoardHeader } from "../cmps/BoardHeader"
import { connect } from 'react-redux'
import { Menu } from '../cmps/Menu.jsx'
import { getBoardById } from '../store/actions/boardAction'
import { Card } from '../cmps/Card'

class _Board extends Component {

  state = {
    isMenuClicked: false
  }
  componentDidMount() {
    const { boardId } = this.props.match.params
    this.props.getBoardById(boardId)
  }
  toggleMenu = (ev) => {
    ev.preventDefault()
    let isMenuClicked = this.state.isMenuClicked
    isMenuClicked = !isMenuClicked
    this.setState({ isMenuClicked })
  }
  render() {
    const { isMenuClicked } = this.state
    return (
      <div>
        <BoardHeader />
        <button onClick={this.toggleMenu}>Menu</button>
        <GroupList groups={this.props.board.groups} />
        <Card id={this.match?.params.cardId} />
        {isMenuClicked && <Menu />}
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    reviews: state.reviewModule.reviews,
    board: state.boardModule.board
  }
}
const mapDispatchToProps = {
  getBoardById,
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

