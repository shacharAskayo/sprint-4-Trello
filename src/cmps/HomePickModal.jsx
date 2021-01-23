import React, { Component } from 'react'
import ClearIcon from '@material-ui/icons/Clear';

export class HomePickModal extends Component {


    state = {
        bgColors: [
            { color: 'lightgray', isSelected: false },
            { color: '#adad85', isSelected: false },
            { color: 'coral', isSelected: false },
            { color: 'lightpink', isSelected: false },
            { color: 'crimson', isSelected: false },
            { color: 'yellowgreen', isSelected: false },
            { color: 'teal', isSelected: false },
            { color: 'blue', isSelected: false },
            { color: '#3385ff', isSelected: false }
        ],
        board: {
            type: ['trip', 'sales'],
            title: '',
            createdAt: Date.now(),
            archives: {
                groups: [],
                cards: []
            },

            style: {
                isCover: false,
                background: {
                    backgroundColor: '',
                    backgroundImage: ''
                }
            },
            isPrivate: false,
    
            'labels' : [
                {
                    'id' : 'l101',
                    'title' : 'fun',
                    'color' : '#F2D600'
                },
                {
                    'id' : 'l102',
                    'title' : '',
                    'color' : '#FF9F1A'
                },
                {
                    'id' : 'l103',
                    'title' : 'important',
                    'color' : '#EB5B46'
                },
                {
                    'id' : 'l104',
                    'title' : '',
                    'color' : '#C377E0'
                },
                {
                    'id' : 'l105',
                    'title' : '',
                    'color' : '#01C2DF'
                },
                {
                    'id' : 'l106',
                    'title' : '',
                    'color' : '#52E898'
                }
            ],
            members: [],
            groups: [],
            activities: []
        }
    }



    handleChange = (ev) => {
        const { value } = ev.target
        const { board } = this.state
        const { loggedUser } = this.props
        this.setState({ board: { ...board, title: value } })
    }

    onColorPick = (color) => {
        const { board } = this.state
        this.setState({ board: { ...board, style: { ...board.style, backgroundColor: color } } })
    }

    onCreateBoard = (ev) => {
        const { board } = this.state
        const { closeModal,loggedUser, addBoard } = this.props
        if (loggedUser) {
            addBoard(board)
            this.setState({
                board: {
                    title: '',
                    createdAt: Date.now(),
                    archives: {},
                    style: {},
                    isPrivate: false,
            
                    labels: [],
                    members: [],
                    groups: [],
                    activities: []
                }
            })
        }
        closeModal(ev)
    }

    render() {
        const { bgColors } = this.state
        return (

            <div className='modal-container'>

                <div className='add-board' onClick={(ev) => {
                    ev.preventDefault()
                    ev.stopPropagation()
                }}>

                    <div className='title-container'>

                        <input type="text" placeholder='Add board title' onChange={this.handleChange} />
                        <ClearIcon />

                    </div>

                    <div className='color-picker-container'>

                        {bgColors.map(bgc => <div className='color-picker' onClick={() => this.onColorPick(bgc.color)} style={{ backgroundColor: bgc.color }}> </div>)}

                    </div>


                    <button onClick={this.onCreateBoard} >create board</button>
                </div>
            </div>
        )
    }
}
