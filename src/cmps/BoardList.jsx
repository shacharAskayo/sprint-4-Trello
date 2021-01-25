import { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoards, addBoard } from '../store/actions/boardAction.js'
import { BoardPreview } from './BoardPreview'
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { BoardsPick } from '../pages/BoardsPick'
import { HomePickModal } from './HomePickModal'
import { Link } from 'react-router-dom';
import { templateService } from '../services/templateService.js'
import Templates from './Templates.jsx';
import { TemplatePreview } from './TemplatePreview'

import img  from '../templates/templatesBg/falafel.gif'
import img2  from '../templates/templatesBg/falafel-bg.png'
import img3  from '../templates/templatesBg/design-system.png'
import img4  from '../templates/templatesBg/design.png'
import img5  from '../templates/templatesBg/buisness-template.png'
import statisticsScreenshot from '../templates/templatesBg/dashboard-screenshot.png'
import menuscreenshot from '../templates/templatesBg/menuDesc-screenshot.png'
import chartScreenshot from '../templates/templatesBg/chart-screenshot.png'
import mongoScreenshot from '../templates/templatesBg/mongo-screenshot.png'
import bugScreenshot from '../templates/templatesBg/bug-screenshot.png'
import presentation from '../templates/templatesBg/presentation.jpg'

class _BoardList extends Component {

    state = {
        userBoards: [],
        isModalOpen: false,
        currTemplate: null,
        templates: [],
        type: '',
        isTemplatesOpen: false,
        isPreviewOpen: false
    }

    componentDidMount() {
        const templates = templateService.query()
        this.setState({ templates })
        this.props.loadBoards()
        const { boards, loggedUser } = this.props
        if (boards && loggedUser) {
            const userBoards = boards.filter(board => board.createdBy?._id === loggedUser?._id)
            this.setState({ userBoards })
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const { boards, loggedUser } = this.props
            const userBoards = boards.filter(board => board.createdBy?._id === loggedUser?._id) //shuold be on server side
            this.setState({ userBoards })
        }
    }

    closeModal = (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        this.setState({ isModalOpen: false })
    }

    openModal = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.setState({ isModalOpen: true })
    }

    openTemplates = () => {

    }


    OnChoosingCategory = (type) => {
        this.setState({ type, isTemplatesOpen: true, isPreviewOpen: false })
    }

    goBackToBoard =  async (template) => {
        if (template) {
            delete template.templateImg
            delete template.description
            
            const board= await this.props.addBoard(template)
            this.props.history.push(`/board/${board._id}`)
        } 

        this.setState({ isTemplatesOpen: false, isPreviewOpen: false })
    }

    setTemplatePreview = (template) => {
        this.setState({ currTemplate: template, isPreviewOpen: true, isTemplatesOpen: false })
    }



    render() {
        console.log(img);
        const { boards, loggedUser, addBoard } = this.props
        const { userBoards, isModalOpen, templates, type, isTemplatesOpen,isPreviewOpen,currTemplate } = this.state
        if (!boards) return null
        if (!userBoards) return null
        return (
            <div className='home-container' onClick={this.closeModal}>


                <aside>

                    <div className='aside-btn'>
                        <span> <DashboardIcon /></span>
                        <span onClick={()=>this.goBackToBoard(null)}>Boards </span>
                    </div>

                    <div onClick={this.openTemplates} className='aside-btn'>
                        <span><FileCopyIcon /></span>
                        <span>Templates </span>
                    </div>
                    <div>
                        <ul>
                            <li onClick={() => this.OnChoosingCategory('Business')}>business</li>
                            <li onClick={() => this.OnChoosingCategory('Cooking')}>Cooking</li>
                            <li onClick={() => this.OnChoosingCategory('Design')}>Design</li>
                            <li onClick={() => this.OnChoosingCategory('Projact Managment')}>Projact Managment</li>
                            <li onClick={() => this.OnChoosingCategory('sales')}>sales</li>
                        </ul>
                    </div>

                </aside>



                {!isTemplatesOpen && !isPreviewOpen && <BoardPreview boards={boards} userBoards={userBoards} openModal={this.openModal} /> }
                
                {isModalOpen && <HomePickModal closeModal={this.closeModal} loggedUser={loggedUser} addBoard={addBoard} />}

                {isTemplatesOpen && <Templates setTemplatePreview={this.setTemplatePreview} templates={templates} type={type} /> } 

                {isPreviewOpen && currTemplate&&  <TemplatePreview template={currTemplate} goBackToBoard={this.goBackToBoard}/>}

            </div>


        )
    }
}





const mapStateToProps = (state) => {
    return {
        boards: state.boardModule.boards,
        loggedUser: state.userModule.loggedUser
    }
}
const mapDispatchToProps = {
    loadBoards,
    addBoard
}
export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)