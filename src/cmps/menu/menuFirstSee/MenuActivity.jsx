import { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../../../services/boardService';

//cmps:
import { CardCommentPreview } from '../../card/CardCommentPreview';



export class MenuActivity extends Component {


    state = {
        backgroundColorAll: '',
        colorAll: '',
        textDecorationAll: '',
        backgroundColorComments: '',
        colorComments: '',
        textDecorationComments: '',
        filterBy: ''
    }

    changeBgClrAndAllActs = () => { this.setState({ backgroundColorAll: 'rgb(0, 121, 191)', colorAll: '#fff', textDecorationAll: 'none', backgroundColorComments: '', colorComments: '', textDecorationComments: '', filterBy: 'all' }) }
    changeBgClr = () => { this.setState({ backgroundColorComments: 'rgb(0, 121, 191)', colorComments: '#fff', textDecorationComments: 'none', backgroundColorAll: '', colorAll: '', textDecorationAll: '', filterBy: '' }) }

    get data() {
        const { board } = this.props
        const { filterBy } = this.state
        const allActivites = boardService.getActivities(board, filterBy)
        return allActivites
    }

    render() {
        const { backgroundColorAll, backgroundColorComments, colorAll, colorComments, textDecorationAll, textDecorationComments } = this.state
        console.log('state', this.state);
        return (
            <section className="menu-activities-section">
                <div className="select-active-filter">
                    <button className="active-filter-btn filter-all" onClick={this.changeBgClrAndAllActs} style={{ backgroundColor: backgroundColorAll, color: colorAll, textDecoration: textDecorationAll }}>All</button>
                    <button className="active-filter-btn filter-comments" onClick={this.changeBgClr} style={{ backgroundColor: backgroundColorComments, color: colorComments, textDecoration: textDecorationComments }}>Comments</button>
                </div>
                <hr className="hr-menu" />
                <CardCommentPreview data={this.data} />
            </section>
        )
    }
}
