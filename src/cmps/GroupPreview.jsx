import React, { Component } from 'react'
import { CardList } from "./CardList";
import { connect } from 'react-redux'
import { loadCards } from '../store/actions/cardActions'
import { addCard, openLabel, editGroupTitle, copyList, onArchiveList } from '../store/actions/boardAction'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { GroupMenu } from './GroupMenu';
import { AddCardInput } from './AddCardInput';
import { DynamicCardActionModal } from './card/DynamicCardActionModal';
import { DynamicGroupModal } from './DynamicGroupModal';
import { Transform } from '@material-ui/icons';


export class _GroupPreview extends Component {

    state = {
        isModalOpen: false,
        modalName: '',
        groupTitle: '',
        card: {
            createdBy: {},
            title: '',
            description: '',
            dueDate: '',
            style: {},
            comments: [],
            checklists: [],
            attachments: [],
            members: [],
            labels: []
        },
        isAdding: false,
        isChangeTitle: false,
        isMenuOpen: false,
        isAddingToTop: false,
        topTitle: ''
    }


    componentDidMount() {
        const { group } = this.props
        this.props.loadCards(group)
        this.setState({ groupTitle: group.title })
    }

    openTitleBtn = () => {
        this.setState({ isChangeTitle: true })
    }

    handleChange = (ev) => {
        const { card } = this.state
        const { value } = ev.target
        this.setState({
            card: { ...card, title: value }
        })
    }
    onAddCard = async (ev) => {
        const { card, isAddingToTop } = this.state
        const { board, group } = this.props
        if (card.title.length === 0) return
        this.props.addCard(board, group, card, isAddingToTop)
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
            isAddingToTop: false
        })
    }


    handleEditGroupTitle = (ev) => {
        const { value } = ev.target
        console.log(value);

        this.setState({ groupTitle: value })
    }

    discardChanges = (ev) => {
        this.setState({
            card: { ...this.state.card, title: '' }
        })
        ev.currentTarget.blur()
    }

    editGroupTitle = (ev) => {
        if (ev.key && ev.key !== 'Enter') return
        ev.preventDefault()
        const { board, group } = this.props
        const { groupTitle } = this.state
        this.props.editGroupTitle(board, group, groupTitle)
        this.setState({ isChangeTitle: false })
        ev.currentTarget.blur()
    }
    handleEnter = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            ev.currentTarget?.blur()
            this.onAddCard()
        }
    }
    toggleMenu = () => {
        const { isMenuOpen } = this.state
        this.setState({ isMenuOpen: !isMenuOpen })

    }
    openInput = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.setState({ isAddingToTop: true, isMenuOpen: false })
    }

    copyList = () => {
        const { group, board } = this.props
        this.props.copyList(board, group)
        this.setState({ isMenuOpen: false })
    }

    closeMenu = () => {
        const { isMenuOpen } = this.state
        if (isMenuOpen) this.setState({ isMenuOpen: false })
    }

    onArchive = () => {
        const { board, group } = this.props
        this.props.onArchiveList(board, group)

    }

    openDynamicModal = (modalName) => {
        this.setState({
            modalName,
            isMenuOpen: false,
            isModalOpen: true
        })

    }
    closeModal = () => {
        this.setState({ isModalOpen: false })

    }



    render() {
        const { listId, idx, group, board, isLabelOpen, openLabel, updateCardsLocation, isEdit, enterEditMode, exitEditMode } = this.props
        const { cards } = group
        const { groupTitle, isChangeTitle, isMenuOpen, isAddingToTop, isModalOpen, modalName } = this.state
        const { title } = this.state.card
        return (
            <Draggable draggableId={listId} index={idx} >
                {(provided, snapshot) => (
                    <div className={(snapshot.isDragging) ? 'group-preview dragging' : 'group-preview'} onClick={this.closeMenu} ref={provided.innerRef} {...provided.draggableProps} >
                        <div {...provided.dragHandleProps} listId={listId}>

                            <span className="group-menu-btn" onClick={this.toggleMenu} >...</span>

                            {isMenuOpen && <GroupMenu openDynamicModal={this.openDynamicModal} onArchive={this.onArchive} openInput={this.openInput} copyList={this.copyList} />}
                            {isModalOpen && <DynamicGroupModal closeModal={this.closeModal} group={group} modalName={modalName} />}

                            <div className={`hidden-actions-form-container`}>
                                <form className={`hidden-actions-form`}>
                                    <input className="group-title-input" onClick={this.openTitleBtn} onKeyUp={this.editGroupTitle} onChange={this.handleEditGroupTitle} type="text" value={groupTitle} autoComplete="off" />
                                </form>
                                {isChangeTitle && <div className="hidden-actions flex" style={{ marginLeft: '0' }}>
                                    <button type="button" onClick={this.editGroupTitle}  > save </button>
                                    <button onClick={this.discardChanges} className="icon"><CloseSharpIcon /></button>
                                </div>}
                            </div>
                        </div>

                        {isAddingToTop && <AddCardInput isAddingToTop={isAddingToTop} title={title} onShowAddBtn={this.onShowAddBtn} handleEnter={this.handleEnter} onAddCard={this.onAddCard} discardChanges={this.discardChanges} handleChange={this.handleChange} />}
                        <CardList isDragging={snapshot.isDragging} exitEditMode={exitEditMode} enterEditMode={enterEditMode} isEdit={isEdit} listId={listId} cards={cards} board={board} updateCardsLocation={updateCardsLocation} isLabelOpen={isLabelOpen} openLabel={openLabel} currGroup={group} />
                        {!isAddingToTop && <AddCardInput isAddingToTop={isAddingToTop} title={title} onShowAddBtn={this.onShowAddBtn} handleEnter={this.handleEnter} onAddCard={this.onAddCard} discardChanges={this.discardChanges} handleChange={this.handleChange} />}
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
    editGroupTitle,
    onArchiveList
}

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)
