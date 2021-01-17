import React, { Component } from 'react'
import { CardPreview } from "./CardPreview";
// ////React DND///
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
        const { board, listId, isLabelOpen, openLabel, currGroup } = this.props
        const { cards } = this.props
        return (
            <Droppable droppableId={listId} type="CARD">
                {(droppableProvided) => (

                    <div className="card-list" ref={droppableProvided.innerRef} >
                        {cards.map((card, idx) => {
                            if (card) {

                                return (

                                    <CardPreview currGroup={currGroup} key={card.id} listId={listId} board={board} idx={idx} card={card} isLabelOpen={isLabelOpen} openLabel={openLabel} />
                                )
                            }
                        })}
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






    //     {
    //         const { board, isLabelOpen, openLabel, currGroup } = this.props
    //         console.log('the fucking', board);
    //         // const { cards } = this.props
    //         const { cards } = this.state
    //         return (
    //             <DragDropContext onDragEnd={this.handleOnDragEnd}>
    //                 <Droppable droppableId={currGroup.id} type="CARD" >
    //                     {(provided) => (
    //                         <div className="card-list" {...provided.droppableProps} ref={provided.innerRef}  >
    //                             {cards.map((card, idx) => {
    //                                 return (
    //                                     <Draggable key={card.id} draggableId={card.id} index={idx}>
    //                                         {(provided) => (
    //                                             <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
    //                                                 <CardPreview board={board} idx={card.id} card={card} isLabelOpen={isLabelOpen} openLabel={openLabel} />
    //                                             </div>
    //                                         )}
    //                                     </Draggable>
    //                                 )
    //                             })}
    //                             {provided.placeholder}
    //                         </div>
    //                     )}
    //                 </Droppable>
    //             </DragDropContext>
    //         )
    //     }
    // }

}
