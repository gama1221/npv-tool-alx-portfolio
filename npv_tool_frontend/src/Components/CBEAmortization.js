
import { useState } from "react";
import { TextField } from "@mui/material";

import { Stack } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import NPVWaiver from 'cbe-npv-principal-waiver';
import CBEAmortizationT from "cbe-npv-normal";

const CBEAmortization = () => {
  const [alignment, setAlignment] = useState('first');

  const handleChangeToggler = (event, newAlignment) => {
    if(alignment === 'first'){      
      setAlignment(newAlignment);
      setIsFormVisible(true);
      setNormalNpvForm(false);
      
    }
    else if(alignment === 'second' ){
      setAlignment(newAlignment);
      setIsFormVisible(false);
      setNormalNpvForm(true);
    }
    // setAlignment(newAlignment);
  };
  const [amortization, setAmortization] = useState([]);
  const [waiverAmortization, setWaiverAmortization] = useState([]);
  const [cumulativeInterestF, setCumulativeInterestF] = useState();
  const [scheduled_payment, setScheduled_payment] = useState([]);
  const [actualNumberOfPayments, setActualNumberOfPayments] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [normalNpvForm, setNormalNpvForm] = useState(true);
  const [npv, setNPV] = useState([]);
  const [npvWaive, setNpvWaive] = useState([]);
  const [npvForClosure, setNPVForClosure] = useState(0);
  const [npvForSell, setNpvForSell] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const [clickStatus, setClickStatus] = useState(false);

  /**
   *
   * @param {*} amount
   * @param {*} rate
   * @param {*} years
   * @param {*} numberOfPayments
   */
  const calculate = (amount, rate, years, riskPremium, numberOfPayments) => {
    const loan = CBEAmortizationT(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments
    );
    console.log(loan);
    setNPV(loan.NPV);
    setAmortization(loan.scheduledPayments);
    setCumulativeInterestF(loan.cumulativeInterest);
    setScheduled_payment(loan.scheduledPayment);
    setActualNumberOfPayments(loan.actualNumberOfPayments);
    // setYearlyPrincipalSummation(loan.yearlyPrincipalSummation);
  };
  const calculateNPVWithWaiver = (
    amount,
    rate,
    years,
    riskPremium,
    numberOfPayments,
    waivedNumberOfPayment
  ) => {
    const loanWaive = NPVWaiver(
      amount,
      rate,
      years,
      riskPremium,
      numberOfPayments,
      waivedNumberOfPayment
    );
    debugger
    setWaiverAmortization(loanWaive.scheduledPayments);
    setNpvWaive(loanWaive.NPV);
    console.log(loanWaive);
  };
  const handleSubmit = (e) => {
    // setIsPending(true);
    e.preventDefault();
    setTimeout(() => {
      setIsPending(false);
      if (values["waiver-number-of-payments"] > 0) {
        // Calculate NPV with waiver
        calculateNPVWithWaiver(
          values["original-loan"],
          values["annaul-interest-rate"],
          values["loan-period-in-years"],
          values["risk-premium"],
          values["number-of-payments-per-year"],
          values["waiver-number-of-payments"]
        );
      }
      if (values["waiver-number-of-payments"] === 0) {
        calculate(
          values["original-loan"],
          values["annaul-interest-rate"],
          values["loan-period-in-years"],
          values["risk-premium"],
          values["number-of-payments-per-year"]
        );
      }
      setClickStatus(true);
      // isPending(false)
    }, 1000);
    setIsPending(true);
  };
  const handleForClosure = (e) => {
    e.preventDefault();
    setTimeout(() => {
      var collateral_type = forclosureValues["collateral-type"];
      var collateral_value = forclosureValues["collateral-value"];

      var loan_date = forclosureValues["loan-date"];
      var loanDate = parseInt(loan_date.substring(0, 4));

      const today = new Date();

      const loanPeriod = today.getFullYear() - loanDate;
      if (collateral_type === "building") {
        if (loanPeriod === 0) {
          // if the duration is from 1 to 2year inclusive, MCF	1
          //  value of collateral*MCF*1
          setNPVForClosure(collateral_value);
        } else if (loanPeriod === 1) {
          // if the duration is from 1 to 2year inclusive, MCF	1.2
          // value of collateral*MCF*1.5
          setNPVForClosure(collateral_value * 1.2 * 1.5);
        } else if (loanPeriod === 2) {
          // if the duration is from 2 to 3year inclusive, MCF	1.3
          // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
          setNPVForClosure(collateral_value * 1.3 * 1.5);
        } else if (loanPeriod === 3) {
          // if the duration is from 3 to 4year inclusive, MCF	1.4
          // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
          setNPVForClosure(collateral_value * 1.4 * 1.5);
        } else if (loanPeriod === 4) {
          // if the duration is from 4 to 5year inclusive, MCF	1.5
          // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
          setNPVForClosure(collateral_value * 1.5 * 1.5);
        } else if (loanPeriod >= 5) {
          // if the duration is above 5year, MCF	revalued amount
          // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
          alert("It should be revaluated via experts");
        }
      } else if (collateral_type === "motor") {
        if (loanPeriod === 0) {
          // if the duration is from 1 to 2year inclusive, MCF	1
          // value of collateral*MCF*1
          setNPVForClosure(collateral_value);
        } else if (loanPeriod === 1) {
          // if the duration is from 1 to 2year inclusive, MCF	1.1
          // for the duration b/n 1 to 5year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.1 * 0.9);
        } else if (loanPeriod === 2 || loanPeriod === 3) {
          // if the duration is from 2 to 4year inclusive, MCF	1.2
          // for the duration b/n 1 to 5year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.2 * 0.9);
        } else if (loanPeriod === 4 || loanPeriod === 5) {
          // if the duration is from 4 to 6year inclusive, MCF	1.25
          // for the duration b/n 1 to 5year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.25 * 0.9);
        } else if (loanPeriod === 6 || loanPeriod === 7) {
          // If the duration is from 6 to 8 year inclusive, MCF	1.35
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.35 * 0.9);
        } else if (loanPeriod === 8 || loanPeriod === 9) {
          // if the duration is from 8 to 10 year inclusive, MCF	1.5
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.5 * 0.9);
        } else {
          // if the duration is above 10year, MCF	1.4
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.4 * 0.9);
        }
      } else {
        //it means machinery
        if (loanPeriod === 0) {
          // if the duration is from 1 to 2year inclusive, MCF	1
          // value of collateral*MCF*1
          setNPVForClosure(collateral_value);
        } else if (loanPeriod === 1) {
          // if the duration is from 1 to 2 year inclusive, MCF	1.05
          // for the duration b/n 1 to 5year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.05 * 0.9);
        } else if (loanPeriod === 2 || loanPeriod === 3) {
          // if the duration is from 2 to 4year inclusive, MCF	1.2
          // for the duration b/n 1 to 5year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.2 * 0.9);
        } else if (loanPeriod === 4 || loanPeriod === 5) {
          // if the duration is from 4 to 6year inclusive, MCF	1.3
          // for the duration b/n 1 to 5year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.3 * 0.9);
        } else if (loanPeriod === 6 || loanPeriod === 7) {
          // if the duration is from 6 to 8year inclusive, MCF	1.35
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.35 * 0.9);
        } else if (loanPeriod === 8 || loanPeriod === 9) {
          // if the duration is from 8 to 10year inclusive, MCF	1.4
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.4 * 0.9);
        } else if (loanPeriod === 10 || loanPeriod === 11) {
          // if the duration is from 10 to 12year inclusive, MCF	1.45
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.45 * 0.9);
        } else if (
          loanPeriod === 12 ||
          loanPeriod === 14 ||
          loanPeriod === 13
        ) {
          // if the duration is from 12 to 15year inclusive, MCF	1.5
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.5 * 0.9);
        } else {
          // if the duration is above 510year, MCF	1.3
          // For the duration is above 5 year value of collateral*MCF*0.9
          setNPVForClosure(collateral_value * 1.3 * 0.9);
        }
      }
    }, 1000);
  };

  const [values, setValues] = useState({
    "original-loan": '',
    "annaul-interest-rate": '',
    "loan-period-in-years": '',
    "risk-premium": '',
    "number-of-payments-per-year": '',
    "waiver-number-of-payments": '',
    //additionals
  });
  const [forclosureValues, setForclosureValues] = useState({
    "collateral-type": '',
    "collateral-value": '',
    "loan-date": '',
  });
  const handleForClosureInputChange = (e) => {
    const { name, value } = e.target;
    setForclosureValues({
      ...forclosureValues,
      [name]: value,
    });
  };
  const handleNpvWithSell = (e) => {
    e.preventDefault();
    setNpvForSell(
      forclosureValues["collateral-value"] -
      0.05 * forclosureValues["collateral-value"]
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const roundAmount = (num) => {
    return Math.round(num * 100) / 100;
  };
  // const toggleForm = (e) => {
  //   setIsFormVisible(true);
  //   setNormalNpvForm(false);
  // };

  const feedBelaynehData = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsPending(false);
      forclosureValues["collateral-type"] = "building";
      forclosureValues["collateral-value"] = 1200000;
      forclosureValues["loan-date"] = "2020-02-01";
      setClickStatus(true);
      // isPending(false)
    }, 1000);
    setIsPending(true);
  };

  const feedWorkuData = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsPending(false);
      forclosureValues["collateral-type"] = "motor";
      forclosureValues["collateral-value"] = 2000000;
      forclosureValues["loan-date"] = "2019-02-02";
      setClickStatus(true);
      // isPending(false)
    }, 1000);
    setIsPending(true);
  };

  const feedHaileData = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsPending(false);
      forclosureValues["collateral-type"] = "machinery";
      forclosureValues["collateral-value"] = 3100000;
      forclosureValues["loan-date"] = "2018-02-03";
      setClickStatus(true);
      // isPending(false)
    }, 1000);
    setIsPending(true);
  };
  const feedNormalBelaynehData = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsPending(false);
      values["collateral-type"] = "machinery";
      values["original-loan"] = 1000000;
      values["annaul-interest-rate"] = 15.5;
      values["loan-period-in-years"] = 3;
      values["risk-premium"] = 3;
      values["number-of-payments-per-year"] = 4;
      values["waiver-number-of-payments"] = 0;
      setClickStatus(true);
      // isPending(false)
    }, 1000);
    setIsPending(true);
  };
  
  
  const feedNormalWorkuData = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsPending(false);
      values["collateral-type"] = "machinery";
      values["original-loan"] = 1000000;
      values["annaul-interest-rate"] = 16.5;
      values["loan-period-in-years"] = 5;
      values["risk-premium"] = 3;
      values["number-of-payments-per-year"] = 4;
      values["waiver-number-of-payments"] = 4;
      setClickStatus(true);
      // isPending(false)
    }, 1000);
    setIsPending(true);
  };
  return (
    <div>
      <div className="container">

        <ToggleButtonGroup
          color="secondary"
          value={alignment}
          exclusive
          onChange={handleChangeToggler}
          aria-label="Platform"
        >
          <ToggleButton color='secondary' value="first" data-toggle='tooltip' title='Normal, Waiver, Extension NPV'>First</ToggleButton>
          <ToggleButton value="second" data-toggle='tooltip' title='Sell and Foreclosure NPV'>Second</ToggleButton>
        </ToggleButtonGroup>

        <div className="row align-items-start mt-3">
          <div className="col">          
            {/* <strong>
              {" "}
              <input
                type="submit"
                value="Forclosure"
                className="btn btn-outline-success mt-2 mb-3"
                onClick={toggleForm}
              ></input>{" "}
            </strong> */}
            {normalNpvForm && 
            <form>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th data-toggle='tooltip' title='Customer Name'>Customer</th>
                    <th data-toggle='tooltip' title='Loan Amount'> Loan </th>
                    <th data-toggle='tooltip' title='Annual Interest Rate in %'>Interest</th>
                    <th data-toggle='tooltip' title='Loan period in (Years)'> Period </th>
                    <th data-toggle='tooltip' title='Risk premium in %'>Risk</th>
                    <th data-toggle='tooltip' title="Number of Payments per year">Payments</th>
                    <th>Waiver</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="nameBelay" value={"Belayneh K."}>
                      {" "}
                      Belayneh
                    </td>
                    <td>1000000</td>
                    <td>15.5</td>
                    <td>3</td>
                    <td>3</td>
                    <td> 4 </td>
                    <td>0</td>
                    <td>
                      <input
                        type="submit"
                        value="Feed"
                        className="btn btn-outline-success mt-2 mb-3"
                        onClick={feedNormalBelaynehData}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Worku</td>
                    <td>1000000</td>
                    <td>16.5</td>
                    <td>5</td>
                    <td>3</td>
                    <td> 4 </td>
                    <td>4</td>
                    <td>
                      <input
                        type="submit"
                        value="Feed"
                        className="btn btn-outline-success mt-2 mb-3"
                        onClick={feedNormalWorkuData}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
}
            {!isFormVisible ? (
              <form onSubmit={handleSubmit} id="normalForm" value="test">
                <Stack spacing={2}>

                  <Stack spacing={1} direction='row'>
                    <TextField label='Loan Amount' color="secondary" size="small"
                      placeholder="Enter Loan Amount" variant="outlined"
                      name="original-loan"
                      value={values["original-loan"]}
                      id="original-loan"
                      onChange={handleInputChange}
                    />

                    <TextField label='Annual Interest Rate in %' color="secondary" size="small"
                      placeholder="Enter Annual Interest Rate in %" variant="outlined"
                      name="annaul-interest-rate"
                      id="annaul-interest-rate"
                      value={values["annaul-interest-rate"]}
                      onChange={handleInputChange}
                    />
                  </Stack>

                  <Stack spacing={1} direction='row'>
                    <TextField label='Loan period in (Years)' color="secondary" size="small"
                      placeholder="Enter Loan period in (Years)" variant="outlined"
                      name="loan-period-in-years"
                      id="loan-period-in-years"
                      value={values["loan-period-in-years"]}
                      onChange={handleInputChange}
                    />

                    <TextField label='Risk premium in %' color="secondary" size="small"
                      placeholder="Enter Risk premium in %" variant="outlined"
                      name="risk-premium"
                      id="risk-premium"
                      value={values["risk-premium"]}
                      onChange={handleInputChange}
                    />
                  </Stack>

                  <Stack spacing={1} direction='row'>
                    <FormControl>
                      <InputLabel 
                      id="demo-simple-select-helper-label" 
                      color="secondary" size="small">Number of Payment</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="number-of-payments-per-year"
                        name="number-of-payments-per-year"
                        label="Number of Payments"
                        variant='outlined'
                        color="secondary"
                        size='small'
                        value={values["number-of-payments-per-year"]}
                        onChange={handleInputChange}
                      >                       
                        <MenuItem value='1'>Annually</MenuItem>
                        <MenuItem value='2'>Semi-Annually</MenuItem>
                        <MenuItem value='4'>Quarterly</MenuItem>
                        <MenuItem value='12'>Monthly</MenuItem>
                        
                      </Select>
                      <FormHelperText>Number of Payement per year</FormHelperText>
                    </FormControl>

                    <TextField label='Waiver' color="secondary" size="small"
                      placeholder="Enter Waiver" variant="outlined"
                      name="waiver-number-of-payments"
                      id="waiver-number-of-payments"
                      value={values["waiver-number-of-payments"]}
                      onChange={handleInputChange}
                    />
                  </Stack >

                </Stack>
               
                <div className="form-action">
                  <input
                    type="submit"
                    value="Compute"
                    className="btn btn-outline-success mt-2 mb-3"
                  ></input>
                </div>

              </form>
            ) : (
              <div>
                {/* onSubmit={handleForclosureFormFeed} */}
                <form>
                  <table className="table table-bordered table-hover table-responsive">
                    <thead>
                      <tr>
                        <th data-togle='tooltip' title="Customer Name">Customer</th>
                        <th data-toggle='tooltip' title="Collateral Type">Type </th>
                        <th data-toggle='tooltip' title='Colateral value'>Value</th>
                        <th title='Loan Date' data-toggle='tooltip'>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Belayneh
                        </td>
                        <td>
                          building
                        </td>
                        <td>
                          1200000
                        </td>
                        <td>
                          01/02/2020
                        </td>
                        <td>
                          <input
                            type="submit"
                            value="Feed"
                            className="btn btn-outline-success mt-2 mb-3"
                            onClick={feedBelaynehData}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td> Worku A.</td>
                        <td> motor </td>
                        <td> 2,000,000 </td>
                        <td> 02/02/2019 </td>
                        <td>
                          <input
                            type="submit"
                            value="Feed"
                            onClick={feedWorkuData}
                            className="btn btn-outline-success mt-2 mb-3"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td> Haile </td>
                        <td> machinery </td>
                        <td> 3,100,000 </td>
                        <td> 03/02/2018 </td>
                        <td>
                          <input
                            onClick={feedHaileData}
                            type="submit"
                            value="Feed"
                            className="btn btn-outline-success mt-2 mb-3"
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* <div className="form-action">
                    <input
                      type="submit"
                      value="Feed Data"
                      className="btn btn-outline-success mt-2 mb-3"
                    ></input>
                  </div> */}
                </form>
                <form onSubmit={handleForClosure} id="normalForm" value="test">

                  
                <Stack spacing={1} direction='row'>
                    <FormControl>
                      <InputLabel 
                      id="demo-simple-select-helper-label1" 
                      color="secondary" size="small">Collateral Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label1"
                        id="collateral-type"
                        name="collateral-type"
                        label="Number of Payments"
                        variant='outlined'
                        color="secondary"
                        size='small'
                        value={forclosureValues["collateral-type"]}
                        onChange={handleForClosureInputChange}
                      >                       
                        <MenuItem value='building' data-toggle='tooltip' title='Premises, Buildings and Houses'>Premises, Buildings and Houses</MenuItem>
                        <MenuItem value='motor'>Motor vechile and Construction</MenuItem>
                        <MenuItem value='machinery'>Other Motor Vehicles and Machineries</MenuItem>

                      </Select>
                      <FormHelperText>Select Collateral Type </FormHelperText>
                    </FormControl>

                    <div className="form-group">
                    {/* <label htmlFor="loan-date">Loan Date</label> */}
                    <div className="form-input">
                      <input
                        data-toggle='tooltip'
                        title='Loan Date'
                        className="form-control mb-1"
                        type="date"
                        name="loan-date"
                        placeholder="0"
                        value={forclosureValues["loan-date"]}
                        onChange={handleForClosureInputChange}
                      />
                    </div>
                  </div>
                  
               </Stack>
                    <Stack spacing={1} direction='row'>
                    <TextField label='Collateral Value' color="secondary" size="small"
                      placeholder="Enter collateral-value" variant="outlined"
                      name="collateral-value"
                      value={forclosureValues["collateral-value"]}
                      onChange={handleForClosureInputChange}
                    />   
                     </Stack>  
                    
                  <div className="form-group">
                    {/* <strong> Forclosure NPV = {npvForClosure} </strong> */}
                  </div>
                  <div style={{ display: "inline" }}>
                    <div
                      className="form-action m-2"
                      style={{ display: "inline" }}
                    >
                      <input
                        type="submit"
                        value="Compute"
                        data-toggle="tooltip"
                        title="Click it to compute foreclosure NPV"
                        className="btn btn-outline-success mt-2 mb-3"
                      ></input>
                    </div>
                    <div className="form-action" style={{ display: "inline" }}>
                      <input
                        type="submit"
                        value="Compute NPV for Sell"
                        data-toggle="tooltip"
                        title="You only need to provide Collateral Value"
                        className="btn btn-outline-success mt-2 mb-3"
                        style={{ display: "inline" }}
                        onClick={handleNpvWithSell}
                      ></input>
                      <em style={{ fontSize: "smaller" }}>Collateral Value?</em>
                      {/* { npvForSell && <em> {npvForSell} </em> } */}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          {Boolean(
            values["original-loan"] ||
            values["annaul-interest-rate"] ||
            values["loan-period-in-years"] ||
            values["number-of-payments-per-year"] ||
            values["risk-premium"] ||
            clickStatus ||
            forclosureValues["collateral-value"]
          ) && (
              <div className="col">
                <h4> NPV Results </h4>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th
                        colSpan={2}
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                          margin: "auto",
                          textAlign: "center",
                        }}
                      >
                        NPV
                      </th>
                    </tr>
                    <tr>
                      <th>Normal</th>
                      <td className="cbe-text-color fontWeightBold">{npv}</td>
                    </tr>
                    <tr>
                      <th>With waiver plus extention</th>
                      <td> {npvWaive} </td>
                    </tr>
                    <tr>
                      <th>With foreclosure</th>
                      <td>
                        <strong> {npvForClosure} </strong>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>With Sell</th>
                      <td> {npvForSell} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          <div className="col">
            {Boolean(
              values["original-loan"] ||
              values["annaul-interest-rate"] ||
              values["loan-period-in-years"] ||
              values["number-of-payments-per-year"] ||
              values["risk-premium"] ||
              clickStatus ||
              forclosureValues["collateral-value"]
            ) && (
                <div>
                  <h4> Loan Summary </h4>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Scheduled Payment</th>
                        <td>{scheduled_payment}</td>
                      </tr>
                      <tr>
                        <th>Scheduled number of payments</th>
                        <td> {actualNumberOfPayments} </td>
                      </tr>
                      <tr>
                        <th>Total Interests</th>
                        <td>{cumulativeInterestF}</td>
                      </tr>
                      <tr>
                        <th>Lender Name</th>
                        <td>Mr.Habitam</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
          </div>
          <div className="col">
            {/* <h4> Other Lender Information... </h4>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Scheduled Payment</th>
                  <td> value </td>
                </tr>
                <tr>
                  <th>Scheduled number of payments</th>
                  <td>Value</td>
                </tr>
                <tr>
                  <th>Total Interests</th>
                  <td>value</td>
                </tr>
                <tr>
                  <th>Lender Name</th>
                  <td>Mr.Habitam</td>
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
        {Boolean(isPending) && (
          <div class="spinner-border spinner-color" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        {Boolean(
          values["original-loan"] &&
          values["annaul-interest-rate"] &&
          values["loan-period-in-years"] &&
          values["number-of-payments-per-year"] &&
          values["risk-premium"] &&
          // values["waiver-number-of-payments"] <= 0 &&
          clickStatus
        ) && (
            <div className="row align-items-start">
              <div className="col">
                <h4>Normal amortization table</h4>
                <table className="table table-striped table-hover table-responsive">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Principal </th>
                      <th>Interest </th>
                      <th>Scheduled Payment </th>
                      <th>Ending Balance</th>
                      <th>Interest Sum </th>
                      {/* <th>NPV</th> */}
                      {/* <th>Number of Payments per Year </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {amortization.map((amort, index) => (
                      <tr key={index}>
                        <td>{index + 1} </td>
                        <td>{roundAmount(amort.principal)}</td>
                        <td>{roundAmount(amort.interest)}</td>
                        <td>{roundAmount(amort.scheduledPayment)}</td>
                        <td>{roundAmount(amort.endingBalance)}</td>
                        <td>{roundAmount(amort.cumulativeInterest)}</td>
                        {/* <td rowSpan={7}>{123}</td> */}
                      </tr>
                    ))}
                    <tr>
                      <th> NPV </th>
                      <td className="cbe-text-color fontWeightBold"> {npv} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {values["waiver-number-of-payments"] > 0 && clickStatus && (
                <div className="col">
                  <h4>
                    Amortization table with {values["waiver-number-of-payments"]}{" "}
                    number of payment waived{" "}
                  </h4>
                  <table className="table table-striped table-hover table-responsive">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Principal </th>
                        <th>Interest </th>
                        <th>Scheduled Payment </th>
                        <th>Ending Balance</th>
                        <th>Interest Sum </th>
                      </tr>
                    </thead>
                    <tbody>
                      {waiverAmortization.map((amort, index) => (
                        <tr key={index}>
                          <td>{index + 1} </td>
                          <td>{roundAmount(amort.principal)}</td>
                          <td>{roundAmount(amort.interest)}</td>
                          <td>{roundAmount(amort.scheduledPayment)}</td>
                          <td>{roundAmount(amort.endingBalance)}</td>
                          <td>{roundAmount(amort.cumulativeInterest)}</td>
                          {/* <td rowSpan={7}>{123}</td> */}
                        </tr>
                      ))}

                      <tr>
                        <th> NPV </th>
                        <td className="cbe-text-color fontWeightBold">
                          {" "}
                          {npvWaive}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};
export default CBEAmortization;