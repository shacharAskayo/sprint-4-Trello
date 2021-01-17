import { Component } from 'react'
import { boardService } from '../../../services/boardService.js'

//functions:
import { CardCommentPreview } from '../../card/CardCommentPreview.jsx'


export class MenuActivitiesList extends Component {

    get data() {
        const { board } = this.props
        const allActivities = boardService.getActivities(board, 'all')
        return allActivities
    }
    render() {
        return (
            <section className="menu-activities-area">
                <CardCommentPreview data={this.data} />
            </section>
        )
    }
}
