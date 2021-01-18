import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import React, { Component } from 'react'

export class AddCardInput extends Component {

    render() {

        const {title,onShowAddBtn,handleEnter,onAddCard,discardChanges,handleChange,isAddingToTop} =this.props
        
        return (

            <div className="hidden-actions-form-container">
                <form action="" className="hidden-actions-form">
                    <input  onClick={onShowAddBtn} onKeyDown={handleEnter}  value ={title}  type="text" placeholder="+ Add another card " onChange={handleChange} />
                </form> 
                {/* className="add-card-input-bottom" */}

                <div className="hidden-actions flex">
                    <button  onClick={onAddCard}> Add Card</button>
                    <button onClick={discardChanges} className="icon">
                        <CloseSharpIcon />
                    </button>
                </div>
            </div>

        )
    }
}
