import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

//cmps:
import { Header } from './cmps/Header'
import { Home } from './pages/Home'
import { Board } from './pages/Board'
import { BoardList } from './cmps/BoardList.jsx'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

import { loadBoards } from './store/actions/boardAction.js'
import { signup, loggin } from './store/actions/userActions.js'

function _App(props) {
  const {isLoged,loggedUser, signup, board, loadBoards} = props
  loadBoards()
  const style = board?.style 
  if(!isLoged) {
    signup(loggedUser)  
  } else loggin(loggedUser)

  return (
    <div className="app" style={style}>
      <Router>
          <Header style={style ? {} : {backgroundColor: '#026aa7'} }/>
          <Switch>
            <Route path="/board/:boardId/:cardId?" component={Board} />
            <Route path="/board" component={BoardList} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
    loggedUser: state.userModule.loggedUser,
    isLoged: state.userModule.isLoged,
  }
}
const mapDispatchToProps = {
  signup,
  loggin,
  loadBoards

}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
