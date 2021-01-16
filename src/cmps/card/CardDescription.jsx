import { Component } from "react"
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

export class CardDescription extends Component {

    state = {
        description: ''
    }

    componentDidMount() {
        const { description } = this.props.card
        this.setState({ description })
    }

    onChangeDesc = (ev) => {
        if (ev?.key && ev.key !== "Enter") return
        ev.currentTarget.blur()
        ev.preventDefault()
        const { card } = this.props
        const { description } = this.state
        this.props.save({ ...card, description },'Edited card description')
    }

    discardChanges = (ev) => {
        ev.currentTarget.blur()
        this.setState({ description: this.props.card.description })
    }


    render() {
        const { description } = this.state
        if (!description) return null
        return <div className="card-description hidden-btn">
            <header className="flex">
                <SubjectRoundedIcon />
                <h3>Description</h3>
            </header>
            {/* <form className="hidden-btn" onSubmit={this.onChangeDesc}>
                <div className="flex">
                
            <textarea 
            name="description" 
            value={description}
            
            />
            </div>

            <button>Save</button>
            </form> */}
            <div className={`hidden-actions-form-container`}>
                <form onKeyDown={this.onChangeDesc} className={`hidden-actions-form`}>
                    <input
                        type="text"
                        onChange={({ target }) => this.setState({ description: target.value })}
                        value={description}
                        autocomplete="off"
                    />
                </form>
                <div className="hidden-actions flex">
                    <button
                        type="button"
                        onClick={this.onChangeDesc}
                    >
                        Save
                    </button>
                    <button
                        onClick={this.discardChanges}
                        className="icon"
                    >
                        <CloseSharpIcon />
                    </button>
                </div>
            </div>
        </div>
    }
}