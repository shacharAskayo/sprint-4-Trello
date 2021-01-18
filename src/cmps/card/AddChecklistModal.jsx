import { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { utilService } from "../../services/utilService";


export class AddChecklistModal extends Component{
    state = {
        title: 'Checklist'
    }

    onAddChecklist = (ev) => {
        if (ev.key && ev.key !== "Enter") return 
        const { card, save, closeModal } = this.props
        const newChecklist = {
            id: utilService.makeId(),
            title: this.state.title,
            createdAt: Date.now(),
            createdBy: {
                _id: "u101",
                fullname: "Tal Tarablus",
                imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            },
            todos: []
        }
        const newCard = {...card, checklists:[...card.checklists, newChecklist]}
        save(newCard, `added checklist ${newChecklist.title} to card`)
        closeModal()
    }

    handleFocus = (ev) => {
        ev.target.select()
    }

    render() {

        const { card, closeModal, style } = this.props
        return (
            <div className="checklist-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Add Checklist
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <small>Title</small>
                <input 
                autoComplete="off" 
                onFocus={this.handleFocus} 
                autoFocus 
                type="text" name="title" 
                onChange={({ target }) => this.setState({ title: target.value })} value={this.state.title}
                onKeyDown={this.onAddChecklist}
                />
                <button onClick={this.onAddChecklist}>Add</button>
            </div>
        )

    }
}