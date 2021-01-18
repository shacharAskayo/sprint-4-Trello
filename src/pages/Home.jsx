import { Link } from 'react-router-dom'

export function Home() {
    return (
        <section className="main-home" style={{ backgroundColor: '#d5e0df' }}>

            <Link to="/board"><button className="get-start-btn"><span>START HERE</span></button></Link>
        </section >
    )
}






