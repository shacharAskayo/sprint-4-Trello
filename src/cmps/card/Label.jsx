import { Component } from "react";

export class Label extends Component{
    state = {
        labels: []
    }

    componentDidMount(){
        //TODO - load from board
        const {labels} = this.props.card
        this.setState(labels)
    }

    render(){
        const {labels} = this.state
        return (
            <div className="label-container flex">
                {labels.map(label => <span>{label}</span>)}
            </div>
        )
    }
}