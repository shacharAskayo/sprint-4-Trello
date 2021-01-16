import { Component } from 'react'
import { connect } from 'react-redux'

//cmps:
import { ActivityList } from '../../card/ActivityList';



class _MenuActivity extends Component {


    state = {
        backgroundColor: '',
        color: '',
        textDecoration: ''
    }

    changeBgClr = () => { this.setState({ backgroundColor: 'rgb(0, 121, 191)', color: '#fff', textDecoration: 'none' }) }
    render() {
        const { board } = this.props
        const { backgroundColor, color, textDecoration } = this.state
        return (
            <section>
                <div className="select-active-filter">
                    <button className="active-filter-btn filter-all" onClick={this.changeBgClr} style={{ backgroundColor, color, textDecoration }}>All</button>
                    <button className="active-filter-btn filter-comments" onClick={this.changeBgClr} style={{ backgroundColor, color, textDecoration }}>Comments</button>
                </div>
                <hr className="hr-menu" />
                <ActivityList activities={board.activities} />
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {

}
export const MenuActivity = connect(mapStateToProps, mapDispatchToProps)(_MenuActivity)