import CloseSharpIcon from '@material-ui/icons/CloseSharp';



export function AddMembersModal(props) {

    function handleFocus(ev) {
        ev.target.select()
    }
    function preventDef(ev) {
        ev.preventDefault()
        ev.stopPropagation()
    }

    const { closeModal, style } = props
    return (
        <div onClick={closeModal} className="add-modal-screen">
            <div onClick={preventDef} className="add-members-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Invite To Board
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <small>As long as your board is not private,<br />any one who get's this link will be added to board automaticly</small>
                <input
                    onFocus={handleFocus}
                    autoFocus
                    type="text"
                    value={window.location.href}
                />
            </div>
        </div>
    )


}

