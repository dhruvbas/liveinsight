import React,{ useState,useEffect } from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css'
import { ForecastData } from './data'

const ForecastTable = () => {

    const Data =  [
        {brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342'},
        {brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122'},
        {brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500'},
        {brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,'},
        {brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332'},
        {brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005'},
    ]

    const [ inmemoryData,setinmemoryData ] = useState(Data);

    const [ forecastData,setforecastData ] = useState(ForecastData);

    console.log(ForecastData)

    const headerGroup = <ColumnGroup >
    <Row>
        <Column header="SKU" rowSpan={3}/>
        <Column header="Product" rowSpan={3} />
        <Column header="Segment" rowSpan={3} />
        <Column header="Size" rowSpan={3} />
    </Row>
    <Row>
        <Column header="21-09-1996" colSpan={3} />
        <Column header="12-05-1996" colSpan={3} />
    </Row>
    <Row>
        <Column header="forecast" />
        <Column header="Actual" />
        <Column header="Accuracy" />
        <Column header="forecast" />
        <Column header="Actual" />
        <Column header="Accuracy" />
    </Row>
</ColumnGroup>;
   

    return (
        <>
        
        <DataTable value={forecastData} headerColumnGroup={headerGroup} scrollable={true}>
                        <Column field="SKU"   />
                        <Column field="Product"   style={{textAlign:'left',width:'200px'}}/>
                        <Column field="Segment"  />
                        <Column field="Size"   />
                        <Column field="Category"   /> 
                        <Column field="PackageSize"   />
                        <Column field="Conversion"  />
                        <Column field="Date"  />
                        <Column field="Forecast" />
                        <Column field="Actual"  />
        </DataTable>
        </>
    )
}
export default ForecastTable