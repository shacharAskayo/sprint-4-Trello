import { Component } from "react";
import { LabelListModal } from "./LabelListModal";

export function LabelList(props) {

    function openModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        props.setCurrModal({ name: 'labels', style: { top: '21%', left: 'calc(50% - 100px)' } })
    }

    const { card, board, save } = props
    return (
        <div className="card-labels">
            <h5>LABELS</h5> 
            <div className="label-container flex">
                {card.labels.map(label =>
                    <div onClick={openModal} key={label.id} className={`label flex center`} style={{ backgroundColor: label.color }}>
                        {label.title}
                    </div>
                )}
                <div onClick={openModal} className="add-label flex center">+</div>
            </div>

        </div>
    )

}