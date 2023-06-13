import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CustomerService from '../services/customer/CustomerService';
import { BiMoneyWithdraw } from 'react-icons/bi';
const CustomerComponent = () => {
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        showCustomers();
    }, [])
    const showCustomers = () => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <div>
            <h1>
                Customers
            </h1>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Customer Id </th>
                    <th> Customer First Name </th>
                    <th> Customer Middle Name </th>
                    <th> Customer Last Name </th>
                    <th> Customer Gender </th>
                    <th> Customer Phone Number </th>
                    <th> Customer Registration Date </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        customers.map(
                            customer =>
                                <tr key={customer.id}>
                                    <td> {customer.customerId} </td>
                                    <td> {customer.firstName} </td>
                                    <td> {customer.middleName} </td>
                                    <td> {customer.lastName} </td>
                                    <td> {customer.gender} </td>
                                    <td> {customer.phoneNumber} </td>
                                    <td> {customer.registerDate} </td>
                                    <td style={{ display: 'auto' }}>
                                        {/* <Link className="btn btn-info btn-sm" to={`/edit-customer/${customer.id}`} >Update</Link> */}
                                        <Link className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} to={`/loan/${customer.id}`} data-toggle="tooltip" title="Click it for loan" >
                                            <BiMoneyWithdraw size={25} /> Loan
                                        </Link>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
export default CustomerComponent;