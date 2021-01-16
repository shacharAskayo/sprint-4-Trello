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

    return (
        <div className="card-action-menu flex col">
            <h5>ADD TO CARD</h5>
            <span className="flex align-center" onClick={() => props.setCurrModal('members')}><PersonOutlineIcon/> Members</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('labels')}><LabelOutlinedIcon/> Labels</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('checklist')}><PlaylistAddCheckIcon/> Checklist</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('dueDate')}><AccessTimeIcon/> Due Date</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('attachment')}><AttachFileIcon style={{transform: "rotate(35deg)"}}/> Attachment</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('cover')}><WebIcon/> Cover</span>
            <h5>ACTIONS</h5>
            <span className="flex align-center" onClick={() => props.setCurrModal('move')}><ArrowRightAltIcon/> Move</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('copy')}><FileCopyOutlinedIcon/> Copy</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('watch')}><RemoveRedEyeOutlinedIcon/> Watch</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('archive')}><ArchiveOutlinedIcon/> Archive</span>
            <span className="flex align-center" onClick={() => props.setCurrModal('share')}><ShareOutlinedIcon/> Share</span>
        </div>
    )
}