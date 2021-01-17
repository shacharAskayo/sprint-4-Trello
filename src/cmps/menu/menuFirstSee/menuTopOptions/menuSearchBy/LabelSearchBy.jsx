import { Component } from 'react'

export class LabelSearchBy extends Component {

    state = {
        labals: this.props.board.labels,
        isNoLabClickedInMenu: false
        // defaultLabels: this.props.board.labels.defaults
    }
    componentDidMount() {

    }

    toggleNoLab = () => { this.setState({ isNoLabClickedInMenu: !this.state.isNoLabClickedInMenu }) }
    toggleChooseLabel = (labelIdx) => {
        // let labels = this.state.labels.map((label, idx) => {
        //     return (labelIdx !== idx) ? label : { ...label, isClickedInMenu=!isClickedInMenu }
        // })

        // this.setState({ labels })
        console.log(labelIdx);
    }
    render() {
        const { isNoLabClickedInMenu } = this.state
        const { labels } = this.props.board
        if (!labels || !labels.length) return null
        return (
            <section className="searchBy-labels-area">
                <button className="label">
                    <div className="label-color" style={{ backgroundColor: '#b3bac5' }} onClick={this.toggleNoLab}></div>
                    <span className="label-title">No Labels</span>
                    {isNoLabClickedInMenu && <span className="label-choosed">✔</span>}
                </button>
                {labels.map((label, idx) => {
                    return <button className="label" key={idx} onClick={(idx) => this.toggleChooseLabel(idx)}>
                        <div className="label-color" style={{ backgroundColor: label.color }}></div>
                        <span className="label-title">{label.title}</span>
                        {label.isClickedInMenu && <span className="label-choosed">✔</span>}
                    </button>

                })}
                {/* {labels[labels.length - 1].map((defLabel, idx) => {
                    return <button className="label" key={idx} onClick={() => this.chooseLabel(defLabel)}>
                        <div className="label-color" style={{ backgroundColor: defLabel.color }}></div>
                        <span className="label-title">{defLabel.title}</span>
                        {label.isClickedInMenu && <div className="label-choosed">✔</div>}
                    </button>
                })} */}
            </section>
        )
    }
}