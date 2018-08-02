const {AppBar,Toolbar,Typography} = window['material-ui']

const Header = (props) =>
  <header {...props} >
    <AppBar position="static">
       <Toolbar>
         <Typography variant="title" color="inherit">
         Top rated Venues
         </Typography>
       </Toolbar>
     </AppBar>
  </header>

  export default Header
