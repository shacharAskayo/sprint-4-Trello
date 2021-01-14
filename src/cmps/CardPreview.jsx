import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { cardService } from "../services/cardService";
import SubjectIcon from '@material-ui/icons/Subject';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';

export class CardPreview extends Component {

    state = {
        labels: [],
        height: (this.props.isLabelOpen)?'fit-content':'7px',
        width:(this.props.isLabelOpen)?'fit-content':'35px'
    }


    componentDidMount() {
        const { styles } = this.state
        const { card, board,isLabelOpen } = this.props
        const labels = cardService.getCardLabels(board, card.labels)
        this.setState({ labels,
        })
    }
    componentDidUpdate(prevProps){
        if(prevProps!==this.props){
            this.setState({
                height: (this.props.isLabelOpen)?'fit-content':'7px',
                width:(this.props.isLabelOpen)?'fit-content':'35px'
            })
        }
    }

onOpenLabel=()=>{
    this.props.openLabel()
}

    render() {
        const { card, board,isLabelOpen } = this.props
        const { labels,height,width } = this.state
        return (
            <div className="card-preview">
             
                <div className="label-container">
                    { labels.map((label, idx) =>{
                        return <div onClick={this.onOpenLabel} key={idx} className={`label ${(isLabelOpen)? "is-open":"is-close"}`} style={{backgroundColor:label.color}}>
                             {isLabelOpen&&label.title}
                              </div>
                              })
                            }
                </div>
                    <Link to={`/board/${board._id}/${card.id}`}>{card.title}
                <div className="card-icons">
                    {card.description && <SubjectIcon />}
                    {card.comments?.length > 0 && <ChatBubbleOutlineRoundedIcon />}
                    {card.attachments?.length > 0 && <AttachFileRoundedIcon style={{ transform: "rotate(35deg)" }} />}
                    {card.checklists?.length > 0 && <CheckBoxIcon />}

                </div>
                    </Link>
            </div>
        )
    }
}
