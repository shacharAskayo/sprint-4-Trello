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

export function MyAvatar({user}){
     const classes = useStyles()

    if( user.imgUrl) return  <Avatar alt={user.fullname} className={classes.small} src={user.imgUrl} />
    return <Avatar className={classes[user.color], classes.small}>{user.fullname.substring(0, 1)}</Avatar>

}