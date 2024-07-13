import { useContext } from "react";
import { DataContext } from "./ContextRedux";

const useDataContext = () => {
    return useContext(DataContext);
};

export default useDataContext;
