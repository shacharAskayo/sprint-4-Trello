import { Component } from 'react'
import { MyAvatar } from '../../../../MyAvatar'

export class UserSearchBy extends Component {

    componentDidMount() {
        console.log('123212321232123432123432345321');
    }
    render() {
        const { user } = this.props.board
        if (!user) return null
        console.log('user in myAvatar:', user);
        return (
            <section>
                <div>hey?</div>
                <MyAvatar user={user} />
            </section>
        )
    }
}