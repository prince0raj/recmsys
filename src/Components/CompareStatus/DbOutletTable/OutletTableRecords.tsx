import useDataContext from '../../../Context/UseContext';
import './outletTableRecords.css';
import { SiGooglemaps } from "react-icons/si";

const OutletTableRecords = () => {
    // @ts-ignore
    const { dblobOutlets } = useDataContext();

    return (
        <div className='DbOutletContainer'>
            <div className="OutletTablecontainer">
                <h2>
                    Matched Outlet <small> - within the Specified Boundary</small>
                </h2>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Outlet-Name</div>
                        <div className="col col-2">Category</div>
                        <div className="col col-3">Address</div>
                        <div className="col col-4">Phone Number</div>
                        <div className="col col-5">Status</div>
                        <div className="col col-6">Percentage</div>
                        <div className="col col-7">Outlet Code</div>
                        <div className="col col-8">Visit</div>
                    </li>
                    {dblobOutlets && dblobOutlets.map((outlet: any, index: any) => {
                        const payload = JSON.parse(outlet.payload);
                        return (
                            <li className="table-row" key={index}>
                                <div className="col col-1" data-label="Outlet-Name">{outlet.name ? outlet.name : "outlet.name"}</div>
                                <div className="col col-2" data-label="Category">{outlet.category ? outlet.category : "NA"}</div>
                                <div className="col col-3" data-label="Address">{outlet.address ? outlet.address : "NA"}</div>
                                <div className="col col-4" data-label="Phone Number">{outlet.phone_number ? outlet.phone_number : "NA"}</div>
                                <div className="col col-5" data-label="Status">{outlet.status ? outlet.status : "NA"}</div>
                                <div className="col col-6" data-label="Percentage">{outlet.percentage ? `${outlet.percentage}%` : "0.0"}</div>
                                <div className="col col-7" data-label="Outlet Code">{outlet.outletcode ? outlet.outletcode : "0000"}</div>
                                <div className="col col-8" data-label="G-Map">
                                    <a href={payload.googleUrl} target='_blank'><SiGooglemaps /> G-map</a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default OutletTableRecords;



// export default OutletTableRecords;


// const OutletTableRecords = () => {


//     const [totalLength, setTotalLength] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [previousPages, setPreviousPages] = useState([]);
//     const [nextPages, setNextPages] = useState([]);

//     const nextPageCalculator = (currentValue: any) => {
//         // Setting up the next pages
//         let tempNextPages = [];
//         for (let i = 1; i <= 2; i++) {
//             if (currentValue + i <= totalLength) {
//                 tempNextPages.push(currentValue + i);
//             }
//         }
//         // @ts-ignore
//         setNextPages(tempNextPages);
//     }

//     const previousPageCalculator = (currentValue: any) => {
//         let tempPreviousPages = [];
//         for (let i = 1; i <= 2; i++) {
//             if (currentValue - i >= 1) {
//                 tempPreviousPages.push(currentValue - i);
//             }
//         }
//         // @ts-ignore
//         tempPreviousPages.reverse();
//         // @ts-ignore
//         setPreviousPages(tempPreviousPages);
//         console.log(tempPreviousPages);
//     }

//     const initialLoad = () => {

//         // let length = products.length;
//         // setTotalLength(length);
//         // Setting up the previous and next pages
//         nextPageCalculator(1);
//         previousPageCalculator(1);

//     }

//     const currentPageChanger = () => {
//         // @ts-ignore
//         setCurrentPage(curr => {
//             if ((curr + 1) > totalLength) {
//                 nextPageCalculator(curr);
//                 previousPageCalculator(curr);
//                 return curr;
//             }
//             nextPageCalculator(curr + 1);
//             previousPageCalculator(curr + 1);
//             return curr + 1;
//         })

//     }

//     const pageDowner = () => {
//         setCurrentPage(curr => {
//             if ((curr - 1) < 1) {
//                 nextPageCalculator(curr);
//                 previousPageCalculator(curr);
//                 return curr;
//             }
//             nextPageCalculator(curr - 1);
//             previousPageCalculator(curr - 1);
//             return curr - 1;
//         })
//     }

//     const directJump = (pageNumber: any) => {
//         setCurrentPage(parseInt(pageNumber));
//         nextPageCalculator(parseInt(pageNumber));
//         previousPageCalculator(parseInt(pageNumber));
//     }

//     useEffect(() => {
//         initialLoad();
//     }, [])

//     return (
//         <div className="mb-40">
//             {(currentPage !== 1) && <p onClick={pageDowner}>Arrow (Page downer)</p>}
//             {previousPages.map((page, index) => {
//                 if (index === 0) {
//                     console.log("Page : " + page);
//                     if (page >= 3)
//                         return <><p onClick={() => directJump(1)}>Previous 1</p><p>...</p><p onClick={() => directJump(page)}>Previous {page}</p></>
//                 }
//                 return <p onClick={() => directJump(page)}>Previous {page}</p>;
//             })}
//             <p onClick={() => directJump(currentPage)}>Current : {currentPage}</p>
//             {nextPages.map((page, index) => {

//                 if (index === (nextPages.length - 1)) {
//                     if (totalLength - page > 1) {
//                         return <><p onClick={() => directJump(page)}>Next {page}</p><p>...</p><p onClick={() => directJump(totalLength)}>Next {totalLength}</p></>
//                     }
//                 }

//                 return <p onClick={() => directJump(page)}>Next : {page}</p>;
//             })}
//             {!(currentPage === totalLength) && <p onClick={currentPageChanger}>Arrow (Page changer)</p>}
//         </div>
//     );
// };
// export default OutletTableRecords;
