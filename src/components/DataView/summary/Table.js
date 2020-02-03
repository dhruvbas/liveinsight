import React from "react";
import { Progress } from 'antd';
import 'antd/dist/antd.css';

const Table = ({ tableData,dateColumn, type}) =>{
    return(
        <>
                 <table class="table table-responsive  first-col table-striped">
                    <thead>
                        <tr>
                            <th style={{minWidth:"200px"}}> 
                               
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
                              <tr>
                                <td style={{minWidth:"200px"}}>{data.Product}</td>
                                {
                                  dateColumn.map( data1 => {
                                    let index = tableData[i].data.findIndex(x => x.Date === data1);
                                    return(                                      
                                        index >= 0 ?
                                        <td className="default_row">
                                        <td style={{width:'200px',borderTop:'none'}}>{tableData[i].data[index].Forecast}</td>
                                        <td style={{width:'200px',borderTop:'none'}}>{tableData[i].data[index].Actual}</td>
                                        <td style={{width:'200px',borderTop:'none',padding:'0'}}>
                                          <span className={(Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 40 || tableData[i].data[index].Actual === 0? "A" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 70 ? "B" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 90 ? "C" : "D"}>
                                            <Progress  
                                              gapDegree={125} 
                                              strokeColor={(Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 40  || tableData[i].data[index].Actual === 0? "red" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 70 ? "#FFAA00" : (Math.abs(tableData[i].data[index].Actual - tableData[i].data[index].Forecast)/tableData[i].data[index].Actual)*100 < 90 ? "#E6F600" : "green"} 
                                              width={"70px"} 
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
                          <p>No Data Available!</p>
                        }                    
                    </tbody>
                </table>
        </>
    );
}

export default Table;