import { Component } from "react"
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

export class ActivityList extends Component {

    state = {
        isShown: false
    }

    showActivities = () => {
        this.setState({ isShown: !this.state.isShown })
    }

    render() {
        const { activities } = this.props
        const {isShown} = this.state
        return <div className="attachments">
            <header className="in-card-section flex space-bt align-end">
                <div className="flex align-start">
                    <FormatListBulletedIcon/>
                    <h3>Activity</h3>
                </div>
                <button onClick={this.showActivities}>{isShown ? 'Hide' : 'Show'} Details</button>
            </header>
            {isShown && activities.map(act => 
                <div key={act.id}>
                    <span>{act.createdBy.fullname}: </span>
                    <span> {act.txt}</span>
                    <br />
                    <small>At: {act.createdAt}</small>
                </div>
            )}
        </div>
    }
}