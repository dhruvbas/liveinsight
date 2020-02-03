import React from "react";
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import { LayoutImages } from '../../images'
import LineGraph from "../../../images/line-chart.png";

const Table = ({ tableData,dateColumn, type , handleChange}) =>{
    return(
        <>
            <div style={{ width: "max-content",maxWidth:'100vw' ,paddingRight:'2rem'}}>
                 <table class="table table-responsive  first-col table-striped">
                    <thead>
                        <tr>
                            <th style={{width:"200px"}}> 
                               
                                    {type}
                                    <th style={{backgroundColor:'transparent !important',width:'200px'}}>Types</th>
                                
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
                         dateColumn.length > 0  && tableData.length > 0?
                        tableData.map( (data,i) => {
                            return(                              
                              <tr key={i}>
                                <td style={{minWidth:"200px"}}><img src={LineGraph} alt="graph" style={{width:"15px",height:"15px",marginRight:"10px",cursor:"pointer"}} onClick={()=>{handleChange(i)}} />{data.Product}</td>
                                {
                                  dateColumn.map( (data1,z) => {
                                    let index = tableData[i].data.findIndex(x => x.Date === data1);
                                    return(                                      
                                        index >= 0 ?
                                        <td key={z} className="default_row">
                                        <td style={{width:'200px',borderTop:'none'}}>{tableData[i].data[index].Forecast}</td>
                                        <td style={{width:'200px',borderTop:'none'}}>{tableData[i].data[index].Actual}</td>
                                        <td style={{width:'200px',borderTop:'none',padding:'0'}}>
                                          <span className={(Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 40 || tableData[i].data[index].Actual === 0? "A" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 70 ? "B" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 90 ? "C" : "D"}>
                                            <Progress  
                                              gapDegree={125} 
                                              strokeColor={(Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 40  || tableData[i].data[index].Actual === 0? "red" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 70 ? "#FFAA00" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 90 ? "#E6F600" : "green"} 
                                              width={70} 
                                              strokeLinecap = {1} 
                                              strokeWidth={10} 
                                              type="dashboard" 
                                              percent={
                                                (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 !== 0 && tableData[i].data[index].Actual !== 0?
                                                ((Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100).toFixed(2) 
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
                          <tr>
                          <td colSpan="5">
                          <img src = {LayoutImages.NoData} alt="No data" width="50%" height="25%" />
                          </td>
                      </tr>
                        }                    
                    </tbody>
                </table>
                </div>
        </>
    );
}

export default Table;