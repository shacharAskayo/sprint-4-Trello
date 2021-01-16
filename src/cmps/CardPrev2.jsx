import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SubjectIcon from '@material-ui/icons/Subject';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import PlaylistAddCheckSharpIcon from "@material-ui/icons/PlaylistAddCheckSharp";
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { Archive } from '@material-ui/icons';




export class CardPrev2 extends Component {
    state={
        editPos:85
    }
    componentDidMount(){
        this.findCardPos()
    }

    findCardPos=()=>{
        const {editPos}=this.state
        const {currGroup,card}=this.props
        const idx = currGroup.cards.findIndex( groupCard=>groupCard.id===card.id)
        const top=idx+1
        const pos= editPos*top
        this.setState({editPos:pos})
        
    }



    render() {
        const {editPos}=this.state
        const { labels, isEdit, currGroup, onOpenLabel, card, isLabelOpen, board, handleChange, title, EnterEditMode } = this.props
        return (
            <React.Fragment>

                <div className={`${isEdit ? 'edit' : ''}`}  style={{top:`${editPos}px`}}>

                    <div className="edit-container">

                        <div className={`card-preview ${isEdit ? 'edit' : ''} `}  >
                            <div className="label-container">
                                {labels.map((label, idx) => {
                                    return <div onClick={() => this.onOpenLabel(card.id)} key={label.id} className={`label ${(isLabelOpen) ? "is-open" : "is-close"}`} style={{ backgroundColor: label.color }}>
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


                        { <div className={'edit-menu'}>
                        
                            <div className="edit-menu-btn">  <PaymentIcon className="edit-menu-icons rotate" /> <span>  Open Card </span></div>
                            <div className="edit-menu-btn">  <LabelOutlinedIcon className="edit-menu-icons"  />  Edit labels </div>
                            <div className="edit-menu-btn"> <PersonOutlineIcon className="edit-menu-icons"/> change members</div>
                            <div className="edit-menu-btn"> <ArrowRightAltIcon className="edit-menu-icons"/> move  </div>
                            <div className="edit-menu-btn"> <PaymentIcon className="edit-menu-icons rotate"/> copy </div>
                            <div className="edit-menu-btn"> <AccessTimeIcon className="edit-menu-icons"/> change due date </div>
                            <div className="edit-menu-btn"> <ArchiveOutlinedIcon className="edit-menu-icons"/> archive </div>
                        </div>
                        }


                    </div>

                    <div className='card-save-btn'>
                        { <button onClick={this.onSave} >save</button>}
                    </div>

                </div >
            </React.Fragment >

        )
    }
}


