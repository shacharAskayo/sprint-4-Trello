import { Component } from "react"
import { utilService } from "../../services/utilService";
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';

export class CardAttachmentList extends Component {

    onAddAtach = (ev) => {
        console.log(ev.key);
        ev.preventDefault()
        const {card } = this.props
        const txt = this.state.newCommentTxt
        const comment = {txt, createdAt: Date.now(), createdBy: {},id: utilService.makeId()}
        const newCard = {...card}
        newCard.comments.unshift(comment)
    }

    render() {
        const {attachments} = this.props.card
        if(!attachments) return null
        return <div className="attachments">
            <div className="flex">
            <AttachFileRoundedIcon style={{transform: "rotate(35deg)"}}/>
            <h3>Attachments</h3>
            </div>
            {attachments.map(att => <a key={att.id} target="_blank" href={att.url}><h4>{att.title}</h4></a>)}
        </div>
    }
}