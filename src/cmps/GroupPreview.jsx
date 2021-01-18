import React, { Component } from 'react'
import { CardList } from "./CardList";
import { connect } from 'react-redux'
import { loadCards } from '../store/actions/cardActions'
import { addCard, openLabel, editGroupTitle,copyList } from '../store/actions/boardAction'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { GroupMenu } from './GroupMenu';
import { AddCardInput } from './AddCardInput';


export class _GroupPreview extends Component {

    state = {
        groupTitle: '',
        card: {
            createdBy: {},
            id: '',
            title: '',
            description: '',
            createdAt: '',
            dueDate: '',
            style: {},
            comments: [],
            checklists: [],
            attachments: [],
            members: [],
            labels: []
        },
        isAdding: false,
        isChangeTitle: true,
        isMenuOpen: false,
        isAddingToTop:false,
        topTitle:''
    }


    componentDidMount() {
        const { group } = this.props
        this.props.loadCards(group)
        this.setState({ groupTitle: group.title })
    }


    onShowAddBtn = () => {
        this.setState({ isAdding: true })
    }
    handleChange = (ev) => {
        const { card} = this.state
        const { value } = ev.target
        this.setState({
            card: { ...card, title: value }
        })
    }
    onAddCard = async (ev) => {
        const { card,isAddingToTop } = this.state
        const { board, group } = this.props
        this.props.addCard(board._id, group.id, card,isAddingToTop)
        this.setState({
            card: { 
                createdBy: {},
                id: '',
                title: '',
                description: '',
                createdAt: '',
                dueDate: '',
                style: {},
                comments: [],
                checklists: [],
                attachments: [],
                members: [],
                labels: []
            },
            isAdding: false,
            isAddingToTop:false
        })
        // ev.currentTarget?.blur()
    }


    handleEditGroupTitle = (ev) => {
        const { value } = ev.target
        // console.log(ev.target.value);
        this.setState({ groupTitle: value })
    }

    discardChanges = (ev) => {
        this.setState({
            card: { ...this.state.card, title: '' }
        })
        ev.currentTarget.blur()
    }

    editGroupTitle = () => {
        const { board, group } = this.props
        const { groupTitle } = this.state
        this.props.editGroupTitle(board, group, groupTitle)
        this.setState({ isChangeTitle: false })
    }
    handleEnter = (ev) => {
        if (ev.key === 'Enter') {
            ev.currentTarget?.blur()
            this.onAddCard()
        }
    }
    toggleMenu = () => {
        const { isMenuOpen } = this.state
        this.setState({ isMenuOpen: !isMenuOpen })
        
    }
    openInput=(ev)=>{
        ev.preventDefault()
        ev.stopPropagation()
        this.setState({isAddingToTop:true,isMenuOpen:false})
    }
    
    copyList=()=>{
        const { group,board } = this.props
        this.props.copyList(board,group)
        this.setState({isMenuOpen:false})
    }
    
    closeMenu=()=>{
        const { isMenuOpen } = this.state
        if(isMenuOpen) this.setState({isMenuOpen:false})
    }

    render() {
        const { listId, idx, group, board, isLabelOpen, openLabel, updateCardsLocation,isEdit,enterEditMode,exitEditMode } = this.props
        const { cards } = group
        const { isAdding, groupTitle, isChangeTitle, isMenuOpen,isAddingToTop,topTitle } = this.state
        const { title } = this.state.card
        return (
            <Draggable draggableId={listId} index={idx} >
                {provided => (
                    <div className="group-preview" onClick={this.closeMenu} ref={provided.innerRef} {...provided.draggableProps} >
                        <div {...provided.dragHandleProps} listId={listId}>
                            <span className="group-menu-btn" onClick={this.toggleMenu} >...</span>

                            {isMenuOpen && <GroupMenu  openInput={this.openInput} copyList={this.copyList} />}

                            <div className={`hidden-actions-form-container`}>
                                <form action="" className={`hidden-actions-form`}>
                                    <input className="group-title-input" onChange={this.handleEditGroupTitle} type="text" value={groupTitle} autoComplete="off" />
                                </form>
                                {isChangeTitle && <div className="hidden-actions flex">
                                    <button type="button" onClick={this.editGroupTitle} style={{ marginLeft: '0' }} > save </button>
                                    <button onClick={this.discardChanges} className="icon"><CloseSharpIcon /></button>
                                </div>}
                            </div>
                        </div>
                        
                        {isAddingToTop && <AddCardInput isAddingToTop={isAddingToTop} title={title} onShowAddBtn={this.onShowAddBtn} handleEnter={this.handleEnter} onAddCard={this.onAddCard} discardChanges={this.discardChanges} handleChange={this.handleChange} />}
                        <CardList  exitEditMode={exitEditMode} enterEditMode={enterEditMode} isEdit={isEdit} listId={listId} cards={cards} board={board} updateCardsLocation={updateCardsLocation} isLabelOpen={isLabelOpen} openLabel={openLabel} currGroup={group} />
                        {!isAddingToTop&&<AddCardInput isAddingToTop={isAddingToTop} title={title} onShowAddBtn={this.onShowAddBtn} handleEnter={this.handleEnter} onAddCard={this.onAddCard} discardChanges={this.discardChanges} handleChange={this.handleChange} />}


                    </div>
                )}
            </Draggable>
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
    loadCards,
    addCard,
    openLabel,
    copyList,
    editGroupTitle
}

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)
