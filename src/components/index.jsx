import React from 'react'
import Header from './layouts/header'
import TableTabs from './layouts/appbar'
import Forecast from './DataView/forecast/forecast'
import ForecastTable from './DataView/forecast/forecast'

export const Home = () => {
    return(
        <>
            <Header />
            <TableTabs />
            {/* <ForecastTable /> */}
        </>
    )
}
