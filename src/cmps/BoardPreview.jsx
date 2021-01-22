import { Link } from 'react-router-dom'
export function BoardPreview({ board }) {

    console.log('the board', board);



    return (

        
        <div style={{ color: 'white' }}>
            <h1>boards</h1>
        </div>



        // <article className="board-preview">
        //     <span>{board.inStock}</span>
        //     <Link to={`/board/${board._id}`}>Details</Link>   |
        //     {/* <button onClick={() => { onDelete(board._id) }}>X</button> */}
        // </article>
    )
}