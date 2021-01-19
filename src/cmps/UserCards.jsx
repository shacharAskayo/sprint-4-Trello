import { Component } from 'react'
import { userService } from '../services/userService.js'

//functions:


export class UserCards extends Component {

    get data() {
        const { user, board } = this.props

        const userCards = userService.getUserCards(board, user)
        return userCards
    }
    render() {
        if (!this.data) return
        return (
            <section className="menu-activities-area">
                <span class="go-back" onClick={this.props.goBack}>Go back</span>
            </section>
        )
    }
}
