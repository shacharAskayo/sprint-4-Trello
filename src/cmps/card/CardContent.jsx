import { Component } from "react";
import { connect } from "react-redux";
import { ActivityList } from "./ActivityList";
import { CardAttachmentList } from "./CardAttachmentList";
import { CardCommentList } from "./CardCommentList";
import { CardDescription } from "./CardDescription";
import { Label } from "./Label";

class _CardContent extends Component {

    render() { 
        const {card} = this.props
        return <div className="card-content">
            <Label card={card} save={this.props.save}/>
            <CardDescription card={card} save={this.props.save}/>
            {/* <Checklist checklists={card.checklists}/> */}
            <CardAttachmentList card={card} save={this.props.save}/>
            <ActivityList activities={card.activities}/>
            <CardCommentList card={card} save={this.props.save}/>
        </div>
    }
}


const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
}

export const CardContent = connect(mapStateToProps, mapDispatchToProps)(_CardContent)
