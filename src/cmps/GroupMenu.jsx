import React, { Component } from 'react'

export class GroupMenu extends Component {

    render() {
        const { openInput,copyList } = this.props
        return (
                <div className="group-menu">
                    <div className="group-menu-header"> list actions</div>
                    <hr />
                    <div className="first-section">
                        <span onClick={openInput}>add card...</span>
                        <span onClick={copyList}>copy list...</span>
                        <span>move list...</span>
                        <span>watch</span>
                    </div>
                    <hr />
                    <div className="item">sort by</div>
                    <hr />
                    <div className="item">set list limit</div>
                    <hr />
                    <div className="first-section">
                        <span > move all cards in this list...</span>
                        <span> archive all cards in this list</span>
                    </div>
                    <hr />
                    <div className="item">archive this list</div>
                </div>
        )
    }
}
