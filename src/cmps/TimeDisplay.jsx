export function TimeDisplay(props) {
    const time = new Date(props.time)
    const timeNow = new Date(Date.now())
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    if (timeNow.getYear() - time.getYear() >= 1) {
        return <small>{`${months[time.getMonth()]} ${time.getFullYear()}`}</small>
    } else if (timeNow.getMonth() - time.getMonth() <= 1 && timeNow.getDay() - time.getDay() > 10) {
        return <small>{`${timeNow.getDay() - time.getDay()} days ago`}</small>
    }else if (timeNow.getDay() - time.getDay() === 1) {
        return <small>{`One day ago`}</small>
    } else if (timeNow.getHours() - time.getHours() > 1) {
        return <small>{`${timeNow.getHours() - time.getHours()} hours ago`}</small>
    } else if (timeNow.getHours() - time.getHours() === 1) {
        return <small>{`One hour ago`}</small>
    } else if (timeNow.getHours() - time.getHours() === 1) {
        return <small>{`One hour ago`}</small>
    } else if (timeNow.getMinutes() - time.getMinutes() > 1) {
        return <small>{`${timeNow.getMinutes() - time.getMinutes()} minutes ago`}</small>
    } else return <small>{`Less then a minute ago`}</small>

}