import { Component } from 'react'
import { connect } from 'react-redux'

//icons:
import SearchIcon from '@material-ui/icons/Search';


//functions:
import { setBackground } from '../../../../../store/actions/boardAction.js'
import { setFilter } from '../../../../../store/actions/menuAction.js'

//imgs:
import src1 from '../../../../../assets/bgImgs/image-01.jpg'
import src2 from '../../../../../assets/bgImgs/image-02.jpg'
import src3 from '../../../../../assets/bgImgs/image-03.jpg'
import src4 from '../../../../../assets/bgImgs/image-04.jpg'
import src5 from '../../../../../assets/bgImgs/image-05.jpg'
import src6 from '../../../../../assets/bgImgs/image-06.jpg'
import src7 from '../../../../../assets/bgImgs/image-07.jpg'
import src8 from '../../../../../assets/bgImgs/image-08.jpg'
import src9 from '../../../../../assets/bgImgs/image-09.jpg'
import src10 from '../../../../../assets/bgImgs/image-10.jpg'
import src11 from '../../../../../assets/bgImgs/image-11.jpg'
import src12 from '../../../../../assets/bgImgs/image-12.jpg'
import src13 from '../../../../../assets/bgImgs/image-13.jpg'
import src14 from '../../../../../assets/bgImgs/image-14.jpg'
import src15 from '../../../../../assets/bgImgs/image-15.jpg'
import src16 from '../../../../../assets/bgImgs/image-16.jpg'
import src17 from '../../../../../assets/bgImgs/image-17.jpg'
import src18 from '../../../../../assets/bgImgs/image-18.jpg'

class _PhotosArea extends Component {

    state = {
        photoSearch: '',
        filterBy: {
            name: ''
        },
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
        ]
    }
    componentDidMount() {
        // console.log(this.state.bgImgs[0]);
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.setFilter(this.state.filterBy)
        })
    }
    toggleImgTitle = (imgIdx) => {
        let bgImgs = this.state.bgImgs.map((img, idx) => {
            return (imgIdx !== idx) ? img : { ...img, isImgTitleShow: !img.isImgTitleShow }
        })
        this.setState({ bgImgs })
    }
    selectImg = (imgSrc) => {
        imgSrc = '../assets/bgImgs/' + (imgSrc.substr(14)).substr(0, 8) + '.jpg'
        console.log('edited imgSrc:', imgSrc);
        this.props.setBackground(this.props.board, { backgroundImage: imgSrc })
    }

    get imgsForDidsplay() {
        let imgs = this.state.bgImgs
        const regex = new RegExp(this.props.filterBy, 'i')
        imgs = imgs.filter(img => regex.test(img.title))
        return imgs
    }
    render() {
        const { name } = this.state.filterBy
        const imgs = this.imgsForDidsplay
        if (!imgs || !imgs.length) return <h1>Loading...</h1>
        return (
            <section className="photo-type">
                <div className="flex search-photo">
                    <SearchIcon /><input type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        placeholder="Photos"
                        autoComplete="off"
                    />
                </div>
                <div className="photos-area">
                    {imgs.map((img, idx) => {
                        return <div className="bgImg" key={img._id} onMouseOver={() => { this.toggleImgTitle(idx) }}
                            onMouseOut={() => { this.toggleImgTitle(idx) }}
                            onClick={() => { this.selectImg(img.src) }}>
                            <img src={img.src} />
                            {img.isImgTitleShow && <span className="img-title">{img.title}</span>}
                        </div>
                    })}
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boardModule.board,
        filterBy: state.menuModule.filterBy
    }
}
const mapDispatchToProps = {
    setBackground,
    setFilter
}
export const PhotosArea = connect(mapStateToProps, mapDispatchToProps)(_PhotosArea)

