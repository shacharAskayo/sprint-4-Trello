import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadBoards, addBoard } from '../store/actions/boardAction'
// import { BoardList } from '../cmps/BoardList'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import homeImgSrc from '../assets/bgImgs/home-bg.jpg'
import AddBoxIcon from '@material-ui/icons/AddBox';

class _BoardsPick extends Component {

    state = {
        isOpen: false,
        bgColors: [
            { color: 'lightgray', isSelected: false },
            { color: '#adad85', isSelected: false },
            { color: 'coral', isSelected: false },
            { color: 'lightpink', isSelected: false },
            { color: 'crimson', isSelected: false },
            { color: 'yellowgreen', isSelected: false },
            { color: 'teal', isSelected: false },
            { color: 'blue', isSelected: false },
            { color: '#3385ff', isSelected: false }
        ],
        board: {
            _id: '',
            title: '',
            createdAt: Date.now(),
            style: {},
            isPrivate: false,
            createBy: {},
            labels: [],
            members: [],
            groups: [],
            activities: []
        }
    }

    componentDidMount() {
        this.props.loadBoards()
    }

    handleChange = (ev) => {
        const { value } = ev.target
        const { board } = this.state
        this.setState({
            board: { ...board, title: value }
        })
    }

    setBgColor = (color) => {
        const { board } = this.state
        this.setState({
            board: { ...board, style: { ...board.style, backgroundColor: color } }
        })
    }

    closeModal = () => {
        let isOpen = this.state.isOpen
        if (isOpen) this.setState({ isOpen: false })
    }

    addBoard = () => {
        const { board } = this.state
        this.props.addBoard(board)
        this.setState({ isOpen: false })
    }

    //     toggleTrash = (boardIdx) => {
    // let 
    //     }

    render() {
        const { isOpen, bgColors } = this.state
        const { boards } = this.props
        return (

            <section className="boards-pick-main-container" >
                <section className="boards-container">
                    <p className="pick-title">Public Boards</p>
                    <section className="board-opts">

                        <section className="board-op create-board" onClick={() => this.setState({ isOpen: true })}>
                            <h1>Create new board</h1>
                            <AddBoxIcon className="create-board-btn" />

                        </section>
                        {isOpen && <section className="new-board-modal">
                            <div>
                                <input type="text" placeholder="Add board title" onChange={this.handleChange} />
                            </div>
                            <div className="color-picker">
                                {bgColors.map((bg, idx) => {
                                    return <div className="color" key={idx} style={{ backgroundColor: bg.color }} onClick={() => this.setBgColor(bg.color)}>
                                        {bg.isSelected && <span>✔</span>}
                                    </div>
                                })}
                            </div>
                            <button className="add-board-btn" onClick={this.addBoard}> Add Board</button>

                        </section>
                        }

                        <section className="my-boards">
                            {boards && boards.map((board, idx) => {
                                return (
                                    <div key={board.id} >
                                        <Link to={`/board/${board._id}`}>
                                            <div key={idx} className="board-op" key={board._id} style={board.style}>
                                                {board.title}
                                            </div>
                                        </Link>
                                        {/* <span className="delete-board-btn"><DeleteOutlineIcon /></span> */}
                                    </div>
                                )
                            })}
                        </section>
                    </section>
                </section>
            </section>
        )

    }


}
const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards,
    addBoard
}


export const BoardsPick = connect(mapStateToProps, mapDispatchToProps)(_BoardsPick)