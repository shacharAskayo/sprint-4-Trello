import { Component } from 'react'

//icons:
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

//cmps:
import { SectionLabels } from './menuMore/SectionLabels';

export class SectionMore extends Component {

    state = {
        currMore: null
    }

    openLabels = () => { this.setState({ currMore: 'labels' }) }

    render() {
        const { board } = this.props
        const { currMore } = this.state
        return (
            <section className="more-section" style={{ display: "grid" }}>
                <button className="menu-option" onClick={this.openLabels}>
                    <span><LabelOutlinedIcon /></span>
                    <h4 className="option-title">Labels</h4>
                </button>
                <DynamicCmp currMore={currMore} board={board} />
            </section >
        )
    }
}
export function DynamicCmp({ currMore, board }) {
    switch (currMore) {
        case 'labels':
            return <SectionLabels board={board} />

        default:
            return <h1></h1>
    }
}