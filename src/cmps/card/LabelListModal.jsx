import { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

export class LabelListModal extends Component {

    state = {

    }

    render() {
        const { labels } = this.props.board
        const { card, closeModal } = this.props
        return (
            <div className="label-modal card-action-modal">
                <div className="flex justify-center">
                    Labels
                </div>
                    <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <input type="text" name="filter" placeholder="Search labels..." />
                <small>LABELS</small>
                <div className="label-container">
                    {labels.map(label =><div className="flex"> <div className={`flex space-bt bgc-${label.color?.substring(1)}`} style={{ backgroundColor: label.color }}><span>{label.title}</span>{(card.labels.includes(label.id) && '√')}</div><EditOutlinedIcon/></div>)}
                </div>
                <button>Create a new label</button>

            </div>
        )

    }
}