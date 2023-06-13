import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CustomerService from '../services/customer/CustomerService'
import { BsListUl } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import { FiCopy } from 'react-icons/fi';
import {MdCalculate} from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { BsCheck2All } from 'react-icons/bs';

import './Loan.css';
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
} from '@mui/material';
import Grid from '@mui/material/Grid';

import npvNormal from "cbe-npv-normal";
import NPVPrincipalWaiver from 'cbe-npv-principal-waiver';
import NPVInterestWaiver from 'cbe-npv-interest-waiver';
import NPVExtension from 'cbe-npv-extension';
import NPVInterestAndPrincipalWaiver from 'interest-and-principal-waiver';
import NPVPrincipalWaiverPlusExtension from 'principal-waiver-and-extension';
import Chart from './Chart';
import SimplePieChartComponent from './SimplePieChartComponent';
import PieChartComponent from './PieChartComponent';
import MaterailTableComponent from './MaterailTableComponent'
import PrincipalWaiverComponent from './PrincipalWaiverComponent';
import InterestWaiverComponent from './InterestWaiverComponent';
import ExtensionComponent from './ExtensionComponent';
import PrincipalAndInterestWaiverComponent from './PrincipalAndInterestWaiverComponent';
import PrincipalWaiverAndExtensionComponent from './PrincipalWaiverAndExtensionComponent';
import NPVInterestWaiverPlusExtension from 'interest-waiver-and-extension'
import InterestWaiverAndExtensionComponent from './InterestWaiverAndExtensionComponent';
import NPVPrincipalAndInterestWaiverPlusExtension from "principal-and-interest-waiver-and-extension";
import PrincipalAndInterestWaiverAndExtensionComponent from "./PrincipalAndInterestWaiverAndExtensionComponent";
import CollapsableComponent from "./CollapsableComponent";
import CollateralSettingComponent from "./CollateralSettingComponent";
// import { Visibility } from '@mui/icons-material';
const graphNPVS = [

    // { "type": "PrincipalWaiver", "result": 200000.26 },
]
var ascendingOrderNPVs = [{}];
var descendingOrderNPVs = [{}];
/**
 * It takes array of array of 
 */ 
/**
 * 
 * @returns Loan Lists 
 */
const LoanListComponent = () => {
    /**
     * Chart data
     */

    // const [data, setdata] = useState();
    // useEffect(() => {
    //     const fetchDatas = async () => {
    //         const res = await fetch("http://localhost:9999/cbe/api/loan/loan/");
    //         const data1 = await res.json();
    //         console.log(data1);
    //         setdata(data1);
    //     };
    //     fetchDatas();
    // }, []);
    /**
     * Chart data end
     */
        
    const [amortization, setAmortization] = useState([]);
    const [principalWaiverAmortization, setPrincipalWaiverAmortization] = useState([]);
    // const [waiverAmortization, setWaiverAmortization] = useState([]);    
    const [interestWaiverAmortization, setInterestWaiverAmortization] = useState([]);
    //tiztaw
    const [extensionAmortization, setExtensionAmortization] = useState([]);
    const [interestAndPrincipalAmortization, setInterestAndPrincipalAmortization] = useState([]);
    const [principalWaiverPlusExtensionAmortization, setPrincipalWaiverPlusExtensionAmortization] = useState([]);
    const [interestWaiverPlusExtensionAmortization, setInterestWaiverPlusExtensionAmortization] = useState([]);
    const [principalAndInterestWaiverPlusExtensionAmortization, setPrincipalAndInterestWaiverPlusExtensionAmortization] = useState([]);

    /**
     * Yearly Amortization Summary Start
     */
    //========================== Normal Start ===================================
    const [yearlyScheduledPayment, setYearlyScheduledPayment] = useState([]);
    const [yearlyInterestSummation, setYearlyInterestSummation] = useState([]);
    const [yearlyPrincipalSummation, setYearlyPrincipalSummation] = useState([]);
    //========================== Normal End ===================================

    //========================== With Principal Waiver Start ===================================
    const [yearlyScheduledPaymentPrincipalWaiver, setYearlyScheduledPaymentPrincipalWaiver] = useState([]);
    const [yearlyInterestSummationPrincipalWaiver, setYearlyInterestSummationPrincipalWaiver] = useState([]);
    const [yearlyPrincipalSummationPrincipalWaiver, setYearlyPrincipalSummationPrincipalWaiver] = useState([]);
    //========================== With Principal Waiver End ===================================

    //========================== With Principal Waiver Start ===================================
    const [yearlyScheduledPaymentInterestWaiver, setYearlyScheduledPaymentInterestWaiver] = useState([]);
    const [yearlyInterestSummationInterestWaiver, setYearlyInterestSummationInterestWaiver] = useState([]);
    const [yearlyPrincipalSummationInterestWaiver, setYearlyPrincipalSummationInterestWaiver] = useState([]);
    //========================== With Principal Waiver End ===================================

    //========================== With Extension Start ===================================
    const [yearlyScheduledPaymentExtension, setYearlyScheduledPaymentExtension] = useState([]);
    const [yearlyInterestSummationExtension, setYearlyInterestSummationExtension] = useState([]);
    const [yearlyPrincipalSummationExtension, setYearlyPrincipalSummationExtension] = useState([]);
    //========================== With Extension End ===================================

    //========================== With Principal and Interest Waiver Start ===================================
    const [yearlyScheduledPaymentWithInterestAndPrincipalWaiver, setYearlyScheduledPaymentWithInterestAndPrincipalWaiver] = useState([]);
    const [yearlyInterestSummationWithInterestAndPrincipalWaiver, setYearlyInterestSummationWithInterestAndPrincipalWaiver] = useState([]);
    const [yearlyPrincipalSummationWithInterestAndPrincipalWaiver, setYearlyPrincipalSummationWithInterestAndPrincipalWaiver] = useState([]);
    //========================== With Principal and Interest Waiver End ===================================

    //========================== With Principal Waiver plus extension Start ===================================
    const [yearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion, setYearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion] = useState([]);
    const [yearlyInterestSummationWithWaiverPlusExtnesion, setYearlyInterestSummationWithWaiverPlusExtnesion] = useState([]);
    const [yearlyPrincipalSummationWithWaiverPlusExtnesion, setYearlyPrincipalSummationWithWaiverPlusExtnesion] = useState([]);
    //========================== With Principal Waiver plus extension  End ===================================

    //========================== With Principal Waiver plus extension  start ===================================
    const [yearlyScheduledPaymentWithInterestWaiverPlusExtension, setYearlyScheduledPaymentWithInterestWaiverPlusExtension] = useState([]);
    const [yearlyInterestSummationWithInterestWaiverPlusExtension, setYearlyInterestSummationWithInterestWaiverPlusExtension] = useState([]);
    const [yearlyPrincipalSummationWithInterestWaiverPlusExtension, setYearlyPrincipalSummationWithInterestWaiverPlusExtension] = useState([]);
    //========================== With Principal Waiver plus extension  End ===================================

    //========================== With Principal Waiver plus extension  start ===================================
    const [yearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension, setYearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension] = useState([]);
    const [yearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension, setYearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension] = useState([]);
    const [yearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension, setYearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension] = useState([]);
    //========================== With Principal Waiver plus extension  End ===================================



    /**
    * Yearly Amortization Summary Start
    */



    // const [yearlyPaymentsSummation, setYearlyPaymentsSummation] = useState([]);

    // const [actualNumberOfPayments, setActualNumberOfPayments] = useState([]);
    // const [isFormVisible, setIsFormVisible] = useState(false);
    // const [normalNpvForm, setNormalNpvForm] = useState(true);

    /**
     * NPV UseStates start
     */
    const [npv, setNPV] = useState([]);
    const [npvWaive, setNpvWaive] = useState([]);
    const [npvInterestWaiver, setNpvInterestWaiver] = useState([]);
    const [npvPrincipalWaiver, setNpvPrincipalWaiver] = useState([]);
    const [npvExtension, setNpvExtension] = useState([]);
    const [npvPrincipalAndInterestWaiver, setNpvPrincipalAndInterestWaiver] = useState([]);
    const [npvPrincipalWaiverPlusExtension, setNpvPrincipalWaiverPlusExtension] = useState([]);
    const [npvInterestWaiverExtension, setNpvInterestWaiverExtension] = useState([]);
    const [npvPrincipalAndInterestWaiverExtension, setNpvPrincipalAndInterestWaiverExtension] = useState([]);

    const [lowestNPV, setLowestNPV] = useState([]);
    const [largestNPV, setLargestNPV] = useState([]);

    const [npvForClosure, setNPVForClosure] = useState(0);
    const [npvForSell, setNpvForSell] = useState(0);
    const [isPending, setIsPending] = useState(false);


    const [cashFlow, setCashFlow] = useState(0);
    const [sellingCost, setSellingCost] = useState(0);


    //===================== Visibility for amortization table start =============================
    const [showNoramlNpv, setShowNoramlNpv] = useState(false);
    const [showNPVWithPrincipalWaiver, setShowNPVWithPrincipalWaiver] = useState(false);
    const [showNPVWithInterestWaiver, setShowNPVWithInterestWaiver] = useState(false);
    const [showNPVWithExtension, setShowNPVWithExtension] = useState(false);
    const [showNPVWithPrincipalAndInterestWaiver, setShowNPVWithPrincipalAndInterestWaiver] = useState(false);
    const [showNPVWithPrincipalWaiverPlusExtension, setShowNPVWithPrincipalWaiverPlusExtension] = useState(false);
    const [showNPVWithInterestWaiverPlusExtension, setShowNPVWithInterestWaiverPlusExtension] = useState(false);
    const [showNPVWithPrincipalAndInterestWaiverPlusExtension, setShowNPVWithPrincipalAndInterestWaiverPlusExtension] = useState(false);
    const [showNPVWithForeclosure, setShowNPVWithForeclosure] = useState(false);

    const [showBarChart, setShowBarChart] = useState(true);
    const [showPieChart, setShowPieChart] = useState(false);
    const [showSimplePieChart, setShowSimplePieChart] = useState(false);

    // const useRef

    //===================== Visibility for amortization table start =============================

    /**
   * NPV UseStates end
   */

    // ==========================Show in Graph start==============================
    const [visualizeDataInGrpah, setVisualizeDataInGrpah] = useState([]);

    const [showNoramlNpvInGraph, setShowNoramlNpvInGraph] = useState(false);
    const [showNPVWithPrincipalWaiverInGraph, setShowNPVWithPrincipalWaiverInGraph] = useState(false);
    const [showNPVWithInterestWaiverInGraph, setShowNPVWithInterestWaiverInGraph] = useState(false);
    const [showNPVWithExtensionInGraph, setShowNPVWithExtensionInGraph] = useState(false);
    const [showNPVWithPrincipalAndInterestWaiverInGraph, setShowNPVWithPrincipalAndInterestWaiverInGraph] = useState(false);
    const [showNPVWithPrincipalWaiverPlusExtensionInGraph, setShowNPVWithPrincipalWaiverPlusExtensionInGraph] = useState(false);
    const [showNPVWithInterestWaiverPlusExtensionInGraph, setShowNPVWithInterestWaiverPlusExtensionInGraph] = useState(false);
    const [showNPVWithForeclosureInGraph, setShowNPVWithForeclosureInGraph] = useState(false);

    const [showNPVComparision, setShowNPVComparision] = useState(false);

    const [showNumberOfLoans, setShowNumberOfLoans] = useState(false);
    // ======================NPV Incase of foreclosure============================
    const [ selectedLoan, setSelectedLoan ] = useState(0);
    // ==========================Show in Graph end================================
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
    const [interestWaiverPlusExtension, setInterestWaiverPlusExtension] = useState({
        "interest_waiver_extension": '',
        "extension_interest_waiver": ''
    });
    const [principalAndInterestWaiverPlusExtension, setPrincipalAndInterestWaiverPlusExtension] = useState({
        "principal_interest_waiver_extension": '',
        "interest_principal_waiver_extension": '',
        "extension_interest_principal_waiver": ''
    });
    //====================Handle Additional Inputs start =========================================
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
    const handleInterestWaiverPlusExtension = (e) => {
        const { name, value } = e.target;
        setInterestWaiverPlusExtension({
            ...interestWaiverPlusExtension,
            [name]: value,
        });
    };
    const handlePrincipalAndInterestWaiverPlusExtension = (e) => {
        const { name, value } = e.target;
        setPrincipalAndInterestWaiverPlusExtension({
            ...principalAndInterestWaiverPlusExtension,
            [name]: value,
        });
    };

    //====================Handle Additional Inputs end =========================================
    const [npvScenarios, setnpvScenarios] = useState({
        "npv-scenarios": ''
    });

    // const [npvLoans, setNpvLoans] = useState({
    //     "customer-loans": '',
    // });

    const handleNpvScenariosChange = (e) => {
        const { name, value } = e.target;
        setnpvScenarios({
            ...npvScenarios,
            [name]: value,
        });
    };

    // const handleCustomerLoansChange = (e) =>{
    //     const { name, value } = e.target;
    //     setNpvLoans({
    //         ...npvLoans,
    //         [name]: value,
    //     });
    // }

    const [npvLoans, setNpvLoans] = useState();

    const handleCustomerLoansChange = (e) =>{
        const value = e.target.value;
        setNpvLoans(value);
        // console.log("Selected LOAN INFORMATION start");
        // console.log(value);
        // console.log("Selected LOAN INFORMATION start");
        alert(value.amount)
    }

    const [npvChartScenarios, setnpvChartScenarios] = useState({
        "npv-chart-scenarios": ''
    });
    const handleNpvChartScenariosChange = (e) => {
        const { name, value } = e.target;
        setnpvChartScenarios({
            ...npvChartScenarios,
            [name]: value,
        });
        if (npvChartScenarios["npv-chart-scenarios"] === "bar_chart") {
            setShowBarChart(true);
        }
        else if (npvChartScenarios["npv-chart-scenarios"] === "pie_chart") {            
            setShowPieChart(true);
        }
        else if (npvChartScenarios["npv-chart-scenarios"] === "simple_pie_chart") {
            setShowSimplePieChart(true);
        }
    };
        
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // alert(name, value);
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
        var numberOfPaymentsPerMonth = isNaN(values["number-of-payments-per-month"]) ? 0:((values["number-of-payments-per-month"])/12);
        // console.log("numberOfPaymentsPerMonth : "+numberOfPaymentsPerMonth);
        setTimeout(() => {
            setIsPending(false);
            if (npvScenarios["npv-scenarios"] === "normal".trim()) {
                calculate(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"]
                );
                setShowNoramlNpv(true);
            }
            if (npvScenarios["npv-scenarios"] === "principalwaiver".trim()) {
                calculateNPVWithPrincipalWaiver(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    principalWaiverNumber["principal-waiver-number"],
                );
                // setShowNPVWithPrincipalWaiver(true)
                setShowNPVWithPrincipalWaiver(true); // we will remove it
            }
            if (npvScenarios["npv-scenarios"] === "interestwaiver".trim()) {
                calculateNPVWithInterestWaiver(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    interestWaiverNumber["interest-waiver-number"],
                );
                setShowNPVWithInterestWaiver(true);
            }
            //tiztaw
            if (npvScenarios["npv-scenarios"] === "extension".trim()) {
                calculateNPVExtention(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    extension["extension"],
                );
                setShowNPVWithExtension(true);
            }

            if (npvScenarios["npv-scenarios"] === "principalwaiver&interestwaiver".trim()) {
                calculateNPVWithInterestAndPrincipalWaiver(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    interestAndPrincipalWaiver["principalwaiversecond"],
                    interestAndPrincipalWaiver["interestwaiversecond"],
                );
                setShowNPVWithPrincipalAndInterestWaiver(true);
                // setShowNpvWithPrincipalWaiver(true);
            }

            if (npvScenarios["npv-scenarios"] === "principalwaiver&extension".trim()) {
                calculateNPVWithPrincipalWaiverPlusExtension(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    principalWaiverPlusExtension["principalwaiverthird"],
                    principalWaiverPlusExtension["extensionsecond"],
                );
                setShowNPVWithPrincipalWaiverPlusExtension(true);
            }
            if (npvScenarios["npv-scenarios"] === "interestwaiver&extension".trim()) {
                calculateNPVWithInterestWaiverPlusExtension(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    interestWaiverPlusExtension["interest_waiver_extension"],
                    interestWaiverPlusExtension["extension_interest_waiver"],
                );
                setShowNPVWithInterestWaiverPlusExtension(true);
            }

            if (npvScenarios["npv-scenarios"] === "principal&interestwaiver&extension".trim()) {
                calculateNPVWithPrincipalAndInterestWaiverPlusExtension(
                    values["original-loan"],
                    values["annaul-interest-rate"],
                    values["loan-period-in-years"]+numberOfPaymentsPerMonth,
                    values["risk-premium"],
                    values["number-of-payments-per-year"],
                    principalAndInterestWaiverPlusExtension["principal_interest_waiver_extension"],
                    principalAndInterestWaiverPlusExtension["interest_principal_waiver_extension"],
                    principalAndInterestWaiverPlusExtension["extension_interest_principal_waiver"],
                );
                setShowNPVWithPrincipalAndInterestWaiverPlusExtension(true);
                // setShowNpvWithPrincipalWaiver(true);
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

        const normalNPV = { "type": "Normal", "result": loan.NPV }

        graphNPVS.push(normalNPV)

        localStorage.setItem("npvs", JSON.stringify(normalNPV))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        setNPV(loan.NPV);

        setAmortization(loan.scheduledPayments);
        setYearlyScheduledPayment(loan.yearlyScheduledPayment);

        // setActualNumberOfPayments(loan.actualNumberOfPayments);

        setYearlyInterestSummation(loan.yearlyInterestSummation);
        setYearlyPrincipalSummation(loan.yearlyPrincipalSummation);

    };

    const calculateNPVWithPrincipalWaiver = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,
        waivedNumberOfPayment
    ) => {
        const loanPrincipalWaiver = NPVPrincipalWaiver(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            waivedNumberOfPayment
        );

        setPrincipalWaiverAmortization(loanPrincipalWaiver.scheduledPayments);
        setNpvPrincipalWaiver(loanPrincipalWaiver.NPV);

        setYearlyScheduledPaymentPrincipalWaiver(loanPrincipalWaiver.yearlyScheduledPaymentPrincipalWaiver);
        setYearlyInterestSummationPrincipalWaiver(loanPrincipalWaiver.yearlyInterestSummationPrincipalWaiver);
        setYearlyPrincipalSummationPrincipalWaiver(loanPrincipalWaiver.yearlyPrincipalSummationPrincipalWaiver);

        const withPrincipalWaiverNPVGraph = { "type": "Principal Waiver", "result": loanPrincipalWaiver.NPV }
        graphNPVS.push(withPrincipalWaiverNPVGraph)
        localStorage.setItem("npvs", JSON.stringify(withPrincipalWaiverNPVGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        // console.log(loanPrincipalWaiver);

    };
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
        setNpvInterestWaiver(loanInterestWaiver.NPV);


        setYearlyScheduledPaymentInterestWaiver(loanInterestWaiver.yearlyScheduledPaymentInterestWaiver);
        setYearlyInterestSummationInterestWaiver(loanInterestWaiver.yearlyInterestSummationInterestWaiver);
        setYearlyPrincipalSummationInterestWaiver(loanInterestWaiver.yearlyPrincipalSummationInterestWaiver);

        const withInterestWaiverNPVGraph = { "type": "Interest Waiver", "result": loanInterestWaiver.NPV }
        graphNPVS.push(withInterestWaiverNPVGraph)
        localStorage.setItem("npvs", JSON.stringify(withInterestWaiverNPVGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        // console.log(loanInterestWaiver);
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
        setNpvExtension(loanExtension.NPV);
        
        setYearlyScheduledPaymentExtension(loanExtension.yearlyScheduledPaymentExtension);
        setYearlyInterestSummationExtension(loanExtension.yearlyInterestSummationExtension);
        setYearlyPrincipalSummationExtension(loanExtension.yearlyPrincipalSummationExtension);

        const withExtension = { "type": "Extension", "result": loanExtension.NPV }
        graphNPVS.push(withExtension)
        localStorage.setItem("npvs", JSON.stringify(withExtension))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

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
        setNpvPrincipalAndInterestWaiver(loanInterestAndPrincipalWaiver.NPV);

        setYearlyScheduledPaymentWithInterestAndPrincipalWaiver(loanInterestAndPrincipalWaiver.yearlyScheduledPayment);
        setYearlyInterestSummationWithInterestAndPrincipalWaiver(loanInterestAndPrincipalWaiver.yearlyInterestSummation);
        setYearlyPrincipalSummationWithInterestAndPrincipalWaiver(loanInterestAndPrincipalWaiver.yearlyPrincipalSummation);

        const interestAndPrincipalData = { "type": "Principal and Interest Waiver", "result": loanInterestAndPrincipalWaiver.NPV }
        graphNPVS.push(interestAndPrincipalData)
        localStorage.setItem("npvs", JSON.stringify(interestAndPrincipalData))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        // console.log(loanInterestAndPrincipalWaiver);
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
        setNpvPrincipalWaiverPlusExtension(loanPrincipalWaiverPlusExtention.NPV);

        const withPrincipalWaiverPlusExtensionInGraph = { "type": "Principal Waiver Plus Extension", "result": loanPrincipalWaiverPlusExtention.NPV }
        graphNPVS.push(withPrincipalWaiverPlusExtensionInGraph)
        localStorage.setItem("npvs", JSON.stringify(withPrincipalWaiverPlusExtensionInGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        setYearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion(loanPrincipalWaiverPlusExtention.yearlyScheduledPayment);
        setYearlyInterestSummationWithWaiverPlusExtnesion(loanPrincipalWaiverPlusExtention.yearlyInterestSummation);
        setYearlyPrincipalSummationWithWaiverPlusExtnesion(loanPrincipalWaiverPlusExtention.yearlyPrincipalSummation);

        console.log(loanPrincipalWaiverPlusExtention);
    };

    const calculateNPVWithInterestWaiverPlusExtension = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,                                                                         //will come to here
        interestwaivedNumberOfPayment,
        extension,
    ) => {
        const loanInterestWaiverPlusExtention = NPVInterestWaiverPlusExtension(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            interestwaivedNumberOfPayment,
            extension,
        );
        setInterestWaiverPlusExtensionAmortization(loanInterestWaiverPlusExtention.scheduledPayments);
        setNpvInterestWaiverExtension(loanInterestWaiverPlusExtention.NPV);

        const withInterestWaiverPlusExtensionInGraph = { "type": "Interest Waiver Plus Extension", "result": loanInterestWaiverPlusExtention.NPV }
        graphNPVS.push(withInterestWaiverPlusExtensionInGraph)
        localStorage.setItem("npvs", JSON.stringify(withInterestWaiverPlusExtensionInGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        setYearlyScheduledPaymentWithInterestWaiverPlusExtension(loanInterestWaiverPlusExtention.yearlyScheduledPayment);
        setYearlyInterestSummationWithInterestWaiverPlusExtension(loanInterestWaiverPlusExtention.yearlyInterestSummation);
        setYearlyPrincipalSummationWithInterestWaiverPlusExtension(loanInterestWaiverPlusExtention.yearlyPrincipalSummation);

    };

    const calculateNPVWithPrincipalAndInterestWaiverPlusExtension = (
        amount,
        rate,
        years,
        riskPremium,
        numberOfPayments,                                                                         //will come to here
        principalInterestWaiverExtension,
        interestprincipalWaiverExtension,
        extensionInterestIrincipalWaiver,
    ) => {
        const loanPrincipalAndInterestWaiverPlusExtention = NPVPrincipalAndInterestWaiverPlusExtension(
            amount,
            rate,
            years,
            riskPremium,
            numberOfPayments,
            principalInterestWaiverExtension,
            interestprincipalWaiverExtension,
            extensionInterestIrincipalWaiver,
        );
        setPrincipalAndInterestWaiverPlusExtensionAmortization(loanPrincipalAndInterestWaiverPlusExtention.scheduledPayments);
        setNpvPrincipalAndInterestWaiverExtension(loanPrincipalAndInterestWaiverPlusExtention.NPV);

        const withPrincipalAndInterestWaiverPlusExtensionInGraph = { "type": "Principal & Interest Waiver Plus Extension", "result": loanPrincipalAndInterestWaiverPlusExtention.NPV }
        graphNPVS.push(withPrincipalAndInterestWaiverPlusExtensionInGraph)
        localStorage.setItem("npvs", JSON.stringify(withPrincipalAndInterestWaiverPlusExtensionInGraph))
        localStorage.setItem("allNPV", JSON.stringify(graphNPVS))

        setYearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension(loanPrincipalAndInterestWaiverPlusExtention.yearlyScheduledPayment);
        setYearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension(loanPrincipalAndInterestWaiverPlusExtention.yearlyInterestSummation);
        setYearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension(loanPrincipalAndInterestWaiverPlusExtention.yearlyPrincipalSummation);
    };

    //tiztaw end
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

    // const showCollateral = (loan) => {
    //     setCollaterals(loan.collaterals)
    //     setIsCollateralShown(true)
    //     setCollateralLength(loan.collaterals.length)
    // }

    const showCollateral = (loan) => {
        localStorage.setItem("selectedLoan", JSON.stringify(loan));
        setCollaterals(loan.collaterals);
        setIsCollateralShown(true);
        setCollateralLength(loan.collaterals.length);
        setSelectedLoan(loan);
        console.log("Show selected loan : ");
        console.log(loan);
    }
    const [forclosureValues, setForclosureValues] = useState({
        "collateral-type": '',
        "collateral-value": '',
        "registerDate": '',
    });

    const handleForClosureInputChange = (e) => {
        const { name, value } = e.target;
        setForclosureValues({
            ...forclosureValues,
            [name]: value,
        });
    };

    // const numberWithCommas = (x) =>{
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    const numberWithCommas = (num) =>{  
       return num.toLocaleString('en-US');  
    }

    const copyCollateral = (e, collateral) => {
        e.preventDefault();
        setTimeout(() => {
            setIsPending(false);            
            console.log("New Collaterals are :- ");
            console.log(collateral);
            // const con = JSON.parse(localStorage.getItem("selectedLoan"));
            // forclosureValues["riskPremium"] = con.riskPremium;
            // forclosureValues["annualInterestRate "] = con.annualInterestRate;
            // // console.log(collateral)
            // forclosureValues["collateral-type"] = collateral.type;
            // forclosureValues["collateral-value"] = collateral.value;
            // console.log("Le me see it : " + collateral.registerDate)
            // let year = (collateral.registerDate).substring(0, 4)
            // let month = (collateral.registerDate).substring(5, 7)
            // let day = (collateral.registerDate).substring(8, 10)
            // console.log("Year : " + year)
            // console.log("month : " + month)
            // console.log("day : " + day)
            // let rd = (year + "-" + month + "-" + day);
            // console.log("Last date : " + rd)
            // forclosureValues["registerDate"] = rd;
            setClickStatus(true);
        }, 100);
        setIsPending(true);
    }
    const computeCollateralNPV = (e) =>{
        e.preventDefault();
        setTimeout(() =>{
            const selling_cost_multiplier = 0.05;
            var foreclosure_npv = 0;
            var foreclosure_cashflow = 0;
            var foreclosure_selling_cost = 0;
            var sellingTime = 2;
            const riskPremium = selectedLoan.riskPremium;            
            const annualInterestRate = selectedLoan.annualInterestRate;
            const today = new Date();
            // var totalRate = riskPremium + annualInterestRate + 100;
            // console.log("totalRate before: "+totalRate)
            collaterals.forEach((selected_collateral, index) =>{
                if(selected_collateral.type === "building"){
                    const loanPeriod = today.getFullYear() - selected_collateral.registerDate.substring(0, 4);
                    var total_rate_building_0 = riskPremium + annualInterestRate + 100;
                    if (loanPeriod <= 1) {
                        // if the duration is from 1 to 2year inclusive, MCF	1
                        // value of collateral*MCF*1
                        // var cashflow = collateral_value - selling_cost;
                        var foreclosure_selling_cost_building_0_temp = selected_collateral.value * selling_cost_multiplier //selling cost during forclosure
                        
                        var foreclosure_cashflow_building_0_temp = selected_collateral.value - foreclosure_selling_cost_building_0_temp;
                        
                        var div = Math.pow(total_rate_building_0 / 100, sellingTime);
                        var foreclosure_temp_building_0_npv = (foreclosure_cashflow_building_0_temp / div);

                        foreclosure_cashflow += foreclosure_cashflow_building_0_temp;

                        foreclosure_selling_cost += foreclosure_selling_cost_building_0_temp;

                        foreclosure_npv += foreclosure_temp_building_0_npv;

                        // const foreclosureGraphData = { "type": "Foreclosure", "result": npv }
                        // graphNPVS.push(foreclosureGraphData)
                        // localStorage.setItem("npvs", JSON.stringify(foreclosureGraphData))
                        // localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
                    } 
                    else if ((loanPeriod > 1) && (loanPeriod <= 2)) {
                        // if the duration is from 1 to 2 years inclusive, MCF	1.2
                        // value of collateral*MCF*1.5
                        var total_rate_building_1 = riskPremium + annualInterestRate + 100;
                        var foreclosure_selling_cost_building_1_temp = selected_collateral.value * selling_cost_multiplier

                        var updateColateralValue = selected_collateral.value * 1.13;
                        var foreclosure_cashflow_building_1_temp = updateColateralValue - foreclosure_selling_cost_building_1_temp;
                        var div_building_1 = Math.pow(total_rate_building_1 / 100, sellingTime);

                        var foreclosure_building_1_npv = foreclosure_cashflow_building_1_temp / div_building_1;    

                        foreclosure_cashflow += foreclosure_cashflow_building_1_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_1_temp;                        
                        foreclosure_npv += foreclosure_building_1_npv;
                    }    
                    else if ((loanPeriod > 2) && (loanPeriod <= 3)) {
                        // if the duration is from 2 to 3year inclusive, MCF	1.3
                        // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                        var total_rate_building_2 = riskPremium + annualInterestRate + 100;
                        var foreclosure_selling_cost_building_2_temp = selected_collateral.value * selling_cost_multiplier
                        var updateColateralValue_2 = selected_collateral.value * 1.25;

                        var foreclosure_cashflow_building_2_temp = updateColateralValue_2 - foreclosure_selling_cost_building_2_temp;
                        var div_building_2 = Math.pow(total_rate_building_2 / 100, sellingTime);

                        var foreclosure_building_2_npv = foreclosure_cashflow_building_2_temp / div_building_2;

                        foreclosure_cashflow += foreclosure_cashflow_building_2_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_2_temp;                        
                        foreclosure_npv += foreclosure_building_2_npv;

                    } 
                    else if ((loanPeriod > 3) && (loanPeriod <= 4)) {
                        // if the duration is from 3 to 4year inclusive, MCF	1.4
                        // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                        var total_rate_building_3 = riskPremium + annualInterestRate + 100;

                        var foreclosure_selling_cost_building_3_temp = selected_collateral.value * selling_cost_multiplier
                        var updateColateralValue_3 = selected_collateral.value * 1.38;
                        var foreclosure_cashflow_building_3_temp = updateColateralValue_3 - foreclosure_selling_cost_building_3_temp;
                        var div_building_3 = Math.pow(total_rate_building_3 / 100, sellingTime);

                        var foreclosure_building_3_npv = foreclosure_cashflow_building_3_temp / div_building_3;

                        foreclosure_cashflow += foreclosure_cashflow_building_3_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_3_temp;                        
                        foreclosure_npv += foreclosure_building_3_npv;                        
                    } 
                    else if ((loanPeriod > 4) && (loanPeriod <= 5)) {
                        // if the duration is from 4 to 5year inclusive, MCF	1.5
                        // for the duration b/n 1 to 5year	value of collateral*MCF*1.5
                        var total_rate_building_4 = riskPremium + annualInterestRate + 100;
                        var foreclosure_selling_cost_building_4_temp = selected_collateral.value * selling_cost_multiplier
                        var updateColateralValue_5 = selected_collateral.value * 1.5;
                        var foreclosure_cashflow_building_4_temp = updateColateralValue_5 - foreclosure_selling_cost_building_4_temp;
                        var div_building_4 = Math.pow(total_rate_building_4 / 100, sellingTime);

                        var foreclosure_building_4_npv = foreclosure_cashflow_building_4_temp / div_building_4;

                        foreclosure_cashflow += foreclosure_cashflow_building_4_temp;
                        foreclosure_selling_cost += foreclosure_selling_cost_building_4_temp;                        
                        foreclosure_npv += foreclosure_building_4_npv;
                        
                    }
                     else if (loanPeriod > 5) {
                        alert("It should be revaluated by experts");
                    }                                
                }                
                if (selected_collateral.type === "motor") {
                    const loanPeriod = today.getFullYear() - selected_collateral.registerDate.substring(0, 4);
                    var depreciationValue = 0.1;
                    var AmountDepreciation = selected_collateral.value * depreciationValue * loanPeriod;
                    var netValueAfterDepreciation = selected_collateral.value - AmountDepreciation;
                    if (loanPeriod <= 1) {
                        // if the duration is from 1 to 2year inclusive, MCF	1
                        // value of collateral*MCF*1
                        var foreclosure_selling_cost_motor_0_temp = selected_collateral.value * selling_cost_multiplier;
                        var openMarketColateralValue = netValueAfterDepreciation;
                        var foreclosure_cashflow_motor_0_temp = openMarketColateralValue - foreclosure_selling_cost_motor_0_temp;

                        var total_rate_motor_41 = riskPremium + annualInterestRate + 100;

                        var div_motor_0 = Math.pow(total_rate_motor_41 / 100, sellingTime);

                        foreclosure_selling_cost_motor_0_temp = selected_collateral.value * selling_cost_multiplier;
                        foreclosure_selling_cost += foreclosure_selling_cost_motor_0_temp;

                        foreclosure_cashflow += foreclosure_cashflow_motor_0_temp; 
                        var foreclosure_temp_motor_0_npv = (foreclosure_cashflow_motor_0_temp / div_motor_0);
                        foreclosure_npv += foreclosure_temp_motor_0_npv;
                    }

                    else if (loanPeriod > 1 && loanPeriod <= 2) {
                        // if the duration is from 1 to 2year inclusive, MCF	1.1
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_motor_1_temp = selected_collateral.value * selling_cost_multiplier;
                        var openMarketColateralValue_2 = netValueAfterDepreciation * 1.1;

                        var foreclosure_cashflow_motor_1_temp = openMarketColateralValue_2 - foreclosure_selling_cost_motor_1_temp;

                        var total_rate_motor_1 = riskPremium + annualInterestRate + 100;

                        var div_motor_1 = Math.pow(total_rate_motor_1 / 100, sellingTime);
                        var foreclosure_temp_motor_1_npv = foreclosure_cashflow_motor_1_temp / div_motor_1;
                       
                        foreclosure_selling_cost += foreclosure_selling_cost_motor_1_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_1_temp; 
                        foreclosure_npv += foreclosure_temp_motor_1_npv;

                    } else if (loanPeriod > 2 && loanPeriod <= 4) {
                        // if the duration is from 2 to 4year inclusive, MCF	1.2
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_motor_2_temp = selected_collateral.value * selling_cost_multiplier;
                        var openMarketColateralValue_3 = netValueAfterDepreciation * 1.2;
                        var foreclosure_cashflow_motor_2_temp = openMarketColateralValue_3 - foreclosure_selling_cost_motor_2_temp;
                        var total_rate_motor_2 = riskPremium + annualInterestRate + 100;

                        var div_motor_2 = Math.pow(parseFloat(total_rate_motor_2 / 100), parseFloat(sellingTime));
                        var foreclosure_temp_motor_2_npv = foreclosure_cashflow_motor_2_temp / div_motor_2;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_2_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_1_temp; 
                        foreclosure_npv += foreclosure_temp_motor_2_npv;

                    } else if (loanPeriod > 4 && loanPeriod <= 6) {
                        // if the duration is from 4 to 6year inclusive, MCF	1.25
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_motor_4_temp = selected_collateral.value * selling_cost_multiplier;
                        var openMarketColateralValue_4 = netValueAfterDepreciation * 1.3;
                        var foreclosure_cashflow_motor_4_temp = openMarketColateralValue_4 - foreclosure_selling_cost_motor_4_temp;
                        var total_rate_motor_4 = riskPremium + annualInterestRate + 100;
                        var div_motor_4 = Math.pow(total_rate_motor_4 / 100, sellingTime);
                        var foreclosure_temp_motor_4_npv = foreclosure_cashflow_motor_4_temp / div_motor_4;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_4_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_4_temp; 
                        foreclosure_npv += foreclosure_temp_motor_4_npv;
                        
                    } else if (loanPeriod > 6 && loanPeriod <= 8) {
                        // If the duration is from 6 to 8 year inclusive, MCF	1.35
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_motor_6_temp = selected_collateral.value * selling_cost_multiplier;
                        var openMarketColateralValue_5 = netValueAfterDepreciation * 1.4;

                        var foreclosure_cashflow_motor_6_temp = openMarketColateralValue_5 - foreclosure_selling_cost_motor_6_temp;
                        var total_rate_motor_6 = riskPremium + annualInterestRate + 100;
                        var div_motor_6 = Math.pow(total_rate_motor_6 / 100, sellingTime);
                        var foreclosure_temp_motor_6_npv = foreclosure_cashflow_motor_6_temp / div_motor_6;
                        
                        foreclosure_selling_cost += foreclosure_selling_cost_motor_6_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_6_temp; 
                        foreclosure_npv += foreclosure_temp_motor_6_npv;
                    } else if (loanPeriod > 8 && loanPeriod <= 10) {
                        // if the duration is from 8 to 10 year inclusive, MCF	1.5
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_motor_8_temp = selected_collateral.value * selling_cost_multiplier;
                        var openMarketColateralValue_6 = netValueAfterDepreciation * 1.5;
                        var foreclosure_cashflow_motor_8_temp = openMarketColateralValue_6 - foreclosure_selling_cost_motor_8_temp;
                        var total_rate_motor_8 = riskPremium + annualInterestRate + 100;
                        var div_motor_8 = Math.pow(total_rate_motor_8 / 100, sellingTime);
                        var foreclosure_temp_motor_8_npv = foreclosure_cashflow_motor_8_temp / div_motor_8;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_8_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_8_temp; 
                        foreclosure_npv += foreclosure_temp_motor_8_npv;

                    } else {
                        // if the duration is above 10year, MCF	1.4
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_motor_9_temp = selected_collateral.value * selling_cost_multiplier;
                        var openMarketColateralValue_7 = netValueAfterDepreciation * 0.14;
                        var foreclosure_cashflow_motor_9_temp = openMarketColateralValue_7 - foreclosure_selling_cost_motor_9_temp;

                        var total_rate_motor_9 = riskPremium + annualInterestRate + 100;
                        var div_motor_9 = Math.pow(total_rate_motor_9 / 100, sellingTime);
                        var foreclosure_temp_motor_9_npv = foreclosure_cashflow_motor_9_temp / div_motor_9;

                        foreclosure_selling_cost += foreclosure_selling_cost_motor_9_temp;
                        foreclosure_cashflow += foreclosure_cashflow_motor_9_temp; 
                        foreclosure_npv += foreclosure_temp_motor_9_npv;
                        // tommorow I will do other parts
                    }
                }
                if(selected_collateral.type === "others" ) {
                    //it means machinery 
                    var depreciation = 0.07;
                    const loanPeriod = today.getFullYear() - selected_collateral.registerDate.substring(0, 4);
                    var amountDepreciated = selected_collateral.value  * depreciation * loanPeriod;
                    var NetValueAfterDepreciation = selected_collateral.value - amountDepreciated;

                    if (loanPeriod <= 1) {
                        // if the duration is from 1 to 2year inclusive, MCF1
                        // value of collateral*MCF*1
                        var foreclosure_selling_cost_others_0_temp = selected_collateral.value * selling_cost_multiplier;
                        var Openmarketvaluationofcollateral_1 = NetValueAfterDepreciation;
                        
                        var total_rate_other_0 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_0_temp = Openmarketvaluationofcollateral_1 - foreclosure_selling_cost_others_0_temp;
                        var div_other_0 = Math.pow(total_rate_other_0 / 100, sellingTime);
                        var foreclosure_temp_other_0_npv = foreclosure_cashflow_other_0_temp / div_other_0;


                        foreclosure_selling_cost += foreclosure_selling_cost_others_0_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_0_temp; 
                        foreclosure_npv += foreclosure_temp_other_0_npv;

                    } else if (loanPeriod > 1 && loanPeriod <= 2) {
                        // if the duration is from 1 to 2 year inclusive, MCF	1.05
                        var foreclosure_selling_cost_others_1_temp = selected_collateral.value * selling_cost_multiplier;

                        var Openmarketvaluationofcollateral_2 = NetValueAfterDepreciation * 1.07;
                        var total_rate_other_1 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_1_temp = Openmarketvaluationofcollateral_2 - foreclosure_selling_cost_others_1_temp;
                        var div_other_1 = Math.pow(total_rate_other_1 / 100, sellingTime);
                        var foreclosure_temp_other_1_npv = foreclosure_cashflow_other_1_temp / div_other_1;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_1_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_1_temp; 
                        foreclosure_npv += foreclosure_temp_other_1_npv;
                        
                    } else if (loanPeriod > 2 && loanPeriod <= 4) {
                        // if the duration is from 2 to 4year inclusive, MCF	1.2
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9

                        var foreclosure_selling_cost_others_2_temp = selected_collateral.value * selling_cost_multiplier;

                        var Openmarketvaluationofcollateral_3 = NetValueAfterDepreciation * 1.14;
                        var total_rate_other_2 = riskPremium + annualInterestRate + 100;
                        
                        var foreclosure_cashflow_other_2_temp = Openmarketvaluationofcollateral_3 - foreclosure_selling_cost_others_2_temp;
                        var div_other_2 = Math.pow(total_rate_other_2 / 100, sellingTime);
                        var foreclosure_temp_other_2_npv = foreclosure_cashflow_other_2_temp / div_other_2;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_2_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_2_temp; 
                        foreclosure_npv += foreclosure_temp_other_2_npv;

                    } else if (loanPeriod > 4 && loanPeriod <= 6) {
                        // if the duration is from 4 to 6year inclusive, MCF	1.3
                        // for the duration b/n 1 to 5year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_others_4_temp = selected_collateral.value * selling_cost_multiplier;

                        var Openmarketvaluationofcollateral_4 = NetValueAfterDepreciation * 1.21;
                        var total_rate_other_4 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_4_temp = Openmarketvaluationofcollateral_4 - foreclosure_selling_cost_others_4_temp;
                        var div_other_4 = Math.pow(total_rate_other_4 / 100, sellingTime);
                        var foreclosure_temp_other_4_npv = foreclosure_cashflow_other_4_temp / div_other_4;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_4_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_4_temp; 
                        foreclosure_npv += foreclosure_temp_other_4_npv;
                        
                    } else if (loanPeriod > 6 && loanPeriod <= 8) {
                        // if the duration is from 6 to 8year inclusive, MCF	1.35
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_others_6_temp = selected_collateral.value * selling_cost_multiplier;
                        var Openmarketvaluationofcollateral_5 = NetValueAfterDepreciation * 1.29;
                        var total_rate_other_6 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_6_temp = Openmarketvaluationofcollateral_5 - foreclosure_selling_cost_others_6_temp;
                        var div_other_6 = Math.pow(total_rate_other_6 / 100, sellingTime);
                        var foreclosure_temp_other_6_npv = foreclosure_cashflow_other_6_temp / div_other_6;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_6_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_6_temp; 
                        foreclosure_npv += foreclosure_temp_other_6_npv;

                    } else if (loanPeriod > 8 && loanPeriod <= 10) {
                        // if the duration is from 8 to 10year inclusive, MCF	1.4
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_others_8_temp = selected_collateral.value * selling_cost_multiplier;
                        var Openmarketvaluationofcollateral_6 = NetValueAfterDepreciation * 1.36;
                        var total_rate_other_8 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_8_temp = Openmarketvaluationofcollateral_6 - foreclosure_selling_cost_others_8_temp;
                        var div_other_8 = Math.pow(total_rate_other_8 / 100, sellingTime);
                        var foreclosure_temp_other_8_npv = foreclosure_cashflow_other_8_temp / div_other_8;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_8_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_8_temp; 
                        foreclosure_npv += foreclosure_temp_other_8_npv;

                    } else if (loanPeriod > 10 && loanPeriod <= 12) {
                        // if the duration is from 10 to 12year inclusive, MCF	1.45
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_others_10_temp = selected_collateral.value * selling_cost_multiplier;
                        var Openmarketvaluationofcollateral_7 = NetValueAfterDepreciation * 1.43;
                        var total_rate_other_10 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_10_temp = Openmarketvaluationofcollateral_7 - foreclosure_selling_cost_others_10_temp;
                        var div_other_10 = Math.pow(total_rate_other_10 / 100, sellingTime);
                        var foreclosure_temp_other_10_npv = foreclosure_cashflow_other_10_temp / div_other_10;
                     
                        foreclosure_selling_cost += foreclosure_selling_cost_others_10_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_10_temp; 
                        foreclosure_npv += foreclosure_temp_other_10_npv;

                    } else if (loanPeriod > 12 && loanPeriod <= 15) {
                        // if the duration is from 12 to 15year inclusive, MCF	1.5
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_others_12_temp = selected_collateral.value * selling_cost_multiplier;
                        var Openmarketvaluationofcollateral_8 = NetValueAfterDepreciation * 1.5;                        
                        var total_rate_other_12 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_12_temp = Openmarketvaluationofcollateral_8 - foreclosure_selling_cost_others_12_temp;
                        var div_other_12 = Math.pow(total_rate_other_12 / 100, sellingTime);
                        var foreclosure_temp_other_12_npv = foreclosure_cashflow_other_12_temp / div_other_12;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_12_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_12_temp; 
                        foreclosure_npv += foreclosure_temp_other_12_npv;

                    } else {
                        // if the duration is above 510year, MCF	1.3
                        // For the duration is above 5 year value of collateral*MCF*0.9
                        var foreclosure_selling_cost_others_13_temp = selected_collateral.value * selling_cost_multiplier;
                        var Openmarketvaluationofcollateral_9 = NetValueAfterDepreciation * 1.13;
                        var total_rate_other_13 = riskPremium + annualInterestRate + 100;

                        var foreclosure_cashflow_other_13_temp = Openmarketvaluationofcollateral_9 - foreclosure_selling_cost_others_13_temp;
                        var div_other_13 = Math.pow(total_rate_other_13 / 100, sellingTime);
                        var foreclosure_temp_other_13_npv = foreclosure_cashflow_other_13_temp / div_other_13;

                        foreclosure_selling_cost += foreclosure_selling_cost_others_13_temp;
                        foreclosure_cashflow += foreclosure_cashflow_other_13_temp; 
                        foreclosure_npv += foreclosure_temp_other_13_npv;
                    }
                }
            })
            setSellingCost(foreclosure_selling_cost);        
            setNPVForClosure(foreclosure_npv);            
            setCashFlow(numberWithCommas(foreclosure_cashflow));
            const foreclosureGraphData = { "type": "Foreclosure", "result": foreclosure_npv }
            graphNPVS.push(foreclosureGraphData)
            localStorage.setItem("npvs", JSON.stringify(foreclosureGraphData))
            localStorage.setItem("allNPV", JSON.stringify(graphNPVS))
        })
        setShowNPVWithForeclosure(true);
    }
    /**
     * 
     * @param {loan} - loan information
     * copy loan data to the calculator 
     */

    const populateLoan = (e, loan) => {
        e.preventDefault();
        /**
         * Set loans for specific customer below
         */
        setNpvLoans(loans);
        setShowNumberOfLoans(true);
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

    const showInGraph = (e) => {
        e.preventDefault();
        console.log("visualizeDataInGrpah");
        console.log(visualizeDataInGrpah);
        setVisualizeDataInGrpah(JSON.parse(localStorage.getItem("allNPV")))
        setShowNoramlNpvInGraph(true);
        setShowNPVWithPrincipalWaiverInGraph(true);
        setShowNPVWithInterestWaiverInGraph(true);
        setShowNPVWithExtensionInGraph(true);
        setShowNPVWithPrincipalAndInterestWaiverInGraph(true);
        setShowNPVWithPrincipalWaiverPlusExtensionInGraph(true);
        setShowNPVWithInterestWaiverPlusExtensionInGraph(true);
        setShowNPVWithForeclosureInGraph(true);
    }
    const compareNPV = (e) => {
        e.preventDefault();
        setShowNPVComparision(true);

        console.log(JSON.parse(localStorage.getItem("allNPV")));

        descendingOrderNPVs = JSON.parse(localStorage.getItem("allNPV"));
        ascendingOrderNPVs = JSON.parse(localStorage.getItem("allNPV"));

        const highest = descendingOrderNPVs.reduce((prev, cur) => (cur.result > prev.result ? cur : prev));
        const lowest = descendingOrderNPVs.reduce((prev, cur) => (cur.result < prev.result ? cur : prev));

        setLowestNPV(lowest);
        setLargestNPV(highest);

        console.log(descendingOrderNPVs.sort(
            (p1, p2) =>
                (p1.result < p2.result) ? 1 : (p1.result > p2.result) ? -1 : 0));

        // localStorage.setItem("descendingOrderNPVs", descendingOrderNPVs);

        let sortedDates = ascendingOrderNPVs.sort((p1, p2) => (p1.result > p2.result) ? 1 : (p1.result < p2.result) ? -1 : 0);
        console.log("Products sorted based on ascending order of their manufacture dates are:")
        console.log(sortedDates);
        // localStorage.setItem("ascendingOrderNPVs", ascendingOrderNPVs);

        // ascendingOrderNPVs.push(ascendingOrderNPV);
        // descendingOrderNPVs.push(descendingOrderNPV);
        console.log("Products sorted based on ascending order of their manufacture dates are:")
        console.log(ascendingOrderNPVs);
        console.log("Products sorted based on Descending order of their manufacture dates are:")
        console.log(descendingOrderNPVs)
    }
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
                    <th> Number </th>
                    <th> Type </th>
                    <th> Amount </th>
                    <th> Date </th>                    
                    <th> Progress </th>
                    <th rowSpan={loans.length}> Action </th>
                </thead>
                <tbody>
                    {
                        loans.map((loan, index) => (
                            // <tr key={loan.loan_id} rowSpan="3">
                            <tr key={index}>
                                <th>{index + 1}</th>
                                {/* <th>{loan.loan_id}</th> */}
                                <td> {loan.type} </td>
                                <td> {loan.amount} </td>
                                <td> {loan.registeredDate} </td>
                                <td>
                                    {
                                        // <BsCheck />
                                    }
                                    <BsCheck2All />                             
                                    <BsCheck2All color='green' />                             
                                </td>
                                {
                                    (index + 1) === 1 && 
                               
                                <td rowSpan={loans.length} style={{ display: 'auto' }}>
                                    {/* <Link className="btn btn-info btn-sm" to={`/edit-loan/${loan.id}`} >Update</Link> */}
                                    {/* <Link className="btn btn-success btn-sm" style={{ margin: "1px" }} to={`/collaterals/${loan.loan_id}`} >Collateral</Link> */}
                                    <button className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} onClick={e => populateLoan(e, loan)}>
                                        <FiCopy size={18} data-toggle="tooltip" title="Click it to copy the data to the calculator" /> Populate
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm" style={{ margin: "1px" }} onClick={() => showCollateral(loan)}>
                                        <BsListUl size={18} /> Collateral
                                    </button>
                                </td>
                                }
                            </tr>
                        ))
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
                            {/* <th> Action </th> */}
                        </thead>
                        <tbody>
                            {collaterals.map(
                                collateral =>
                                    <tr key={collateral.id} rowSpan="3">
                                        <td> {collateral.type} </td>
                                        <td> {collateral.value} </td>
                                        <td> {collateral.registerDate} </td>
                                        {/* <td> */}
                                            {/* <button className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} onClick={e => copyCollateral(e, collateral)}>
                                                <FiCopy size={18} data-toggle="tooltip" title="Click it to copy the data to the calculator" />  Settings
                                            </button> */}
                                            {/* <CollateralSettingComponent /> */}
                                        {/* </td> */}
                                    </tr>
                            )
                            }
                        </tbody>
                            <button className="btn btn-outline-success btn-sm" style={{ margin: "1px" }} onClick={e => computeCollateralNPV(e)}>
                                <MdCalculate size={18} data-toggle="tooltip" title="Click it to copy the data to the calculator" />  Compute Foreclosure NPV
                            </button>
                    </table>
                }
                <div>
                   
                </div>
            </div>
            {/* NPV Calculator form start */}
            {/* <form onSubmit={handleForClosure} id="normalForm" value="test">
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
                        <div className="form-input">
                            <input
                                data-toggle='tooltip'
                                title='registerDate'
                                className="form-control mb-1"
                                id="registerDate"
                                type="date"
                                name="registerDate"
                                placeholder="0"
                                value={forclosureValues["registerDate"]}
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

                </div>

            </form> */}

            {/* NPV Calculator form start */}
            <form onSubmit={handleSubmit} id="normalForm" value="test">
                <div className="flex-container">
                    <Grid container spacing={2}>
                        <div className="flex-item-left">
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
                                            <hr style={{ color: 'purple' }} />
                                            <MenuItem value="principalwaiver&interestwaiver">Interest & Principal Waiver</MenuItem>
                                            <MenuItem value="principalwaiver&extension">Principal Waiver & Extension</MenuItem>
                                            <MenuItem value="interestwaiver&extension">Interest Waiver & Extension</MenuItem>
                                            <hr style={{ color: 'purple' }} />
                                            <MenuItem value="principal&interestwaiver&extension">Principal & Interest Waiver & Extension</MenuItem>
                                        </Select>
                                    </FormControl>
                                  
                                   {showNumberOfLoans && (
                                    <FormControl  variant="filled" sx={{ mt: 5, minWidth: 100 }}>
                                        <InputLabel id="lbl_number_of_loans" color="secondary">Loans</InputLabel>
                                        {
                                            //bosena
                                            <Select 
                                                className='loans_per_customer'
                                                onChange={handleCustomerLoansChange}
                                                // value={setNpvLoans["customer-loans"]}

                                                // onChange={handleCustomerLoansChange}
                                                // value={setNpvLoans["customer-loans"]}                                                
                                                >
                                                    <MenuItem value="" style={{ color: "purple" }}>Number, Amount, Type</MenuItem>
                                                    {
                                                        loans.map((customLoan, index) => (
                                                            <MenuItem value={customLoan} key={customLoan.loan_id}>
                                                                {index + 1},
                                                                {customLoan.amount},
                                                                {customLoan.type}
                                                            </MenuItem>
                                                        ))
                                                    }
                                            </Select>
                                        }

                                    </FormControl>
                                   )}
                                   
                                    {/* <p>
                                        {npvLoans && (
                                            <i>
                                                info
                                                {
                                                    console.log("Loan Information is placed below")
                                                }
                                                {
                                                    console.log(npvLoans)
                                                }
                                            </i>
                                        )
                                        }
                                    </p> */}

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
                                        <FormHelperText>Number of Payement per year <br/> Select again for loan period in month </FormHelperText>
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
                                                onChange={handleInterestWaiverPlusExtension}
                                            />

                                            <TextField
                                                label='Extension'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Extension"
                                                variant="filled"
                                                name="extension_interest_waiver"
                                                value={values["extension_interest_waiver"]}
                                                onChange={handleInterestWaiverPlusExtension}
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
                                                onChange={handlePrincipalAndInterestWaiverPlusExtension}
                                            />
                                            <TextField
                                                label='Interest Waiver'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Interest Waiver"
                                                variant="filled"
                                                name="interest_principal_waiver_extension"
                                                value={values["interest_principal_waiver_extension"]}
                                                onChange={handlePrincipalAndInterestWaiverPlusExtension}
                                            />
                                            <TextField
                                                label='Extension'
                                                color="secondary"
                                                size="small"
                                                placeholder="Enter Extension"
                                                variant="filled"
                                                name="extension_interest_principal_waiver"
                                                value={values["extension_interest_principal_waiver"]}
                                                onChange={handlePrincipalAndInterestWaiverPlusExtension}
                                            />

                                        </>
                                    }
                                </Stack>
                                <Stack spacing={1} direction='row'>
                                    <TextField label='Loan period in (Years)' color="secondary" size="small"
                                        placeholder="Enter Loan period in (Years)" variant="filled"
                                        name="loan-period-in-years"
                                        value={values["loan-period-in-years"]}
                                        onChange={handleInputChange}
                                    />
                                    {
                                    values["number-of-payments-per-year"] === '4' && 
                                    <FormControl>
                                        <InputLabel
                                            id="loan_period_in_months_quarterly_lbl"
                                            color="secondary" size="small">Loan period in months</InputLabel>
                                        <Select
                                            labelId="loan_period_in_months_quarterly_lbl"
                                            id="number-of-payments-per-month"
                                            name="number-of-payments-per-month"
                                            label="Number of Payments"
                                            variant='filled'
                                            color="secondary"
                                            size='small'
                                            value={values["number-of-payments-per-month"]}
                                            onChange={handleInputChange}
                                            onInput={handleInputChange}
                                        >
                                            <MenuItem value='3'>3</MenuItem>
                                            <MenuItem value='6'>6</MenuItem>
                                            <MenuItem value='9'>9</MenuItem>
                                        </Select>
                                        <FormHelperText>Loan period in months </FormHelperText>
                                    </FormControl>
                                    }
                                    {
                                        values["number-of-payments-per-year"] === '12' && 
                                        <FormControl>
                                        <InputLabel
                                            id="loan_period_in_months_quarterly_lbl"
                                            color="secondary" size="small">Loan period in months</InputLabel>
                                        <Select
                                            labelId="loan_period_in_months_quarterly_lbl"
                                            id="number-of-payments-per-month"
                                            name="number-of-payments-per-month"
                                            label="Number of Payments"
                                            variant='filled'
                                            color="secondary"
                                            size='small'
                                            value={values["number-of-payments-per-month"]}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value='1'>1</MenuItem>
                                            <MenuItem value='2'>2</MenuItem>
                                            <MenuItem value='3'>3</MenuItem>
                                            <MenuItem value='4'>4</MenuItem>
                                            <MenuItem value='5'>5</MenuItem>
                                            <MenuItem value='6'>6</MenuItem>
                                            <MenuItem value='7'>7</MenuItem>
                                            <MenuItem value='8'>8</MenuItem>
                                            <MenuItem value='9'>9</MenuItem>
                                            <MenuItem value='10'>10</MenuItem>
                                            <MenuItem value='11'>11</MenuItem>
                                        </Select>
                                        <FormHelperText>Loan period in months </FormHelperText>
                                    </FormControl>
                                    }
                                    {
                                        values["number-of-payments-per-year"] === '2' && 
                                        <FormControl>
                                        <InputLabel
                                            id="loan_period_in_months_quarterly_lbl"
                                            color="secondary" size="small">Loan period in months</InputLabel>
                                        <Select
                                            labelId="loan_period_in_months_quarterly_lbl"
                                            id="number-of-payments-per-month"
                                            name="number-of-payments-per-month"
                                            label="Number of Payments"
                                            variant='filled'
                                            color="secondary"
                                            size='small'
                                            value={values["number-of-payments-per-month"]}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value='6'>6</MenuItem>
                                        </Select>
                                        <FormHelperText>Loan period in months </FormHelperText>
                                    </FormControl>
                                    }
                                    <TextField label='Risk premium in %' color="secondary" size="small"
                                        placeholder="Enter Risk premium in %" variant="filled"
                                        name="risk-premium"
                                        value={values["risk-premium"]}
                                        onChange={handleInputChange}
                                    />
                                </Stack>
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
                        </div>
                        {
                            Boolean(showNPVWithPrincipalWaiver ||
                                showNoramlNpv ||
                                showNPVWithInterestWaiver ||
                                showNPVWithExtension ||
                                showNPVWithPrincipalAndInterestWaiver ||
                                showNPVWithPrincipalWaiverPlusExtension ||
                                showNPVWithInterestWaiverPlusExtension ||
                                showNPVWithPrincipalAndInterestWaiverPlusExtension ||
                                showNPVWithForeclosure) && (
                                <div className="flex-item-right">
                                    {/* <Grid item xs={6}> */}
                                    <table className="table table-bordered" style={{ width: "100%" }}>
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
                                                <th>NPV Loss</th>
                                            </tr>
                                            <tr>
                                                <th width="70%">Normal</th>
                                                <td name="normal-npv"
                                                    className="cbe-text-color fontWeightBold"
                                                > {numberWithCommas(roundAmount(npv))} </td>
                                                <td> Baseline </td>

                                            </tr>
                                            <tr>
                                                <th width="70%">With Principal Waiver</th>
                                                <td name="normal-npv"
                                                    className="cbe-text-color fontWeightBold"
                                                > {numberWithCommas(roundAmount(npvPrincipalWaiver))} </td>
                                                <td>{numberWithCommas(roundAmount(npv-npvPrincipalWaiver))}</td>

                                            </tr>
                                            <tr>
                                                <th width="70%">With Interest Waiver</th>
                                                <td name="normal-npv"
                                                    className="cbe-text-color fontWeightBold"
                                                > {numberWithCommas(roundAmount(npvInterestWaiver))} </td>
                                                <td>{numberWithCommas(roundAmount(npv-npvInterestWaiver))}</td>

                                            </tr>
                                            <tr>
                                                <th width="70%">With Extension </th>
                                                <td name="normal-npv"
                                                    className="cbe-text-color fontWeightBold"
                                                > {numberWithCommas(roundAmount(npvExtension))} </td>
                                                <td>{numberWithCommas(roundAmount(npv - npvExtension))}</td>

                                            </tr>
                                            <tr>
                                                <th width="70%">With Principal and Interest Waiver </th>
                                                <td name="normal-npv"
                                                    className="cbe-text-color fontWeightBold"
                                                > {numberWithCommas(roundAmount(npvPrincipalAndInterestWaiver))} </td>
                                                <td>{numberWithCommas(roundAmount(npv - npvPrincipalAndInterestWaiver))}</td>

                                            </tr>

                                            <tr>
                                                <th width="70%">With Principal Waiver plus Extention</th>
                                                <td name="principal-waiver-extension-npv"> {numberWithCommas(roundAmount(npvPrincipalWaiverPlusExtension))} </td>
                                                <td>{numberWithCommas(roundAmount(npv-npvPrincipalWaiverPlusExtension))}</td>
                                            </tr>
                                            <tr>
                                                <th width="70%">With Interest Waiver plus Extention</th>
                                                <td name="interest-waiver-extension-npv"> {numberWithCommas(roundAmount(npvInterestWaiverExtension))} </td>
                                                <td>{numberWithCommas(roundAmount(npv - npvInterestWaiverExtension))}</td>
                                            </tr>
                                            <tr>
                                                <th width="70%" style={{ width: "70%" }}>With Principal & Interest Waiver plus Extention</th>
                                                <td name="principal-interest-waiver-npv"> {numberWithCommas(roundAmount(npvPrincipalAndInterestWaiverExtension))} </td>
                                                <td>{ numberWithCommas(roundAmount(npv - npvPrincipalAndInterestWaiverExtension))}</td>
                                            </tr>
                                            <tr>
                                                <th>With foreclosure</th>
                                                <td>
                                                    <strong> {numberWithCommas(roundAmount(npvForClosure))} </strong>{" "}

                                                    <table className='table table-striped table-bordered '>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Cashflow
                                                                </th>
                                                                <th>
                                                                    Selling Cost
                                                                </th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{cashFlow}</td>
                                                                <td>{numberWithCommas(roundAmount(sellingCost))}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>{numberWithCommas(roundAmount(npv - npvForClosure))}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {
                                        showNPVComparision && (
                                            <div className="npv-comparision-all">
                                                <p className='npv-comparision'> NPV, Comparision </p>
                                                {/* <div className='npv-order'> */}
                                                <table className="table table-bordered" style={{ width: "100%" }}>
                                                    <tbody>
                                                        <tr>
                                                            <th width="70%">Large</th>
                                                            <td name="normal-npv"
                                                                className="cbe-text-color fontWeightBold"
                                                            >
                                                                <span className='npv-type'> {largestNPV.type}, </span>
                                                                {largestNPV.result}
                                                            </td>

                                                        </tr>

                                                        <tr>
                                                            <th width="70%">Small</th>
                                                            <td name="normal-npv"
                                                                className="cbe-text-color fontWeightBold"
                                                            >
                                                                <span className='npv-type'> {lowestNPV.type}, </span>
                                                                {roundAmount(lowestNPV.result)}
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                {/* </div> */}

                                                {/* <div className='npv-order'>
                                            <div className='ascending'>
                                                <strong> <u>Ascending Order</u> </strong>
                                                <table className="table table-striped table-hover table-responsive" style={{ width: '100%' }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Year</th>
                                                            <th>Interest </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <hr />
                                            <div className='descending'>
                                                <strong> <u>Descending Order</u> </strong>
                                                <p>
                                                    Here you go sir
                                                    Here you go sir
                                                    Here you go sir
                                                    Here you go sir
                                                    Here you go sir
                                                </p>
                                            </div>
                                        </div> */}
                                            </div>
                                        )}
                                    {/* <hr /> */}
                                    <div className='buttons'>
                                        <Button
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
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color='secondary'
                                            size="medium"
                                            id="btnShowInGraph"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Click it to Compare NPVs"
                                            data-original-title="Tooltip on bottom"
                                            style={{ marginTop: "5px" }}
                                            className="red-tooltip"
                                            onClick={e => compareNPV(e)}
                                        >
                                            Compare NPV
                                        </Button>
                                    </div>
                                    {/* </Grid> */}
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
                    <div className="flex-container">
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
                    </div>
                )
            }
            {
                showNPVWithPrincipalWaiver && (
                    // Boolean(npvScenarios["npv-scenarios"] === "principalwaiver".trim() && showNPVWithPrincipalWaiver) &&(
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal Waiver Amortization Table
                            </h4>
                            <PrincipalWaiverComponent data={principalWaiverAmortization} />
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
                                        {yearlyInterestSummationPrincipalWaiver.map((amort, index) => (
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
                                        {yearlyPrincipalSummationPrincipalWaiver.map((amort, index) => (
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
                                        {yearlyScheduledPaymentPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showNPVWithInterestWaiver && (
                    // Boolean(npvScenarios["npv-scenarios"] === "interestwaiver".trim() && showNPVWithInterestWaiver) && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Interest Waiver Amortization Table
                            </h4>
                            <InterestWaiverComponent data={interestWaiverAmortization} />
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
                                        {yearlyInterestSummationInterestWaiver.map((amort, index) => (
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
                                        {yearlyPrincipalSummationInterestWaiver.map((amort, index) => (
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
                                        {yearlyScheduledPaymentInterestWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithExtension && (
                    // Boolean(npvScenarios["npv-scenarios"] === "extension".trim() && showNPVWithExtension) && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Extension Amortization Table
                            </h4>
                            <ExtensionComponent data={extensionAmortization} />
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
                                        {yearlyInterestSummationExtension.map((amort, index) => (
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
                                        {yearlyPrincipalSummationExtension.map((amort, index) => (
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
                                        {yearlyScheduledPaymentExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithPrincipalAndInterestWaiver && (
                    // Boolean(npvScenarios["npv-scenarios"] === "extension".trim() && showNPVWithExtension) && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal and Interest Waiver Amortization Table
                            </h4>
                            <PrincipalAndInterestWaiverComponent data={interestAndPrincipalAmortization} />
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
                                        {yearlyInterestSummationWithInterestAndPrincipalWaiver.map((amort, index) => (
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
                                        {yearlyPrincipalSummationWithInterestAndPrincipalWaiver.map((amort, index) => (
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
                                        {yearlyScheduledPaymentWithInterestAndPrincipalWaiver.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithPrincipalWaiverPlusExtension && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal Waiver plus Extension Amortization Table
                            </h4>
                            <PrincipalWaiverAndExtensionComponent data={principalWaiverPlusExtensionAmortization} />
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
                                        {yearlyInterestSummationWithWaiverPlusExtnesion.map((amort, index) => (
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
                                        {yearlyPrincipalSummationWithWaiverPlusExtnesion.map((amort, index) => (
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
                                        {yearlyScheduledPaymentWithPrincipalWaiverPlusExtnesion.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithInterestWaiverPlusExtension && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Interest Waiver plus Extension Amortization Table
                            </h4>
                            <InterestWaiverAndExtensionComponent data={interestWaiverPlusExtensionAmortization} />
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
                                        {yearlyInterestSummationWithInterestWaiverPlusExtension.map((amort, index) => (
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
                                        {yearlyPrincipalSummationWithInterestWaiverPlusExtension.map((amort, index) => (
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
                                        {yearlyScheduledPaymentWithInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                showNPVWithPrincipalAndInterestWaiverPlusExtension && (
                    <div className="flex-container">
                        <div className='normal-npv-amortization'>
                            <h4>
                                NPV With Principal & Interest Waiver plus Extension Amortization Table
                            </h4>
                            <PrincipalAndInterestWaiverAndExtensionComponent data={principalAndInterestWaiverPlusExtensionAmortization} />
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
                                        {yearlyInterestSummationWithPrincipalAndInterestWaiverPlusExtension.map((amort, index) => (
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
                                        {yearlyPrincipalSummationWithPrincipalAndInterestWaiverPlusExtension.map((amort, index) => (
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
                                        {yearlyScheduledPaymentWithPrincipalAndInterestWaiverPlusExtension.map((amort, index) => (
                                            <tr key={index}>
                                                <td> {index + 1} </td>
                                                <td>{roundAmount(amort)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                Boolean(showNoramlNpvInGraph || showNPVWithPrincipalWaiverInGraph || showNPVWithInterestWaiverInGraph || showNPVWithExtensionInGraph || showNPVWithPrincipalAndInterestWaiverInGraph || showNPVWithPrincipalWaiverPlusExtensionInGraph || showNPVWithInterestWaiverPlusExtensionInGraph) && (
                    <div className='flex-container'>
                        <div className='npv-graph'>
                            <h5>
                                NPV, Graphical Representation
                            </h5>

                            {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 350 }}>
                                <InputLabel id="demo-simple-select-filled-label" color="secondary">Select Chart Types</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="npv-chart-scenarios"
                                    name="npv-chart-scenarios"
                                    value={npvChartScenarios["npv-chart-scenarios"]}
                                    onChange={handleNpvChartScenariosChange}
                                    color='secondary'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <hr style={{ color: 'purple' }} />
                                    <MenuItem value="bar_chart">Bar Chart</MenuItem>
                                    <MenuItem value="pie_chart">Pie Chart </MenuItem>
                                    <MenuItem value="simple_pie_chart">Simple Pie Chart </MenuItem>
                                </Select>
                            </FormControl> */}
                            
                            {/* {
                                showBarChart && (<div className='npv-graph'><Chart data={visualizeDataInGrpah} /> </div> )
                            } 
                
                            {
                                showPieChart && (<div className='npv-graph'><PieChartComponent data={visualizeDataInGrpah} /> </div>)
                            }
                            {
                                showSimplePieChart && (<div className='npv-graph'><SimplePieChartComponent data={visualizeDataInGrpah} /> </div>)
                            } */}

                            {
                                <div className='npv-graph'><Chart data={visualizeDataInGrpah} /> </div>
                            } 
                
                            {
                                (<div className='npv-graph'><PieChartComponent data={visualizeDataInGrpah} /> </div>)
                            }
                            {
                                (<div className='npv-graph'><SimplePieChartComponent data={visualizeDataInGrpah} /> </div>)
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default LoanListComponent