import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'

// library.add(fas)

//icons:
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InfoIcon from '@material-ui/icons/Info';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import SearchIcon from '@material-ui/icons/Search';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RoomIcon from '@material-ui/icons/Room';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import CloseIcon from '@material-ui/icons/Close';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';


//imgs:
import src1 from '../assets/bgImgs/image-01.jpg'
import src2 from '../assets/bgImgs/image-02.jpg'
import src3 from '../assets/bgImgs/image-03.jpg'
import src4 from '../assets/bgImgs/image-04.jpg'
import src5 from '../assets/bgImgs/image-05.jpg'
import src6 from '../assets/bgImgs/image-06.jpg'
import src7 from '../assets/bgImgs/image-07.jpg'
import src8 from '../assets/bgImgs/image-08.jpg'
import src9 from '../assets/bgImgs/image-09.jpg'
import src10 from '../assets/bgImgs/image-10.jpg'
import src11 from '../assets/bgImgs/image-11.jpg'
import src12 from '../assets/bgImgs/image-12.jpg'
import src13 from '../assets/bgImgs/image-13.jpg'
import src14 from '../assets/bgImgs/image-14.jpg'
import src15 from '../assets/bgImgs/image-15.jpg'
import src16 from '../assets/bgImgs/image-16.jpg'
import src17 from '../assets/bgImgs/image-17.jpg'
import src18 from '../assets/bgImgs/image-18.jpg'


//functions:
import { loadUser } from '../store/actions/userActions.js'
import { selectImg, selectColor } from '../store/actions/boardAction.js'

class _Menu extends Component {

    state = {
        menuTitle: 'Menu',
        isMenuClicked: true,
        isAboutClicked: false,
        isBgcColorClicked: false,
        isSearchClicked: false,
        isStickerClicked: false,
        isMoreClicked: false,
        isDescClicked: false,
        isDescExist: false,
        description: '',
        isPhotosClicked: false,
        isColorsClicked: false,
        isBackTypeClicked: false,
        photoSearch: '',
        bgImgs: [
            { src: src1, _id: 'img101', title: "sunset", isImgTitleShow: false },
            { src: src2, _id: 'img102', title: "Snowy mountains", isImgTitleShow: false },
            { src: src3, _id: 'img103', title: "Mountains at sunset", isImgTitleShow: false },
            { src: src4, _id: 'img104', title: "clouds", isImgTitleShow: false },
            { src: src5, _id: 'img105', title: "Cliff on a stream", isImgTitleShow: false },
            { src: src6, _id: 'img106', title: "Stars", isImgTitleShow: false },
            { src: src7, _id: 'img107', title: "Bright background", isImgTitleShow: false },
            { src: src8, _id: 'img108', title: "Wall painting", isImgTitleShow: false },
            { src: src9, _id: 'img109', title: "Snowy village", isImgTitleShow: false },
            { src: src10, _id: 'img110', title: "stream", isImgTitleShow: false },
            { src: src11, _id: 'img111', title: "Desert", isImgTitleShow: false },
            { src: src12, _id: 'img112', title: "A flowering tree", isImgTitleShow: false },
            { src: src13, _id: 'img113', title: "Cherries", isImgTitleShow: false },
            { src: src14, _id: 'img114', title: "Tree leaves", isImgTitleShow: false },
            { src: src15, _id: 'img115', title: "Orange tree", isImgTitleShow: false },
            { src: src16, _id: 'img116', title: "Tangled stream", isImgTitleShow: false },
            { src: src17, _id: 'img117', title: "Cloudy mountains", isImgTitleShow: false },
            { src: src18, _id: 'img118', title: "Rear passage", isImgTitleShow: false }
        ],
        bgColors: [
            { _id: "clr101", color: 'lightgray' },
            { _id: "clr101", color: 'butlywood' },
            { _id: "clr101", color: 'coral' },
            { _id: "clr101", color: '#ff4d4d' },
            { _id: "clr101", color: 'crimson' },
            { _id: "clr101", color: 'yellowgreen' },
            { _id: "clr101", color: 'teal' },
            { _id: "clr101", color: '#3385ff' }
        ]
    }
    componentDidMount() {
        this.props.loadUser()
    }
    goBack = (ev) => {
        ev.preventDefault()
        this.setState({
            isMenuClicked: true,
            isAboutClicked: false,
            isBgcColorClicked: false,
            isSearchClicked: false,
            isStickerClicked: false,
            isMoreClicked: false
        })
    }
    openAbout = (ev) => {
        ev.preventDefault()
        this.setState({ isAboutClicked: true, isMenuClicked: false, menuTitle: "About This Board" })
    }
    openBgcColors = (ev) => {
        ev.preventDefault()
        this.setState({ isBgcColorClicked: true, isMenuClicked: false, menuTitle: "Change Background" })
    }
    openSearch = (ev) => {
        ev.preventDefault()
        this.setState({ isSearchClicked: true, isMenuClicked: false, menuTitle: "Search Cards" })
    }
    openStickers = (ev) => {
        ev.preventDefault()
        this.setState({ isStickerClicked: true, isMenuClicked: false, menuTitle: "Stickers" })
    }
    openMore = (ev) => {
        ev.preventDefault()
        this.setState({ isMoreClicked: true, isMenuClicked: false, menuTitle: "More" })
    }
    openDesc = (ev) => {
        ev.preventDefault()
        this.setState({ isDescClicked: true })
    }
    openEditedDesc = (ev) => {
        ev.preventDefault()
        this.setState({ isDescClicked: true })
    }
    onDescChange = (ev) => {
        let value = ev.target.value
        let description = { ...this.state.description }
        description = value
        this.setState({ description })
    }
    saveDesc = (ev) => {
        ev.preventDefault()
        this.setState({ isDescClicked: false, isDescExist: true })
    }
    closeDesc = (ev) => {
        ev.preventDefault()
        this.setState({ isDescClicked: false })
    }
    choosePhotos = (ev) => {
        ev.preventDefault()
        this.setState({ isPhotosClicked: true, isBackTypeClicked: true, menuTitle: "Photos" })
    }
    toggleImgTitle = (imgIdx) => {
        let bgImgs = this.state.bgImgs.map((img, idx) => {
            return (imgIdx !== idx) ? img : { ...img, isImgTitleShow: !img.isImgTitleShow }
        })
        this.setState({ bgImgs })
    }
    selectImg = (imgSrc) => {
        console.log('imgSrc:', imgSrc);
        this.props.selectImg(imgSrc)
    }
    chooseColors = (ev) => {
        ev.preventDefault()
        this.setState({ isColorsClicked: true, isBackTypeClicked: true, menuTitle: "Colors" })
    }
    selectColor = (color) => {
        console.log('color:', color);
        this.props.selectColor(color)
    }
    render() {

        const {
            menuTitle,
            isMenuClicked,
            isAboutClicked,
            isBgcColorClicked,
            isSearchClicked,
            isStickerClicked,
            isMoreClicked,
            isDescClicked,
            isDescExist,
            description,
            isPhotosClicked,
            isColorsClicked,
            isBackTypeClicked,
            photoSearch,
            bgImgs,
            bgColors
        } = this.state
        const { user } = this.props
        const desc = 'It is your board is time to shine! Let people know what this board is used for and what they can expect to see'

        return (
            <section className="menu">
                <img src="src\assets\bgImgs\image-01.jpg" alt="" />
                <div className="menu-top">
                    {!isMenuClicked &&
                        <button className="back-menu-btn" onClick={this.goBack}><ArrowBackIosIcon /></button>}
                    <h3>{menuTitle}</h3>
                    <button onClick={this.props.closeMenu}>X</button>
                </div>
                {isMenuClicked &&
                    !isAboutClicked &&
                    !isBgcColorClicked &&
                    !isSearchClicked &&
                    !isStickerClicked &&
                    !isMoreClicked && <section>
                        <section className="menu-options" style={{ display: "grid" }}>
                            <hr />
                            <button className="menu-option" onClick={this.openAbout}>
                                <h4 className="option-title"><span><InfoIcon /></span> About This Board</h4>
                                <span className="about-desc">Add a description to your board</span>
                            </button>
                            <hr />
                            <button className="menu-option" onClick={this.openBgcColors}>
                                <h4 className="option-title"><span>< WallpaperIcon /></span> Change Background</h4>
                            </button>
                            <hr />
                            <button className="menu-option" onClick={this.openSearch}>
                                <h4 className="option-title"><span><SearchIcon /></span> Search Cards</h4>
                            </button>
                            <hr />
                            <button className="menu-option" onClick={this.openStickers}>
                                <h4 className="option-title"><span><LabelImportantIcon /></span> Stickers</h4>
                            </button>
                            <hr />
                            <button className="menu-option" onClick={this.openMore}>
                                <h4 className="option-title"><span><MoreHorizIcon /></span>More</h4>
                            </button>
                        </section>
                        <section className="butler-section" style={{ display: "grid" }}>
                            <button className="butler-btn" onClick={''}>
                                <h4 className="butler-title">🤖 Butler</h4>
                                <span className="butler-desc">Automate cards and more...</span>
                            </button>
                        </section>
                        <section className="others-seciton" style={{ display: "grid" }}>
                            <button className="power-ups" onClick={''}>
                                <h4 className="power-uops-title">Power-Ups</h4>
                                <span className="power-ups-desc">Calendar, Google Drive and more...</span>
                            </button>
                            <button className="map" onClick={''}>
                                <h4 className="map-title"><span><RoomIcon /></span>Map</h4>
                            </button>
                        </section>
                        <section className="activity" style={{ display: "grid" }}>
                            <button className="activity" onClick={''}>
                                <h4 className="activity-title"><span><PlaylistAddCheckIcon /></span>Activity</h4>
                            </button>
                            <Link to="/activities">View all activity...</Link>
                        </section>
                    </section>}
                {!isMenuClicked &&
                    isAboutClicked &&
                    !isBgcColorClicked &&
                    !isSearchClicked &&
                    !isStickerClicked &&
                    !isMoreClicked &&
                    <section className="about-section">
                        <div className="flex about-section-user">
                            <span className="user-icon"><PermIdentityIcon /></span>
                            <h3>Made by</h3>
                        </div>
                        <div className="flex user-details-menu">
                            <AccountCircleIcon />
                            <Link>{user.fullname}</Link>
                            <span>{user.username}</span>
                        </div>
                        <div className="flex board-description">
                            <SubjectIcon />
                            <h4 className="description-board">Description</h4>
                            {isDescExist && <button className="edit-board-desc-btn" onClick={this.openEditedDesc}>Edit</button>}
                        </div>
                        {!isDescClicked && <button className="board-desc-btn" onClick={this.openDesc}>
                            <p className="desc-pre">
                                {isDescExist ? description : desc}
                            </p>
                        </button>}

                        {isDescClicked && <div className="edit-board-desc">
                            <textarea name="board-desc" id="" cols="30" rows="5" placeholder={desc} onChange={this.onDescChange} value={description}></textarea>
                            <div className="flex desc-tools">
                                <button className="save-desc" onClick={this.saveDesc}>Save</button>
                                <button className="close-desc" onClick={this.closeDesc}><CloseIcon /></button>
                            </div>
                        </div>}
                    </section>
                }
                {!isMenuClicked &&
                    !isAboutClicked &&
                    isBgcColorClicked &&
                    !isSearchClicked &&
                    !isStickerClicked &&
                    !isMoreClicked &&
                    !isBackTypeClicked && <section className="background-section">
                        <section className="flex photos-colors">
                            <div className="photos">
                                <button onClick={this.choosePhotos}>
                                    <PhotoLibraryIcon />
                                </button>
                                <span className="photos-title">Photos</span>
                            </div>
                            <div className="colors">
                                <button onClick={this.chooseColors}>
                                    <ColorLensIcon />
                                </button>
                                <span className="colors-title">Colors</span>
                            </div>
                        </section>
                    </section>}
                {!isMenuClicked &&
                    !isAboutClicked &&
                    isBgcColorClicked &&
                    !isSearchClicked &&
                    !isStickerClicked &&
                    !isMoreClicked &&
                    isPhotosClicked &&
                    isBackTypeClicked && <section className="photo-type">
                        <div className="flex search-photo">
                            <SearchIcon /><input type="text"
                                name="name"
                                value={photoSearch}
                                onChange={this.handleChange}
                                placeholder="Photos"
                                autoComplete="off"
                            />
                        </div>
                        <div className="photos-area">
                            {bgImgs.map((img, idx) => {
                                return <div className="bgImg" onMouseOver={() => { this.toggleImgTitle(idx) }}
                                    onMouseOut={() => { this.toggleImgTitle(idx) }}
                                    onClick={() => { this.selectImg(img.src) }}>
                                    <img src={img.src} />
                                    {img.isImgTitleShow && <span className="img-title">{img.title}</span>}
                                </div>
                            })}
                        </div>
                    </section>}
                {!isMenuClicked &&
                    !isAboutClicked &&
                    isBgcColorClicked &&
                    !isSearchClicked &&
                    !isStickerClicked &&
                    !isMoreClicked &&
                    !isPhotosClicked &&
                    isColorsClicked &&
                    isBackTypeClicked && <section className="color-type">
                        <div className="colors-area">
                            {bgColors.map(currColor => {
                                return <div className="color-option" style={{ backgroundColor: currColor.color }}
                                    onClick={() => { this.selectColor(currColor.color) }}
                                ></div>
                            })}
                        </div>
                    </section>}
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        bgColor: state.boardModule.bgColor,
        bgImg: state.boardModule.bgImg,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadUser,
    selectImg,
    selectColor
}
export const Menu = connect(mapStateToProps, mapDispatchToProps)(_Menu)