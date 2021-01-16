import { Component } from 'react'

export class MenuPowerups extends Component {
    render() {
        return (
            <section className="power-ups" style={{ display: "grid" }}>
                <h1>Powerups!</h1>
                <button className="power-ups" >
                    <h4 className="power-uops-title">Power-Ups</h4>
                    <span className="power-ups-desc">Calendar, Google Drive and more...</span>
                </button>
            </section>
        )
    }
}

