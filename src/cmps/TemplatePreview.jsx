import React, { Component } from 'react'
import { addBoard } from '../store/actions/boardAction';
import Templates from './Templates';
import img from '../templates/templatesBg/design-system.png'


export class TemplatePreview extends Component {

    render() {
        console.log(img);
        const { template, goBackToBoard } = this.props
        console.log(template);
        return (
            <div className='template-preview'>
                <button onClick={() => goBackToBoard(template)}>Create Template</button>
                <div className='description-container' >
                    <h2>About This Template</h2>
                    {template.description}
                </div>

                <div className="img-container" style={{ backgroundImage: template.templateImg }} >

                </div>


            </div>
        )
    }
}
