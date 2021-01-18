import React, { Component } from "react"
import CloseSharpIcon from '@material-ui/icons/CloseSharp';


export class Todo extends Component {
    state = {
        todo: {
            title: '',
            isDone: false
        },
        isInputFocused: false
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

    toggleIsDone = async(ev) => {
        const { checked } = ev.target
        await this.setState(prevState => ({ todo: { ...prevState.todo, isDone: checked } }))
        console.log();
        this.saveTodo()
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
        if (ev?.key && ev.key !== "Enter") return
        ev && ev.preventDefault()
        if (this.state.todo.id) ev?.currentTarget.blur()
        const { todo } = this.state
        if (!todo.title) return
        this.props.saveTodo(todo)
        if (todo.id) {
            this.setState({ todo })
            this.refInput.current.blur()
        } else {
            this.setState({ isInputFocused: true, todo: { title: '', isDone: false } })

        }
    }


    render() {
        const isAdd = !this.props.todo
        const { isInputFocused } = this.state



        return (
            <section className="card-todo-preview flex align-start">
                <input
                    type="checkbox"
                    onChange={this.toggleIsDone}
                    name="isDone"
                    checked={this.props.todo?.isDone}
                    style={{ visibility: isAdd ? 'hidden' : 'visible' }}
                    />
            <div className={`hidden-actions-form-container  ${isAdd ? 'add' : ''}`}>
                <form onKeyDown={this.saveTodo} className={`hidden-actions-form ${isAdd ? 'add' : ''}`}>
                    <input
                        autoFocus={isInputFocused}
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