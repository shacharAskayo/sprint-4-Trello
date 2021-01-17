import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadBoards,addBoard } from '../store/actions/boardAction'
// import { BoardList } from '../cmps/BoardList'

class _Home extends Component {

    state = {
        isOpen: false,
        bgColors: [
            { color: 'lightgray' },
            { color: 'green' },
            { color: 'coral' },
            { color: '#ff4d4d' },
            { color: 'crimson' },
            { color: 'yellowgreen' },
            { color: 'teal' },
            { color: 'blue' },
            { color: 'pink' }
        ],
        board:{
            _id:'',
            title:'',
            createdAt:Date.now(),
            style:{},
            isPrivate:false,
            createBy:{},
            labels:[],
            members:[],
            groups:[],
            activities:[]
        }
    }

    componentDidMount() {
        this.props.loadBoards()
    }

    handleChange=(ev)=>{
        const {value}=ev.target
        const {board} = this.state
        this.setState({
            board:{...board,title:value}
        })
    }
    
    setBgColor=(color)=>{
        const {board} = this.state
        this.setState({
            board:{...board,style:{...board.style,backgroundColor:color}}
        })
    }


    addBoard = () => {
        const {board} = this.state
        this.props.addBoard(board)
        this.setState({isOpen:false})
    }
    render() {
        const { isOpen, bgColors } = this.state
        const { boards } = this.props
        return (
            <React.Fragment>

                {isOpen && <section className="new-board-modal">
                    <div>
                        <input type="text" placeholder="Add board title" onChange={this.handleChange} />
                        <button onClick={this.addBoard}> Add Board</button>
                    </div>
                    <div className="color-picker">
                        {bgColors.map(bg => <div className="colors" style={{ backgroundColor: bg.color }} onClick={()=>this.setBgColor(bg.color)}></div>)}
                    </div>
                </section>
                }
                <section>
                    <h1>Create new board</h1>
                    <div  className="board-preview" onClick={()=>this.setState({isOpen:true})} >
                        <span>
                            New Board
                    </span>
                    </div>
                </section>

                <section className="my-boards">
                    <h1>My Boards</h1>
                    {boards&& boards.map((board,idx) => {
                        return (
                            <div key={board.id}>
                                <Link to={`/board/${board._id}`}>
                                    <div key={idx}  className="board-preview" key={board._id} style={board.style}>
                                        {board.title}
                                    </div>
                                </Link>
                            </div>
                        )
                    })}

                </section>
            </React.Fragment>
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


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)