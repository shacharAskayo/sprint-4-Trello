import { Component } from 'react'
// import { connect } from 'react-redux'

export class SectionSearch extends Component {

    state = {
        filterBy: {
            name: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } })
            // ,() => {
            //     this.setFilter(this.state.filterBy)
            // }
        )
    }

    render() {

        const { name } = this.state.filterBy

        return (
            <section className="search-section" style={{ display: "grid" }}>
                <input type="text" name="name" value={name} onChange={this.handleChange} autoComplete='off' />
                <span style={{ fontSize: "13px", marginTop: "18px" }}>Search by term, label, member, or due time</span>
            </section >
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         // filterBy:state.
//     }
// }
// const mapDispatchToProps = {
//     // setFilter
// }
// export const SectionSearch = connect(mapStateToProps, mapDispatchToProps)(_SectionSearch)