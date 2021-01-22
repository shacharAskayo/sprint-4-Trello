import React, { Component } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';


export class SortGroupModal extends Component {


    handleSort=(sortBy)=>{
        const {group,sortCards,board,closeModal} = this.props
        sortCards(board,sortBy,group)
        closeModal()
    }
    
    

    render() {
        const {closeModal} =this.props
        return (
            <div className="group-menu sort" >

                <div className="modal-header">
                    <span>   <ArrowBackIosIcon/>  </span>
                    <span > Sort List</span>
                    <span> <CloseSharpIcon onClick={()=>closeModal()}/></span>
                </div>
                <hr />

                <div className='sort-options'>
                        <span onClick={()=>this.handleSort('new')}>Date Created (Newest First)</span>
                        <span onClick={()=>this.handleSort('old')}>Date Created (Oldest First)</span>
                        <span onClick={()=>this.handleSort('name')}>Card Name (Alphabetically)</span>
                </div>

            </div>
        )
    }
}
