import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

//cmps:
import { Home } from './pages/Home'
import { Board } from './pages/Board'
import { BoardList } from './cmps/BoardList.jsx'

import { Header } from './cmps/Header'

function _App(props) {

  const style = props.board?.style

  return (
    <div className="app" style={style}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/board/:boardId/:cardId?" component={Board} />
            <Route path="/board" component={BoardList} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    board: state.boardModule.board
  }
}
const mapDispatchToProps = {
}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
