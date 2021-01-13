import React, { Component } from 'react'
import {GroupList} from "../cmps/GroupList"
import {BoardHeader} from "../cmps/BoardHeader"
import {Card} from "../cmps/Card"
import {connect} from 'react-redux'
import {loadBoard} from '../store/actions/boardAction'


  class _Board extends Component {
    componentDidMount() {
        this.props.loadBoard()
    }
    
    render() {
        return (
            <div>
                <BoardHeader/>
                <GroupList/>
                <Card cardId="c101"/> 
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      board:state.boardModule.board
    }
  }
  const mapDispatchToProps = {
    loadBoard,
  }
  
  export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)
  