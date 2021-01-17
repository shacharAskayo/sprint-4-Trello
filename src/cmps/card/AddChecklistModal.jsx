import { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { utilService } from "../../services/utilService";


export class AddChecklistModal extends Component{
    state = {
        title: 'Checklist'
    }

    onAddCheckList = () => {
        const newCheckList = {
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
        const card = {...this.props.card, checklists:[...this.props.card.checklists, newCheckList]}
        this.props.save(card, `added checklist${newCheckList.title} to card`)
    }

    handleFocus = (ev) => {
        ev.target.select()
    }

    render() {

        const { card, closeModal, style } = this.props
        return (
            <div onClick={(ev) => {ev.stopPropagation(); ev.preventDefault()}} className="checklist-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Add Checklist
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <small>Title</small>
                <input onFocus={this.handleFocus} autoFocus onChange={({ target }) => this.setState({ title: target.value })} value={this.state.title} type="text" name="title" />
                <button onClick={this.onAddCheckList}>Add</button>
            </div>
        )

    }
}