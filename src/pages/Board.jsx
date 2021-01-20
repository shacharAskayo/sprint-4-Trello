import { Component } from 'react'
//cmps:
import { GroupList } from "../cmps/GroupList"
import { connect } from 'react-redux'
import { Menu } from '../cmps/menu/Menu'
import { getBoardById, addGroup, updateGroupLoaction, updateCardLocation } from '../store/actions/boardAction'
import { Card } from '../cmps/card/Card'
import { BoardHeader } from '../cmps/BoardHeader'
import { Archive } from '../cmps/Archive'


//functions:


class _Board extends Component {

  state={
    isArchiveOpen:false
  }


  componentDidMount() {
    const { boardId } = this.props.match.params
    if (!boardId) return null
    this.props.getBoardById(boardId)

  }

  openArchive=()=>{
    const {isArchiveOpen} = this.state
    this.setState({isArchiveOpen:!isArchiveOpen})
  }
 

  render() {

    if (!this.props.board) return null
    const { board, updateGroupLoaction, updateCardLocation, addGroup } = this.props
    const { groups } = board
    const {isArchiveOpen} = this.state

    return (
      <div className="main-board" >
        <BoardHeader openArchive={this.openArchive} />
        <Menu board={board} />
      {!isArchiveOpen&&  <GroupList groups={groups} updateCardLocation={updateCardLocation} updateGroupLoaction={updateGroupLoaction} board={board} addGroup={addGroup} />}
        {isArchiveOpen&&<Archive board={board}/>}
        <Card />
      </ div>
    )
  }
}



const mapStateToProps = state => {
  return {
    reviews: state.reviewModule.reviews,
    board: state.boardModule.board,
    loggedUser: state.boardModule.loggedUser,
    filterBy: state.boardModule.filterBy

  }
}
const mapDispatchToProps = {
  getBoardById,
  addGroup,
  updateGroupLoaction,
  updateCardLocation
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(_Board)

