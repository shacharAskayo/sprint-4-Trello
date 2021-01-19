import { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import { cardService } from '../../services/cardService';


export class LabelListModal extends Component {

    state = {
        filter: ''
    }

    get labels() {
        const { filter } = this.state
        const { labels } = this.props.board
        const regex = new RegExp(filter, 'i')
        return labels.filter(label => label.title.match(regex))
    }

    onAddLabel = (label) => {
        const card = { ...this.props.card, labels: [...this.props.card.labels, label] }
        this.props.save(card, `added label ${label.title}`)
    }

    removeLabel = (labelId) => {
        const labels = this.props.card.labels.filter(label => label.id !== labelId)
        const card = { ...this.props.card, labels }
        this.props.save(card, `removed a label`)
    }

    render() {

        const { card, closeModal, style } = this.props
        return (
            <div className="label-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Labels
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <input autoFocus onChange={({ target }) => this.setState({ filter: target.value })} type="text" name="filter" placeholder="Search labels..." />
                <small>LABELS</small>
                <div className="labels-container">
                    {this.labels.map(label =>
                        <div onClick={() => this.onAddLabel(label)} key={label.id} className="flex">
                            <div className={`flex space-bt bgc-${label.color?.substring(1)}`} style={{ backgroundColor: label.color }}>
                                <span>{label.title}</span>
                                {(card.labels.includes(label) && <span onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); this.removeLabel(label.id) }}>&#10003;</span>)}
                            </div>
                            <EditOutlinedIcon />
                        </div>
                    )}
                </div>
                <button>Create a new label</button>

            </div>
        )

    }
}