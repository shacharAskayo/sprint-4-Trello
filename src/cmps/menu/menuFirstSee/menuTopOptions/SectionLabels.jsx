import { Component } from "react";
import { connect } from 'react-redux'

//icons:
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


//functions:
import { editCurrLabel } from '../../../../store/actions/boardAction'

class _SectionLabels extends Component {
    state = {
        filter: '',
        filterLabel: '',
        isModalOpen: false,
        isFromLabel: false,
        colorsOpts: [
            { color: '#61bd4f', isSelected: false },
            { color: '#f2d600', isSelected: false },
            { color: '#ff9f1a', isSelected: false },
            { color: '#eb5b46', isSelected: false },
            { color: '#c377e0', isSelected: false },
            { color: '#0079bf', isSelected: false },
            { color: '#01c2df', isSelected: false },
            { color: '#52e898', isSelected: false },
            { color: '#ff78cb', isSelected: false },
            { color: '#344563', isSelected: false }
        ],
        label: {
            color: '',
            title: '',
            id: ''
        }
    }

    componentDidMount() {
        console.log('labels:', this.props.board.labels);
    }

    get labels() {
        const { filter } = this.state
        const { labels } = this.props.board
        if (!labels) return null
        const regex = new RegExp(filter, 'i')
        return labels.filter(label => label.title.match(regex))
    }
    onOpenModal = () => { this.setState({ isModalOpen: true }) }
    onCloseModal = () => { this.setState({ isModalOpen: false, isFromLabel: false }) }

    onOpenModalWithLabel = (currLabel) => {

        let color = this.state.label.color
        let title = this.state.label.title
        let id = this.state.label.id
        color = currLabel.color
        title = currLabel.title
        id = currLabel.id
        let label = this.state.label
        label = { color, title, id }
        this.setState({ label })

        var selectedColor = this.state.colorsOpts.find(currColor => {
            return currColor.color === currLabel.color
        })
        console.log('selectedColor:', selectedColor);

        let colorsOpts = this.state.colorsOpts.map(currColor => {
            return (currColor.color === selectedColor.color) ? { ...currColor, isSelected: true } : { ...currColor, isSelected: false }
        })
        this.setState({ isModalOpen: true, isFromLabel: true, label, colorsOpts })
    }

    selectColor = (selectedColor, colorIdx) => {
        let colorsOpts = this.state.colorsOpts.map((color, idx) => {
            return (colorIdx !== idx) ? { ...color, isSelected: false } : { ...color, isSelected: !color.isSelected }
        })
        this.setState({ colorsOpts, label: { ...this.state.label, color: selectedColor.color } })
    }

    editCurrLabel = (deleteOption) => {
        const { board } = this.props
        if (!this.state.label.color) return
        this.props.editCurrLabel(board, this.state.label, deleteOption)
        let colorsOpts = this.state.colorsOpts.map(currColor => {
            return { ...currColor, isSelected: false }
        })
        this.setState({ isModalOpen: false, isFromLabel: false, colorsOpts, label: { ...this.state.label, title: '', id: '' } })

    }

    onLabelTitleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ label: { ...prevState.label, [field]: value } }))
    }


    render() {

        const { isModalOpen, colorsOpts, isFromLabel } = this.state
        const { title } = this.state.label
        return (
            <div className="section-labels">
                <div className="top-section-label">
                    <input autoFocus onChange={({ target }) => this.setState({ filter: target.value })} type="text" name="filter" placeholder="Search labels..." />
                    <small>LABELS</small>
                </div>
                <div className="labels-list">
                    {this.labels.map((label, idx) =>
                        <div onClick={() => this.onOpenModalWithLabel(label)} key={idx} className="flex declared-labels">
                            <div className={`flex label bgc-${label.color?.substring(1)}`} style={{ backgroundColor: label.color }}>
                                <span>{label.title}</span>
                            </div>
                            <span className="pencil" onClick={() => this.onOpenModalWithLabel(label)} ><EditOutlinedIcon /></span>
                        </div>
                    )}
                </div>
                <button className="create-btn" onClick={this.onOpenModal}>Create a new label</button>
                {isModalOpen &&
                    <div className="labels-modal">
                        <div className="flex top-modal-labels">
                            <p className="modal-title">Create Label</p>
                            <button className="modal-labels-btn"><CloseRoundedIcon onClick={this.onCloseModal} /></button>
                        </div>
                        <hr className="hr-menu" />
                        <div className="label-name-edit">
                            <span className="title-name">Name</span>
                            <input autoFocus type="text" onChange={this.onLabelTitleChange} name="title" value={title} autoComplete="off" />

                        </div>
                        <div className="select-color-label">
                            <span className="select-color-title">Select a color</span>
                            <div className="all-color-options">
                                {colorsOpts.map((color, idx) => {
                                    return <span className="color-op" key={idx} onClick={() => this.selectColor(color, idx)} style={{ backgroundColor: color.color }}>
                                        {color.isSelected && <span>✔</span>}
                                    </span>
                                })}
                            </div>
                        </div>
                        <div className="flex modal-bottom-btns">
                            <button className="create-new-label" onClick={this.editCurrLabel}><span className="btn-title">Create</span></button>
                            {isFromLabel && <button className="delete-label-btn" onClick={() => this.editCurrLabel('delete')}><span className="delete-label-span">Delete</span></button>}
                        </div>
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = {

    editCurrLabel
}
export const SectionLabels = connect(mapStateToProps, mapDispatchToProps)(_SectionLabels)
