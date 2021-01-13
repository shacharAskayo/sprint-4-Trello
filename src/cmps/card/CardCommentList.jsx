import { Component } from "react"
import { utilService } from "../../services/utilService"

export class CardCommentList extends Component {

    state = {
        newCommentTxt: ''

    }

    onInput = ({target}) => {
        const {name, value} = target
        this.setState({[name]: value})
    }

    onAddComment = (ev) => {
        ev.preventDefault()
        const {card } = this.props
        const txt = this.state.newCommentTxt
        const comment = {txt, createdAt: Date.now(), createdBy: {},id: utilService.makeId()}
        const newCard = {...card}
        newCard.comments.unshift(comment)
        this.props.save(newCard)
    }


    render() {
        const { comments } = this.props.card
        return <div className="card-comments">
            <form className="hidden-btn" onSubmit={this.onAddComment}>
                <textarea 
                onChange={this.onInput} 
                name="newCommentTxt" 
                type="text" 
                value={this.state.newCommentTxt} 
                placeholder="Write a comment.."/>
                <button>Save</button>
            </form>
            {comments.map(comment => 
                <div key={comment.id}>
                    <span>{comment.createdBy.fullname}: </span>
                    <span> {comment.txt}</span>
                    <br />
                    <small>At: {comment.createdAt}</small>
                </div>
            )}
        </div>
    }
}