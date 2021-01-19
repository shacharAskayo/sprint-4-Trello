import React, { Component } from 'react'
import { cardService } from "../services/cardService";
import { connect } from 'react-redux'
import { updateBoardCard,copyList } from '../store/actions/boardAction'
import { CardDetails } from './CardDetails'
import { CardEdit } from './CardEdit'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'




class _CardPreview extends Component {

    state = {
        isModalOpen: false,
        // labels: [],
        isEdit: false,
        title: '',
        card: null
    }


    componentDidMount() {
        const { card, board, isModalOpen } = this.props
        const updatedCard = cardService.getCardById(board, card.id)
        // const labels = cardService.getCardLabels(board, card.labels)
        this.setState({
            card: updatedCard,
            title: card.title
        })
    }
    componentDidUpdate(prevProps) {
        const { card, board } = this.props
        const updatedCard = cardService.getCardById(board, card.id)
        if (prevProps !== this.props) {
            this.setState({ card: updatedCard })

        }
    }

    onOpenLabel = (ev) => {
        ev.preventDefault()
        this.props.openLabel()
    }

    enterEditMode = () => {
        const { isEdit } = this.state
        this.setState({
            isEdit: !isEdit
        })
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ title: value })
    }

    onSave = () => {
        console.log('save');
        const { card, board } = this.props
        const { title } = this.state
        card.title = title
        console.log(card);
        this.props.updateBoardCard(board, card)
        this.setState({ isEdit: false })
    }

    copyList=()=>{
        const { currGroup,board } = this.props
        this.props.copyList(board,currGroup)
    }

    render() {
        //  frim props
        const { board, idx, isLabelOpen, currGroup, enterEditMode, isEdit, exitEditMode,updateBoardCard,loggedUser } = this.props
        // isEdit
        const { title, card, } = this.state
        if (!this.state.card) return <h1> loading</h1>
        const { labels } = this.state.card
        return (
            <React.Fragment>
                <Draggable
                    draggableId={card.id}
                    index={idx}
                >
                    {(draggbleProvided) => (
                        <div ref={draggbleProvided.innerRef}
                            {...draggbleProvided.draggableProps}
                            {...draggbleProvided.dragHandleProps}>


                            { <CardDetails isEdit={isEdit.isOpen} onOpenLabel={this.onOpenLabel} handleChange={this.handleChange} enterEditMode={enterEditMode} labels={labels} isLabelOpen={isLabelOpen} board={board} card={card} title={title} />}
                            {isEdit.isOpen && (isEdit.id === card.id) ? <CardEdit copyList={this.copyList}  loggedUser={loggedUser} updateBoardCard={updateBoardCard} exitEditMode={exitEditMode} onSave={this.onSave} currGroup={currGroup} isEdit={isEdit.isOpen} onOpenLabel={this.onOpenLabel} handleChange={this.handleChange} enterEditMode={enterEditMode} labels={labels} isLabelOpen={isLabelOpen} board={board} card={card} title={title} /> : ''}
                        </div>
                    )}
                </Draggable>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        reviews: state.reviewModule.reviews,
        cards: state.cardModule.cards,
        board: state.boardModule.board,
        loggedUser:state.boardModule.loggedUser,
        isLabelOpen: state.boardModule.isLabelOpen
    }
}
const mapDispatchToProps = {
    updateBoardCard,
    copyList

}

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview)

