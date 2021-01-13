import { render } from '@testing-library/react';
import React, { Component } from 'react'
import { GroupPreview } from "./GroupPreview";

export class GroupList extends Component {

    state = {
        group: {
            id: '',
            title: '',
            style: {},
            cards: []
        },
        isAdding:false
    }


    handleChange = (ev) => {
        const { group } = this.state

        const {value }= ev.target
        this.setState({
            group:{...group,title:value}
        })
    }

    onShowAddBtn = () => {
        this.setState({ isAdding: true })
    }
    onAddGroup =  () => {
        const { group } = this.state
        const { board} = this.props
        this.props.addGroup(board._id, group)
        this.setState({
          group: { ...group, title: '' },
            isAdding: false
        })

    }
    

    render() {
        const { groups } = this.props
        return (
            <React.Fragment>

                <div className="group-container">
                    {groups && groups.map((group, idx) => <GroupPreview key={idx} group={group} />)}
                    <div style={{display:'flex' ,flexDirection:'column'}}>
                        <form action="">
                        <input type="text" placeholder="+ Add another list" value={this.state.group.title} onClick={this.onShowAddBtn} onChange={this.handleChange} style={{marginTop:'30px'}} />
                        {this.state.isAdding&&<button onClick={this.onAddGroup}>Add List</button>}
                        </form>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

