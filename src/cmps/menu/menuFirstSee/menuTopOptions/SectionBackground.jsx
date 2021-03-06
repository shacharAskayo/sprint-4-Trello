import { Component } from 'react'

//cmps:
import { PhotosArea } from './Backgrounds/PhotosArea.jsx'
import { ColorsArea } from './Backgrounds/ColorsArea.jsx';


//icons:
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


//imgs:
import photosSrc from '../../../../assets/bgImgs/photosChoose.jpg'
import colorsSrc from '../../../../assets/bgImgs/colorsChoose.jpg'

export class SectionBackground extends Component {

    state = {
        currType: null,
        menuTitle: 'Change Background',
        photosSrc,
        colorsSrc
    }

    goBackBg = () => { this.setState({ currType: null }) }

    choosePhotos = () => { this.setState({ menuTitle: "Photos", currType: 'PhotosArea' }) }
    chooseColors = () => { this.setState({ menuTitle: "Colors", currType: 'ColorsArea' }) }

    render() {
        const { currType, photosSrc, colorsSrc } = this.state
        return (
            <section className="background-section">
                {currType === null && <section className="flex photos-colors">
                    <div className="photos">
                        <button onClick={this.choosePhotos}>
                            <img src={photosSrc} className="img-select" />
                            <span className="select-img-title">Photos</span>
                        </button>
                    </div>
                    <div className="colors">
                        <button onClick={this.chooseColors}>
                            <img src={colorsSrc} className="img-select" />
                            <span className="select-img-title">Colors</span>
                        </button>
                    </div>
                </section>}
                {currType === null && <hr className="hr-menu" />}
                <DynamicCmpBg currType={currType} goBack={this.goBackBg} />
            </section>
        )
    }
}
function DynamicCmpBg({ currType, goBack }) {
    switch (currType) {
        case 'PhotosArea':
            return <PhotosArea goBack={goBack} />
        case 'ColorsArea':
            return <ColorsArea goBack={goBack} />
        default:
            return <h1></h1>
    }
}
