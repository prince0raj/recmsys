import React from 'react'
import './status.css'
import NumberofOutlets from '../NumberOutelets/NumberofOutlets'
import StoreType from '../StoreTypeChart/StoreType'
import IncrementChart from '../Increment/IncrementChart'
import OutletTableRecords from '../DbOutletTable/OutletTableRecords'
import OutletTableRecordsNew from '../NewOutletTable/OutletTableRecords'

const Status = () => {
    return (
        <div className='status-container'>
            <div className="status-wrapper">
                <div className="records-wrapper">
                    <NumberofOutlets />
                    <IncrementChart />
                </div>
                <div className="incrementWrapper">
                    <StoreType />
                </div>
                <div className="outletTableRecord">
                    <OutletTableRecords />
                    <OutletTableRecordsNew />
                </div>
            </div>
        </div>
    )
}

export default Status
