import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { withRouter } from 'react-router';


function _ShareCardModal(props) {

    function handleFocus(ev) {
        ev.target.select()
    }

    const { closeModal, style, location } = props
    return (
        <div className="share-modal card-action-modal" style={style}>
            <div className="flex justify-center">
                Share
                </div>
            <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
            <hr />
            <small>Link to this card</small>
            <input
                onFocus={handleFocus}
                autoFocus
                type="text"
                value={location.pathname}
            />
        </div>
    )


}
export const ShareCardModal = withRouter(_ShareCardModal)
