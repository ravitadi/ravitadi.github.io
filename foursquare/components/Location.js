import Venues from 'Venues'
import Header from 'Header'

const {withStyles,CircularProgress} = window['material-ui']

class Location extends React.Component {
  constructor(props) {
    super(props)
    this.state = {userLocation: undefined, loaded: false}
  }

  componentDidMount() {
    this.getGeoLocation()
  }

  getGeoLocation() {
    const success = (position) => {
        this.setState({userLocation: position.coords, loaded: true});
    }
    const failure = (err) => {
      this.setState({loaded: true})
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, failure);
    }
  }

  render() {
    if (!this.props.render) {
      return null
    }
    if (this.state.loaded) {
      return this.props.render({
        userLocation: this.state.userLocation
      })
    }
    return <CircularProgress size={50} />
  }
}

export default Location
