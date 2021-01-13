import React, { Component } from 'react'
import { boardService } from '../services/boardService';
import { CardPreview } from "./CardPreview";

export class CardList extends Component {
    state = {
        card:{
            createdBy:{},
            id:'',
            title:'',
            description:'',
            createdAt:Date.now(),
            dueDate:'',
            style:{},
            comments:[],
            checklists:[],
            attachments:[],
            members:[],
            labels:[]
        },
        isAdding: false
    }

    onShowAddbtn = () => {
        this.setState({ isAdding: true })
    }
    handleChange = (ev) => {
        const { card} = this.state
        const { value } = ev.target
        this.setState({ 
        card:{...card,title:value}
         })
    }
    onAddCard = async () => {
        const { card} = this.state
        // await boardService.updateCard(card)
        this.setState({
            card:{...card,title:''},
            isAdding:false 
      })
    }

    render() {
        const { cards } = this.props
        const { isAdding } = this.state
        const { title } = this.state.card
        return (
            <div className="card-list">
                {cards.map((card, idx) => <CardPreview key={idx} idx={idx} card={card} />)}
                <input onClick={this.onShowAddbtn} value={title} type="text" placeholder="+ Add another card " onChange={this.handleChange} />
                { isAdding && <button onClick={this.onAddCard}> Add Card</button>}
            </div>
        )
    }
}
