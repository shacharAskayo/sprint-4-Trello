import { Component } from 'react'
import { connect } from 'react-redux'

//cmps:
import { SectionAbout } from './menuFirstSee/menuTopOptions/SectionAbout.jsx'
import { SectionBackground } from './menuFirstSee/menuTopOptions/SectionBackground.jsx'
import { SectionSearch } from './menuFirstSee/menuTopOptions/SectionSearch.jsx'
import { SectionStickers } from './menuFirstSee/menuTopOptions/SectionStickers.jsx'
import { SectionMore } from './menuFirstSee/menuTopOptions/SectionMore.jsx'
import { MenuButler } from './menuFirstSee/MenuButler';
import { MenuPowerups } from './menuFirstSee/MenuPowerups';
import { MenuMap } from './menuFirstSee/MenuMap';
import { MenuActivity } from './menuFirstSee/MenuActivity';
import { ActivityList } from '../card/ActivityList.jsx'


//icons:
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InfoIcon from '@material-ui/icons/Info';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp';


export class Menu extends Component {

    state = {
        menuTitle: 'Menu',
        currMenu: null,
        inMenu: true,   
        isMenuOpen: false
    }
    
    toggleMenu = () => { 
      this.setState({ isMenuOpen: !this.state.isMenuOpen}) 
    }

    goBack = () => { this.setState({ currMenu: null }) }

    openAbout = () => { this.setState({ menuTitle: "About This Board", currMenu: 'SectionAbout' }) }
    openBgs = () => { this.setState({ menuTitle: "Change Background", currMenu: 'SectionBackground' }) }
    openSearch = () => { this.setState({ menuTitle: "Search Cards", currMenu: 'SectionSearch' }) }
    openStickers = () => { this.setState({ menuTitle: "Stickers", currMenu: 'SectionStickers' }) }
    openMore = () => { this.setState({ menuTitle: "More", currMenu: 'SectionMore' }) }
    openButler = () => { this.setState({ menuTitle: "butler", currMenu: 'MenuButler' }) }
    openPowerups = () => { this.setState({ menuTitle: "Power-ups", currMenu: 'MenuPowerups' }) }
    openMap = () => { this.setState({ menuTitle: "Map", currMenu: 'MenuMap' }) }
    openActivity = () => { this.setState({ menuTitle: "Activity", currMenu: 'MenuActivity' }) }

    render() {


        const { currMenu, menuTitle, inMenu, isMenuOpen } = this.state
        const { board } = this.props
        if (!board.activities) return null
        console.log('render');
        return (
            <section className={`menu flex col ${isMenuOpen ? 'open' : ''}`}>
                <button className="menu-btn flex align-center" onClick={this.toggleMenu}><MoreHorizIcon/>Show Menu</button>
                <div className="menu-top">
                    {currMenu && <button className="back-menu-btn" onClick={this.goBack}><ArrowBackIosIcon /></button>}
                    <h3>{(currMenu === null) ? 'Menu' : menuTitle}</h3>
                    <button className="close-menu-btn" onClick={this.toggleMenu}><CloseIcon /></button>
                </div>
                <hr className="hr-menu" />
                {currMenu === null && <section className="menu-options" style={{ display: "grid" }}>

                    <button className="menu-option" onClick={this.openAbout}>
                        <span><InfoIcon /></span>
                        <div className="about-all-desc">
                            <h4 className="about-this-board">About This Board</h4>
                            <span className="about-desc">Add a description to your board</span>
                        </div>
                    </button>

                    <button className="menu-option" onClick={this.openBgs}>
                        <span>< WallpaperIcon /></span>
                        <h4 className="option-title">Change Background</h4>
                    </button>

                    <button className="menu-option" onClick={this.openSearch}>
                        <span><SearchIcon /></span>
                        <h4 className="option-title">Search Cards</h4>
                    </button>

                    <button className="menu-option" onClick={this.openStickers}>
                        <span><LabelImportantIcon /></span>
                        <h4 className="option-title">Stickers</h4>
                    </button>

                    <button className="menu-option" onClick={this.openMore}>
                        <span><MoreHorizIcon /></span>
                        <h4 className="option-title">More</h4>
                    </button>
                    <hr className="hr-menu" />
                    <button className="menu-option" onClick={this.openButler}>
                        <span className="butler-icon">🤖</span>
                        <div className="butler-div">
                            <h4> Butler</h4>
                            <span>Automate cards and more...</span>
                        </div>
                    </button>
                    <hr className="hr-menu" />
                    <button className="menu-option" onClick={this.openPowerups}>
                        <span className="powerups-icon"><ArrowUpwardSharpIcon /></span>
                        <div className="powerups-div">
                            <h4>Power-Ups</h4>
                            <span className="power-ups-desc">Calendar, Google Drive and more...</span>
                        </div>
                    </button>

                    <button className="menu-option" onClick={this.openMap}>
                        <span><RoomIcon /></span>
                        <h4 className="option-title">Map</h4>
                    </button>
                    <hr className="hr-menu" />
                    <button className="menu-option" onClick={this.openActivity}>
                        <span><PlaylistAddCheckIcon /></span>
                        <h4 className="option-title">Activity</h4>
                    </button>
                    <ActivityList activities={board.activities} inMenu={inMenu} />
                    <span className="view-all-activities-span" onClick={this.openActivity}>View all activity...</span>
                </section>}
                <DynamicCmp currMenu={currMenu} />
            </section >
        )
    }
}



function DynamicCmp({ currMenu }) {
    switch (currMenu) {
        case 'SectionAbout':
            return <SectionAbout />
        case 'SectionBackground':
            return <SectionBackground />
        case 'SectionSearch':
            return <SectionSearch />
        case 'SectionStickers':
            return <SectionStickers />
        case 'SectionMore':
            return <SectionMore />
        case 'MenuButler':
            return <MenuButler />
        case 'MenuPowerups':
            return <MenuPowerups />
        case 'MenuMap':
            return <MenuMap />
        case 'MenuActivity':
            return <MenuActivity />
        default:
            return null
    }
}
