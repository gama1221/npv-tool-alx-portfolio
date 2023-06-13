import axios from "axios";

// const API_URL = "http://10.3.6.135:9999/cbe/api/loan/";
const API_URL = "http://localhost:9999/cbe/api/loan/";

const getCustomers =  ()=>{
        return axios.get(API_URL+"customer/")
    }
const getCustomer= (id)=>{
    return axios.get(API_URL +"customer/"+ id)
};
const getLoans=(customerId)=> {
    return axios.get(API_URL + 'loan'.concat('/', customerId));
}
const getCollateral = (loanId)=>{
    return axios.get(API_URL + 'collateral'.concat('/', loanId));
    // return axios.get(API_URL + 'collateral' + '/' + loanId);
}
const CustomerService = {
    getCustomers,
    getCustomer,
    getLoans,
    getCollateral,
  }

export default  CustomerService;  