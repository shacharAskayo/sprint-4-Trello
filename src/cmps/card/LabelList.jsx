import React, { Component } from "react";

export function LabelList(props) {

    const containerRef = React.createRef()

    function openModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        const div = containerRef.current
        const top = div.offsetTop + 50 + div.offsetParent.offsetTop
        const left = ev.target.offsetLeft + ev.target.offsetParent.offsetLeft
        props.setCurrModal({ name: 'labels', style: { top, left } })
    }

    const { card } = props
    return (
        <div className="card-labels">
            <h5>LABELS</h5> 
            <div className="label-container flex" ref={containerRef}>
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