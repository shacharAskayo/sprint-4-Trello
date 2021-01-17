import { Link } from 'react-router-dom'
import { MenuMapShow } from './MenuMapShow'

export function MenuMap() {
    return (
        <section>
            <MenuMapShow />
            <Link to="/map"></Link>
        </section>
    )
}