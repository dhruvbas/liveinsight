import React, { useState, useEffect } from 'react'
import { Progress } from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { ForecastData } from './data';
import { LayoutImages } from '../../images'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const { RangePicker } = DatePicker;

const ForecastTable = () => {

    const [forecastData, setforecastData] = useState([]);
    const [dateColumn, handleDateColumn] = useState([]);


    useEffect(() => {
        groupData();
    }, []);

    const groupData = () => {
        console.log(ForecastData);
        let groupedData = [], tempDateColumn = [];

        // eslint-disable-next-line array-callback-return
        ForecastData.map((data, i) => {
            let dateIndex = tempDateColumn.indexOf(data.Date);
            if (dateIndex === -1) {
                tempDateColumn.push(data.Date);
            }
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

        handleDateColumn(tempDateColumn);
        setforecastData(groupedData);
        console.log(groupedData);
    }

    const onChange = (date, dateString) => {
        if (date.length > 0) {
            let tempDate = [];
            dateColumn.map(data => {
                if (moment(data).format("YYYY-MM-DD") >= moment(dateString[0]).format("YYYY-MM-DD") && moment(data).format("YYYY-MM-DD") <= moment(dateString[1]).format("YYYY-MM-DD")) {
                    tempDate.push(moment(data).format("MM/D/YYYY"))
                }
                else {
                    console.log("not inside range");
                }
            })
            handleDateColumn(tempDate);
        }
        else {
            groupData();
        }
    }

    const matches = useMediaQuery('(min-width:768px)');
    return (
        <div className={matches?"":'mt-5'}>
            <div className="mb-3">
                <RangePicker onChange={onChange} />
            </div>
            <div style={{ width: "max-content",maxWidth:'100vw' ,paddingRight:'2rem'}} >

                <table class="table table-responsive  first-col table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "200px" }}>
                                <div class="container-2">
                                    <span>
                                        <input type="search" id="search" placeholder="SKU..." /><span className="text">SKU</span>
                                    </span>
                                </div>
                            </th>
                            <th style={{ width: "200px" }}>
                                <div class="container-2">
                                    <span>
                                        <input type="search" id="search" placeholder="Product..." /><span className="text">product</span>
                                    </span>
                                </div>
                            </th>
                            <th style={{ width: "200px" }}>
                                <div class="container-2">
                                    <span>
                                        <input type="search" id="search" placeholder="Segment..." /><span className="text">Segment</span>
                                    </span>
                                </div>
                            </th>
                            <th style={{ width: "200px" }}>
                                <div class="container-2">
                                    <span>
                                        <input type="search" id="search" placeholder="Size..." /><span className="text">Size</span>
                                    </span>
                                </div>
                            </th>
                            <th style={{ width: "200px" }}>
                                <div class="container-2">
                                    <span>
                                        <input type="search" id="search" placeholder="Category..." /><span className="text">Category</span>
                                    </span>
                                </div>
                            </th>
                            {
                                dateColumn.map(data =>
                                    <th style={{ backgroundColor: 'transparent !important' }}>
                                        <tr style={{ display: 'block', backgroundColor: 'transparent !important' }}>
                                            <center>{data}</center>

                                            <th style={{ backgroundColor: 'transparent !important', width: '200px' }}>
                                                Forecast</th>
                                            <th style={{ backgroundColor: 'transparent !important', width: '200px' }}>Actual</th>
                                            <th style={{ backgroundColor: 'transparent !important', width: '200px' }}>Accuracy</th>

                                        </tr>
                                    </th>
                                )}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dateColumn.length > 0 && forecastData.length > 0 ?
                                forecastData.map((data, i) => {
                                    return (
                                        <tr>
                                            <td style={{ minWidth: "200px" }}>{data.SKU}</td>
                                            <td style={{ minWidth: "250px" }}>{data.Product}</td>
                                            <td style={{ minWidth: "200px" }}>{data.Segment}</td>
                                            <td style={{ minWidth: "200px" }}>{data.Size}</td>
                                            <td style={{ minWidth: "200px" }}>{data.Category}</td>
                                            {
                                                dateColumn.map(data1 => {
                                                    let index = forecastData[i].data.findIndex(x => x.Date === data1);
                                                    return (
                                                        index >= 0 ?
                                                            <td className="default_row">
                                                                <td style={{ width: '200px', borderTop: 'none' }}>{forecastData[i].data[index].Forecast}</td>
                                                                <td style={{ width: '200px', borderTop: 'none' }}>{forecastData[i].data[index].Actual}</td>
                                                                <td style={{ width: '200px', borderTop: 'none', padding: '0' }}>
                                                                    <span className={(Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100 < 40 ? "A" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100 < 70 ? "B" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100 < 90 ? "C" : "D"}>
                                                                        <Progress
                                                                            gapDegree={125}
                                                                            strokeColor={(Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100 < 40 ? "red" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100 < 70 ? "#FFAA00" : (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100 < 90 ? "#E6F600" : "green"}
                                                                            width={"70px"}
                                                                            strokeLinecap={1}
                                                                            strokeWidth={10}
                                                                            type="dashboard"
                                                                            percent={
                                                                                (Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100 !== 0 ?
                                                                                    ((Math.abs(forecastData[i].data[index].Actual - forecastData[i].data[index].Forecast) / forecastData[i].data[index].Actual) * 100).toFixed(2)
                                                                                    : 0} />
                                                                    </span>
                                                                </td>
                                                            </td>
                                                            :
                                                            <td className="default_row">
                                                                <td style={{ width: '200px', borderTop: 'none' }}>-</td>
                                                                <td style={{ width: '200px', borderTop: 'none' }}>-</td>
                                                                <td style={{ width: '200px', borderTop: 'none' }}>
                                                                    -
                                          </td>
                                                            </td>


                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                }
                                )
                                :
                                <tr>
                                    <td colSpan="5">
                                    <img src = {LayoutImages.NoData} width="50%" />
                                    </td>
                                </tr>
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default ForecastTable