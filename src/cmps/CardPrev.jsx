import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubjectIcon from '@material-ui/icons/Subject';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import PlaylistAddCheckSharpIcon from "@material-ui/icons/PlaylistAddCheckSharp";
import EditIcon from '@material-ui/icons/Edit';

export class CardPrev extends Component {


    render() {
        const { labels, isEdit, onOpenLabel, card, isLabelOpen, board, handleChange, title, EnterEditMode } = this.props

        return (
            <React.Fragment>
{/* ${isEdit ? 'edit' : ''} */}
                    <div className={`card-preview  `} >

                        <div className="label-container">
                            {labels.map((label, idx) => {
                                return <div onClick={() => onOpenLabel(card.id)} key={label.id} className={`label ${(isLabelOpen) ? "is-open" : "is-close"}`} style={{ backgroundColor: label.color }}>
                                    {isLabelOpen && label.title}
                                </div>
                            })
                            }
                        </div>
                        <div className="edit-and-title">
                            <Link to={`/board/${board._id}/${card.id}`}>
                                <div>
                                    <form action="">

                                        <input disabled={!isEdit} onChange={handleChange}
                                            onClick={(ev) => {
                                                ev.preventDefault()
                                            }}
                                            type="text" value={title} />
                                    </form>
                                </div>
                            </Link>
                            <span className="edit-icon" onClick={(ev) => {
                            }} onClick={EnterEditMode} >
                                <EditIcon />
                            </span>
                        </div>
                        <div className="card-icons">
                            {card.description && <SubjectIcon />}
                            {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                            {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                            {card.checklists?.length > 0 && <PlaylistAddCheckSharpIcon />}
                        </div>

                    </div>

           
                 
            </React.Fragment>

        )
    }
}

