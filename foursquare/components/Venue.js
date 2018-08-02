const {PropTypes} = window;

const {
  Button,
  Icon,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  withStyles,
  Divider
} = window['material-ui'];

const styles = {
  card: {
  },
  clamp: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    height: 51
  },
  subTitle: {
    height: 40
  }
};


const Venue = (props) => {
    const { classes, location={}, name, imageUrl, id} = props;
    return (
      <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom href={`https://foursquare.com/v/${id}`}
        variant="title" component="a" className={`${classes.clamp} ${classes.title}`}>
          {name}
        </Typography>
        <Typography component="p" className={`${classes.clamp} ${classes.subTitle}`}>
          {location.address} &#9679; {location.city} &#9679; {location.state}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small" color="primary" component="a" href={`https://foursquare.com/v/${id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

Venue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Venue);
