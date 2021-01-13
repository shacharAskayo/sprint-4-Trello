
import { connect } from "react-redux";
import { CardContent } from "./CardContent";
import { cardService } from "../services/cardService.js";

const { Component } = require("react");

class _Card extends Component {

    state = {
        card: null
    }

    componentDidMount() {
        const {cardId, board} = this.props
        console.log(cardId, board);
        if (cardId) {
            const card = cardService.getCardById(board, cardId)
            this.setState({ card })
        }
    }

    render() {
        const { card } = this.state
        if (!card) return null
        return (
            <section className={"card-modal-screen"}>
                <div className="card-modal">
                    <div className="header">
                    </div>
                    <CardContent card={card} />
                    <div className="card-options">
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
  }
  
  export const Card = connect(mapStateToProps, mapDispatchToProps)(_Card)
  
