import React, { Component } from 'react'
import { cardService } from "../services/cardService";
import { connect } from 'react-redux'
import { updateBoardCard } from '../store/actions/boardAction'
import { CardPrev } from './CardPrev'
import { CardPrev2 } from './CardPrev2'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'




class _CardPreview extends Component {

    state = {
        isModalOpen: false,
        labels: [],
        isEdit: false,
        title: ''
    }


    componentDidMount() {
        const { card, board, isModalOpen } = this.props
        // const updatedCard =cardService.getCardById()
        // console.log(updatedCard);
        const labels = cardService.getCardLabels(board, card.labels)
        this.setState({
            labels,
            title: card.title
        })
    }
    componentDidUpdate(prevProps) {
        // const { isModalOpen } = this.props
        // if (prevProps !== this.props) {
        //     this.setState({ isModalOpen: isModalOpen })
        // }
    }



    onOpenLabel = () => {
        this.props.openLabel()
    }

    on = (id) => {
        console.log('id:', id);
    }
    EnterEditMode = () => {
        console.log('edit');
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

    render() {
        const { card, board,idx, isLabelOpen, currGroup } = this.props
        const { labels, isEdit, title } = this.state

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

                            { <CardPrev isEdit={isEdit} onOpenLabel={this.onOpenLabel} handleChange={this.handleChange} EnterEditMode={this.EnterEditMode} labels={labels} isLabelOpen={isLabelOpen} board={board} card={card} title={title} />}
                            {isEdit && <CardPrev2 onSave={this.onSave} currGroup={currGroup} isEdit={isEdit} onOpenLabel={this.onOpenLabel} handleChange={this.handleChange} EnterEditMode={this.EnterEditMode} labels={labels} isLabelOpen={isLabelOpen} board={board} card={card} title={title} />}
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
        isLabelOpen: state.boardModule.isLabelOpen
    }
}
const mapDispatchToProps = {
                    updateBoardCard

                }

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview)

