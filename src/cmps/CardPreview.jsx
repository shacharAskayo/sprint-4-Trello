import React, { Component } from 'react'
// import { boardService } from "../services/boardService";

export class CardPreview extends Component {
    render() {
        const { card } = this.props
        return (
            <div className="card-preview">
                <span>
                    {card.title}
                </span>
            </div>
        )
    }
}
