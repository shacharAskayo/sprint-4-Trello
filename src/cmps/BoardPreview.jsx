import { Link } from 'react-router-dom'
import React, { Component } from 'react'

export  class BoardPreview extends Component {





    render(){
        const {boards,userBoards,openModal}=this.props
        return (
            
            
            <div className="boards-list">


                    <span>My Boards</span>
                    <div className='flex '>
                        {userBoards.map(board => <Link to={`/board/${board._id}`}>  <div className='board-preview' style={{ color: 'white', ...board.style }} >{board.title}</div> </Link>)}
                    </div>


                    <span>All Boards</span>
                    <div className='all-boards ' >
                        {boards.map(board => <Link to={`/board/${board._id}`}> <div className='board-preview' style={{ color: 'white', ...board.style }} >{board.title}</div> </Link>)}

                        <div className='board-preview' onClick={openModal} > Add New Board... </div>
                    </div>

        </div>
      
      )
    }
}