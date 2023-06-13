import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import CustomerService from '../services/customer/CustomerService'
// import { Key } from '@mui/icons-material';
const CollateralListComponent = () => {
    const { id } = useParams();
    // const history = useHistory();
    const feed = () => {
        console.log("here")
    }
    const [collaterals, setCollaterals] = useState([])
    useEffect(() => {
        getCollaterals();
    }, [])

    const getCollaterals = () => {
        CustomerService.getCollateral(id).then((response) => {
            debugger
            setCollaterals(response.data);
            // history.push("/loan/");
            ;
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>

            <table className="table table-bordered table-striped">
                <thead>
                    <th> Type </th>
                    <th> Amount </th>
                    <th> Date </th>
                    <th> Action </th>
                </thead>
                <tbody>
                    {
                        collaterals.map(
                            collateral =>
                                <tr key={collateral.id}>
                                    <td> {collateral.type} </td>
                                    <td> {collateral.value} </td>
                                    <td> {collateral.registerDate} </td>

                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={() => feed(collateral.id)}
                                            style={{ margin: "1px" }}> Feed</button>
                                        {/* <Link className="btn btn-success btn-sm" style={{ margin: "1px" }} to={`/collaterals/${loan.id}`} >show collateral</Link> */}
                                        {/* <button className="btn btn-success btn-sm" onClick={event => showCollateral(event, loan)}
                                            style={{ margin: "1px" }}> Show Collateral</button>
                                         */}

                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}
export default CollateralListComponent