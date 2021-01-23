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
        isSmall: false

    }

    componentDidMount() {
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



    render() {
        // var styleCopy = {
        //     isCover: true,
        //     background: {
        //         // backgroundColor: 'lightBlue',
        //         // backgroundImage: 'url(https://st.focusedcollection.com/13735766/i/650/focused_196865912-stock-photo-dense-coniferous-forest-covered-snow.jpg)'
        //     }
        // }
        const { labels, isDragging, isEdit, onOpenLabel, card, isLabelOpen, board, handleChange, title, EnterEditMode, enterEditMode } = this.props
        const { isSmall } = this.state
        const { style } = card
        console.log('wap wap ',card);
        var cardClass = isDragging ? 'card-preview dragging' : 'card-preview'
        var smallCard = isSmall ? 'small' : ''
        var colorBg = (style.background?.backgroundColor) ? 'color-bg' : ''
        return (
            <React.Fragment>
                <Link to={`/board/${board._id}/${card.id}`}>

                    {/* <div className={cardClass} style={isSmall ? { padding: '4px 2px 0px 8px ', ...card.style } : card.style}   > */}
                    <div className={`${cardClass} ${smallCard}`} style={(style.isCover) ? { ...style.background } : {}} >


                        {!style.isCover && (style.background?.backgroundImage || style.background?.backgroundColor) &&
                            <div class={`card-cover ${colorBg}`} style={style.background}>
                            </div>
                        }




                    <div className="details-container">

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
                        <span className={`edit-icon ${labels.length ? 'with-label' : ''}`} onClick={(ev) => enterEditMode(ev, card.id)} >
                            <EditIcon />
                        </span>
                    </div>
                    <div className="card-icons flex align-center">

                        <div className="card-icons-section1 flex align-center">
                            
                            {card.description && <SubjectIcon />}
                            {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                            {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                            {card.checklists?.length > 0 && <PlaylistAddCheckSharpIcon />}

                        </div>

                        {card.members?.length > 0 && <div className='members-container'>  {card.members.map(member => <MyAvatar user={member} />)} </div>}


                    </div>
                        </div>


                    </div>

                </Link >


            </React.Fragment >

        )
    }
}

