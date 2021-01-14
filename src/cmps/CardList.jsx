import React, { Component } from 'react'
import { CardPreview } from "./CardPreview";

export class CardList extends Component {
 

    render() {
        const { cards,board,isLabelOpen,openLabel } = this.props
        return (
            <div className="card-list">
                {cards.map((card, idx) => <CardPreview board={board} key={idx} idx={idx} card={card} isLabelOpen={isLabelOpen} openLabel={openLabel} />)}
            </div>
        )
    }
}
