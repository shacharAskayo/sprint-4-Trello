import React, { Component } from 'react'
import { CardList } from "./CardList";


export class GroupPreview extends Component {


    render() {
        const {cards} = this.props.group
        return (
            <div className="group-preview" >
                <CardList cards={cards} />
            </div>
        )
    }
}
