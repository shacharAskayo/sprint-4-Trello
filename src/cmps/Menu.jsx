import { Component } from 'react'
import { connect } from 'react-redux'

class _Menu extends Component {


    render() {
        return (
            <section className="menu">
                <h1>Menu!!</h1>
            </section>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        reviews: state.reviewModule.reviews
    }
}
const mapDispatchToProps = {}
export const Menu = connect(mapStateToProps, mapDispatchToProps)(_Menu)