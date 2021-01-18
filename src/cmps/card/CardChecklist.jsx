import { Component } from "react";
import LinearProgressBar from '../LinearProgressBar';
import PlaylistAddCheckSharpIcon from '@material-ui/icons/PlaylistAddCheckSharp';
import { Todo } from "./Todo";

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
        const { checklist } = this.props
        return (
            <div className="checklist-container">
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
        )
    }
}