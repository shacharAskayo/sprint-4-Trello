import { Link } from "react-router-dom"

export function UserBoardsModal(props) {
    const { boards, closeModal, user } = props
    const userBoards = boards.filter(board => board.createdBy?._id === user?._id)

    function onCloseModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        closeModal()
    }

    return (
        <div onClick={onCloseModal} className="user-menu-screen">
            <div className="user-boards-modal">

                <div className="modal-content flex col">
                    {userBoards && <div className="flex col">
                        <small>My Boards</small>
                        {userBoards.map(board =>
                            <div onClick={() => window.open('#/board/' + board._id, "_self")} className="board-preview flex  align-center">
                                <div className="bg" style={board.style} />
                                <div>{board.title || '(No title...)'}</div>
                            </div>
                        )}
                    </div>}

                    {boards && <div className="flex col">
                        <hr />
                        <small>Boards</small>
                        {boards.map(board =>
                            <div onClick={() => window.open('#/board/' + board._id, "_self")} className="board-preview flex  align-center">
                                <div className="bg" style={board.style} />
                                <div>{board.title || '(No title...)'}</div>
                            </div>
                        )}
                    </div>}
                </div>
            </div>
        </div>
    )
}