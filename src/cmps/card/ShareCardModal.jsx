import CloseSharpIcon from '@material-ui/icons/CloseSharp';


export function ShareCardModal(props) {

    function handleFocus(ev) {
        ev.target.select()
    }

    const { closeModal, style } = props
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
                value={window.location.href}
            />
        </div>
    )


}
