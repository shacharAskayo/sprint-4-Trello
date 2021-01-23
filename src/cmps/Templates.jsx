import React, { Component } from 'react'

export default class Templates extends Component {

    state = {
        chosenCategory:null
    }


    componentDidMount() {
        const { templates, type } = this.props
            const chosenCategory = templates.filter(template => template.type.some(temp => temp.toUpperCase() === type.toUpperCase()))
            this.setState({chosenCategory})
    }

    componentDidUpdate(prevProps, prevState) {
        const { templates, type } = this.props
        if (prevProps !== this.props) {
            const chosenCategory = templates.filter(template => template.type.some(temp => temp.toUpperCase() === type.toUpperCase()))
            this.setState({chosenCategory})
        }

    }




    render() {
        const {chosenCategory}=this.state
        const {type,setTemplatePreview}=this.props
        if(!this.props.type) return null
        if(!this.state.chosenCategory) return null
        return (
            <div className="boards-list">

                <h2>{type}</h2>
            <div className='all-boards'>
                {chosenCategory.map((template,idx)=> <div key={idx} onClick={()=> setTemplatePreview(template)}   className='board-preview' style={{color:'white',...template.style}}> {template.title}</div>)}
                {/* {chosenCategory.map((template,idx)=> <div key={idx} onClick={()=> goBackToBoard(template)}   className='board-preview' style={{color:'white',...template.style}}> {template.title}</div>)} */}

            </div>
            </div>
        )
    }
}
