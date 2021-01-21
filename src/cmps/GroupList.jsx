import React, { Component } from 'react'
import { GroupPreview } from "./GroupPreview";
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';



export class GroupList extends Component {

    state = {
        // isModalOpen:false,
        group: {
            title: '',
            style: {},
            cards: []
        },
        isAdding: false,
        isEdit:{
            isOpen:false,
            id:''
        },
        isMenuOpen:false
    } 


    handleChange = (ev) => {
        const { group } = this.state
        const { value } = ev.target
        this.setState({
            group: { ...group, title: value }
        })
    }

    onAddGroup = () => {
        const { group } = this.state
        const { board } = this.props
        if(group.title.length===0) return 
        this.props.addGroup(board, group)
        this.setState({ group: { title: '', style: {}, cards: [] } })

    }

    handleEnter = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            this.onAddGroup()
        }
    }

    discardChanges = (ev) => {
        this.setState({ group: { title: '', style: {}, cards: [] } })
        ev.currentTarget.blur()
    }

    handleDrag = (result) => {
        const { board } = this.props
        const { source, destination } = result

        if (result.type === 'GROUP') {
            const groupId = result.draggableId
            this.props.updateGroupLoaction(board, groupId, source, destination)
        } else {
            const cardId = result.draggableId
            this.props.updateCardLocation(board, source, destination)

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
    // openMenu=()=>{
    //     this.setState({isMenuOpen:true})
    // }
    // closeMenu=()=>{
    //     this.setState({isMenuOpen:true})
    // }

    render() {
        const { groups } = this.props.board
        const { isEdit,isMenuOpen } = this.state
        return (
            // <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <DragDropContext onDragEnd={this.handleDrag}>
                <Droppable droppableId="board" type="GROUP" direction="horizontal">
                    {(provided ) => (

                            <div ref={provided.innerRef} {...provided.droppableProps} className="group-container" onClick={this.exitEditMode}  >
                                {groups && groups.map((group, idx) => {
                                    return (
                                        <GroupPreview  isMenuOpen={isMenuOpen}  exitEditMode={this.exitEditMode} enterEditMode={this.enterEditMode} isEdit={isEdit} key={group.id} idx={idx} listId={group.id} group={group} />
                                    )
                                })}

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
                                {provided.placeholder }
                            </div>
                            
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

