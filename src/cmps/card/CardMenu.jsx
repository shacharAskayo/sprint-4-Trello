import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import WebIcon from '@material-ui/icons/Web';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

export function CardMenu(props) {

    function setModal(modal,ev){
        ev.stopPropagation()
        ev.preventDefault() 
        props.setCurrModal({name: modal})
    }

    return (
        <div onClick={props.closeModal} className="card-action-menu flex col">
            <h5>ADD TO CARD</h5>
            <span className="flex align-center" onClick={(ev) => setModal('members',ev)}><PersonOutlineIcon/> Members</span>
            <span className="flex align-center" onClick={(ev) => setModal('labels', ev)}><LabelOutlinedIcon/> Labels</span>
            <span className="flex align-center" onClick={(ev) => setModal('checklist', ev)}><PlaylistAddCheckIcon/> Checklist</span>
            <span className="flex align-center" onClick={(ev) => setModal('dueDate', ev)}><AccessTimeIcon/> Due Date</span>
            <span className="flex align-center" onClick={(ev) => setModal('attachment', ev)}><AttachFileIcon style={{transform: "rotate(35deg)"}}/> Attachment</span>
            <span className="flex align-center" onClick={(ev) => setModal('cover', ev)}><WebIcon/> Cover</span>
            <h5>ACTIONS</h5>
            <span className="flex align-center" onClick={(ev) => setModal('move', ev)}><ArrowRightAltIcon/> Move</span>
            <span className="flex align-center" onClick={(ev) => setModal('copy', ev)}><FileCopyOutlinedIcon/> Copy</span>
            <span className="flex align-center" onClick={(ev) => setModal('watch', ev)}><RemoveRedEyeOutlinedIcon/> Watch</span>
            <span className="flex align-center" onClick={(ev) => setModal('archive', ev)}><ArchiveOutlinedIcon/> Archive</span>
            <span className="flex align-center" onClick={(ev) => setModal('share', ev)}><ShareOutlinedIcon/> Share</span>
        </div>
    )
}