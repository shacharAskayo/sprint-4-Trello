import { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoards } from '../store/actions/boardAction.js'
import { BoardPreview } from './BoardPreview'

class _BoardList extends Component {

    componentDidMount() {
        this.props.loadBoards()
    }


    
    render() {
        const {boards} = this.props
        console.log(boards);
        return (
            <section className="board-list">
                {boards.map(board => {
                    return <div key={board._id}> 
                        <BoardPreview board={board} /></div>
                })}
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards
}
export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)