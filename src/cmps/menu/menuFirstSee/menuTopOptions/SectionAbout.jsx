import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

//icons:
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import CloseIcon from '@material-ui/icons/Close';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

//functions:
import { loadUser } from '../../../../store/actions/userActions.js'

class _SectionAbout extends Component {

    state = {
        description: '',
        isDescClicked: false,
        isDescExist: false
    }

    componentDidMount() {
        this.props.loadUser()
    }

    openDesc = () => { this.setState({ isDescClicked: true }) }
    openEditedDesc = () => { this.setState({ isDescClicked: true }) }
    closeDesc = () => { this.setState({ isDescClicked: false }) }

    onDescChange = (ev) => {
        let value = ev.target.value
        let description = { ...this.state.description }
        description = value
        this.setState({ description })
    }

    saveDesc = () => {
        if (this.state.description)
            this.setState({ isDescClicked: false, isDescExist: true })
        else this.setState({ isDescClicked: false })
    }

    render() {
        const desc = 'It is your board is time to shine! Let people know what this board is used for and what they can expect to see.'
        const { user } = this.props
        const { description, isDescClicked, isDescExist } = this.state
        return (
            <section className="about-section">
                <div className="flex about-section-user">
                    <span className="user-icon"><PermIdentityIcon /></span>
                    <h3 className="made-by">Made by</h3>
                </div>
                <div className="user-details-menu">
                    <span className="user-details-user-icon"><AccountCircleIcon /></span>
                    <Link>{user.fullname}</Link>
                    <span className="user-details-user-name">{user.username}</span>
                </div>
                <div className="flex board-description">
                    <SubjectIcon />
                    <h4 className="description-board">Description</h4>
                    {isDescExist && !isDescClicked && <button className="edit-board-desc-btn" onClick={this.openEditedDesc}>Edit</button>}
                </div>
                {!isDescClicked && <button className={(!isDescExist) ? "board-desc-btn" : "board-desc-btn-with"} onClick={this.openDesc}>
                    <p className="desc-p">
                        {isDescExist ? description : desc}
                    </p>
                </button>}

                {isDescClicked && <div className="edit-board-desc">
                    <textarea className="board-desc-textarea" name="board-desc" id="" cols="30" rows="5" placeholder={desc} onChange={this.onDescChange} value={description}></textarea>
                    <div className="flex desc-tools">
                        <button className="save-desc" onClick={this.saveDesc}>Save</button>
                        <button className="close-desc" onClick={this.closeDesc}><CloseIcon /></button>
                    </div>
                </div>}
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadUser
}
export const SectionAbout = connect(mapStateToProps, mapDispatchToProps)(_SectionAbout)