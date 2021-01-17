import { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { utilService } from "../../services/utilService";


export class AddAttachmentModal extends Component{
    state = {
        url: '',
        title: ''
    }

    onAddCheckList = () => {
        const newAttachment = {
            id: utilService.makeId(),
            title: this.state.title,
            url: this.stat.url
        }
        const card = {...this.props.card, attachments:[...this.props.card.attachments, newAttachment]}
        this.props.save(card, `added attachment to ${newAttachment.title} to card`)
    }

    handleInput = ({ target }) => {
        const {name, value} = target
        this.setState({ [name]: value })
    }
    

    render() {

        const { card, closeModal, style } = this.props
        return (
            <div onClick={(ev) => {ev.stopPropagation(); ev.preventDefault()}} className="attachments-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Attach From...
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <small>Attach a link</small>
                <input autoFocus onChange={this.handleInput} autoComplete="off" placeholder="Paste any link here..." type="text" name="title" />
                {this.state.title && <small>Link name (optional)</small>}
                {this.state.title && <input  onChange={this.handleInput} type="text" name="title" />}
                <button onClick={this.onAddCheckList}>Attach</button>
            </div>
        )

    }
}