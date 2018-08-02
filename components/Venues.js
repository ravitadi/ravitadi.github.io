import Venue from 'Venue'
import SearchFilter from 'SearchFilter'

const {Grid, Typography, Divider, TextField, Icon} = window['material-ui']

class Venues extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      error: false,
      loaded: false
    }
    this.filterVenues = this.filterVenues.bind(this);
  }

  async componentDidMount() {
    this.fetchVenues()
    .then((data) => this.setState({loaded: true, venues: data, initalVenues: data}))
    .catch(err => this.setState({loaded: true}))
  }

  async fetchVenues() {
    let venues = [];
    const {apiUrl, topPicsksApi, userLocation} = this.props
    try {
      venues = await (await fetch(`${apiUrl}${topPicsksApi}&ll=${userLocation.latitude},${userLocation.longitude}`)).json()
    } catch(err) {
      this.setState({error: true})
      return
    }
    return this.fetchImagesForVenue(venues)
  }

  async fetchImagesForVenue(venues) {
    const {apiUrl, venueImageApi, placeHolderImage, imageSize} = this.props
    return Promise.all(
       venues && venues.response
       && venues.response.groups[0].items.map(async ({venue}) => {
          await fetch(`${apiUrl}${venue.id}${venueImageApi}`)
            .then(res => res.json())
            .then(resJson => resJson.response.photos.items[0])
            .then(imageObj => {
              return venue.imageUrl = `${imageObj.prefix}${imageSize}${imageObj.suffix}`
            })
            .catch(err => {
              venue.imageUrl = placeHolderImage
            })
        return venue
      })
    ).catch(err => {
      console.error(err)
      throw err
    })
  }

  renderVenues(venues) {
    return venues.map(venue =>
      <Grid item key={venue.id} xs={12} sm={6} lg={4} xl={3}>
        <Venue {...venue} />
      </Grid>
    )
  }

  filterVenues({target:{value}}) {
    const search = (venues) =>
      venues.filter((venue) => venue.name.toLowerCase().includes(value.toLowerCase()))
    this.setState((prevState) => {return {venues: search(prevState.initalVenues)}});
  }

  renderError() {
    return (
      <Typography variant="body1" gutterBottom>
              Oops, Currently we ran into a issue. Please, try again later.
      </Typography>
    )
  }

  render() {
    let {venues, error, loaded} = this.state;

    if (!loaded) {
      return null
    }

    if (error) {
      return this.renderError()
    }

    return (
      <section>
        <SearchFilter onSearchInputChange={this.filterVenues}/>
        {venues.length > 0 ? (
            <Grid container spacing={32}>
              {this.renderVenues(venues)}
            </Grid>
        ):
        <Typography variant="display4" gutterBottom>
          Unable to find results near you
        </Typography>
      }
      </section>
    )
  }
}

Venues.defaultProps = {
  apiUrl: 'https://api.foursquare.com/v2/venues/',
  topPicsksApi: 'explore?section=topPicks&client_id=KBGSHY43XEIPOYIEJXUG0BSI50TKMD3GUD2ZJ134NQE5YNZG&client_secret=GBC1BWMYRE1JEJZD1CQRSIGG451H35UCNKI0WNVBRMX15W4A&v=20180801&locale=en&radius=100000&limit=50',
  venueImageApi: '/photos?client_id=KBGSHY43XEIPOYIEJXUG0BSI50TKMD3GUD2ZJ134NQE5YNZG&client_secret=GBC1BWMYRE1JEJZD1CQRSIGG451H35UCNKI0WNVBRMX15W4A&v=20180801&locale=en',
  placeHolderImage: 'http://via.placeholder.com/350x150',
  imageSize: '300x100',
  userLocation: {latitude:41.0, longitude: -87.2}
}

export default Venues
