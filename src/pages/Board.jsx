import { Component } from 'react'
import { GroupList } from "../cmps/GroupList"
import { BoardHeader } from "../cmps/BoardHeader"
import { connect } from 'react-redux'
import { Menu } from '../cmps/Menu.jsx'
import { getBoardById,addGroup } from '../store/actions/boardAction'
import { Card } from '../cmps/Card'

class _Board extends Component {

  state = {
    isMenuClicked: false,

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
  closeMenu = () => {
    this.setState({ isMenuClicked: false })
  }
  render() {
    const { isMenuClicked } = this.state
    const { bgColor, bgImg } = this.props
    return (
      <div className="main-board" style={{ backgroundColor: bgColor, backgroundImage: bgImg }}>
        <BoardHeader />
        <button onClick={this.toggleMenu}>Menu</button>
        <GroupList groups={this.props.board.groups} board={this.props.board} addGroup={this.props.addGroup} />
        <button className="menu-btn" onClick={this.toggleMenu}>Menu</button>
        <Card id={this.match?.params.cardId} />
        {isMenuClicked && <Menu closeMenu={this.closeMenu} isMenuClicked={isMenuClicked} />}
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    reviews: state.reviewModule.reviews,
    board: state.boardModule.board,
    bgImg: state.boardModule.bgImg,
    bgColor: state.boardModule.bgColor
  }
}
const mapDispatchToProps = {
  getBoardById,
  addGroup
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

