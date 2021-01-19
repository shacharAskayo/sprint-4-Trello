import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { connect } from "react-redux"
import { cardService } from "../../services/cardService"
import { handleTodoDrag } from "../../store/actions/boardAction"
import { CardChecklist } from "./CardChecklist"

export function CardChecklistList(props) {
    const { card, board } = props

    async function updateChecklist(checklist, todo) {
        let newCard = await cardService.updateChecklistTodo(card, checklist, todo)
        props.save(newCard, `Edited ${checklist.title} checklist`)
    }

    async function onRemoveChecklist(checklist) {
        let newCard = await cardService.removeChecklist(card, checklist)
        props.save(newCard, `removed ${checklist.title} checklist`)
    }

    function handleDrag(res) {
            const newCard =  cardService.handleTodoDrag(board, card, res) 
            props.save(newCard,null)
        
    }

    const { checklists } = card
    return (

        <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId="checklistList" type="cheklist" direction="vertical">
                {provided => (

                    <div ref={provided.innerRef} {...provided.droppableProps} className="">
                        {checklists.map((checklist, idx) => <CardChecklist key={checklist.id} removeChecklist={() => onRemoveChecklist(checklist)} saveTodo={updateChecklist} checklist={checklist} idx={idx} checklistId={checklist.id} />)}
                        {provided.placeholder}


                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
