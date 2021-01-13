import { Link } from 'react-router-dom'
export function BoardPreview({ board }) {

    return (
        <article className="board-preview">

            <span>{board.inStock}</span>
            <Link to={`/board/${board._id}`}>Details</Link>   |
            {/* <button onClick={() => { onDelete(board._id) }}>X</button> */}
        </article>
    )
}