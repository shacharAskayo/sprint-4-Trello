import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'


import { Header } from './cmps/Header'
import {Home} from './pages/Home'
import {BoardApp} from './pages/BoardApp'

export function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/board/:boardId/:cardId?" component={BoardApp}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

