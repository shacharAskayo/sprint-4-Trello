import { cardService } from "../../services/cardService"
import { CardChecklist } from "./CardChecklist"

export function CardChecklistList(props) {
    const {card} = props
    
    async function updateChecklist(checklist, todo){
        let newCard = await cardService.updateChecklistTodo(card, checklist, todo)
        props.save(newCard, `Edited ${checklist.title} checklist`)
    }
    
    async function onRemoveChecklist(checklist){
        let newCard = await cardService.removeChecklist(card, checklist)
        props.save(newCard,`removed ${checklist.title} checklist`)
    }
    
    const { checklists } = card
    return (
        <div>
            {checklists.map(checklist => <CardChecklist key={checklist.id} removeChecklist={() => onRemoveChecklist(checklist)} saveTodo={updateChecklist} checklist={checklist} />)}
        </div>
    )
}