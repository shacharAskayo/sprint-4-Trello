import React, { Component } from 'react'
import { CardList } from "./CardList";
import { connect } from 'react-redux'
import { loadCards } from '../store/actions/cardActions'
import { addCard,openLabel } from '../store/actions/boardAction'
export class _GroupPreview extends Component {

    state = {
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
        isAdding: false
    }

    componentDidMount() {
        this.props.loadCards(this.props.group)
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


    render() {
        const {group,board,isLabelOpen,openLabel} = this.props
        const { cards } = this.props.group
        const { isAdding } = this.state
        const { title } = this.state.card
        return (
            <div className="group-preview" >
                <h3>{group.title}</h3>
                <CardList cards={cards} board={board} isLabelOpen={isLabelOpen} openLabel={openLabel}/>
                <form action="">
                <input onClick={this.onShowAddBtn} value={title} type="text" placeholder="+ Add another card " onChange={this.handleChange} />
                { isAdding && <button onClick={this.onAddCard}> Add Card</button>}
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
        isLabelOpen:state.boardModule.isLabelOpen
        // labelOpen:state.boardModule.labelOpen
    }
}
const mapDispatchToProps = {
    loadCards,
    addCard,
    openLabel
}

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)


