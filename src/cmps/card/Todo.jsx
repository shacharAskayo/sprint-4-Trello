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

    handelInput = async ({ target }) => {
        const { name, value, checked, type } = target
        if (type === 'checkbox') {
            await this.setState(prevState => ({ todo: { ...prevState.todo, [name]: checked } }))
            this.saveTodo()
        } else this.setState(prevState => ({ todo: { ...prevState.todo, [name]: value } }))
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
        ev.preventDefault()
        if (this.state.todo.id) ev.currentTarget.blur()
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
            <div className={`card-todo-preview hidden-actions-form-container ${isAdd ? 'add' : ''}`}>
                <form onKeyDown={this.saveTodo} className={`hidden-actions-form ${isAdd ? 'add' : ''}`}>
                    <input
                        type="checkbox"
                        onChange={this.handelInput}
                        name="isDone"
                        checked={this.state.todo.isDone}
                        style={{ visibility: isAdd ? 'hidden' : 'visible' }}
                    />
                    <input
                        autoFocus={isInputFocused}
                        type="text"
                        onChange={this.handelInput}
                        ref={this.refInput}
                        name="title" placeholder="Add an item"
                        value={this.state.todo.title}
                        autocomplete="off"
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
        )
    }
}