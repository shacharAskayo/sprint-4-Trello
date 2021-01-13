import React from 'react'
import { GroupPreview } from "./GroupPreview";

export function GroupList(props) {

    const style={
        color:'black',
        backgroundColor:'green'
    }
    const groups= props.groups
    return (
        <div  className="group-container">
            {groups &&groups.map((group,idx) => <GroupPreview key={idx} group={group} />) }
        </div>
    )
}

