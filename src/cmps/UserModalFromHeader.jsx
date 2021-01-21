import { Component } from 'react'
import { Link } from 'react-router-dom'

import { MyAvatar } from '../cmps/MyAvatar.jsx'
import { UserActivities } from '../cmps/UserActivities.jsx'
import { UserCards } from '../cmps/UserCards.jsx'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export class UserModalFromHeader extends Component {

    state = {
        currAct: null
    }
    goBack = () => { this.setState({ currAct: null }) }
    render() {

        const { currAct } = this.state
        const { user, board } = this.props
        if (!user || !board) return null 
        return (
            <section className="user-modal-from-header">
                <div className="top-modal">
                    <span className="title">Account</span>
                    <button className="close-modal-btn" onClick={this.props.closeModal}><CloseRoundedIcon /></button>
                </div>
                <hr className="hr-menu" />
                <div className="user-details-menu">
                    <span className="user-details-user-icon"> <MyAvatar user={user} /></span>
                    <p>{user.fullname}</p>
                    <span className="user-details-user-name">{user.username}</span>
                </div>
                <hr className="hr-menu" />
                <section className="user-acts">
                    {currAct === null && <div className="acts-btns">
                        <button className="act" onClick={() => this.setState({ currAct: 'Activities' })}>Activity</button>
                        <button className="act" onClick={() => this.setState({ currAct: 'Cards' })}>Cards</button>
                    </div>}
                    <DynamicCmp currAct={currAct} board={board} user={user} goBack={this.goBack} />
                </section>
            </section>
        )
    }
}

function DynamicCmp({ currAct, board, user, goBack }) {
    switch (currAct) {
        case 'Activities':
            return <UserActivities board={board} user={user} goBack={goBack} />
        case 'Cards':
            return <UserCards board={board} user={user} goBack={goBack} />
        default:
            return null
    }
}
