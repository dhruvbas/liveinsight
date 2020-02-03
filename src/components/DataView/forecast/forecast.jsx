import React, { useState, useEffect } from 'react'

import { ForecastData } from './data'

const ForecastTable = () => {

    const [forecastData, setforecastData] = useState([]);


    useEffect(() => {
        console.log(ForecastData);
        let groupedData = [];
        ForecastData.map((data, i) => {
            let index = groupedData.findIndex(x => x.SKU === data.SKU);
            if (index >= 0) {
                groupedData[index].data.push({
                    Date: data.Date,
                    Forecast: data.Forecast,
                    Actual: data.Actual
                })
            }
            else {
                let temp_object = {};

                temp_object.SKU = data.SKU;
                temp_object.Product = data.Product;
                temp_object.Segment = data.Segment;
                temp_object.Size = data.Size;
                temp_object.Category = data.Category;
                temp_object.PackageSize = data.PackageSize;
                temp_object.Conversion = data.Conversion;
                temp_object.data = [{
                    Date: data.Date,
                    Forecast: data.Forecast,
                    Actual: data.Actual
                }];

                groupedData.push(temp_object);
            }
        })

        setforecastData(groupedData);
        console.log(groupedData);
    }, []);

    return (
        <>
            <div >
                <table class="table table-responsive  first-col table-striped">
                    <thead>
                        <tr>
                            <th style={{width:"200px"}}> 
                            <div class="container-2">
                                <span>
                                 
                                <input type="search" id="search" placeholder="Product..." />
                                <label className="text">Lastname</label>
                                </span>
                            </div>
                            </th>
                            <th style={{width:"200px"}}>
                            <div class="container-2">
                                <span>
                                <input type="search" id="search" placeholder="Product..." /><span className="text">Lastname</span>
                                </span>
                                </div>
                            </th>
                            <th style={{width:"200px"}}>
                            <div class="container-2">
                                <span>
                                <input type="search" id="search" placeholder="Product..." /><span className="text">Lastname</span>
                                </span>
                            </div>
                            </th>
                            <th style={{width:"200px"}}>
                            <div class="container-2">
                                <span>
                                <input type="search" id="search" placeholder="Product..." /><span className="text">Lastname</span>
                                </span>
                            </div>
                            </th>
                            <th style={{width:"200px"}}> 
                            <div class="container-2">
                                <span>
                                <input type="search" id="search" placeholder="Product..." /><span className="text">Lastname</span>
                                </span>
                            </div>
                            </th>
                            {forecastData.map(data =>
                            <th style={{backgroundColor:'transparent !important'}}>
                                <tr style={{ display: 'block' ,backgroundColor:'transparent !important'}}>
                                    <center>Email</center>
                                   
                                        <th style={{backgroundColor:'transparent !important',width:'200px'}}>
                                            Lastname</th>
                                        <th style={{backgroundColor:'transparent !important',width:'200px'}}>Email</th>
                                        <th style={{backgroundColor:'transparent !important',width:'200px'}}>Firstname</th>
                                 
                                </tr>
                            </th>
                            )}
                       </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                            <td>July</td>
                            <td>Dooley</td>
                            {forecastData.map(data => 
                            <td>
                                    <td style={{width:'200px',borderTop:'none',position:'relative !important'}}>july@</td>
                                    <td style={{width:'200px',borderTop:'none'}}>July</td>
                                    <td style={{width:'200px',borderTop:'none'}}>Dooley</td>
                            </td>
                            )}
                        </tr>

                    </tbody>

                </table>
            </div>
        </>
    )
}
export default ForecastTable