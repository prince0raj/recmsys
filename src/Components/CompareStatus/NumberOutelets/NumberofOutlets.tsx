import React from 'react';
import './numberofOutlets.css';
import { Doughnut } from 'react-chartjs-2';
import useDataContext from '../../../Context/UseContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const NumberofOutlets = () => {
    //@ts-ignore
    const { newOutlets, dblobOutlets } = useDataContext();
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Current Outlets', 'New Outlets'],
        datasets: [
            {
                data: [dblobOutlets.length, newOutlets.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='container-outletsNumber'>
            <div className="chart-wrapper-donut">
                <Doughnut data={data} />
            </div>
            <div className="wrapper-outletNumber">
                <div className="currentNumber">
                    <h1>{dblobOutlets.length}</h1>
                    <p>Number of existing outlets</p>
                </div>
                <div className="currentNumber">
                    <h1>{newOutlets.length}</h1>
                    <p>Number of new outlets</p>
                </div>
            </div>
        </div>
    );
};

export default NumberofOutlets;
