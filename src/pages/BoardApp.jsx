import React, { Component } from 'react'
import {GroupList} from "../cmps/GroupList"
import {BoardHeader} from "../cmps/BoardHeader"
import {connect} from 'react-redux'
import {loadBoard} from '../store/actions/boardAction'


  class _BoardApp extends Component {
    componentDidMount() {
        this.props.loadBoard()
    }
    
    render() {
        return (
            <div>
                <BoardHeader/>
                <GroupList/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      reviews: state.reviewModule.reviews,
      board:state.boardModule.board
    }
  }
  const mapDispatchToProps = {
    loadBoard,
  }
  
  export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
  