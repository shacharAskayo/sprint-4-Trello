import { Component } from 'react'
import { GroupList } from "../cmps/GroupList"
import { BoardHeader } from "../cmps/BoardHeader"
import { connect } from 'react-redux'
import { loadBoard } from '../store/actions/boardAction'
import { Menu } from '../cmps/Menu.jsx'

class _BoardApp extends Component {

  state = {
    isMenuClicked: false
  }

  componentDidMount() {
    this.props.loadBoard()
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
        <GroupList />
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
  loadBoard,
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
