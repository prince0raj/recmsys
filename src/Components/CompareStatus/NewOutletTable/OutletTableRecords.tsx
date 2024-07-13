import './outletTableRecords.css'
import useDataContext from '../../../Context/UseContext';
import { SiGooglemaps } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
const OutletTableRecords = () => {
    // @ts-ignore
    const { newOutlets } = useDataContext();
    console.log(newOutlets);

    return (
        <div className='NewOutletTablecontainer'>
            <div className="OutletTablecontainer">
                <h2>
                    recommend Outlets <small> - within the Specified Boundary</small>
                </h2>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">Outlet-Name</div>
                        <div className="col col-2">Category</div>
                        <div className="col col-3">Address</div>
                        <div className="col col-4">Phone Number</div>
                        <div className="col col-5">Status</div>
                        <div className="col col-6">Rating & Reviews</div>
                        <div className="col col-7">Visit</div>
                    </li>
                    {newOutlets && newOutlets.map((outlet: any, index: any) => {
                        const payload = JSON.parse(outlet.payload);
                        console.log(payload);

                        return (
                            <li className="table-row" key={index}>
                                <div className="col col-1" data-label="Outlet-Name">{outlet.name ? outlet.name : "outlet.name"}</div>
                                <div className="col col-2" data-label="Category">{outlet.category ? outlet.category : "NA"}</div>
                                <div className="col col-3" data-label="Address">{outlet.address ? outlet.address : "NA"}</div>
                                <div className="col col-4" data-label="Phone Number">{outlet.phone_number ? outlet.phone_number : "NA"}</div>
                                <div className="col col-5" data-label="Status">{outlet.status ? outlet.status : "NA"}</div>
                                <div className="col col-6" data-label="Rating">
                                    {payload.stars ? (
                                        <>
                                            {payload.stars} <FaStar color="#ffa534" size={18} />{" "}
                                            {payload.numberOfReviews ? (
                                                <>
                                                    {payload.numberOfReviews} <MdReviews size={18} />
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </>
                                    ) : (
                                        "NA"
                                    )}
                                </div>
                                <div className="col col-7" data-label="G-Map">
                                    <a href={payload.googleUrl} target='_blank'><SiGooglemaps /> G-map</a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default OutletTableRecords
