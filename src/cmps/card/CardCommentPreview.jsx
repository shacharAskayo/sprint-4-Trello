import { MyAvatar } from "../MyAvatar"
import { TimeDisplay } from "../TimeDisplay"

export function CardCommentPreview({data}){
    return(
    data.map(obj => 
        <div className="card-comment flex" key={Math.random()}>
            <MyAvatar user={obj.createdBy}/>
            <div className="flex wrap">
            <h5>{obj.createdBy?.fullname}: </h5>
            {obj.card ? <span>{obj.txt} in: {obj.card.title}</span> : <pre>{obj.txt}</pre> }
            <span className="time"> <TimeDisplay time={obj.createdAt}/> </span>
            </div>
        </div>
    )
    )
}