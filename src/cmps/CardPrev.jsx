import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubjectIcon from '@material-ui/icons/Subject';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import PlaylistAddCheckSharpIcon from "@material-ui/icons/PlaylistAddCheckSharp";
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {MyAvatar} from './MyAvatar'

export class CardPrev extends Component {

    state = {
        isSmall: false

    }

    componentDidMount() {
        const { card } = this.props
        console.log(card);
        if (card.comments.length === 0 && card.description.length === 0 && card.labels.length === 0 && card.attachments.length === 0 && card.members.length === 0) {
            this.setState({ isSmall: true })
        }
    }

    componentDidUpdate(prevProps) {
        const { card } = this.props
        if (prevProps !== this.props) {
            if (card.comments.length > 0 || card.description.length > 0 || card.labels.length > 0 || card.attachments.length>0||card.members.length>0) {
                this.setState({ isSmall: false })
            }
        }
    }



    render() {
        const { labels, isEdit, onOpenLabel, card, isLabelOpen, board, handleChange, title, EnterEditMode, enterEditMode } = this.props
        const { isSmall } = this.state


        return (
            <React.Fragment>
                <Link to={`/board/${board._id}/${card.id}`}>
                    <div className={`card-preview `} style={isSmall ? { padding: '4px 8px 2px' } : card.style}   >
                        <div className="label-container">
                            {labels.map((label, idx) => {
                                return <div onClick={(ev) => onOpenLabel(ev, card.id)} key={label.id} className={`label ${(isLabelOpen) ? "is-open" : "is-close"}`} style={{ backgroundColor: label.color }}>
                                    {isLabelOpen && label.title}
                                </div>
                            })
                            }
                        </div>
                        <div className={isSmall ? 'small-card' : `edit-and-title`} >
                            <div>
                                <form action="">

                                    <p>{title}</p>
                                </form>
                            </div>
                            <span className="edit-icon" onClick={(ev) => enterEditMode(ev, card.id)} >
                                <EditIcon />
                            </span>
                        </div>
                        <div className="card-icons ">

                            <div className="card-icons-section1">

                            {card.description && <SubjectIcon />}
                            {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                            {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                            {card.checklists?.length > 0 && <PlaylistAddCheckSharpIcon />}

                            </div>
                                
                            {card.members?.length > 0 && <div className='members-container'>  {card.members.map(member=> <MyAvatar user={member}/>)} </div>}
                            
                            {/* {(card.members.length>=2)?`card-avatars-container`: 'card-avatars-container-single'} */}

                        </div>

                    </div>

                </Link>


            </React.Fragment>

        )
    }
}

