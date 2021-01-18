import { Component } from "react";
import { MyAvatar } from "../MyAvatar";
import { MemberListModal } from "./MemberListModal";


export function MemberList(props) {

    function openModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        props.setCurrModal({ name: 'members', style: { top: '21%', left: 'calc(50% - 300px)' } })
    }
    const { card, save, user, board } = props

    return (
        <div className="card-members">
            <h5>MEMBERS</h5>
            <div className="card-members flex">
                {card.members.map(user => <div onClick={openModal}><MyAvatar key={Math.random()} user={user} /></div>)}
                <div onClick={openModal} className="add-user-button">
                    <MyAvatar user={{ fullname: '+' }} />
                </div>
            </div>

        </div>
    )

}