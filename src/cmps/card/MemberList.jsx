import React, { Component } from "react";
import { MyAvatar } from "../MyAvatar";
import { MemberListModal } from "./MemberListModal";


export function MemberList(props) {
    const containerRef = React.createRef()

    function openModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        const div = containerRef.current
        const top = div.offsetTop + 50 + div.offsetParent.offsetTop
        const left = ev.target.offsetLeft + ev.target.offsetParent.offsetLeft
        props.setCurrModal({ name: 'members', style: { top , left} })
    }
    const { card } = props

    return (
        <div className="card-members">
            <h5>MEMBERS</h5>
            <div ref={containerRef} className="card-members flex">
                {card.members.map(user => <div onClick={openModal}><MyAvatar key={Math.random()} user={user} /></div>)}
                <div onClick={openModal} className="add-user-button">
                    <MyAvatar user={{ fullname: '+' }} />
                </div>
            </div>

        </div>
    )

}