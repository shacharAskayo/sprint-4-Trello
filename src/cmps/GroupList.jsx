import React, { Component } from 'react'
import { GroupPreview } from "./GroupPreview";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export class GroupList extends Component {

    state = {
        // isModalOpen:false,
        group: {
            id: '',
            title: '',
            style: {},
            cards: []
        },
        isAdding: false
    }


    handleChange = (ev) => {
        const { group } = this.state
        const { value } = ev.target
        this.setState({
            group: { ...group, title: value }
        })
    }

    onShowAddBtn = () => {
        this.setState({ isAdding: true })
    }
    onAddGroup = () => {
        const { group } = this.state
        const { board } = this.props
        this.props.addGroup(board._id, group)
        this.setState({
            group: { ...group, title: '' },
            isAdding: false
        })

    }
    handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const { board } = this.props
        const { groups } = board
        const items = Array.from(groups)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        this.props.updateGroupLoaction(board, items)
    }
    

    render() {
        const { groups } = this.props.board
        return (
            // <DragDropContext>
                // <Droppable droppableId='board' type="GROUP">
                    // {(provided) => (
                        // <div className="group-container" ref={provided.innerRef} {...provided.droppableProps}  >
                        <div className="group-container" onClick={this.onEditModalClose}   >
                            {groups && groups.map((group, idx) => {
                                return (
                                        // <Draggable key={group.id} draggableId={group.id} index={idx}>
                                            // {(provided) => (
                                                // <div ref={provided.innerRef} {...provided.draggbleProps} {...provided.dragHandleProps}>
                                                    <GroupPreview group={group}   />
                                                // </div>
                                            // )}
                                    // </Draggable>
                                     )
                            })}
                            <div >
                                <form action="">
                                    <input className="add-list-input" type="text" placeholder="+ Add another list" value={this.state.group.title} onClick={this.onShowAddBtn} onChange={this.handleChange}  />
                                    {this.state.isAdding && <button onClick={this.onAddGroup}>Add List</button>}
                                </form>
                            </div>
                        </div>
                    // )}
                // </Droppable>
            // </DragDropContext>
        )
    }
}

