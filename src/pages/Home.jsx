import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { BoardList } from '../cmps/BoardList'

class _Home extends Component {
    render() {
        return (
            <section className="home">
                <Link to="/board/b101">Start Here</Link>
                {/* <BoardList /> */}
            </section>
        )

    }


}
const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {}


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)