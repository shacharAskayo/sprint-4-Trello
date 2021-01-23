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
import { DynamicCardActionModal } from "./card/DynamicCardActionModal";
import { cardService } from '../services/cardService'




export class CardEdit extends Component {
    state = {
        editPos: 100,
        isModalOpen: false,
        currModal: {
            name: '',
            style: {
                position: 'absolute',
                left: '257px',
                'z-index': '20'
            }
        }
    }



    componentDidMount() {
        const { currGroup, board } = this.props
        const idx = board.groups.findIndex(group => group.id === currGroup.id)
        const pos = idx + 1
        const finalPos = 266 * pos
        this.setState({
            // currModal:{...this.state.currModal, style:{...this.state.currModal.style,left:`${finalPos}px`}}
        })
        this.findCardPos()
    }



    findCardPos = () => {
        const { editPos } = this.state
        const { currGroup, card } = this.props
        const idx = currGroup.cards.findIndex(groupCard => groupCard.id === card.id)
        var pos = editPos * idx
        // if(card.labels.length>0 || card.comments.length>0||card.description.length>0) pos+=120
        if (idx === 0) {
            this.setState({ editPos: 40 })
        }
        else if (idx === 1) this.setState({ editPos: 120 })
        else if (pos >= 160) this.setState({ editPos: 160 })
        else {
            this.setState({ editPos: pos })
        }

    }



    edit = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
    }

    openModal = (currName) => {
        console.log('curr name ', currName);
        this.setState({
            isModalOpen: true,
            currModal: { ...this.state.currModal, name: currName }
        })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }


    saveCardChanges = async (card, txt) => {
        var { board, loggedUser } = this.props
        if (txt) {
            console.log(card);
            const activity = cardService.getActivityToAdd(card, loggedUser, txt)
            board = { ...board, activities: [activity, ...board.activities] }
        }
        await this.props.updateBoardCard(board, card)
        this.loadCard()
    }

    loadCard = () => {
        const { board } = this.props
        const { cardId } = this.props.card.id
        if (cardId && board.groups) {
            const card = cardService.getCardById(board, cardId)
            this.setState({ card })
        } else this.setState({ card: null })
    }

    render() {
        const { editPos, currModal, isModalOpen } = this.state
        const { style, copyList, labels, isEdit, updateBoardCard, card, isLabelOpen, board, handleChange, title, enterEditMode, exitEditMode, onArchiveCard, onSave } = this.props
        return (
            <React.Fragment>
                <div onClick={this.edit} className={`${isEdit ? 'edit' : ''}`} >

                    <div className="edit-container">

                        <div className={`card-preview flex col ${isEdit ? 'edit' : ''} `} style={style} >
                            <div className="label-container">
                                {labels.map((label, idx) => {
                                    return <div onClick={() => this.onOpenLabel(card.id)} key={label.id} className={`label ${(isLabelOpen) ? "is-open" : "is-close"}`} style={{ backgroundColor: label.color }}>
                                        {isLabelOpen && label.title}
                                    </div>
                                })
                                }
                            </div>
                            <div className="edit-and-title">
                                <div>
                                    <form onSubmit="return false">

                                        <textarea disabled={!isEdit} onChange={handleChange}
                                            onClick={(ev) => {
                                                ev.preventDefault()
                                            }}
                                            type="text" value={title} />
                                    </form>
                                </div>
                            </div>
                            <div className="card-icons">
                                {card.description && <SubjectIcon />}
                                {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                                {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                                {card.checklists?.length > 0 && <PlaylistAddCheckSharpIcon />}
                            </div>


                        </div>


                        {<div className={'edit-menu'}>
                            <div className="edit-menu-btn"> <PaymentIcon className="edit-menu-icons rotate" /> <Link to={`/board/${board.id}/${card.id}`}>     Open Card  </Link> </div>
                            <div className="edit-menu-btn" onClick={() => this.openModal('labels')} >  <LabelOutlinedIcon className="edit-menu-icons" />  Edit labels </div>
                            <div className="edit-menu-btn" onClick={() => this.openModal('members')} > <PersonOutlineIcon className="edit-menu-icons" /> change members</div>
                            <div className="edit-menu-btn" onClick={() => this.openModal('move')}> <ArrowRightAltIcon className="edit-menu-icons" /> move  </div>
                            <div className="edit-menu-btn" onClick={copyList} > <PaymentIcon className="edit-menu-icons rotate" /> copy </div>
                            <div className="edit-menu-btn" > <AccessTimeIcon className="edit-menu-icons" /> change due date </div>
                            <div className="edit-menu-btn" onClick={onArchiveCard}> <ArchiveOutlinedIcon className="edit-menu-icons" /> archive </div>
                        </div>
                        }


                    </div>
                    <div className='card-save-btn'>
                        <button onClick={onSave} style={{ cursor: 'pointer' }} >Save</button>
                    </div>

                    {
                        isModalOpen && <div className="card-edit-modals" >
                            <DynamicCardActionModal closeModal={this.closeModal} updateBoardCard={updateBoardCard} save={this.saveCardChanges} currModal={currModal} card={card} board={board} />
                        </div>
                    }



                </div >
            </React.Fragment >

        )
    }
}


