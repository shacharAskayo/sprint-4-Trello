import { Component } from 'react'

import stick1 from '../../../../assets/stickers/sticker-01.png'
import stick2 from '../../../../assets/stickers/sticker-02.png'
import stick3 from '../../../../assets/stickers/sticker-03.png'
import stick4 from '../../../../assets/stickers/sticker-04.png'
import stick5 from '../../../../assets/stickers/sticker-05.png'
import stick6 from '../../../../assets/stickers/sticker-06.png'
import stick7 from '../../../../assets/stickers/sticker-07.png'
import stick8 from '../../../../assets/stickers/sticker-08.png'
import stick9 from '../../../../assets/stickers/sticker-09.png'
import stick10 from '../../../../assets/stickers/sticker-10.png'
import stick11 from '../../../../assets/stickers/sticker-11.png'
import stick12 from '../../../../assets/stickers/sticker-12.png'


export class SectionStickers extends Component {

    state = {
        stickers: [
            { src: stick1, _id: 'stick101' },
            { src: stick2, _id: 'stick102' },
            { src: stick3, _id: 'stick103' },
            { src: stick4, _id: 'stick104' },
            { src: stick5, _id: 'stick105' },
            { src: stick6, _id: 'stick106' },
            { src: stick7, _id: 'stick107' },
            { src: stick8, _id: 'stick108' },
            { src: stick9, _id: 'stick109' },
            { src: stick10, _id: 'stick1011' },
            { src: stick11, _id: 'stick1011' },
            { src: stick12, _id: 'stick1012' }

        ]
    }


    render() {
        const { stickers } = this.state

        console.log('stickers:', stickers);
        if (!stickers || !stickers.length) return <h1>Loading...</h1>
        return (
            <section className="stickers-section" style={{ display: "grid" }}>
                <h1>Stickers!</h1>
                <div className="stickers-area">
                    {stickers.map((sticker, idx) => {

                        return <div className="sticker-img" key={idx}>
                            <img src={sticker.src} />
                        </div>
                    })}
                </div>
            </section >
        )
    }
}