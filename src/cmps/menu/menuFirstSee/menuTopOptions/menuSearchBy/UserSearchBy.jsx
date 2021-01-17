import { Component } from 'react'
import { MyAvatar } from '../../../../MyAvatar'

export class UserSearchBy extends Component {


    render() {
        const { user } = this.props.board
        if (!user) return null
        return (
            <MyAvatar user={user} />
        )
    }
}