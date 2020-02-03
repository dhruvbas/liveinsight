import React, { useState, useEffect } from 'react'
import { Progress , Modal ,Button } from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import Graph from "../graph";
import LineGraph from "../../../images/line-chart.png";
import { ForecastData } from './data';
const { RangePicker } = DatePicker;

const ForecastTable = () => {

    const [forecastData, setforecastData] = useState([]);
    const [dateColumn, handleDateColumn] = useState([]);
    const [dateColumn1, handleDateColumn1] = useState([]);

    const [openModal,handleModal] = useState(false);
    const [forecastGraph,setgraphForecast] = useState([]);
    const [actualGraph,setgraphActual] = useState([]);


    useEffect(() => {
      groupData();
    }, []);

    const groupData = () =>{
      console.log(ForecastData);
      let groupedData = [],tempDateColumn = [];

      // eslint-disable-next-line array-callback-return
      ForecastData.map((data, i) => {
          let dateIndex = tempDateColumn.indexOf(data.Date);
          if(dateIndex === -1)
          {
            tempDateColumn.push(data.Date);
          }
          let index = groupedData.findIndex(x => x.SKU.toString() === data.SKU.toString());
          let forecast = data.Forecast;
          let actual = data.Actual;

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

          if (index >= 0) {
              groupedData[index].data.push({
                  Date: data.Date,
                  Forecast: +forecast,
                  Actual: +actual
              })
          }
          else {
              let temp_object = {};
              temp_object.SKU = data.SKU.toString();
              temp_object.Product = data.Product;
              temp_object.Segment = data.Segment;
              temp_object.Size = data.Size;
              temp_object.Category = data.Category;
              temp_object.PackageSize = data.PackageSize;
              temp_object.Conversion = data.Conversion;

              temp_object.data = [{
                  Date: data.Date,
                  Forecast: +forecast,
                  Actual: +actual
              }];
              
              groupedData.push(temp_object);
          }
      })

      handleDateColumn(tempDateColumn);
      handleDateColumn1(tempDateColumn);
      setforecastData(groupedData);
      console.log(groupedData);
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
        })
        handleDateColumn(tempDate);
      }
      else
      {
        groupData();
      }
    }

    const handleChart = (i) =>{
      let tempArray1 = [];
      let tempArray2 = [];
      
      forecastData[i].data.map( data => {
        let index = dateColumn.indexOf(data.Date);

        if(index >= 0)
        {
          tempArray1.push([data.Date,data.Forecast]);
          tempArray2.push([data.Date,data.Actual]);
        }
      });

      setgraphForecast(tempArray1);
      setgraphActual(tempArray2);
      handleModal(true);
    }

    const handleChange = (e) =>{
      let tempData = JSON.parse(JSON.stringify(forecastData));

      console.log(tempData);

      let newData = tempData.filter(x => {
        let text = new RegExp(e.target.value, "i");
        return x[e.target.name].search(text) >= 0 ?  true:  false
      });
      setforecastData(newData);
      console.log(newData);
    }
    
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
          <div className="mb-3">
                 <RangePicker onChange={onChange} />
          </div>
            <div >
           
                <table class="table table-responsive  first-col table-striped">
                    <thead>
                        <tr>
                            <th style={{minWidth:"200px"}}> 
                            <div class="container-2">
                                <span>
                                <input name="SKU" onChange={handleChange} type="search" id="search" placeholder="SKU..." /><span className="text">SKU</span>
                                </span>
                            </div>
                            </th>
                            <th style={{minWidth:"250px"}}>
                            <div class="container-2">
                                <span>
                                <input name="Product" onChange={handleChange} type="search" id="search" placeholder="Product..." /><span className="text">product</span>
                                </span>
                                </div>
                            </th>
                            <th style={{minWidth:"200px"}}>
                            <div class="container-2">
                                <span>
                                <input name="Segment" onChange={handleChange} type="search" id="search" placeholder="Segment..." /><span className="text">Segment</span>
                                </span>
                            </div>
                            </th>
                            <th style={{minWidth:"200px"}}>
                            <div class="container-2">
                                <span>
                                <input name="Size" onChange={handleChange} type="search" id="search" placeholder="Size..." /><span className="text">Size</span>
                                </span>
                            </div>
                            </th>
                            <th style={{minWidth:"200px"}}> 
                            <div class="container-2">
                                <span>
                                <input name="Category" onChange={handleChange} type="search" id="search" placeholder="Category..." /><span className="text">Category</span>
                                </span>
                            </div>
                            </th>
                            {
                              dateColumn.map(data =>
                                <th style={{backgroundColor:'transparent !important'}}>
                                    <tr style={{ display: 'block' ,backgroundColor:'transparent !important'}}>
                                          <center>{data}</center>
                                      
                                            <th style={{backgroundColor:'transparent !important',width:'200px'}}>
                                                Forecast</th>
                                            <th style={{backgroundColor:'transparent !important',width:'200px'}}>Actual</th>
                                            <th style={{backgroundColor:'transparent !important',width:'200px'}}>Accuracy</th>
                                    
                                    </tr>
                                </th>
                            )}
                       </tr>
                    </thead>
                    <tbody>
                        {
                        dateColumn.length > 0 && forecastData.length > 0?
                          forecastData.map( (data,i) => {
                            return(                              
                              <tr>
                                <td style={{minWidth:"200px"}}><img src={LineGraph} alt="graph" style={{width:"15px",height:"15px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{handleChart(i)}} />{data.SKU}</td>
                                <td style={{minWidth:"250px"}}>{data.Product}</td>
                                <td style={{minWidth:"200px"}}>{data.Segment}</td>
                                <td style={{minWidth:"200px"}}>{data.Size}</td>
                                <td style={{minWidth:"200px"}}>{data.Category}</td>
                                {
                                  dateColumn.map( data1 => {
                                    let index = forecastData[i].data.findIndex(x => x.Date === data1);
                                    return(                                      
                                        index >= 0 ?
                                        <td className="default_row">
                                        <td style={{width:'200px',borderTop:'none'}}>{forecastData[i].data[index].Forecast}</td>
                                        <td style={{width:'200px',borderTop:'none'}}>{forecastData[i].data[index].Actual}</td>
                                        <td style={{width:'200px',borderTop:'none',padding:'0'}}>
                                          <span className={(Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100 < 40 || forecastData[i].data[index].Actual === 0 ? "A" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100 < 70 ? "B" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100 < 90 ? "C" : "D"}>
                                            <Progress  
                                              gapDegree={125} 
                                              strokeColor={(Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100 < 40 || forecastData[i].data[index].Actual === 0 ? "red" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100 < 70 ? "#FFAA00" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100 < 90 ? "#E6F600" : "green"} 
                                              width={"70px"} 
                                              strokeLinecap = {1} 
                                              strokeWidth={10} 
                                              type="dashboard" 
                                              percent={
                                                (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100 !== 0 && forecastData[i].data[index].Actual !== 0 ?
                                                ((Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast)/forecastData[i].data[index].Actual)*100).toFixed(2) 
                                                : 0} />
                                          </span>
                                          </td>
                                      </td>
                                      :
                                      <td className="default_row">
                                        <td style={{width:'200px',borderTop:'none'}}>-</td>
                                        <td style={{width:'200px',borderTop:'none'}}>-</td>
                                        <td style={{width:'200px',borderTop:'none'}}>
                                          -
                                          </td>
                                      </td>
                                      
                                      
                                    )
                                  })
                                }
                              </tr>
                            )}
                            )
                          :
                          <p>No Data Available!</p>
                        }                    
                    </tbody>

                </table>
            </div>
        </>
    )
}
export default ForecastTable