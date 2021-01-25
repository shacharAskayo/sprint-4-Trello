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
import {AddDueDateModal} from "./AddDueDateModal.jsx";
// import { CardAction } from "./CardAction";

class _Card extends Component {

    state = {
        card: null,
        currModal: {},
        title: ''
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
            this.setState({ card, title: card.title })
        } else this.setState({ card: null })
    }

    saveCardChanges = async (card, txt) => {
        var { board, loggedUser } = this.props
        const newBoard = {...board}
        if (txt) {
            const activity = cardService.getActivityToAdd(card, loggedUser, txt)
            newBoard.activities= [activity, ...newBoard.activities]
            // board = {...board, activities: [activity, ...board.activities]}
        } 
        await this.props.updateBoardCard(newBoard, card)
        this.loadCard()
    }

    onChangetitle = (ev) => {
        const { value } = ev.target
        this.setState({title: value })
    }

    onSaveTitle = (ev) => {
        if (ev.key && ev.key !== 'Enter') return
        const {card, title} = this.state
        this.saveCardChanges({...card, title} ,'Edited card title')
        ev.currentTarget?.blur()
    }

    closeModal = () =>{
        const {currModal} = this.state
        if (currModal?.name) this.setState({currModal: null})
    }

    setCurrModal = (currModal) => {
        this.setState({currModal})
    }

    render() {
        const { board, loggedUser } = this.props
        const { card, currModal, title } = this.state
        if (!card) return null
        return (
            <Link to={`/board/${board._id}`}>
                <section onClick={this.closeModal} className={"card-modal-screen flex justify-center"}>
                    <div onClick={(ev) => { ev.preventDefault() }} className="card-modal grid">
                        <div className="header flex">
                            <WebIcon />
                            <input
                                type="text"
                                value={title}
                                onChange={this.onChangetitle}
                                onBlur={this.onSaveTitle}
                                onKeyDown={this.onSaveTitle}
                            />
                            <Link to={`/board/${board._id}`}><CloseSharpIcon /></Link>
                        </div>
                        <CardContent setCurrModal={this.setCurrModal} closeModal={this.closeModal} user={loggedUser} board={board} card={card} save={this.saveCardChanges} />
                        <CardMenu setCurrModal={this.setCurrModal} closeModal={this.closeModal}/>
                        <div  onClick={(ev) => {ev.stopPropagation(); ev.preventDefault()}}>
                        <DynamicCardActionModal closeModal={this.closeModal} save={this.saveCardChanges} currModal={currModal} card={card} board={board}/>
                        </div>
                    </div>
                </section>
            </Link>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.userModule.loggedUser, 
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    updateBoardCard
}

export const Card = withRouter(connect(mapStateToProps, mapDispatchToProps)(_Card))

