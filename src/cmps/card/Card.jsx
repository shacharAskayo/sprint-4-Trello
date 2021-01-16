import { connect } from "react-redux";
import { cardService } from "../../services/cardService.js";
import { updateBoardCard } from "../../store/actions/boardAction";
import { withRouter } from "react-router";
import WebIcon from '@material-ui/icons/Web';
import { Component } from "react";
import { CardContent } from "./CardContent";


class _Card extends Component {

    state = {
        card: null
    }

    componentDidMount() {
        this.loadCard()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.cardId !== this.props.match.params.cardId) this.loadCard()
        if (prevProps.board._id !== this.props.board?._id) this.loadCard()
    }

    loadCard = () => {
        const { board } = this.props
        const { cardId } = this.props.match.params
        if (cardId && board.groups) {
            const card = cardService.getCardById(board, cardId)
            this.setState({ card })
        }
    }

    saveCardChanges = async (card) => {
        const { board } = this.props
        const newBoard = await this.props.updateBoardCard(board, card)
        this.setState({card})
    }

    onChangetitle = ({target}) => {
        const {value} = target
        this.setState(prevState => ({card:{...prevState.card, title: value}}))
    }

    onSaveTitle(ev){
        ev.preventDefault()
        this.saveCardChanges(this.state.card)
    }

    render() {
        const { card } = this.state
        if (!card) return null
        return (
            <section className={"card-modal-screen flex center"}>
                <div className="card-modal grid">
                    <div className="header flex">
                        <WebIcon/>
                        <form onSubmit={this.onSaveTitle}></form>
                        <input 
                        type="text"
                        value={card.title}
                        onChange={this.onChangetitle}
                        />
                    </div>
                    <CardContent card={card} save={this.saveCardChanges} />
                    <div className="card-options">
                        options <br/>options <br/>options <br/>options
                    <div className="add-to-card"></div>
                        <div className="card-actions"></div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    updateBoardCard
}

export const Card = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Card))

