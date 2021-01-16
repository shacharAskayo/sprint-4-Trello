import { connect } from "react-redux";
import { cardService } from "../../services/cardService.js";
import { updateBoardCard } from "../../store/actions/boardAction";
import { withRouter } from "react-router";
import WebIcon from '@material-ui/icons/Web';
import { Component } from "react";
import { CardContent } from "./CardContent";
import { Link } from "react-router-dom";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { CardMenu } from "./CardMenu.jsx";
import { DynamicCardActionModal } from "./DynamicCardActionModal.jsx";
// import { CardAction } from "./CardAction";

class _Card extends Component {

    state = {
        card: null,
        currModal: null
    }

    componentDidMount() {
        this.loadCard()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.cardId !== this.props.match.params.cardId) this.loadCard()
        if (prevProps.board._id !== this.props.board._id) this.loadCard()
    }

    loadCard = () => {
        const { board } = this.props
        const { cardId } = this.props.match.params
        if (cardId && board.groups) {
            const card = cardService.getCardById(board, cardId)
            this.setState({ card })
        } else this.setState({ card: null })
    }

    saveCardChanges = async (card, txt) => {
        var { board, loggedUser } = this.props
        if (txt) {
            const activity = cardService.getActivityToAdd(card, loggedUser, txt)
            board = {...board, activities: [activity, ...board.activities]}
        }
        await this.props.updateBoardCard(board, card)
        this.loadCard()
    }

    onChangetitle = ({ target }) => {
        const { value } = target
        this.setState(prevState => ({ card: { ...prevState.card, title: value } }))
    }

    onSaveTitle = () => {
        this.saveCardChanges(this.state.card,'Edited card title')
    }

    render() {
        const { board, loggedUser } = this.props
        const { card, currModal } = this.state
        if (!card) return null
        return (
            <Link to={`/board/${board._id}`}>
                <section className={"card-modal-screen flex justify-center"}>
                    <div onClick={(ev) => { ev.preventDefault() }} className="card-modal grid">
                        <div className="header flex">
                            <WebIcon />
                            <input
                                type="text"
                                value={card.title}
                                onChange={this.onChangetitle}
                                onBlur={this.onSaveTitle}
                            />
                            <Link to={`/board/${board._id}`}><CloseSharpIcon /></Link>
                        </div>
                        <CardContent closeActionsModal={() => this.setState({currModal: null})} user={loggedUser} card={card} save={this.saveCardChanges} />
                        <CardMenu setCurrModal={(currModal) => this.setState({ currModal })} />
                        <DynamicCardActionModal closeModal={() => this.setState({ currModal: null })} currModal={currModal} card={card} board={board}/>
                    </div>
                </section>
            </Link>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.boardModule.loggedUser, 
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    updateBoardCard
}

export const Card = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Card))

