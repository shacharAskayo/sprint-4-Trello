import { Link } from 'react-router-dom'
import img from '../assets/bg/hero.png'
export function Home() {
    return (
        <section className="home-page flex col align-center">
            <img src={img} alt=""/>
            <div>
                <h1>Task Menagement Have Never Been Easier</h1>
                <h3>Just Use Fello</h3>
            </div>
            <Link to="/board">Let's Start!</Link>
        </section >
    )
}






