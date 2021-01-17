import { Component } from "react";
import { connect } from "react-redux";
import { AddChecklistModal } from "./AddChecklistModal";
import { LabelListModal } from "./LabelListModal";
import { MemberListModal } from "./MemberListModal";
import { AddAttachmentModal } from "./AddAttachmentModal";


class _DynamicCardActionModal extends Component {

    render() {
        const { card, currModal,save,board, closeModal } = this.props
        switch (currModal?.name) {
            case 'members':
                return <MemberListModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board}/>
            case 'labels':
                return <LabelListModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board}/>
            case 'checklist':
                return <AddChecklistModal card={card} save={save} />
            // case 'dueDate':
            //     return <AddDueDateModal card={card} save={save} />
            case 'attachment':
                return <AddAttachmentModal card={card} save={save} />
            // case 'cover':
            //     return  <AddCover card={card} save={save} />
            // case 'move':
            //     return 
            // case 'copy':
            //     return
            // case 'watch':
            //     return
            // case 'archive':
            //     return
            // case 'share':
            //     return
            default :
            return null
        }
    }
}


const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
}

export const DynamicCardActionModal = connect(mapStateToProps, mapDispatchToProps)(_DynamicCardActionModal)
