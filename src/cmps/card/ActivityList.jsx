import { Component } from "react"

//icons:
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
// import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

export class ActivityList extends Component {

    state = {
        isShown: false
    }

    showActivities = () => {
        this.setState({ isShown: !this.state.isShown })
    }

    render() {
        const { activities, inMenu } = this.props
        const { isShown } = this.state
        return <div className="attachments">
            <header className="in-card-section flex space-bt align-end">
                {!inMenu && <div className="flex align-start">
                    <span><PlaylistAddCheckIcon /></span>
                    <h4 className="option-title">Activity</h4>
                </div>}
                {!inMenu && <button onClick={this.showActivities}>{isShown ? 'Hide' : 'Show'} Details</button>}
            </header>
            {isShown || inMenu && activities.map(act =>
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