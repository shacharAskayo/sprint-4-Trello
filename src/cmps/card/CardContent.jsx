import { Component } from "react";
import { connect } from "react-redux";
import { CardAttachmentList } from "./CardAttachmentList";
import { CardChecklistList } from "./CardChecklistList";
import { CardCommentList } from "./CardCommentList";
import { CardDescription } from "./CardDescription";
import { LabelList } from "./LabelList";

class _CardContent extends Component {

    render() { 
        const {card, save, user} = this.props
        return <div onClick={this.props.closeActionsModal} className="card-content">
            <LabelList card={card} user={user} save={save}/>
            <CardDescription card={card} user={user} save={save}/>
            <CardChecklistList card={card} user={user} save={save}/>
            <CardAttachmentList card={card} user={user} save={save}/>
            <CardCommentList card={card} user={user} save={save}/>
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
