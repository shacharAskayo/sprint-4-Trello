import React from 'react'
import { GroupPreview } from "./GroupPreview";

export function GroupList() {

    const style={
        color:'black',
        backgroundColor:'green'
    }
    const boards = [1, 2, 3, 4,5,6,7,8]
    return (
        <div  className="group-container">
            
            {boards.map((board,idx) => <GroupPreview key={idx} board={board} />)}
        cart
        </div>
    )
}

