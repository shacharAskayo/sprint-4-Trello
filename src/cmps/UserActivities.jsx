import { Component } from 'react'
import { userService } from '../services/userService.js'

//functions:
import { CardCommentPreview } from '../cmps/card/CardCommentPreview.jsx'


export class UserActivities extends Component {

    get data() {
        const { user, board } = this.props

        const userActivities = userService.getUserActivities(board, user)
        return userActivities
    }
    render() {
        if (!this.data) return
        return (
            <section className="menu-activities-area">
                <span className="go-back" onClick={this.props.goBack}>Go back</span>
                <section className="activities">
                    <CardCommentPreview data={this.data} />
                </section>
            </section>
        )
    }
}
