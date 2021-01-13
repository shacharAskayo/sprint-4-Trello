import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'


import { Header } from './cmps/Header'
import {Home} from './pages/Home'
import {Board} from './pages/Board'

export function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/board/:cardId?" component={Board}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

