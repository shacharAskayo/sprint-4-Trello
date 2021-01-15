import { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from './menu/Menu.jsx'


//icons:
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class _BoardHeader extends Component {

    state = {
        isMenuClicked: false
    }

    openMenu = () => { this.setState({ isMenuClicked: true }) }
    closeMenu = () => {
        this.setState({ isMenuClicked: false })
    }
    render() {
        const { isMenuClicked } = this.state
        return (
            <div className="flex board-header" >

                <h4>board header</h4>
                <button className="menu-btn" onClick={this.openMenu}><span><MoreHorizIcon />Show Menu</span></button>
                {isMenuClicked && <Menu closeMenu={this.closeMenu} isMenuClicked={isMenuClicked} />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        reviews: state.reviewModule.reviews,
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {
    // getBoardById,
    // addGroup
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)