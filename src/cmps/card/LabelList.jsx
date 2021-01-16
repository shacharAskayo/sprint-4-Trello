import { Component } from "react";

export class LabelList extends Component {
    state = {
    }

    componentDidMount() {
    }

    render() {
        const { labels } = this.props.card
        return (
            <div>
                <h5>LABELS</h5>
                <div className="label-container flex">
                    {labels.map(label =>
                        <div key={label.id} className={`label is-open`} style={{ backgroundColor: label.color }}>
                            {label.title}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}