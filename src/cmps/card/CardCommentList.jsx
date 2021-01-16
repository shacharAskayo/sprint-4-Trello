import { Component } from "react"
import { utilService } from "../../services/utilService"
import { CardCommentPreview } from "./CardCommentPreview"
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { cardService } from "../../services/cardService";

export class CardCommentList extends Component {

    state = {
        newCommentTxt: '',
        isShown: false

    }

    showActivities = () => {
        this.setState({ isShown: !this.state.isShown })
    }


    onInput = ({target}) => {
        const {name, value} = target
        this.setState({[name]: value})
    }

    onAddComment = (ev) => {
        if (ev?.key && ev.key === "Enter") return
        ev.preventDefault()
        ev.currentTarget.blur()
        const {card, user } = this.props
        const txt = this.state.newCommentTxt
        const comment = cardService.getCommentToAdd(txt, user)
        const newCard = {...card}
        newCard.comments.unshift(comment)
        this.props.save(newCard)
        this.setState({newCommentTxt: ''})
    }
    
    get data(){
        const { comments, activities } = this.props.card
        if (!this.state.isShown) return comments
        else {
            const data = [...comments,...activities]
            return   data.sort((a ,b) =>  b.createdAt - a.createdAt )
        }
    }


    render() {
        const {isShown} = this.state
        return <div className="card-comments">
            <header className="in-card-section flex space-bt align-end">
                <div className="flex align-start">
                    <FormatListBulletedIcon/>
                    <h3>Activity</h3>
                </div>
                <button onClick={this.showActivities}>{isShown ? 'Hide' : 'Show'} Details</button>
            </header>
            <div className={`hidden-actions-form-container`}>
                <form onSubmit={(ev => ev.preventDefault())} className={`hidden-actions-form`}>
                    <textarea
                        type="text"
                        onChange={this.onInput}
                        value={this.state.newCommentTxt}
                        autocomplete="off"
                        placeholder="Write a comment.."
                        name="newCommentTxt"
                    />
                </form>
                <div className="hidden-actions flex">
                    <button type="button" 
                    className={this.state.newCommentTxt ? '': 'disabled'}
                    onClick={this.onAddComment}
                    >
                        Save
                    </button>
                
                </div>
            </div>
            <CardCommentPreview data={this.data}/>
        </div>
    }
}