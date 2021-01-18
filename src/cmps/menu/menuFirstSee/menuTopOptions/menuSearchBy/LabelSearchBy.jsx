import { Component } from 'react'
import { connect } from 'react-redux'

//funcitons:
import { setFilter } from '../../../../../store/actions/boardAction'

class _LabelSearchBy extends Component {

    state = {
        labals: this.props.board.labels,
        isNoLabClickedInMenu: false
        // defaultLabels: this.props.board.labels.defaults
    }
    componentDidMount() {

    }

    toggleNoLab = () => { this.setState({ isNoLabClickedInMenu: !this.state.isNoLabClickedInMenu }) }
    toggleChooseLabel = (labelTitle) => {
        this.props.setFilter(labelTitle)
    }
    render() {
        const { isNoLabClickedInMenu } = this.state
        const { labels } = this.props.board
        if (!labels || !labels.length) return null
        return (
            <section className="searchBy-labels-area">
                <button className="label" onClick={this.toggleNoLab}>
                    <div className="label-color" style={{ backgroundColor: '#b3bac5' }} ></div>
                    <span className="label-title">No Labels</span>
                    {isNoLabClickedInMenu && <span className="label-choosed">✔</span>}
                </button>
                {labels.map((label, idx) => {
                    return <button className="label" key={idx} onClick={(idx) => this.toggleChooseLabel(label.title)}>
                        <div className="label-color" style={{ backgroundColor: label.color }}></div>
                        <span className="label-title">{label.title}</span>
                        {label.isClickedInMenu && <span className="label-choosed">✔</span>}
                    </button>

                })}

            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        filterBy: state.boardModule.filterBy
    }
}
const mapDispatchToProps = {
    setFilter
}
export const LabelSearchBy = connect(mapStateToProps, mapDispatchToProps)(_LabelSearchBy)