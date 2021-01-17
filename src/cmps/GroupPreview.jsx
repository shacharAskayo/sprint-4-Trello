import React, { Component } from 'react'
import { CardList } from "./CardList";
import { connect } from 'react-redux'
import { loadCards } from '../store/actions/cardActions'
import { addCard, openLabel, updateCardsLocation,editGroupTitle } from '../store/actions/boardAction'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';


export class _GroupPreview extends Component {

    state = {
        groupTitle:'',
        card: {
            createdBy: {},
            id: '',
            title: '',
            description: '',
            createdAt: Date.now(),
            dueDate: '',
            style: {},
            comments: [],
            checklists: [],
            attachments: [],
            members: [],
            labels: []
        },
        isAdding: false,
        isChangeTitle:false
    }

    componentDidMount() {
        const {group} = this.props
        this.props.loadCards(group)
        this.setState({groupTitle:group.title})
    }


    onShowAddBtn = () => {
        this.setState({ isAdding: true })
    }
    handleChange = (ev) => {
        const { card } = this.state
        const { value } = ev.target
        this.setState({
            card: { ...card, title: value }
        })
    }
    onAddCard = async () => {
        const { card } = this.state
        const { board, group } = this.props
        this.props.addCard(board._id, group.id, card)
        this.setState({
            card: { ...card, title: '' },
            isAdding: false
        })
    }
    
    handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const { board, group } = this.props
        const { cards } = group
        const items = Array.from(cards)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        this.setState({ cards: items })
        this.props.updateCardsLocation(board, group, items)
    }
    
    handleEditGroupTitle=(ev)=>{
        const {value} = ev.target
        // console.log(ev.target.value);
        this.setState({groupTitle:value})
    }
    
    discardChanges = (ev) => {
        const { group } = this.props
        ev.currentTarget.blur()
        this.setState({ groupTitle:group.title, isChangeTitle:false})
    }
    
    editGroupTitle=()=>{
        const { board, group } = this.props
        const {groupTitle}= this.state
        this.props.editGroupTitle(board,group,groupTitle)
        this.setState({isChangeTitle:false})
    }

    render() {
        const { group, board, isLabelOpen, openLabel, updateCardsLocation,isModalOpen,onEditModalOpen } = this.props
        const { cards } = group
        const { isAdding ,groupTitle,isChangeTitle } = this.state
        const { title } = this.state.card
        return (

                    <div className="group-preview" >
                        <span className="group-menu-btn" onClick={this.openMenu}>...</span>
                            <div className={`hidden-actions-form-container`}>
                                <form action="" className={`hidden-actions-form`}>
                                    <input onClick={()=>{this.setState({isChangeTitle:true})}} onChange={this.handleEditGroupTitle} type="text"  value={groupTitle} autoComplete="off"/>
                                </form>
                                {isChangeTitle&&<div className="hidden-actions flex">
                                        <button type="button" onClick={this.editGroupTitle} style={{marginLeft:'6px'}} > save </button>
                                        <button onClick={this.discardChanges} className="icon">
                                        <CloseSharpIcon />
                                        </button>
                                    </div>
    }
                            </div>
                            <CardList cards={cards} board={board} updateCardsLocation={updateCardsLocation} isLabelOpen={isLabelOpen} openLabel={openLabel} currGroup={group}    />
                            <form action="">
                                <input onClick={this.onShowAddBtn} value={title} type="text" placeholder="+ Add another card " onChange={this.handleChange} />
                                {isAdding && <button onClick={this.onAddCard}> Add Card</button>}
                            </form>
                        </div>
           
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
    updateCardsLocation,
    editGroupTitle
}

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)


/**{
 * 
 * 
 * 
 *          TOP
 *             // <Droppable droppableId={group.id} type="CARD">
            //  {(provided)=>(
                // <div className="group-preview" ref={provided.innerRef} {...provided.droppableProps}    >
                  // )}
            //  </Droppable>



        const {group,board,isLabelOpen,openLabel,updateCardsLocation} = this.props
        const { cards } = group
        const { isAdding } = this.state
        const { title } = this.state.card
        return (
            <div className="group-preview" >
                <h3>{group.title}</h3>
                <CardList cards={cards} board={board} updateCardsLocation={updateCardsLocation} isLabelOpen={isLabelOpen} openLabel={openLabel} currGroup={group}/>
                <form action="">
                <input onClick={this.onShowAddBtn} value={title} type="text" placeholder="+ Add another card " onChange={this.handleChange} />
                { isAdding && <button onClick={this.onAddCard}> Add Card</button>}
                </form>
            </div>
        )
    } */