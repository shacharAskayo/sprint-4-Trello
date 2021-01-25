import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubjectIcon from '@material-ui/icons/Subject';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import PlaylistAddCheckSharpIcon from "@material-ui/icons/PlaylistAddCheckSharp";
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MyAvatar } from './MyAvatar'

export class  CardDetails extends Component {

    state = {
        isSmall: false,

    }

    componentDidMount() {
        this.cardRef = React.createRef()
        const { card } = this.props
        if (card.checklists.length === 0 && card.comments.length === 0 && card.description.length === 0 && card.labels.length === 0 && card.attachments.length === 0 && card.members.length === 0) {
            this.setState({ isSmall: true })
        }
    }

    componentDidUpdate(prevProps) {

        const { card } = this.props
        if (prevProps !== this.props) {
            if (card.checklists.length > 0 || card.comments.length > 0 || card.description.length > 0 || card.labels.length > 0 || card.attachments.length > 0 || card.members.length > 0) {
                this.setState({ isSmall: false })
            }
        }
    }

    enterEditMode = (ev, cardId) => {
        ev.preventDefault()
        ev.stopPropagation()
        const div = this.cardRef.current
        const pos = div.getClientRects()
        console.log(pos);
        var { top, left } = pos[0]
        top -= 5
        left -= 5
        this.props.enterEditMode(cardId, { top, left })
    }

    render() {
        const { labels, isDragging, isEdit, onOpenLabel, card, isLabelOpen, board, handleChange, title, } = this.props
        const { isSmall, editStyle } = this.state
        const { style } = card
        var cardClass = isDragging ? 'card-preview dragging' : 'card-preview'
        const isIcons = card.description || card.comments?.length > 0 || card.attachments?.length > 0 || card.checklists?.length > 0 || card.members?.length > 0
        var smallCard = isSmall ? 'small' : ''
        var colorBg = (style.background?.backgroundColor) ? 'color-bg' : ''
        return (
            <Link to={`/board/${board._id}/${card.id}`}>

                <div className={`${cardClass} ${smallCard}`} style={(style.isCover) ? { ...style.background } : {}} >


                    {!style.isCover && (style.background?.backgroundImage || style.background?.backgroundColor) &&
                        <div class={`card-cover ${colorBg}`} style={style.background}>
                        </div>
                    }

                    <div ref={this.cardRef} className="details-container">

                        <div className="label-container">
                            {labels.map((label, idx) => {
                                return <div onClick={(ev) => onOpenLabel(ev, card.id)} key={label.id} className={`label ${(isLabelOpen) ? "is-open" : "is-close"}`} style={{ backgroundColor: label.color }}>
                                    {isLabelOpen && label.title}
                                </div>
                            })
                            }
                        </div>
                        <div className={isSmall ? 'small-card' : `edit-and-title`} >
                            <p style={(style.isCover && (style.background.backgroundImage || style.background.backgroundColor)) ? { color: 'white', fontWeight: '700' } : {}}>{title}</p>
                            <span className={`edit-icon ${labels.length ? 'with-label' : ''}`} onClick={(ev) => this.enterEditMode(ev, card.id, editStyle)} >
                                <EditIcon />
                            </span>
                        </div>
                        {isIcons && <div className="card-icons flex align-center">

                            <div className="card-icons-section1 flex align-center">

                                {card.description && <SubjectIcon />}
                                {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                                {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                                {card.checklists?.length > 0 && <PlaylistAddCheckSharpIcon />}

                            </div>

                            {card.members?.length > 0 && <div className='members-container'>  {card.members.map(member => <MyAvatar user={member} />)} </div>}

                            {/* {(card.members.length>=2)?`card-avatars-container`: 'card-avatars-container-single'} */}

                        </div>}
                        </div>


                    </div>

            </Link >
        )
    }
}

