import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

//cmps:
import { Header } from './cmps/Header'
import { Home } from './pages/Home'
import { Board } from './pages/Board'
import { BoardList } from './cmps/BoardList.jsx'
import { socketService } from './services/socketService'
import { Dashboard } from './pages/Dashboard'

function _App(props) {

  socketService.setup()
  const style = props.board?.style

  console.log('the props',props)
  return (
    <div className="app" style={style}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/board/:boardId/:cardId?" component={Board} />
            <Route path="/board" component={BoardList} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="/signup" component={Signup} /> */}
            {/* <Route path="/login" component={Login} /> */}
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
