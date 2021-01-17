import { Component } from "react";
import { LabelListModal } from "../../../../card/LabelListModal";

export class SectionLabels extends Component {
    state = {
        isLabelModalOpen: true
    }

    closeModal = () => { this.setState({ isLabelModalOpen: false }) }

    render() {
        const { isLabelModalOpen } = this.state
        const { board } = this.props
        return (
            <section>
                {isLabelModalOpen && <LabelListModal closeModal={this.closeModal} card={board} board={board} />}
            </section>
        )
    }
}
