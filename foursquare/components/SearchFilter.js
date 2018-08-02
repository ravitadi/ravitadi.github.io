const {TextField,withStyles} = window['material-ui'];

const styles = theme => ({
  textField: {
    marginBottom: theme.spacing.unit * 2
  }
})

const SearchFilter = (props) =>
  <TextField fullWidth
  type="search"
  autoFocus
  label="Search top rated venues..."
  margin="normal"
  className={props.classes.textField}
  onChange={props.onSearchInputChange} />

  export default withStyles(styles)(SearchFilter)
