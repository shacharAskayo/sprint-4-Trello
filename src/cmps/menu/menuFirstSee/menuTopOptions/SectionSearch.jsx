import { Component } from 'react'

//cmps:
import { LabelSearchBy } from './menuSearchBy/LabelSearchBy'
import { UserSearchBy } from './menuSearchBy/UserSearchBy'

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
        const { board } = this.props
        return (
            <section className="search-section" style={{ display: "grid" }}>
                <input type="text" name="name" value={name} onChange={this.handleChange} autoComplete='off' />
                <span >Search by term, label, member, or due time</span>
                <hr className="hr-menu" />
                <LabelSearchBy board={board} />
                <hr className="hr-menu" />
                <UserSearchBy board={board} />
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