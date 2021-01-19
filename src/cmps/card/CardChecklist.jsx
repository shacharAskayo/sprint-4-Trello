import { Component } from "react";
import LinearProgressBar from '../LinearProgressBar';
import PlaylistAddCheckSharpIcon from '@material-ui/icons/PlaylistAddCheckSharp';
import { Todo } from "./Todo";
import { Draggable } from "react-beautiful-dnd";

export class CardChecklist extends Component {

    state = {
        isAddOpen: false
    }

    get progress() {
        const { todos } = this.props.checklist
        const doneTodos = todos.filter(todo => todo.isDone)
        return (doneTodos.length / todos.length * 100) || 0
    }
    
    onToggleAdd = () => {
        this.setState({ isAddOpen: !this.state.isAddOpen })
    }

    onRemove = () => {
        this.props.removeChecklist()
    }

    render() {
        const { checklist, idx } = this.props
        return (


            < Draggable draggableId={checklist.id} index={idx} >
                { provided => (
                    <div {...provided.dragHandleProps} checklistId={checklist.id}>
                        <div className="checklist-container" ref={provided.innerRef} {...provided.draggableProps} >
                            <header className="flex space-bt">
                                <div className="flex align-start">
                                    <PlaylistAddCheckSharpIcon />
                                    {checklist.title}
                                </div>
                                <button onClick={this.onRemove}>Delete</button>
                            </header>
                            <LinearProgressBar value={this.progress} />
                            {checklist.todos.map(todo => <Todo key={todo.id} todo={todo} saveTodo={(todo) => { this.props.saveTodo(checklist, todo) }} />)}
                            <div className="add-card-todo">
                                <Todo toggleAdd={this.onToggleAdd} saveTodo={(todo) => { this.props.saveTodo(checklist, todo) }} />
                            </div>
                        </div>
                    </div>

                )}
            </Draggable>
        )

    }
}