import { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoards } from '../store/actions/boardAction.js'
import { BoardPreview } from './BoardPreview.jsx'

class _BoardList extends Component {

    componentDidMount() {
        this.props.loadBoards()
    }
    get boardsForDisplay() {
        let boards = this.props.boards
        return boards
    }
    render() {
        const { boards } = this.boardsForDisplay
        return (
            <section className="board-list">
                {boards.map(board => {
                    <div> key={board._id}
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