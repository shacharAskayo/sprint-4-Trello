import { Component } from "react";
import { connect } from "react-redux";
import { CardAttachmentList } from "./CardAttachmentList";
import { CardChecklistList } from "./CardChecklistList";
import { CardCommentList } from "./CardCommentList";
import { CardDescription } from "./CardDescription";
import { LabelList } from "./LabelList";
import { MemberList } from "./MemberList";

class _CardContent extends Component {

    render() { 
        const {card, save, user, board} = this.props
        return <div onClick={this.props.closeModal} className="card-content">
            <div className="flex wrap">
            <MemberList setCurrModal={this.props.setCurrModal} card={card}/>
            <LabelList setCurrModal={this.props.setCurrModal} card={card}/>
            </div>
            <CardDescription card={card} user={user} save={save}/>
            <CardChecklistList card={card} user={user} save={save}/>
            <CardAttachmentList setCurrModal={this.props.setCurrModal} card={card}/>
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
