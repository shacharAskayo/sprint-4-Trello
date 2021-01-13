import { Component } from "react"
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';

export class CardDescription extends Component {

    state = {
        description: ''
    }

    onChangeDesc = (ev) => {
        ev.preventDefault()
        const {card} = this.props
        const {description} = this.state
        this.props.save({...card, description})
    }

    componentDidMount(){
        const {description} = this.props.card
        this.setState({description})
    }

    render() {
        const {description} = this.state
        if(!description) return null
        return <div className="card-description hidden-btn">
            <form className="hidden-btn" onSubmit={this.onChangeDesc}>
                <div className="flex">
                <SubjectRoundedIcon/>
            <textarea 
            name="description" 
            value={description}
            onChange={({target}) => this.setState({description: target.value})}
            />
            </div>

            <button>Save</button>
            </form>
        </div>
    }
}