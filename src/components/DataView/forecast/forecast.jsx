import React,{ useState,useEffect } from 'react'

import { ForecastData } from './data'

const ForecastTable = () => {

    const [ forecastData,setforecastData ] = useState([]);


    useEffect(() => {
        console.log(ForecastData);
        let groupedData = [];
        ForecastData.map((data,i) => {
            let index = groupedData.findIndex(x => x.SKU === data.SKU);
            if(index >= 0)
            {
                groupedData[index].data.push({
                    Date : data.Date,
                    Forecast : data.Forecast,
                    Actual : data.Actual
                })
            }
            else
            {
                let temp_object = {};

                temp_object.SKU = data.SKU;
                temp_object.Product = data.Product;
                temp_object.Segment = data.Segment;
                temp_object.Size = data.Size;
                temp_object.Category = data.Category;
                temp_object.PackageSize = data.PackageSize;
                temp_object.Conversion = data.Conversion;
                temp_object.data = [{
                    Date : data.Date,
                    Forecast : data.Forecast,
                    Actual : data.Actual
                }];

                groupedData.push(temp_object);
            }
        })

        setforecastData(groupedData);
        console.log(groupedData);
    },[]);

    return (
        <>
              <table class="table table-striped">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>
                </tr>
                <tr>
                    <td>July</td>
                    <td>Dooley</td>
                    <td>july@example.com</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}
export default ForecastTable