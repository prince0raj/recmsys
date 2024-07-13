import { createContext, ReactNode, useEffect, useState } from "react";

interface DataContextProps {
    children: ReactNode;
}

interface DataContextValue { }


const DataContext = createContext<DataContextValue>({} as any);

const DataContextProvider = ({ children }: DataContextProps) => {
    const [centerCordinates, setcenterCordinates] = useState({ lat: 0, lon: 0 })
    const [outletsData, setOutletsData] = useState([]);
    const [newOutlets, setNewOutlets] = useState([]);
    const [dblobOutlets, setDblobOutlets] = useState([]);

    useEffect(() => {
        if (outletsData.length > 0) {
            const newOutlets: any = [];
            const dblobOutlets: any = [];

            outletsData.forEach(outlet => {
                //@ts-ignore
                if (outlet.percentage && parseFloat(outlet.percentage) > 80) {
                    dblobOutlets.push(outlet);
                } else {
                    newOutlets.push(outlet);
                }
            });

            setNewOutlets(newOutlets);
            setDblobOutlets(dblobOutlets);
        }
    }, [outletsData]);

    return (
        <DataContext.Provider
            value={{
                setcenterCordinates,
                centerCordinates,
                setOutletsData,
                outletsData,
                newOutlets,
                dblobOutlets
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataContextProvider };
