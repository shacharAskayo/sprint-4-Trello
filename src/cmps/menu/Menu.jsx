import { Component } from 'react'

//cmps:
import { SectionAbout } from './menuFirstSee/menuTopOptions/SectionAbout.jsx'
import { SectionBackground } from './menuFirstSee/menuTopOptions/SectionBackground.jsx'
import { SectionSearch } from './menuFirstSee/menuTopOptions/SectionSearch.jsx'
import { SectionStickers } from './menuFirstSee/menuTopOptions/SectionStickers.jsx'
import { MenuActivity } from './menuFirstSee/MenuActivity';
import { MenuActivitiesList } from './menuFirstSee/MenuActivitiesList.jsx'
import { SectionLabels } from './menuFirstSee/menuTopOptions/SectionLabels.jsx'


//icons:
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InfoIcon from '@material-ui/icons/Info';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';


export class Menu extends Component {

    state = {
        menuTitle: 'Menu',
        currMenu: null,
        inMenu: true,
        isMenuOpen: false
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    goBack = () => { this.setState({ currMenu: null }) }

    openAbout = () => { this.setState({ menuTitle: "About This Board", currMenu: 'SectionAbout' }) }
    openBgs = () => { this.setState({ menuTitle: "Change Background", currMenu: 'SectionBackground' }) }
    openSearch = () => { this.setState({ menuTitle: "Search Cards", currMenu: 'SectionSearch' }) }
    openStickers = () => { this.setState({ menuTitle: "Stickers", currMenu: 'SectionStickers' }) }
    openMore = () => { this.setState({ menuTitle: "More", currMenu: 'SectionMore' }) }
    openActivity = () => { this.setState({ menuTitle: "Activity", currMenu: 'MenuActivity' }) }
    openLabels = () => { this.setState({ menuTitle: "Labels", currMenu: 'SectionLabels' }) }

    render() {


        const { currMenu, menuTitle, isMenuOpen } = this.state
        const { board } = this.props
        if (!board.activities) return null
        return (
            <section className={`menu flex col ${isMenuOpen ? 'open' : ''}`}>
                <button className="menu-btn flex align-center" onClick={this.toggleMenu}><MoreHorizIcon />Show Menu</button>
                <div className="menu-top">
                    {currMenu && <button className="back-menu-btn" onClick={this.goBack}><ArrowBackIosIcon /></button>}
                    <h3>{(currMenu === null) ? 'Menu' : menuTitle}</h3>
                    <button className="close-menu-btn" onClick={() => {
                        this.setState({ isMenuOpen: false })
                    }}><CloseIcon /></button>
                </div>
                <hr className="hr-menu" />
                {currMenu === null && <section className="menu-options" style={{ display: "grid" }}>

                    <button className="menu-option top-option" onClick={this.openAbout}>
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

                    {/* <button className="menu-option" onClick={this.openSearch}>
                        <span><SearchIcon /></span>
                        <h4 className="option-title">Search Cards</h4>
                    </button> */}

                    {/* <button className="menu-option" onClick={this.openStickers}>
                        <span><LabelImportantIcon /></span>
                        <h4 className="option-title">Stickers</h4>
                    </button> */}

                    <button className="menu-option" onClick={this.openLabels}>
                        <span><LabelOutlinedIcon /></span>
                        <h4 className="option-title">Labels</h4>
                    </button>
                    <hr className="hr-menu" />
                    <button className="menu-option" onClick={this.openActivity}>
                        <span><PlaylistAddCheckIcon /></span>
                        <h4 className="option-title">Activity</h4>
                    </button>
                    <MenuActivitiesList board={board} />
                    <span className="view-all-activities-span" onClick={this.openActivity}>View all activity...</span>
                </section>}
                <DynamicCmp currMenu={currMenu} board={board} />
            </section >
        )
    }
}




function DynamicCmp({ currMenu, board }) {
    switch (currMenu) {
        case 'SectionAbout':
            return <SectionAbout board={board} />
        case 'SectionBackground':
            return <SectionBackground />
        case 'SectionSearch':
            return <SectionSearch board={board} />
        case 'SectionStickers':
            return <SectionStickers />
        case 'SectionLabels':
            return <SectionLabels board={board} />
        case 'MenuActivity':
            return <MenuActivity board={board} />
        default:
            return null
    }
}
