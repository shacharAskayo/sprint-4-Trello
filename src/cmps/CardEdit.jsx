import React, { Component } from 'react'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import PlaylistAddCheckSharpIcon from "@material-ui/icons/PlaylistAddCheckSharp";
import PaymentIcon from '@material-ui/icons/Payment';

export class CardEdit extends Component {
    render() {
        return (
            <div className="card-edit-modal">
                <div className="mega-card-preview">
                    <input type="text" />
                    <div>
                        <CheckBoxIcon />
                        <ChatBubbleOutlineRoundedIcon />
                        <AttachFileRoundedIcon />
                        <PlaylistAddCheckSharpIcon />
                    </div>
                </div >
                <div className="card-edit-menue">
                    <div>
                        <PaymentIcon />
                        <span className="test">sad</span>
                    </div>
                    <div>

                        <span className="test">sad</span>
                    </div>
                    <div>
                        <span className="test">sad</span>

                    </div>
                    <div>
                        <span className="test">sad</span>

                    </div>
                </div>
            </div>
        )
    }
}
