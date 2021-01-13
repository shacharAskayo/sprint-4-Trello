import React, { Component } from 'react'
// import { boardService } from "../services/boardService";

export class CardPreview extends Component {
    render() {
        return (
            <div className="card-preview">
                CARD {this.props.idx + 1}
            </div>
        )
    }
}
