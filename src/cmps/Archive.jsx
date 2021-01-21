import React, { Component } from 'react'
import SubjectIcon from '@material-ui/icons/Subject';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import PlaylistAddCheckSharpIcon from "@material-ui/icons/PlaylistAddCheckSharp";
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MyAvatar } from './MyAvatar'

export class Archive extends Component {


    render() {
        const { board } = this.props
        return (
            <React.Fragment>

                <h3> ARCHIVE</h3>
                <div className='group-container'>

                    {board.archives.groups.map(group => {
                        return (
                            <div className='group-preview' >

                                <div>
                                    <span className="group-menu-btn" >...</span>
                                    <p>Group Archives </p>
                                </div>
                                <div className={'card-list'} style={{ overflow: 'none' }} >
                                    {group.cards.map((card) => {
                                        return (
                                            <div className='card-preview' style={card.style}   >
                                                <div className="label-container">
                                                    {card.labels.map((label, idx) => {
                                                        return <div key={label.id} className={`label is-close`} style={{ backgroundColor: label.color }}>
                                                        </div>
                                                    })
                                                    }
                                                </div>
                                                <div className={`edit-and-title`} >
                                                    <div>
                                                        <p>{card.title}</p>
                                                    </div>

                                                </div>

                                                <div className="card-icons ">
                                                    <div className="card-icons-section1">
                                                        {card.description && <SubjectIcon />}
                                                        {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                                                        {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                                                        {card.checklists?.length > 0 && <PlaylistAddCheckSharpIcon />}
                                                    </div>
                                                    {card.members?.length > 0 && <div className='members-container'>  {card.members.map(member => <MyAvatar user={member} />)} </div>}
                                                </div>

                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}


                    <div className='group-preview' >

                        <div>
                            <span className="group-menu-btn" >...</span>
                            <p>Cards Archives</p>
                        </div>

                        <div className={'card-list'} style={{ overflow: 'none' }} >
                            {board.archives.cards.map((card) => {
                                return (
                                    <div className='card-preview' style={card.style}   >
                                        <div className="label-container">
                                            {card.labels.map((label, idx) => {
                                                return <div key={label.id} className={`label is-close`} style={{ backgroundColor: label.color }}>
                                                </div>
                                            })
                                            }
                                        </div>
                                        <div className={`edit-and-title`} >
                                            <div>
                                                <p>{card.title}</p>
                                            </div>

                                        </div>

                                        <div className="card-icons ">
                                            <div className="card-icons-section1">
                                                {card.description && <SubjectIcon />}
                                                {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                                                {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                                                {card.checklists?.length > 0 && <PlaylistAddCheckSharpIcon />}
                                            </div>
                                            {card.members?.length > 0 && <div className='members-container'>  {card.members.map(member => <MyAvatar user={member} />)} </div>}
                                        </div>

                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
