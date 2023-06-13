import { useState, useEffect, PureComponent } from 'react'
import { Link, useParams } from 'react-router-dom';
import CustomerService from '../services/customer/CustomerService'
import { BsListUl } from 'react-icons/bs';
import { MdDynamicFeed } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';
import { FiCopy } from 'react-icons/fi';
import './Loan.css';
import { useTheme, styled } from '@mui/material/styles';
import {
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress,
    FilledInput,
    Checkbox,
    ListItemText,
    Box,
    Chip,
} from '@mui/material';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// import NPVWaiver from 'cbe-npv-waiver';
import npvNormal from "cbe-npv-normal";
import NPVWaiver from 'cbe-npv-waiver';
import NPVInterestWaiver from 'cbe-npv-interest-waiver';
import NPVExtension from 'cbe-npv-extension';
import NPVInterestAndPrincipalWaiver from 'interest-and-principal-waiver';
import NPVPrincipalWaiverPlusExtension from 'principal-waiver-and-extension';
import Chart from './Chart';
import MaterailTableComponent from './MaterailTableComponent'
import { useMemo } from 'react';
// import MaterialReactTable from 'material-react-table';

const graphNPVS = [
    { "type": "PrincipalWaiver", "result": 200000.26 },
]

const LoanListComponent = () => {

    /**
     * Chart data
     */

    const [data, setdata] = useState();
    useEffect(() => {
        const fetchDatas = async () => {
            const res = await fetch("http://localhost:9999/cbe/api/loan/loan/");
            const data1 = await res.json();
            console.log(data1);
            setdata(data1);
        };
        fetchDatas();
    }, []);

    /**
     * Chart data end
     */

    const [showChart, setShowChart] = useState(false);
    const [amortization, setAmortization] = useState([]);
    const [waiverAmortization, setWaiverAmortization] = useState([]);
    const [interestWaiverAmortization, setInterestWaiverAmortization] = useState([]);
    //tiztaw
    const [extensionAmortization, setExtensionAmortization] = useState([]);
    const [interestAndPrincipalAmortization, setInterestAndPrincipalAmortization] = useState([]);
    const [principalWaiverPlusExtensionAmortization, setPrincipalWaiverPlusExtensionAmortization] = useState([]);
    //tiztawEnd
    const [cumulativeInterestF, setCumulativeInterestF] = useState();
    const [scheduled_payment, setScheduled_payment] = useState([]);
    const [yearlyScheduledPayment, setYearlyScheduledPayment] = useState([]);

    const [yearlyInterestSummation, setYearlyInterestSummation] = useState([]);

    const [yearlyPrincipalSummation, setYearlyPrincipalSummation] = useState([]);


    // const [yearlyPaymentsSummation, setYearlyPaymentsSummation] = useState([]);

    const [actualNumberOfPayments, setActualNumberOfPayments] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [normalNpvForm, setNormalNpvForm] = useState(true);
    const [npv, setNPV] = useState([]);
    const [npvWaive, setNpvWaive] = useState([]);
    const [npvForClosure, setNPVForClosure] = useState(0);
    const [npvForSell, setNpvForSell] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const [showNpvWithPrincipalWaiver, setShowNpvWithPrincipalWaiver] = useState(false);
    const [showNoramlNpv, setShowNoramlNpv] = useState(false);

    const [clickStatus, setClickStatus] = useState(false);

    // const theme = useTheme();

    const [values, setValues] = useState({
        "original-loan": '',
        "annaul-interest-rate": '',
        "loan-period-in-years": '',
        "risk-premium": '',
        "number-of-payments-per-year": '',
    });

    const [principalWaiverNumber, setPrincipalWaiverNumber] = useState({
        "principal-waiver-number": ''
    });
    const [interestWaiverNumber, setInterestWaiverNumber] = useState({
        "interest-waiver-number": ''
    });
    //tiztaw
    const [extension, setExtension] = useState({
        "extension": ''
    });
    const [interestAndPrincipalWaiver, setInterestAndPrincipalWaiver] = useState({
        "principalwaiversecond": '',
        "interestwaiversecond": ''

    });
    const [principalWaiverPlusExtension, setPrincipalWaiverPlusExtension] = useState({
        "principalwaiverthird": '',
        "extensionsecond": ''

    });
    //tiztaw End
    const handlePrincipalWaiver = (e) => {
        const { name, value } = e.target;
        setPrincipalWaiverNumber({
            ...principalWaiverNumber,
            [name]: value,
        });
    };

    const handleInterestWaiver = (e) => {
        const { name, value } = e.target;
        setInterestWaiverNumber({
            ...interestWaiverNumber,
            [name]: value,
        });
    };
    //tiztaw
    const handleExtension = (e) => {
        const { name, value } = e.target;
        setExtension({
            ...extension,
            [name]: value,
        });
    };

    const handleInterestAndPricipalWaiver = (e) => {
        const { name, value } = e.target;
        setInterestAndPrincipalWaiver({
            ...interestAndPrincipalWaiver,
            [name]: value,
        });
    };

    const handlePrincipalWaiverPlusExtension = (e) => {
        const { name, value } = e.target;
        setPrincipalWaiverPlusExtension({
            ...principalWaiverPlusExtension,
            [name]: value,
        });
    };
    //tiztawEnd
    const [npvScenarios, setnpvScenarios] = useState({
        "npv-scenarios": ''
    });

    const handleNpvScenariosChange = (e) => {
        const { name, value } = e.target;
        setnpvScenarios({
            ...npvScenarios,
            [name]: value,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setValues({
            ...values,
            [name]: value,
        });
    };

    const roundAmount = (num) => {
        return Math.round(num * 100) / 100;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setIsPending(false);
            if (npvScenarios["npv-scenarios"] === "normal".trim()) {
                calculate(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"],
                    values["risk-premium"],
                    values["number-of-payments-per-year"]
                );
                console.log(amortization);
                setShowNoramlNpv(true);
                console.log("yearlyInterestSummation")
                console.log(yearlyInterestSummation)
            }
            if (npvScenarios["npv-scenarios"] === "principalwaiver".trim()) {
                calculateNPVWithPrincipalWaiver(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"],
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    principalWaiverNumber["principal-waiver-number"],
                );
                setShowNpvWithPrincipalWaiver(true);
            }
            if (npvScenarios["npv-scenarios"] === "interestwaiver".trim()) {
                calculateNPVWithInterestWaiver(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"],
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    interestWaiverNumber["interest-waiver-number"],
                );
                setShowNpvWithPrincipalWaiver(true);
            }
            //tiztaw
            if (npvScenarios["npv-scenarios"] === "extension".trim()) {
                calculateNPVExtention(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"],
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    extension["extension"],
                );
                setShowNpvWithPrincipalWaiver(true);
            }

            if (npvScenarios["npv-scenarios"] === "principalwaiver&interestwaiver".trim()) {
                calculateNPVWithInterestAndPrincipalWaiver(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"],
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    interestAndPrincipalWaiver["principalwaiversecond"],
                    interestAndPrincipalWaiver["interestwaiversecond"],
                );
                setShowNpvWithPrincipalWaiver(true);
            }

            if (npvScenarios["npv-scenarios"] === "principalwaiver&extension".trim()) {
                calculateNPVWithPrincipalWaiverPlusExtension(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"],
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    principalWaiverPlusExtension["principalwaiverthird"],
                    principalWaiverPlusExtension["extensionsecond"],
                );
                setShowNpvWithPrincipalWaiver(true);
            }
            //tiztawEnd
            setClickStatus(true);
        }, 1000)
        setIsPending(true);
    }

    const calculate = (amount, rate, years, riskPremium, numberOfPayments) => {
        const loan = npvNormal(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments
        );

        // console.log(loan);
        /**
         * Push the NPV value and NPV types as well.
         * and then set to localestorage 
         */
        // graphNPVS.push(loan.NPV)

        const testNPV = { "type": "Normal", "result": loan.NPV }
        graphNPVS.push(testNPV)
        localStorage.setItem("npvs", JSON.stringify(testNPV))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
        console.log("graphNPVS and below")
        console.log(graphNPVS)
        setNPV(loan.NPV);
        setAmortization(loan.scheduledPayments);
        setYearlyScheduledPayment(loan.yearlyScheduledPayment);
        setCumulativeInterestF(loan.cumulativeInterest);
        setScheduled_payment(loan.scheduledPayment);
        setActualNumberOfPayments(loan.actualNumberOfPayments);

        setYearlyInterestSummation(loan.yearlyInterestSummation);
        setYearlyPrincipalSummation(loan.yearlyPrincipalSummation);
        console.log("yearlyInterestSummation getinet")
        console.log(loan.yearlyInterestSummation);

    };

    //tiztaw
    const calculateNPVExtention = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,
        waivedNumberOfPayment
    ) => {
        const loanExtension = NPVExtension(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            waivedNumberOfPayment
        );
        setExtensionAmortization(loanExtension.scheduledPayments);
        setNpvWaive(loanExtension.NPV);
        console.log(loanExtension);
    };


    const calculateNPVWithInterestAndPrincipalWaiver = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,
        principalwaivedNumberOfPayment,
        interestwaivedNumberOfPayment
    ) => {
        const loanInterestAndPrincipalWaiver = NPVInterestAndPrincipalWaiver(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            principalwaivedNumberOfPayment,
            interestwaivedNumberOfPayment
        );
        setInterestAndPrincipalAmortization(loanInterestAndPrincipalWaiver.scheduledPayments);
        setNpvWaive(loanInterestAndPrincipalWaiver.NPV);
        console.log(loanInterestAndPrincipalWaiver);
    };

    const calculateNPVWithPrincipalWaiverPlusExtension = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,
        principalwaivedNumberOfPayment,                                                                     //will come to here
        interestwaivedNumberOfPayment,
    ) => {
        const loanPrincipalWaiverPlusExtention = NPVPrincipalWaiverPlusExtension(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            principalwaivedNumberOfPayment,
            interestwaivedNumberOfPayment,
        );
        setPrincipalWaiverPlusExtensionAmortization(loanPrincipalWaiverPlusExtention.scheduledPayments);
        setNpvWaive(loanPrincipalWaiverPlusExtention.NPV);
        console.log(loanPrincipalWaiverPlusExtention);
    };
    //tiztaw end


    const calculateNPVWithInterestWaiver = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,
        waivedNumberOfPayment
    ) => {
        const loanInterestWaiver = NPVInterestWaiver(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            waivedNumberOfPayment
        );
        setInterestWaiverAmortization(loanInterestWaiver.scheduledPayments);
        setNpvWaive(loanInterestWaiver.NPV);
        console.log(loanInterestWaiver);
    };
    const calculateNPVWithPrincipalWaiver = (
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
        setWaiverAmortization(loanWaive.scheduledPayments);

        setNpvWaive(loanWaive.NPV);

        console.log(loanWaive);

    };
    const { id } = useParams();

    const [collaterals, setCollaterals] = useState([])

    const [loans, setLoans] = useState([])
    const [isCollateralShown, setIsCollateralShown] = useState(false);

    const [collateralLength, setCollateralLength] = useState(0);

    const [] = useState();

    useEffect(() => {
        getLoans();
    }, [])

    const getLoans = () => {
        CustomerService.getLoans(id).then((response) => {
            setLoans(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const showCollateral = (loan) => {
        setCollaterals(loan.collaterals)
        setIsCollateralShown(true)
        setCollateralLength(loan.collaterals.length)
    }

    /**
     * 
     * @param {loan} - loan information
     * copy loan data to the calculator 
     */

    const copyLoan = (e, loan) => {
        e.preventDefault();
        setTimeout(() => {
            setIsPending(false);
            npvScenarios["npv-scenarios"] = "normal";
            values["collateral-type"] = "machinery";
            values["original-loan"] = loan.amount;
            values["annaul-interest-rate"] = loan.annualInterestRate;
            values["loan-period-in-years"] = loan.loanPeriodsInYears;
            values["risk-premium"] = loan.riskPremium;
            values["number-of-payments-per-year"] = 4;
            // values["waiver-number-of-payments"] = 0;
            setClickStatus(true);
        }, 1000);
        setIsPending(true);
    }
    // const showInGraph = (e) => {
    //     e.preventDefault();
    //     console.log("With local storage : " + localStorage.getItem("normalNPVLocalStorage"))
    //     console.log("Show in graph Normal NPV : " + npv);
    //     alert("soon {}", e.target)
    // }
    const handleAddLoanModal = () => {
        alert("We will back soon, it is under maintenance...")
    }
    return (
        <div>
            <h2 className="text-center"> Loans </h2>
            <button className="btn btn-outline-success mb-2" onClick={handleAddLoanModal}>
                <GrAdd />
            </button>
            <table className="table table-bordered table-striped" border="1">
                <thead>
                    <th> Type </th>
                    <th> Amount </th>
                    <th> Date </th>
                    <th> Action </th>
                </thead>
                <tbody>
                    {
                        loans.map(
                            loan =>
                                <tr key={loan.loan_id} rowSpan="3">
                                    <td> {loan.type} </td>
                                    <td> {loan.amount} </td>
                                    <td> {loan.registeredDate} </td>

                                    <td style={{ display: 'auto' }}>
                                        {/* <Link className="btn btn-info btn-sm" to={`/edit-loan/${loan.id}`} >Update</Link> */}
                                        {/* <Link className="btn btn-success btn-sm" style={{ margin: "1px" }} to={`/collaterals/${loan.loan_id}`} >Collateral</Link> */}
                                        <button className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} onClick={e => copyLoan(e, loan)}>
                                            <FiCopy size={18} data-toggle="tooltip" title="Click it to copy the data to the calculator" /> Copy
                                        </button>
                                        <button className="btn btn-outline-primary btn-sm" style={{ margin: "1px" }} onClick={() => showCollateral(loan)}>
                                            <BsListUl size={18} /> Collateral
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <div>
                {
                    collaterals && isCollateralShown && collateralLength &&
                    <table className="table table-bordered table-striped" border="1">
                        <thead>
                            <th> Type </th>
                            <th> Value </th>
                            <th> Date </th>
                            <th> Action </th>
                        </thead>
                        <tbody>
                            {collaterals.map(
                                collateral =>
                                    <tr key={collateral.id} rowSpan="3">
                                        <td> {collateral.type} </td>
                                        <td> {collateral.value} </td>
                                        <td> {collateral.registerDate} </td>
                                        <td>
                                            <button className="btn btn-outline-success btn-sm" style={{ margin: "1px" }}>
                                                <MdDynamicFeed /> Fill
                                            </button>
                                        </td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                }
            </div>
            {/* NPV Calculator form start */}
            <form onSubmit={handleSubmit} id="normalForm" value="test">
                <div class="flex-container">
                    <Grid container spacing={2}>
                        <div class="flex-item-left">
                            <Grid item xs={6} >
                                <Stack spacing={2}>
                                    <Stack spacing={1} direction='row'>
                                        <FormControl variant="filled" sx={{ m: 1, minWidth: 350 }}>
                                            <InputLabel id="demo-simple-select-filled-label" color="secondary">Scenarios</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="npv-scenarios"
                                                name="npv-scenarios"
                                                // value={npvScenarios}
                                                value={npvScenarios["npv-scenarios"]}
                                                onChange={handleNpvScenariosChange}
                                                color='secondary'
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <hr style={{ color: 'purple' }} />
                                                <MenuItem value="normal">Normal</MenuItem>
                                                <MenuItem value="principalwaiver">Principal Waiver</MenuItem>
                                                <MenuItem value="interestwaiver">Interest Waiver</MenuItem>
                                                <MenuItem value="extension">Extension</MenuItem>
                                                <MenuItem value="injection">Injection</MenuItem>
                                                <hr style={{ color: 'purple' }} />
                                                <MenuItem value="principalwaiver&interestwaiver">Interest & Principal Waiver</MenuItem>
                                                <MenuItem value="principalwaiver&extension">Principal Waiver & Extension</MenuItem>
                                                <MenuItem value="principalwaiver&injection">Principal Waiver & Injection</MenuItem>
                                                <MenuItem value="interestwaiver&extension">Interest Waiver & Extension</MenuItem>
                                                <MenuItem value="interestwaiver&injection">Interest Waiver & Injection</MenuItem>
                                                <MenuItem value="extension&injection">Extension & Injection</MenuItem>
                                                <hr style={{ color: 'purple' }} />
                                                <MenuItem value="principal&interestwaiver&extension">Principal & Interest Waiver & Extension</MenuItem>
                                                <MenuItem value="principal&interestwaiver&injection">Principal & Interest Waiver & Injection</MenuItem>
                                                <MenuItem value="principalwaiver&extension&injection">Principal Waiver & Extension & Injection</MenuItem>
                                                <MenuItem value="interestwaiver&extension&injection">Interest Waiver & Extension & Injection</MenuItem>
                                                <hr style={{ color: 'purple' }} />
                                                <MenuItem value="all">All</MenuItem>

                                            </Select>
                                        </FormControl>

                                    </Stack>

                                    <Stack spacing={1} direction='row'>
                                        <TextField label='Loan Amount' color="secondary" size="small"
                                            placeholder="Enter Loan Amount" variant="filled"
                                            name="original-loan"
                                            value={values["original-loan"]}
                                            onChange={handleInputChange}
                                        />

                                        <TextField label='Annual Interest Rate in %' color="secondary" size="small"
                                            placeholder="Enter Annual Interest Rate in %" variant="filled"
                                            name="annaul-interest-rate"
                                            value={values["annaul-interest-rate"]}
                                            onChange={handleInputChange}
                                        />
                                    </Stack>
                                    <Stack spacing={1} direction='row'>
                                        <TextField label='Loan period in (Years)' color="secondary" size="small"
                                            placeholder="Enter Loan period in (Years)" variant="filled"
                                            name="loan-period-in-years"
                                            value={values["loan-period-in-years"]}
                                            onChange={handleInputChange}
                                        />
                                        <TextField label='Risk premium in %' color="secondary" size="small"
                                            placeholder="Enter Risk premium in %" variant="filled"
                                            name="risk-premium"
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
                                                variant='filled'
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
                                            <FormHelperText>Number of Payement per year </FormHelperText>
                                        </FormControl>

                                        {
                                            npvScenarios["npv-scenarios"] === "principalwaiver".trim() &&
                                            <TextField
                                                label='Principal Waiver'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Principal Waiver"
                                                variant="filled"
                                                name="principal-waiver-number"
                                                id="principal-waiver-number"
                                                value={principalWaiverNumber["principal-waiver-number"]}
                                                onChange={handlePrincipalWaiver}
                                            />
                                        }
                                        {
                                            npvScenarios["npv-scenarios"] === "interestwaiver".trim() &&
                                            <TextField
                                                label='Interest Waiver'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Interest Waiver"
                                                variant="filled"
                                                name="interest-waiver-number"
                                                value={values["interest-waiver-number"]}
                                                onChange={handleInterestWaiver}
                                            />
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "extension".trim() &&
                                            <TextField
                                                label='Extension'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Extension"
                                                variant="filled"
                                                name="extension"
                                                value={values["extension"]}
                                                onChange={handleExtension}
                                            />
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "injection".trim() &&
                                            <TextField
                                                label='Injection'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Injection"
                                                variant="filled"
                                                name="injection"
                                                value={values["injection"]}
                                                onChange={handleInputChange}
                                            />
                                        }
                                        {/* Two npv scenario starts */}
                                        {
                                            npvScenarios["npv-scenarios"] === "principalwaiver&interestwaiver".trim() &&
                                            <>
                                                <TextField
                                                    label='Principal'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Principal Waiver"
                                                    variant="filled"
                                                    name="principalwaiversecond"
                                                    value={values["principalwaiversecond"]}
                                                    onChange={handleInterestAndPricipalWaiver}
                                                />

                                                <TextField
                                                    label='Interest Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Interest Waiver"
                                                    variant="filled"
                                                    name="interestwaiversecond"
                                                    value={values["interestwaiversecond"]}
                                                    onChange={handleInterestAndPricipalWaiver}
                                                />
                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "principalwaiver&extension".trim() &&
                                            <>
                                                <TextField
                                                    label='Principal'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Principal Waiver"
                                                    variant="filled"
                                                    name="principalwaiverthird"
                                                    value={values["principalwaiverthird"]}
                                                    onChange={handlePrincipalWaiverPlusExtension}
                                                />

                                                <TextField
                                                    label='Extension'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Extension"
                                                    variant="filled"
                                                    name="extensionsecond"
                                                    value={values["extensionsecond"]}
                                                    onChange={handlePrincipalWaiverPlusExtension}
                                                />
                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "principalwaiver&injection".trim() &&
                                            <>
                                                <TextField
                                                    label='Principal Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Principal Waiver"
                                                    variant="filled"
                                                    name="principal_waiver_injection"
                                                    value={values["principal_waiver_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Injection'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Injection"
                                                    variant="filled"
                                                    name="principal_waiver_injection"
                                                    value={values["principal_waiver_injection"]}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "interestwaiver&extension".trim() &&
                                            <>
                                                <TextField
                                                    label='Interest Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Interest Waiver"
                                                    variant="filled"
                                                    name="interest_waiver_extension"
                                                    value={values["interest_waiver_extension"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Extension'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Extension"
                                                    variant="filled"
                                                    name="extension_interest_waiver"
                                                    value={values["extension_interest_waiver"]}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "interestwaiver&injection".trim() &&
                                            <>
                                                <TextField
                                                    label='Interest Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Interest Waiver"
                                                    variant="filled"
                                                    name="interest_waiver_injection"
                                                    value={values["interest_waiver_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Injection'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Injection"
                                                    variant="filled"
                                                    name="injection_interest_waiver"
                                                    value={values["injection_interest_waiver"]}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "extension&injection".trim() &&
                                            <>
                                                <TextField
                                                    label='Extension'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Extension"
                                                    variant="filled"
                                                    name="extension_injection"
                                                    value={values["extension_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Injection'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Injection"
                                                    variant="filled"
                                                    name="injection_extension"
                                                    value={values["injection_extension"]}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        }
                                        {/* Third start */}
                                        {
                                            npvScenarios["npv-scenarios"] === "principal&interestwaiver&extension".trim() &&
                                            <>
                                                <TextField
                                                    label='Principal Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Principal Waiver"
                                                    variant="filled"
                                                    name="principal_interest_waiver_extension"
                                                    value={values["principal_interest_waiver_extension"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Interest Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Interest Waiver"
                                                    variant="filled"
                                                    name="interest_principal_waiver_extension"
                                                    value={values["interest_principal_waiver_extension"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Extension'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Extension"
                                                    variant="filled"
                                                    name="extension_interest_principal_waiver"
                                                    value={values["extension_interest_principal_waiver"]}
                                                    onChange={handleInputChange}
                                                />

                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "principal&interestwaiver&injection".trim() &&
                                            <>
                                                <TextField
                                                    label='Principal Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Principal Waiver"
                                                    variant="filled"
                                                    name="principal_interest_waiver_injection"
                                                    value={values["principal_interest_waiver_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Interest Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Interest Waiver"
                                                    variant="filled"
                                                    name="interest_principal_waiver_injection"
                                                    value={values["interest_principal_waiver_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Injection'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Injection"
                                                    variant="filled"
                                                    name="injection_interest_principal_waiver"
                                                    value={values["injection_interest_principal_waiver"]}
                                                    onChange={handleInputChange}
                                                />

                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "principalwaiver&extension&injection".trim() &&
                                            <>
                                                <TextField
                                                    label='Principal Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Principal Waiver"
                                                    variant="filled"
                                                    name="principal_waiver_extension_injection"
                                                    value={values["principal_waiver_extension_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Extension'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Extension"
                                                    variant="filled"
                                                    name="extension_principal_waiver_injection"
                                                    value={values["extension_principal_waiver_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Injection'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Injection"
                                                    variant="filled"
                                                    name="injection_extension_principal_waiver"
                                                    value={values["injection_extension_principal_waiver"]}
                                                    onChange={handleInputChange}
                                                />

                                            </>
                                        }

                                        {
                                            npvScenarios["npv-scenarios"] === "interestwaiver&extension&injection".trim() &&
                                            <>
                                                <TextField
                                                    label='Interest Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Interest Waiver"
                                                    variant="filled"
                                                    name="interest_waiver_extension_injection"
                                                    value={values["interest_waiver_extension_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Extension'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Extension"
                                                    variant="filled"
                                                    name="extension_interest_waiver_injection"
                                                    value={values["extension_interest_waiver_injection"]}
                                                    onChange={handleInputChange}
                                                />

                                                <TextField
                                                    label='Injection'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Injection"
                                                    variant="filled"
                                                    name="injection_extension_interest_waiver"
                                                    value={values["injection_extension_interest_waiver"]}
                                                    onChange={handleInputChange}
                                                />

                                            </>
                                        }

                                        {/* All paramaters */}
                                    </Stack>
                                    <Stack direction="row" spacing={1} mb={2} >
                                        {
                                            npvScenarios["npv-scenarios"] === "all".trim() &&
                                            <>
                                                <TextField
                                                    label='Principal Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Principal Waiver"
                                                    variant="filled"
                                                    name="principal_all"
                                                    value={values["principal_all"]}
                                                    onChange={handleInputChange}
                                                />
                                                <TextField
                                                    label='Interest Waiver'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Interest Waiver"
                                                    variant="filled"
                                                    name="interest_all"
                                                    value={values["interest_all"]}
                                                    onChange={handleInputChange}
                                                />
                                                <TextField
                                                    label='Extension'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Extension"
                                                    variant="filled"
                                                    name="extension_all"
                                                    value={values["extension_all"]}
                                                    onChange={handleInputChange}
                                                />
                                                <TextField
                                                    label='Injection'
                                                    color="secondary"
                                                    size="small"
                                                    placeholder="Enter Injection"
                                                    variant="filled"
                                                    name="injection_all"
                                                    value={values["injection_all"]}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        }
                                    </Stack >
                                </Stack>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color='secondary'
                                    size="medium"
                                    id="btnCompute"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Click it to compute NPV"
                                    data-original-title="Tooltip on bottom"
                                    style={{ marginTop: "5px" }}
                                    className="red-tooltip"
                                >
                                    Compute NPV
                                </Button>
                            </Grid>
                        </div>
                        {
                            Boolean(showNpvWithPrincipalWaiver || showNoramlNpv) && (
                                <div class="flex-item-right">
                                    <Grid item xs={6}>
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
                                                    <td name="normal-npv"
                                                        className="cbe-text-color fontWeightBold"
                                                    > {npv} </td>

                                                </tr>
                                                <tr>
                                                    <th>With waiver plus extention</th>
                                                    <td name="principal-waiver-npv"> {npvWaive} </td>
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
                                        {/* <Button
                                            type="submit"
                                            variant="outlined"
                                            color='secondary'
                                            size="medium"
                                            id="btnShowInGraph"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Click it to show in graph"
                                            data-original-title="Tooltip on bottom"
                                            style={{ marginTop: "5px" }}
                                            className="red-tooltip"
                                            onClick={e => showInGraph(e)}
                                        >
                                            Show In Graph
                                        </Button> */}
                                    </Grid>
                                </div>
                            )
                        }
                    </Grid>
                </div>
            </form>
            {/* NPV Calculator form end */}

            {Boolean(isPending) && (
                // <div class="spinner-border spinner-color" role="status">
                //     <span class="visually-hidden">Loading...</span>
                // </div>

                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                </Stack>
            )}

            {/* amortization table start */}

            {Boolean(
                values["original-loan"] &&
                values["annaul-interest-rate"] &&
                values["loan-period-in-years"] &&
                values["number-of-payments-per-year"] &&
                values["risk-premium"] &&
                showNoramlNpv
            ) && (

                    <div class="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                Normal NPV Amortization Table
                            </h4>
                            <MaterailTableComponent data={amortization} />
                            <header>
                                <h4>
                                    Summary
                                </h4>
                            </header>
                            <div className="normal-interest-summary">
                                <h4> Interest </h4>

                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Interest </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyInterestSummation.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                            <div className="normal-principal-summary">
                                <h4> Principal </h4>
                                <table className="table table-striped table-hover table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Principal </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyPrincipalSummation.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" normal-cash-flow-summary">
                                <h4> Cashflow </h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Year</th>
                                            <th>Cashflow </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearlyScheduledPayment.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        {/* <div class="normal-npv-amortization-summary">
                            <div>
                                <h4>
                                    Summary
                                </h4>
                               
                            </div>
                        </div> */}
                    </div>
                )
            }
            {
                npvScenarios["npv-scenarios"] === "principalwaiver".trim() &&

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
            }

            {
                npvScenarios["npv-scenarios"] === "interestwaiver".trim() &&
                <div className="col">
                    <h4>
                        With Interest Waiver
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
                            {interestWaiverAmortization.map((amort, index) => (
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
            }
            {/* //tiztaw */}
            {
                npvScenarios["npv-scenarios"] === "extension".trim() &&
                <div className="col">
                    <h4>
                        With Extension
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
                            {extensionAmortization.map((amort, index) => (
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
            }

            {
                npvScenarios["npv-scenarios"] === "principalwaiver&interestwaiver".trim() &&
                <div className="col">
                    <h4>
                        With Interest And principal waiver
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
                            {interestAndPrincipalAmortization.map((amort, index) => (
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
            }

            {
                npvScenarios["npv-scenarios"] === "principalwaiver&extension".trim() &&
                <div className="col">
                    <h4>
                        With principal waiver plus Extension
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
                            {principalWaiverPlusExtensionAmortization.map((amort, index) => (
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
            }
            {
                showNoramlNpv &&
                <div className='flex-container'>
                    <div className='npv-graph'>
                        <h5>
                            NPV, Graphical Representation
                        </h5>
                        <Chart data={graphNPVS} />
                    </div>
                </div>
            }
        </div>
    )
}
export default LoanListComponent