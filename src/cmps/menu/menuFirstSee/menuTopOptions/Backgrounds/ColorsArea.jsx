import { Component } from 'react'
import { connect } from 'react-redux'


//functions:
import { setBackground } from '../../../../../store/actions/boardAction.js'

class _ColorsArea extends Component {

    state = {
        bgColors: [
            { _id: "clr101", color: 'lightgray' },
            { _id: "clr101", color: '#adad85' },
            { _id: "clr101", color: 'coral' },
            { _id: "clr101", color: '#ff4d4d' },
            { _id: "clr101", color: 'crimson' },
            { _id: "clr101", color: 'yellowgreen' },
            { _id: "clr101", color: 'teal' },
            { _id: "clr101", color: '#3385ff' }
        ]
    }

    selectColor = (color) => { this.props.setBackground(this.props.board, { backgroundColor: color }) }

    render() {

        const { bgColors } = this.state

        return (
            <section className="color-type">
                <div className="colors-area">
                    {bgColors.map((currColor, idx) => {
                        return <div className="color-option" key={idx} style={{ backgroundColor: currColor.color }}
                            onClick={() => { this.selectColor(currColor.color) }}
                        ></div>
                    })}
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        board: state.boardModule.board
    }
}
const mapDispatchToProps = {
    setBackground
}
export const ColorsArea = connect(mapStateToProps, mapDispatchToProps)(_ColorsArea)