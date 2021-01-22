import { Component } from 'react'
import { connect } from 'react-redux'
import { Pie } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'

import { getBoardById } from '../store/actions/boardAction'
import { loadUsers } from '../store/actions/userActions'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

class _Dashboard extends Component {
    state = {
        groups: [],
        groupCards: null,
        dataCards: '',
        currGroup: {},
        dataDetails: '',
        cardDetails: null,
        cards: [],
        options: '',
        cardsTitles: [],
        cardsComments: [],
        cardsChecklists: [],
        cardsMembers: [],
        currDash: 'Pie'
    }
    componentDidMount() {
        const { _id } = this.props.board
        if (!_id) return null
        this.props.getBoardById(_id)
        this.setState({
            groups: this.props.board.groups, currGroup: { ...this.props.board.groups[0] }, cards: this.props.board.groups[0].cards
        })
        this.getcardsPerGroup()
        // this.getDetailsPerCard()
    }


    getcardsPerGroup = () => {
        const { groups } = this.state
        const { board } = this.props
        let groupCards =
            groups.reduce((acc, group) => {
                let currGroup = acc[group.title]
                acc[group.title] = currGroup ? (+group.cards.length) : +group.cards.length
                return acc
            }, {})
        this.setState({ groupCards }, () => {
            const groupsTitles = []
            const colors = []
            groups.forEach(group => {
                groupsTitles.push(group.title)
                const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
                colors.push(`rgb(${(groupIdx + 1) * 15},${(groupIdx + 1) * 40},${(groupIdx + 1) * 100})`)
            })
            const dataCards = {
                labels: [...groupsTitles],
                datasets: [{
                    data: Object.values(this.state.groupCards),
                    backgroundColor: [...colors],
                    hoverBackgroundColor: [...colors]
                }]
            };
            this.setState({ dataCards })
        })
    }

    goBack = () => {
        const { board } = this.props
        this.props.history.push(`/board/${board._id}`)
    }
    getDetailsPerCard = () => {
        console.log('this.state.cards:', this.state.cards);
        const cardsTitles = []
        var cardsComments = []
        var cardsChecklists = []
        var cardsMembers = []
        this.state.cards.forEach(card => {
            cardsTitles.push(card.title)
            cardsComments.push(card.comments.length)
            cardsChecklists.push(card.checklists.length)
            cardsMembers.push(card.members.length)
        })
        this.setState({ cardsTitles, cardsComments, cardsChecklists, cardsMembers })

        const dataDetails = {
            labels: [...cardsTitles],
            datasets: [
                {
                    label: 'comments',
                    data: cardsComments,
                    backgroundColor: '#4d4dff',
                    borderWidth: 2
                },
                {
                    label: 'checklists',
                    data: cardsChecklists,
                    backgroundColor: '#ccccff',
                    borderWidth: 2
                },
                {
                    label: 'members',
                    data: cardsMembers,
                    backgroundColor: '#00004d',
                    borderWidth: 2
                }
            ]
        }
        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            suggestedMin: 1,
                            suggestedMax: 10
                        },
                    },
                ],
            },
        }
        this.setState({ dataDetails, options })
    }

    render() {
        const { groups } = this.props.board
        const { currGroup } = this.state
        if (!this.state.dataCards) return <h1>Loading...</h1>
        return (
            <section className="dashboard">
                <div className="dashboard-top">
                    <span className="dashboard-title">Statistics</span>
                    <button className="close-modal-btn" onClick={this.goBack}><CloseRoundedIcon /></button>
                </div>
                {this.state.currDash === 'Bar' && <div className="cards-in-groups">
                    {groups.map((group, idx) => {
                        return <div className="card-in-group" key={idx}
                            onClick={() => {
                                this.setState({ currGroup: group, cards: group.cards }, () => this.getDetailsPerCard())
                            }}
                            style={{ backgroundColor: `rgb(${(idx + 1) * 15},${(idx + 1) * 40},${(idx + 1) * 100})` }}
                        >{group.title}</div>
                    })}
                </div>}
                <div className="stats-modal">

                    <span className="arrow arrow-left" onClick={() => this.setState({ currDash: (this.state.currDash === 'Bar') ? 'Pie' : 'Bar' })}><ArrowLeftIcon /></span>
                    <span className="arrow arrow-right" onClick={() => this.setState({ currDash: (this.state.currDash === 'Pie') ? 'Bar' : 'Pie' })}><ArrowRightIcon /></span>

                    {this.state.currDash === 'Pie' && <section className="pie-section">
                        <div className="pie">
                            <h2 className="pie-title">Cards Per Group</h2>
                            <Pie data={this.state.dataCards} />
                        </div>

                    </section>}
                    {this.state.currDash === 'Bar' && <section className="bar-side">

                        <div className="bar-top">
                            <h1>{currGroup.title}</h1>
                        </div>

                        {this.state.dataDetails && <Bar data={this.state.dataDetails} options={this.state.options} />}
                    </section>}
                </div>


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
    getBoardById,
    loadUsers
}
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)
