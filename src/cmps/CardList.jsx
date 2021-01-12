import React, { Component } from 'react'
import { CardPreview } from "./CardPreview";

export  class CardList extends Component {


    render() {
        const cards = [1, 2, 3, 4,5,6,7,8,2]
        return (
            <div className="card-list">
                {cards.map((card,idx)=><CardPreview key={idx} idx={idx} card={card} />)}
            </div>
        )
    }
}
