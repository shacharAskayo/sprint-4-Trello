import { Component } from 'react'
import { connect } from 'react-redux'


class _BoardHeader extends Component {

    render() {
        return (
            <div className="flex board-header" >
                <h4>board header</h4>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {
    // getBoardById,
    // addGroup
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)