import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Board } from './pages/Board'
import { BoardList } from './cmps/BoardList.jsx'

export function App() {
  return (
    <div className="app" >
      <Router>
        <div>
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
