import { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { MyAvatar } from './MyAvatar.jsx'
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

export function _UserMenuModal(props) {

    const { user, closeModal, logout, history } = props

    async function onLogout() {
        if (!user) return
        await logout()
        history.push('/login')
    }
    function onCloseModal(ev){
        ev.preventDefault()
        ev.stopPropagation()
        closeModal()
    }

    return (
        <div onClick={onCloseModal} className="user-menu-screen">
            <div className="user-menu-modal card-action-modal">
                <div className="flex justify-center" style={{ paddingTop: '10px' }}>
                    Account
            </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <div className="user flex">
                    <MyAvatar user={user} />
                    <div className="flex col" style={{ paddingLeft: '5px' }}>
                        <span style={{ lineHeight: '22px' }}>{user?.fullname}</span>
                        <span style={{ fontSize: '0.8em' }}>{user?.email || 'No e-mail to show'}</span>
                    </div>
                </div>
                <hr />

                <section className="user-actions flex col">
                    <Link to={`/user/${user?._id}/activity`}>Activity</Link>
                    <Link to={`/user/${user?._id}/card`}>Cards</Link>
                    <span>Tutorial</span>
                    <hr />
                    {(!user || user?.isGuest) && <Link to="/login">Log In</Link>}
                    <button onClick={onLogout} className="clean-btn" style={{ paddingBottom: '5px' }}>Log Out</button>
                </section>
            </div >
        </div>
    )
}

export const UserMenuModal = withRouter(_UserMenuModal)