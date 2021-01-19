import React, { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { moveCard } from '../../store/actions/boardAction';
import { connect } from "react-redux";
import { utilService } from "../../services/utilService";



class _CardCopyModal extends Component {


    state = {
        title: 'Copy',
        groupIdx: 0,
        cardIdx: 0
    }

    handleChange = (ev) => {
        const { name, value } = ev.target
        this.setState({ [name]: value })
    }

    onCopyCard = () => {
        const { board, card, closeModal } = this.props
        const {title} = this.state
        const newCard = {...card, title,  id: utilService.makeId(), createdAt: Date.now()}
        this.props.moveCard(board, newCard, this.state)
        closeModal()
    }

    render() {

        const { closeModal, style, board } = this.props
        const group = board.groups[this.state.groupIdx]
        console.log(group);
        return (
            <div fer className="copy-card-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Move Card
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <small>Title</small>
                <input
                    autoComplete="off"
                    onFocus={this.handleFocus}
                    autoFocus
                    type="text" name="title"
                    onChange={this.handleChange}
                    onKeyDown={this.onAddChecklist}
                    value={this.state.title}
                />
                <hr />
                <small>SELECT DESTINATION</small>
                <div className="flex space-bt">
                    <label className="flex col">
                        List
                        <select onChange={this.handleChange} name="groupIdx" >
                            {board.groups.map((group, idx) => <option value={idx}>{group.title}</option>)}
                        </select>
                    </label>
                    <label>
                        Position
                        <select onChange={this.handleChange} name="cardIdx" >
                            {group.cards.length ? group.cards.map((card, idx) => <option value={idx}>{idx + 1}</option>) : <option value={0}>1</option>}
                        </select>
                    </label>
                </div>
                <button className="green" onClick={this.onCopyCard}>Create Card</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    moveCard
}
export const CopyCardModal = connect(mapStateToProps, mapDispatchToProps)(_CardCopyModal)

