import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class _Home extends Component {
    render() {
        return (
            <section className="home">
                <Link to="/board">Start Here</Link>
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