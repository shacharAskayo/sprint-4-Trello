import React, { Component } from 'react'
import {GroupList} from "../cmps/GroupList"
import {BoardHeader} from "../cmps/BoardHeader"
import {connect} from 'react-redux'
import {getBoardById} from '../store/actions/boardAction'
import {Card} from '../cmps/Card'


  class _Board extends Component {
    componentDidMount() {
      const {boardId} =this.props.match.params
        this.props.getBoardById(boardId)
    }
    componentDidUpdate(prevState){
  }
    
    render() {

        return (
            <div>
                <BoardHeader/>
                <GroupList groups={this.props.board.groups}/>
                <Card id={this.match?.params.cardId}/>
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
    getBoardById,
  }
  
  export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)
  