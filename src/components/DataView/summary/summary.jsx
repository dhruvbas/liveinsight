import React, { useState, useEffect } from 'react'
import { DatePicker, Modal ,Button  } from 'antd';
import 'antd/dist/antd.css';
import Graph from "../graph";
import moment from 'moment';
import { summaryData } from './data';
import Table from "./Table";
import useMediaQuery from '@material-ui/core/useMediaQuery';
const { RangePicker } = DatePicker;

const SummaryTable = () => {

    const [summaryDSDdata, setDSD] = useState([]);
    const [summaryFROZENdata, setFrozen] = useState([]);
    const [dateColumn, handleDateColumn] = useState([]);
    const [dateColumn1, handleDateColumn1] = useState([]);

    const [openModal,handleModal] = useState(false);
    const [forecastGraph,setgraphForecast] = useState([]);
    const [actualGraph,setgraphActual] = useState([]);


    useEffect(() => {
      groupData();
    }, []);

    const grouping = (temp_array) =>{
        let groupedData = [];
        temp_array.map((data, i) => {
            let forecast = data.Forecast_Quantity;
            let actual = data.Actual_Quantity;

            if(typeof forecast == "string")
            {
                forecast = forecast.replace(",", "");
                forecast = forecast.replace(".", "");
            }
            if(typeof actual == "string")
            {
                actual = actual.replace(",", "");
                actual = actual.replace(".", "");
            }
                
              let index = groupedData.findIndex(x => x.Product === data.Product);
              if (index >= 0) {
                  groupedData[index].data.push({
                      Date: data.Date,
                      Forecast: +forecast,
                      Actual: +actual
                  })
              }
              else {

                  let temp_object = {};
                  temp_object.Category = data.Category;
                  temp_object.Product = data.Product;
                  temp_object.data = [{
                      Date: data.Date,
                      Forecast: +forecast,
                      Actual: +actual
                  }];
                  
                  groupedData.push(temp_object);
              }
              return null;
          })

          return groupedData;
    }

    const groupData = () =>{
      let DSD = summaryData.filter(data => data.Category === "DSD");
      let FROZEN = summaryData.filter(data => data.Category === "FROZEN");

      setDSD(grouping(DSD));
      setFrozen(grouping(FROZEN));

      let tempDateColumn = [];

      console.log(grouping(DSD));

      summaryData.map(data => {
        let dateIndex = tempDateColumn.indexOf(data.Date);
        if(dateIndex === -1)
        {
        tempDateColumn.push(data.Date);
        }
        return null;
      })

      handleDateColumn(tempDateColumn);
      handleDateColumn1(tempDateColumn);

    }

    const handleChart = (i) =>{
        let tempArray1 = [];
        let tempArray2 = [];
        
        summaryDSDdata[i].data.map( data => {
          let index = dateColumn.indexOf(data.Date);
  
          if(index >= 0)
          {
            tempArray1.push([data.Date,data.Forecast]);
            tempArray2.push([data.Date,data.Actual]);
          }
          return null;
        });
  
        setgraphForecast(tempArray1);
        setgraphActual(tempArray2);
        handleModal(true);
      }

    const handleChart1 = (i) =>{
    let tempArray1 = [];
    let tempArray2 = [];
    
    summaryFROZENdata[i].data.map( data => {
        let index = dateColumn.indexOf(data.Date);

        if(index >= 0)
        {
        tempArray1.push([data.Date,data.Forecast]);
        tempArray2.push([data.Date,data.Actual]);
        }
        return null;
    });

    setgraphForecast(tempArray1);
    setgraphActual(tempArray2);
    handleModal(true);
    }


    const onChange = (date, dateString) =>{
      if(date.length > 0)
      {
        let tempDate = [];
        dateColumn1.map(data => {
          if(moment(data).format("YYYY-MM-DD") >=  moment(dateString[0]).format("YYYY-MM-DD") && moment(data).format("YYYY-MM-DD") <=  moment(dateString[1]).format("YYYY-MM-DD"))
          {
            tempDate.push(moment(data).format("MM/D/YYYY"))
          }
          else
          {
            console.log("not inside range");
          }
          return null;
        })
        handleDateColumn(tempDate);
      }
      else
      {
        groupData();
      }
    }

    const matches = useMediaQuery('(min-width:768px)');
    
    return (
        <>
        <Modal
              title = "chart"
              visible={openModal}
              onCancel={()=>{handleModal(false)}}
              width = {"80%"}
              bodyStyle={{marginTop:"-20px"}}
              footer={[
                <Button key="submit" type="primary"  onClick={()=>{handleModal(false)}}>
                  close
                </Button>,
              ]}
            >
              <Graph 
                title = "Forecast vs Actual"
                forecast = {forecastGraph}
                actual = {actualGraph}
              />
            </Modal>
        <div className={matches?"":'mt-5'}>
          <div className="mb-3">
                 <RangePicker onChange={onChange} />
          </div>
            <div >
                <Table 
                    tableData = {summaryDSDdata}
                    dateColumn = {dateColumn}
                    type = "DSD"
                    handleChange = {handleChart}
                />
                <br/><br/><br/>
                <Table 
                    tableData = {summaryFROZENdata}
                    dateColumn = {dateColumn}
                    type = "FROZEN"
                    handleChange = {handleChart1}
                />
            </div>
        </div>
        </>
    )
}
export default SummaryTable;