import './storetype.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useDataContext from '../../../Context/UseContext';
import { useEffect, useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StoreType = () => {
    // @ts-ignore
    const { outletsData } = useDataContext();
    const [cat, setCat] = useState<string[]>([]);
    const [catFrequency, setCatFrequency] = useState<number[]>([]);

    useEffect(() => {
        if (outletsData && Array.isArray(outletsData)) {
            const categoryCounts: { [key: string]: number } = {};

            outletsData.forEach((val) => {
                if (val.category) {
                    categoryCounts[val.category] = (categoryCounts[val.category] || 0) + 1;
                }
            });
            const categories = Object.keys(categoryCounts);
            const frequencies = Object.values(categoryCounts);
            setCat(categories);
            setCatFrequency(frequencies);
        }
    }, [outletsData]);

    // Generate random color
    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}`;
    };

    // Generate random colors for background and border
    const backgroundColors = cat.map(() => `${generateRandomColor()}, 0.2)`);
    const borderColors = cat.map(() => `${generateRandomColor()}, 1)`);

    const data = {
        labels: cat,
        datasets: [
            {
                label: 'Shop Category',
                data: catFrequency,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 17,
                    boxWidth: 20,
                    usePointStyle: true,
                },
            },
        },
    };

    return (
        <div className='storetype-contaier'>
            <div className="storeType-wrapper">
                <Bar data={data} options={options as object} />
            </div>
        </div>
    );
};

export default StoreType;
