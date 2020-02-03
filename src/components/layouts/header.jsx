import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { LayoutImages } from '../images'
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles(theme => ({
    root: {
        flex:1,
    },
    AppBar:{
        backgroundColor:'#22282A',
        fontFamily:'Montserrat',
        padding:'0% 3%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      minHeight:100,
      alignItems: 'flex-start',
    },
    title: {
      padding:'1rem 0.2rem',
      textTransform:'uppercase',
      display:'flex',
      fontSize:'40px'
    },
    title1: {
        padding:'1.5rem 0.5rem',
        textTransform:'uppercase',
        display:'flex',
        
      },
      Profile:{
          position:'absolute',
          right:0,
          padding:'1rem 0'

      },
      Profile1:{
        padding:'1rem 0'
    },
      ImageResize:{
        border: "1px solid white",
        borderRadius: "100%",
        height: "25px",
        width: "25px",
        padding: "5%",
    marginRight: "2px"
    },
  }));


const Header = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    console.log(matches)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    return(
        <>  
            <div>
            <AppBar  className={classes.AppBar}>
                {/*  Tool Bar  - Start*/}
                <Toolbar className={classes.toolbar}>
                <Typography className={classes.title} variant="h5" noWrap>
                   BAKERYS 
                </Typography>
               {matches? <Typography className={classes.title1} variant="h6" noWrap>
                    forecasting schedule
                </Typography>:''}
                <div className={matches?classes.Profile:classes.Profile1}> 
                <IconButton aria-label="search" color="inherit" width="100px">
                    <img src={LayoutImages.ProfileIcon} /> <span style={{fontSize:'20px',padding:'8px'}}>Profile</span>
                </IconButton>
                <IconButton aria-label="display more actions" edge="end" color="inherit">
                <img src={LayoutImages.LogoutIcon} /> <span style={{fontSize:'20px',padding:'8px'}}>Logout</span>
                </IconButton>
                </div>
                </Toolbar>

                {/* Tool Bar _End  */}
               
                {/* Nav Bar - Start */}

              
                {/* Nav Bar -  End */}
            </AppBar>

            {/*  Table Pannel */}
            
            </div>
        </>
    )
}
export default Header
