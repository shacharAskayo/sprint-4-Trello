import { Component } from "react";
import { connect } from "react-redux";
import { AddChecklistModal } from "./AddChecklistModal";
import { LabelListModal } from "./LabelListModal";
import { MemberListModal } from "./MemberListModal";
import { AddAttachmentModal } from "./AddAttachmentModal";
import { AddDueDateModal } from "./AddDueDateModal";
import { AddCoverModal } from "./AddCoverModal";
import { MoveCardModal } from "./MoveCardModal";
import { CopyCardModal } from "./CopyCardModal";
import { ShareCardModal } from "./ShareCardModal";


class _DynamicCardActionModal extends Component {

    render() {
        const { card, currModal,save,board, closeModal } = this.props
        switch (currModal?.name) {
            case 'members':
                return <MemberListModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board}/>
            case 'labels':
                return <LabelListModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board}/>
            case 'checklist':
                return <AddChecklistModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board}/>
            case 'dueDate':
                return <AddDueDateModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board} />
            case 'attachment':
                return <AddAttachmentModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board} />
            case 'cover':
                return  <AddCoverModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board} />
            case 'move':
                return <MoveCardModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board} />
                case 'copy':
                return <CopyCardModal style={currModal.style} closeModal={closeModal} card={card} save={save} board={board} />
            // case 'watch':
            //     return
            // case 'archive':
            //     return
            case 'share':
                return <ShareCardModal style={currModal.style} closeModal={closeModal} />
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
