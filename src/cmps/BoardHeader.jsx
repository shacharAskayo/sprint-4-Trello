import { Component } from 'react'
import { connect } from 'react-redux'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';


class _BoardHeader extends Component {

    render() {
        const {openArchive} = this.props


        return (
            <div className="flex board-header" >
                <h4>board header</h4>
                <ArchiveOutlinedIcon onClick={openArchive}/>
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