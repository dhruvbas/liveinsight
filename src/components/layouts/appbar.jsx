import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ForecastTable from '../DataView/forecast/forecast'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const { RangePicker } = DatePicker;

const useStyles = makeStyles(theme => ({
    Tabs:{
        position:'absolute',
        top:'15%',
        padding:'0% 5%'
    },
    Tabs1:{
      position:'absolute',
      top:'26%',
      padding:'0% 5%'
  },


  }));

const TableTabs = ( ) => {
    const classes = useStyles();
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

    const matches = useMediaQuery('(min-width:632px)');
    return(
        <>
           <div>
            <Tabs value={value} onChange={handleChange} className={classes.Tabs} aria-label="simple tabs example">
                <Tab label="Forecast"  {...a11yProps(0)} />
                <Tab label="Summary" {...a11yProps(1)} />
                </Tabs>
            <TabPanel  value={value} index={0}>
              <div style={{width:"100%"}}>
                <ForecastTable />
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Summary
            </TabPanel>
            </div>
        </>
    )
}
export default TableTabs


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }