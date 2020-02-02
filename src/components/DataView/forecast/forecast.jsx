import React,{ useState,useEffect } from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css'
import { ForecastData } from './data'
import {InputText} from 'primereact/inputtext';

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

    const [ globalFilter,setglobalFilter ] = useState('');

    console.log(ForecastData)

    var header1 = <div class="box">
    <div class="container-2">
    <i className="pi pi-search"></i>
        <input type="search" id="search" placeholder="Search..."  onChange={(e) => setglobalFilter(e.target.value)}/>
    </div>
  </div>

    var header = <div style={{'textAlign':'left'}}>
    <i className="pi pi-search"></i>
    <InputText type="search" onInput={(e) => setglobalFilter(e.target.value)} placeholder="Search" style={{width:'100%',padding:'5px'}}/>
</div>;

    const headerGroup = <ColumnGroup responsive={true}>
        <Row>
        <Column header="Product" rowSpan={3} filter={true} filterElement={header1}/>
        <Column header="Segment" rowSpan={3} filter={true} filterElement={header1}/>
        <Column header="Size" rowSpan={3} filter={true} filterElement={header1}/>
        </Row>
    <Row>
        <Column header="21-09-1996" colSpan={3} />
        <Column header="12-05-1996" colSpan={3} />
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
        <Column header="forecast" />
        <Column header="Actual" />
        <Column header="Accuracy" />
        <Column header="forecast" />
        <Column header="Actual" />
        <Column header="Accuracy" />
    </Row>
</ColumnGroup>;
  
   let frozenHeaderColumnGroup = <ColumnGroup>
   <Row>
       <Column header="SKU" rowSpan={3} filter={true} filterElement={header1} style={{height:'74px'}}/>
     
   </Row>
</ColumnGroup>;
    return (
        <>
        
        <DataTable value={forecastData} headerColumnGroup={headerGroup}   scrollable={true}   frozenHeaderColumnGroup={frozenHeaderColumnGroup}
                        globalFilter={globalFilter} emptyMessage="No records found" scrollHeight="350px" style={{ width: '100%'}} frozenWidth="15%" unfrozenWidth="85%">
            <Column field="SKU" style={{width:'200px',paddingBottom:'5px',textAlign:'left'}} frozen={true}/>
            <Column field="Product" style={{width:'200px'}} />
            <Column field="Segment" style={{width:'200px'}}  />
            <Column field="Size"  style={{width:'200px'}} />
            <Column field="Category"   style={{width:'200px'}}/> 
            <Column field="PackageSize"  style={{width:'200px'}} />
            <Column field="Conversion" style={{width:'200px'}} />
            <Column field="Date"  style={{width:'200px'}}/>
            <Column field="Forecast" style={{width:'200px'}}/>
            <Column field="Actual"  style={{width:'200px'}}/>
            <Column field="Category"  style={{width:'200px'}} /> 
            <Column field="PackageSize"   style={{width:'200px'}}/>
            <Column field="Conversion"  style={{width:'200px'}}/>
            <Column field="Date"  style={{width:'200px'}} />
            <Column field="Forecast" style={{width:'200px'}}/>
            <Column field="Actual" style={{width:'200px'}} />
        </DataTable>
        </>
    )
}
export default ForecastTable