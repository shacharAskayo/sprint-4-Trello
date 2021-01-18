import { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { MyAvatar } from "../MyAvatar";


export class MemberListModal extends Component {

    state = {
        filter: ''
    }

    get members() {
        const { filter } = this.state
        const { members } = this.props.board
        const regex = new RegExp(filter, 'i')
        return members.filter(member => member.fullname.match(regex))
    }

    get cardMembersNames(){
        const { members } = this.props.card
        return members.map(member => member.fullname)
    }

    onAddMember = (member) => {
        const card = {...this.props.card, members:[...this.props.card.members, member]}
        this.props.save(card, `added ${member.fullname} to card`)
    }

    removeMember = (currMember) => {
        const members = this.props.card.members.filter(member => {console.log(member.id); return member._id !== currMember._id})
        const card = {...this.props.card, members}
        this.props.save(card, `removed ${currMember.fullname} from card`)
    }

    render() {

        const { card, closeModal, style } = this.props
        return (
            <div onClick={(ev) => {ev.stopPropagation(); ev.preventDefault()}} className="member-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Members
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <input autoFocus onChange={({ target }) => this.setState({ filter: target.value })} type="text" name="filter" placeholder="Search members..." />
                <small>MEMBERS</small>
                <div className="members-container">
                    {this.members.map(member =>
                        <div  onClick={() => this.onAddMember(member)} key={member._id} className={`flex align-center space-bt`} style={{ backgroundColor: member.color }}>
                            <div className="flex align-center" >
                            <MyAvatar user={member}/>
                            <span>{member.fullname}</span>
                            </div>
                            {(this.cardMembersNames.includes(member.fullname) && <span  onClick={(ev) => {ev.stopPropagation(); ev.preventDefault(); this.removeMember(member)}} style={{color: '#596880'}}>&#10003;</span>)}
                        </div>)}
                </div>
                {/* <button>Show other team members</button> */}

            </div>
        )

    }
}