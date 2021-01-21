import React, { Component } from "react"
import { utilService } from "../../services/utilService";
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
import { CallReceived } from "@material-ui/icons";

export class CardAttachmentList extends Component {

    onAddAtach = (ev) => {
        console.log(ev.key);
        ev.preventDefault()
        const { card } = this.props
        const txt = this.state.newCommentTxt
        const comment = { txt, createdAt: Date.now(), createdBy: {}, id: utilService.makeId() }
        const newCard = { ...card }
        newCard.comments.unshift(comment)
    }

    openModal = (ev) => {
        const top = ev.target.offsetTop + 40 + ev.target.offsetParent.offsetTop
        this.props.setCurrModal({name: 'attachment', style: {left: 'calc(50% - 350px)', top}})
    }


    render() {
        const { attachments } = this.props.card
        if (!attachments) return null
        return <div className="attachments">
            <header className="flex">
                <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />
                <h3>Attachments</h3>
            </header>
            {attachments.map(att =>
                <a key={att.id} target="_blank" href={att.url}>
                    <div className="attachment flex align-center">
                        <div>LINK</div>
                        <div className="flex align-start">
                            <h4>{att.title || att.url}</h4>
                            <CallMadeOutlinedIcon />
                        </div>
                    </div>
                </a>
            )}
            <button onClick={this.openModal}>Add an attachment</button>
        </div>
    }
}