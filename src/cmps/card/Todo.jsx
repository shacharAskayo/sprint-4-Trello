import React, { Component } from "react"
import CloseSharpIcon from '@material-ui/icons/CloseSharp';


export class Todo extends Component {
    state = {
        todo: {
            title: '',
            isDone: false
        },
    }

    componentDidMount() {
        const { todo } = this.props
        if (todo) this.setState({ todo })
        this.refInput = React.createRef()
    }

    handelInput = (ev) => {
        const { name, value} = ev.target
        this.setState(prevState => ({ todo: { ...prevState.todo, [name]: value } }))
    }

    toggleIsDone = (ev) => {
        const {todo} = this.state
        todo.isDone = !todo.isDone
        this.props.saveTodo(todo)
    }

    discardChanges = () => {
        const { todo } = this.props
        if (todo) this.setState({ todo })
        else {
            this.props.toggleAdd()
            this.setState({ todo: { title: '', isDone: false } })
        }
    }

    saveTodo = (ev) => {
        if (ev.key && ev.key !== "Enter") return
        ev.preventDefault()

        const { todo } = this.state
        if (todo.id) ev.currentTarget.blur()
        if (!todo.title) return
        this.props.saveTodo(todo)
        if (todo.id) {
            this.refInput.current.blur()
        } else {
            this.setState({todo: { title: '', isDone: false } })
            this.refInput.current.focus()

        }
    }


    render() {
        const isAdd = !this.props.todo

        return (
            <section className="card-todo-preview flex align-start">
                <span
                    className="checkbox"
                    onClick={this.toggleIsDone}
                    checked={this.props.todo?.isDone}
                    style={{ visibility: isAdd ? 'hidden' : 'visible' ,backgroundColor: this.state.todo.isDone ? '#0179bf' : ''}}
                    >&#10003;</span>
            <div className={`hidden-actions-form-container  ${isAdd ? 'add' : ''}`}>
                <form onKeyDown={this.saveTodo} className={`hidden-actions-form ${isAdd ? 'add' : ''}`}>
                    <input
                        type="text"
                        onChange={this.handelInput}
                        ref={this.refInput}
                        name="title" placeholder="Add an item"
                        value={this.state.todo.title}
                        autoComplete="off"
                        />
                </form>
                <div className="hidden-actions flex">
                    <button
                        type="button"
                        onClick={this.saveTodo}
                        >
                        {isAdd ? 'Add' : 'Save'}
                    </button>
                    <button
                        onClick={this.discardChanges}
                        className="icon"
                        >
                        <CloseSharpIcon />
                    </button>
                </div>
            </div>
        </section>
        )
    }
}