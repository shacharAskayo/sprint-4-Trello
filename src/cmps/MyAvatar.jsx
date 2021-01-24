import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }))

export function MyAvatar(props){
     const classes = useStyles()
     const {user, style} = props
    if (!user) return null
    if (user.imgUrl) return  <Avatar style={style} alt={user.fullname} className={classes.small} src={user.imgUrl} />
    return <Avatar style={style} className={classes[user.color], classes.small}>{user.fullname?.substring(0, 1)}</Avatar>

}