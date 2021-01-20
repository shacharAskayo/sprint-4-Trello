import { Component } from 'react'
import { connect } from 'react-redux'
import { Pie } from 'react-chartjs-2';

import { getBoardById } from '../store/actions/boardAction'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

class _Dashboard extends Component {
    state = {
        groups: [],
        groupCards: null,
        dataCards: ''
    }
    componentDidMount() {
        console.log('props', this.props);
        const { _id } = this.props.board
        if (!_id) return null
        this.props.getBoardById(_id)
        console.log('board in dash:', this.props.board);
        this.setState({ groups: this.props.board.groups }, () => this.getcardsPerGroup())
    }


    // getPricePerCategory
    getcardsPerGroup = () => {
        const { groups } = this.state
        let groupCards =
            groups.reduce((acc, group) => {
                let currGroup = acc[group.title]
                acc[group.title] = currGroup ? (+group.cards.length) : +group.cards.length
                return acc
            }, {})
        console.log('groupCards:', groupCards);
        this.setState({ groupCards }, () => {

            const dataCards = {
                labels: [
                    'fisrt',
                    'second',
                    'third'
                ],
                datasets: [{
                    data: Object.values(this.state.groupCards),
                    backgroundColor: [
                        '#f20f25',
                        '#36d136',
                        '#266e8c'
                    ],
                    hoverBackgroundColor: [
                        '#f20f25',
                        '#36d136',
                        '#266e8c'
                    ]
                }]
            };
            this.setState({ dataCards })
        })
    }

    goBack = () => { this.props.history.push('/board') }
    render() {
        console.log('this.state:', this.state);
        if (!this.state.dataCards) return <h1>Loading...</h1>
        return (
            <section className="dashboard">
                <div className="dashboard-top">
                    <span className="dashboard-title">Dashboard</span>
                    <button className="close-modal-btn" onClick={this.goBack}><CloseRoundedIcon /></button>
                </div>

                <Pie data={this.state.dataCards} />
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
    getBoardById
}
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)