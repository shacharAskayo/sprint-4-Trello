import React, { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { utilService } from "../../services/utilService";


export class AddAttachmentModal extends Component {
    state = {
        url: '',
        title: ''
    }

    onAddAttachment = (ev) => {
        console.log(ev);
        if (!ev.key || ev.key && ev.key === "Enter") {

            const { title, url } = this.state
            const newAttachment = {
                id: utilService.makeId(),
                title: title,
                url: url
            }
            const card = { ...this.props.card, attachments: [...this.props.card.attachments, newAttachment] }
            this.props.save(card, `added attachment to ${newAttachment.title} to card`)
            this.props.closeModal()
        }
    }

    handleInput = (ev) => {
        const { name, value } = ev.target
        this.setState({ [name]: value })
    }


    render() {

        const { closeModal, style } = this.props
        return (
            <div fer className="attachments-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Attach From...
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <small>Attach a link</small>
                <input autoFocus onChange={this.handleInput} onKeyUp={this.onAddAttachment} autoComplete="off" placeholder="Paste any link here..." type="text" name="url" />
                {this.state.url && <small>Link name (optional)</small>}
                {this.state.url && <input ref="linkNameRef" autoComplete="off" onKeyUp={this.onAddAttachment} onChange={this.handleInput} type="text" name="title" />}
                <button onClick={this.onAddAttachment}>Attach</button>
            </div>
        )

    }
}