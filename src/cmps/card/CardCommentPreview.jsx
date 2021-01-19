import { MyAvatar } from "../MyAvatar"

export function CardCommentPreview({data}){
    return(
    data.map(obj => 
        <div className="card-comment flex" key={Math.random()}>
            <MyAvatar user={obj.createdBy}/>
            <div className="flex wrap">
            <h5>{obj.createdBy.fullname}: </h5>
            {obj.card ? <span>{obj.txt} in: {obj.card.title}</span> : <pre>{obj.txt}</pre> }
            <small>At: {obj.createdAt}</small>
            </div>
        </div>
    )
    )
}