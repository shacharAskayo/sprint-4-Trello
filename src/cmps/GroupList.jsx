import React, { Component } from 'react'
import { GroupPreview } from "./GroupPreview";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { boardService } from '../services/boardService';


export class GroupList extends Component {

    state = {
        // isModalOpen:false,
        group: {
            id: '',
            title: '',
            style: {},
            cards: []
        },
        isAdding: false,
        isEdit:{
            isOpen:false,
            id:''
        }
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
    onAddGroup = (ev) => {
        const { group } = this.state
        const { board } = this.props
        this.props.addGroup(board._id, group)
        this.setState({
            group: { ...group, title: '' },
            isAdding: false
        })
        // ev.currentTarget.blur()

    }

    handleEnter = (ev) => {
        
        if (ev.key === 'Enter') {
            ev.preventDefault()
            this.onAddGroup()
            // ev.currentTarget.blur()
        }
    }

    discardChanges = (ev) => {
        const { group } = this.state
        this.setState({
            group: { ...group, title: '' },
            isAdding: false
        })
        ev.currentTarget.blur()

    }

    // handleOnDragEnd = (result) => {
    //     console.log(result);
    //     if (!result.destination) return;
    //     const { board } = this.props
    //     const { groups } = board
    //     const items = Array.from(groups)
    //     const [reorderedItem] = items.splice(result.source.index, 1)
    //     items.splice(result.destination.index, 0, reorderedItem)
    //     this.props.updateGroupLoaction(board, items)
    // }

    handleDrag = (result) => {
        const { board } = this.props
        const { source, destination } = result

        if (result.type === 'GROUP') {
            const groupId = result.draggableId
            this.props.updateGroupLoaction(board, groupId, source, destination)
        } else {
            const cardId = result.draggableId
            this.props.updateCardLocation(board, cardId, source, destination)

        }

    }
    enterEditMode = (ev,id) => {
        ev.stopPropagation()
        ev.preventDefault()
        this.setState({
            isEdit:{isOpen:true,id:id} 
        })
    }
    
    exitEditMode = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        this.setState({
            isEdit:{isOpen:false,id:''}
         })
    }

    render() {
        const { groups } = this.props.board
        const { isEdit } = this.state
        return (
            // <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <DragDropContext onDragEnd={this.handleDrag}>
                <Droppable droppableId="board" type="GROUP" direction="horizontal">
                    {provided => (

                        // <div onClick={this.exitEditMode} >

                            <div ref={provided.innerRef} {...provided.droppableProps} className="group-container" onClick={this.exitEditMode}  >
                                {groups && groups.map((group, idx) => {
                                    return (
                                        <GroupPreview exitEditMode={this.exitEditMode} enterEditMode={this.enterEditMode} isEdit={isEdit} key={group.id} idx={idx} listId={group.id} group={group} />
                                    )
                                })}
                                {provided.placeholder}

                                <div className="hidden-actions-form-container add-group" >
                                    <form action="" className="hidden-actions-form">
                                        <input onKeyDown={this.handleEnter} className="add-list-input" type="text" placeholder="+ Add another list" value={this.state.group.title} onChange={this.handleChange} />
                                    </form>
                                    <div className="hidden-actions flex list">
                                        <button onClick={this.onAddGroup}>Add List</button>
                                        <button onClick={this.discardChanges} className="icon">
                                            <CloseSharpIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        // </div>

                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

