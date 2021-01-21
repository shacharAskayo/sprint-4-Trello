import { Component } from "react";
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import img1 from '../../assets/bgImgs/image-01.jpg'
import img2 from '../../assets/bgImgs/image-02.jpg'
import img3 from '../../assets/bgImgs/image-03.jpg'
import img4 from '../../assets/bgImgs/image-04.jpg'
import img5 from '../../assets/bgImgs/image-05.jpg'
import img6 from '../../assets/bgImgs/image-06.jpg'
import img7 from '../../assets/bgImgs/image-07.jpg'
import img8 from '../../assets/bgImgs/image-08.jpg'
import img9 from '../../assets/bgImgs/image-09.jpg'
import img10 from '../../assets/bgImgs/image-10.jpg'
import img11 from '../../assets/bgImgs/image-11.jpg'
import img12 from '../../assets/bgImgs/image-12.jpg'
import img13 from '../../assets/bgImgs/image-15.jpg'
import img14 from '../../assets/bgImgs/image-16.jpg'
import img15 from '../../assets/bgImgs/image-17.jpg'
import img16 from '../../assets/bgImgs/image-18.jpg'

export class AddCoverModal extends Component {

    state = {
        filter: ''
    }

    setColor = (color) => {
        const card = JSON.parse(JSON.stringify(this.props.card))
        const NewCard = { ...card, style: { backgroundColor: color } }
        this.props.save(NewCard, `Set background color`)
        this.props.closeModal()

    }

    setImg = (url) => {
        const card = { ...this.props.card, style: { backgroundImage: `url(${url})` } }
        this.props.save(card, `Set background image`)
        this.props.closeModal()

    }

    render() {
        const colors = ['lightgray', '#adad85', 'coral', '#ff4d4d', 'crimson', 'yellowgreen', 'teal', '#3385ff',]
        const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16]
        const { closeModal, style } = this.props
        return (
            <div className="cover-modal card-action-modal" style={style}>
                <div className="flex justify-center">
                    Cover
                </div>
                <button className="icon" onClick={closeModal}><CloseSharpIcon /></button>
                <hr />
                <small>COLORS</small>
                <div className="flex wrap space-bt">
                    {colors.map(color => <div onClick={() => this.setColor(color)} key={Math.random()} className="color-box" style={{ backgroundColor: color }}></div>)}
                </div>
                <small>UNSPLASH</small>
                <div className="flex wrap space-bt">
                    {imgs.map(src => <img onClick={() => this.setImg(src)} key={Math.random()} className="color-box" src={src} />)}
                </div>


            </div>
        )

    }
}