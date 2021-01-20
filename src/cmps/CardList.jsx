import React, { Component } from 'react'
import { CardPreview } from "./CardPreview";
// ////React DND///
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'



export class CardList extends Component {
    state = {
        cards: []
    }
    componentDidMount() {
        const { cards } = this.props
        this.setState({ cards })
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const { cards } = this.props
            this.setState({ cards })
        }
    }


    handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const { board, currGroup } = this.props
        // const { cards } = this.props
        const { cards } = this.state
        const items = Array.from(cards)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        this.setState({ cards: items })
        this.props.updateCardsLocation(board, currGroup, items)
    }

    render() {
        const { board,cards, listId, isLabelOpen, openLabel, currGroup,isEdit,enterEditMode,exitEditMode } = this.props
        return (
            <Droppable droppableId={listId} type="CARD">
                {(droppableProvided) => (

                    <div className={'card-list'} ref={droppableProvided.innerRef} style={{overflow:'none'}} >
                        {cards.map((card, idx) => {
                            if (card) {

                                return (

                                    <CardPreview exitEditMode={exitEditMode} enterEditMode={enterEditMode} isEdit={isEdit} currGroup={currGroup} key={card.id} listId={listId} board={board} idx={idx} card={card} isLabelOpen={isLabelOpen} openLabel={openLabel} />
                                )
                            }
                            
                        })}
                        {droppableProvided.placeholder}
          
                    </div>
                )}
            </Droppable>
        )
    }

}
