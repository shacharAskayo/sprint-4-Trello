import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

//cmps:
import { Home } from './pages/Home'
import { Board } from './pages/Board'
import { BoardList } from './cmps/BoardList.jsx'
import { MenuMapShow } from './cmps/menu/menuFirstSee/MenuMapShow.jsx'
import { BoardsPick } from './pages/BoardsPick.jsx'
import { AppHeader } from './cmps/AppHeader'

class _App extends Component {

  // componentDidMount() {
  //   const { boardId } = this.props.match.params
  //   if (!boardId) return null
  //   this.props.getBoardById(boardId)

  // }
  render() {
    if (!this.props.board) return null
    const { style } = this.props.board
    console.log('board in app', this.props.board);
    console.log(this.props.board.style);
    return (
      <div className="app" style={style}>
        <Router>
          <AppHeader />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/board/:boardId/:cardId?" component={Board} />
              <Route path="/map" component={MenuMapShow} />
              <Route path="/board" component={BoardsPick} />
              {/* <Route path="/board" component={BoardList} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    board: state.boardModule.board
  }
}
const mapDispatchToProps = {
}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
