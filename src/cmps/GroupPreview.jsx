import React, { Component } from 'react'
import { CardList } from "./CardList";


export class GroupPreview extends Component {
    render() {
        return (
            <div className="group-preview" >
                <p>title</p>

                <CardList />
            </div>
        )
    }
}
