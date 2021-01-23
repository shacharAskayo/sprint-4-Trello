import React, { Component } from 'react'
import { cardService } from "../services/cardService";
import { connect } from 'react-redux'
import { updateBoardCard, copyList, onArchiveCard } from '../store/actions/boardAction'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { CardDetails } from './CardDetails';
import { CardEdit } from './CardEdit';





class _CardPreview extends Component {

    state = {
        isModalOpen: false,
        // labels: [],
        isEdit: false,
        title: '',
        card: null,
        editStyle: {}
    }


    componentDidMount() {
        this.cardRef = React.createRef()
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

    enterEditMode = (ev,cardId) => {
        ev.preventDefault()
        ev.stopPropagation()
        const style = this.props.enterEditMode(cardId)
        this.setState({ editStyle: style})
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ title: value })
    }

    onSave = (ev) => {
        const { card, board } = this.props
        const { title } = this.state
        card.title = title
        console.log(card);
        this.props.updateBoardCard(board, card)
        this.props.exitEditMode(ev)
        this.setState({ isEdit: false })
    }

    copyList = () => {
        const { currGroup, board } = this.props
        this.props.copyList(board, currGroup)
    }

    onArchiveCard = () => {
        const { board, currGroup } = this.props
        const { card } = this.state
        this.props.onArchiveCard(board, currGroup, card)

    }

    render() {
        const { board, idx, isLabelOpen, currGroup, isEdit, exitEditMode, updateBoardCard, loggedUser } = this.props

        const { title, card, editStyle } = this.state
        if (!this.state.card) return <h1> loading</h1>
        const { labels } = this.state.card
        return (
            <React.Fragment>
                <Draggable
                    draggableId={card.id}
                    index={idx}
                >
                    {(draggbleProvided, snapshot) => (
                        <div ref={draggbleProvided.innerRef}
                            {...draggbleProvided.draggableProps}
                            {...draggbleProvided.dragHandleProps}>
                            {isEdit.isOpen && (isEdit.id === card.id) ? <CardEdit style={editStyle} onArchiveCard={this.onArchiveCard} copyList={this.copyList} loggedUser={loggedUser} updateBoardCard={updateBoardCard} exitEditMode={exitEditMode} onSave={this.onSave} currGroup={currGroup} isEdit={isEdit.isOpen} onOpenLabel={this.onOpenLabel} handleChange={this.handleChange} enterEditMode={this.enterEditMode} labels={labels} isLabelOpen={isLabelOpen} board={board} card={card} title={title} /> : ''}
                                {<CardDetails isDragging={snapshot.isDragging} isEdit={isEdit.isOpen} onOpenLabel={this.onOpenLabel} handleChange={this.handleChange} enterEditMode={this.enterEditMode} labels={labels} isLabelOpen={isLabelOpen} board={board} card={card} title={title} />}
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
        loggedUser: state.userModule.loggedUser,
        isLabelOpen: state.boardModule.isLabelOpen
    }
}
const mapDispatchToProps = {
    updateBoardCard,
    copyList,
    onArchiveCard

}

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview)

