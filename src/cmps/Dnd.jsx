import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'





const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export class Dnd extends Component {


    state = {
        items: [
            { name: 'popog', id: '101' },
            { name: 'popof', id: '102' },
            { name: 'popod', id: '103' },
            { name: 'popos', id: '104' },
            { name: 'popoa', id: '105' },
        ],
        items2: [
            { name: 'poposg', id: '106' },
            { name: 'popzof', id: '107' },
            { name: 'popxod', id: '108' },
            { name: 'popxos', id: '109' },
            { name: 'pocpoa', id: '110' },

        ]

    }


    id2List = {
        droppable: 'items',
        droppable2: 'items2'
    };


    getList = id => this.state[this.id2List[id]];

    handleOnDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { items2: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
                console.log(result);
            this.setState({
                items: result.droppable,
                items2: result.droppable2
            });
        }
    };


    render() {
        const { items, items2 } = this.state
        return (
            <div className="dnd" style={{display:'flex',gap:'50px'}}>
                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <Droppable droppableId="droppable" type={'ITEM'}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {items.map((arr, idx) => {
                                    return (
                                        <Draggable key={arr.id} draggableId={arr.id} index={idx}>
                                            {(provided) => (
                                                <div className="item" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                    <p> {arr.name} </p>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2" type={'ITEM'}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {items2.map((arr, idx) => {
                                    return (
                                        <Draggable key={arr.id} draggableId={arr.id} index={idx}>
                                            {(provided) => (
                                                <div className="item" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                    <p> {arr.name} </p>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </DragDropContext>
            </div>
        )
    }
}

