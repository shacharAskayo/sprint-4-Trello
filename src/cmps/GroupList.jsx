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

    handleEnter=(ev)=>{
        if(ev.key==='Enter'){
            this.onAddGroup()
            ev.currentTarget.blur()
        } 
    }

    discardChanges=(ev)=>{
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
    
    handleDrag=(result)=>{
        const {board} = this.props
        const {source,destination}  = result
        
        if(result.type==='GROUP'){
            const groupId = result.draggableId
            this.props.updateGroupLoaction(board,groupId,source,destination)
        }else{
            const cardId = result.draggableId
            this.props.updateCardLocation(board,cardId,source,destination)
            
        }
        
    }
    
    render() {
        const { groups } = this.props.board
        return (
            // <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <DragDropContext onDragEnd={this.handleDrag}>
                <Droppable droppableId="board" type="GROUP" direction="horizontal">
                    {provided => (

                        <div ref={provided.innerRef} {...provided.droppableProps} className="group-container" onClick={this.onEditModalClose}   >
                            {groups && groups.map((group, idx) => {
                                return (
                                    <GroupPreview key={group.id} idx={idx} listId={group.id} group={group} />
                                )
                            })}
                            {provided.placeholder}

                            <div className="hidden-actions-form-container add-group" >
                                <form action="" className="hidden-actions-form">
                                    <input onKeyDown={this.handleEnter}  className="add-list-input" type="text" placeholder="+ Add another list" value={this.state.group.title}  onChange={this.handleChange} />
                                </form>
                                <div className="hidden-actions flex list">
                                      <button onClick={this.onAddGroup}>Add List</button>
                                    <button onClick={this.discardChanges} className="icon">
                                        <CloseSharpIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

