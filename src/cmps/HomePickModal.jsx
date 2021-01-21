import React, { Component } from 'react'
import ClearIcon from '@material-ui/icons/Clear';

export  class HomePickModal extends Component {


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
            title: '',
            createdAt: Date.now(),
            archives:{},
            style: {},
            isPrivate: false,
            createdBy: {},
            labels: [],
            members: [],
            groups: [],
            activities: []
        }
    }



    handleChange=(ev)=>{
        const {value} = ev.target
        const {board}=this.state
        const {loggedUser}=this.props
        this.setState({board:{...board,title:value,createdBy:loggedUser}})
    }
    
    onColorPick=(color)=>{
        const {board}=this.state
        this.setState({board:{...board,style:{...board.style,backgroundColor:color}}})
    }
    
    onCreateBoard=()=>{
        const {board}=this.state
        const {loggedUser,addBoard}=this.props
        if(loggedUser){
            addBoard(board)
            this.setState({board: {
                title: '',
                createdAt: Date.now(),
                archives:{},
                style: {},
                isPrivate: false,
                createdBy: {},
                labels: [],
                members: [],
                groups: [],
                activities: []
            }})
        }
        
    }

    render() {
        const {bgColors} = this.state
        return (

            <div className='modal-container'>

            <div className='add-board'  onClick={(ev)=>{
                ev.preventDefault()
                ev.stopPropagation()
            }}>

                <div className='title-container'>

                    <input type="text" placeholder='Add board title' onChange={this.handleChange} />
                    <ClearIcon />

                </div>

                <div className='color-picker-container'>

                {bgColors.map(bgc=><div className='color-picker' onClick={()=>this.onColorPick(bgc.color)} style={{backgroundColor:bgc.color}}> </div>)}

                </div>


            <button onClick={this.onCreateBoard} >create board</button>
            </div>
            </div>
        )
    }
}
