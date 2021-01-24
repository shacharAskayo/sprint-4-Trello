import React, { Component } from 'react'
import {DynamicGroupModal} from '../cmps/DynamicGroupModal'

export class GroupMenu extends Component {


    state={
        currModal:{
            name:''
        }
    }

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();

    }


    componentDidMount() {
    }

    render() {

        const { openInput, copyList, onArchive,openDynamicModal,closeMenu } = this.props
        const {currModal}=this.state
        return (
            <div className="menu-screen" onClick={()=>closeMenu}>

            <div className="group-menu">
                <div className="group-menu-header"> list actions</div>
                <hr />
                <div className="first-section">
                    <span className='item' onClick={openInput}>add card...</span>
                    <span className='item' onClick={copyList}>copy list...</span>
                        <span  className='item' onClick={()=>openDynamicModal('move')}> move list...</span>



                    <span className='item'>watch</span>
                </div>
                <hr />
                <div className="item" onClick={()=>openDynamicModal('sort')}>sort by</div>
                <hr />
                <div className="first-section">
                    <span className='item' > move all cards in this list...</span>
                    <span className='item'> archive all cards in this list</span>
                </div>
                <hr />
                <div className="item" onClick={onArchive}>archive this list</div>




            </div>

            </div>

        )
    }
}
