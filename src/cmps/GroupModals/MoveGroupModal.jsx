import { TableCell } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from "react-redux";
import { boardService } from '../../services/boardService'



export class MoveGroupModal extends Component {

    state = {
        destinationBoard: null,
        position: 0,
    }

    handleBoardSelect = async (ev) => {
        const { value, name } = ev.target
        if (name === 'board' && value.length > 5) {
            const board = await boardService.getById(value)
            this.setState({ destinationBoard: board })
        }
        if (name === 'position') {
            this.setState({ position: value })
        }
    }
    moveGroup = () => {
        const { destinationBoard, position } = this.state
        const {boards, group, moveGroup, board,closeModal } = this.props
        moveGroup(boards,board, group, destinationBoard, position)
        closeModal()
    }



    render() {
        const { boards } = this.props
        const { destinationBoard } = this.state
        return (
            <div className="group-menu sort" style={{ height: '220px' }} >
                <div className="flex justify-center">
                    Move group
                </div>

                <hr />
                <div >
                    <div style={{ backgroundColor: 'rgba(9,30,66,.04)', borderRadius: '3px', padding: '4px', color: 'black' }}>

                        <label htmlFor="">board</label>
                        <select className="move-select-btn" onChange={this.handleBoardSelect} name="board">
                            <option value="">board</option>
                            {boards ? boards.map(board => <option value={board._id} >{board.title} </option>) : <option>  board</option>}
                        </select>
                    </div>

                    <div style={{ backgroundColor: 'rgba(9,30,66,.04)', borderRadius: '3px', padding: '4px', color: 'black' }}>
                        <label htmlFor="">positon</label>
                        <select className="move-select-btn" onChange={this.handleBoardSelect} name="position">
                            {destinationBoard ? destinationBoard.groups.map((group, idx) => <option value={idx} >{idx}</option>) : <option>  0</option>}
                        </select>
                    </div>

                </div>
                <button className="green" style={{ backgroundColor: '#5aac44', color: 'white' }} onClick={this.moveGroup} >Move</button>
            </div>



        )
    }
}


