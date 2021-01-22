import React, { Component } from 'react'
import { connect } from "react-redux";
import { MoveGroupModal } from './GroupModals/MoveGroupModal'
import {SortGroupModal} from './GroupModals/SortGroupModal';
import{sortCards,moveGroup} from '../store/actions/boardAction'


export class _DynamicGroupModal extends Component {




    render() {
        const {boards,modalName,group,sortCards,board,closeModal,moveGroup} = this.props
        switch (modalName) {
            case 'move':
                return <MoveGroupModal board={board} moveGroup={moveGroup} group={group} boards={boards} closeModal={closeModal}  />
            case 'sort':
                return <SortGroupModal sortCards={sortCards} board={board} group={group} closeModal={closeModal}  />
            default:
                return null
        }
    }

}




const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards,
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    moveGroup,
    sortCards
}
export const DynamicGroupModal = connect(mapStateToProps, mapDispatchToProps)(_DynamicGroupModal)

