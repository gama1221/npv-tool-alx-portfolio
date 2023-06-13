/*
 * cbe-npv-normal
 * Calculating CBE's Amortization
 * https://github.com/gama1221/cbe-npv-normal
 *
 * Copyright (c) 2023 Getinet Amare Mekonnen
 * Licensed under the CBE license.
 */
/**
 *
 * @param {number} num - An input to be rounded
 * @returns - It returns two decimal point rounded value
 */
const roundTheValue = (num) => {
  return Math.round(num * 100) / 100;
}; 
/**
 *
 * @param {number} amount - Original Loan
 * @param {number} annualInterestRate - Annual interest rate to be paid for loan
 * @param {number} loanPeriodInYears - Length of a year that a loan takes to complete
 * @param {number} numberOfPaymentsPerYear - It holds how many number of years it tooks to complete the loan
 * @param {number} principalSum - Summation of each principal for number of payments
 * @param {number} cumulativeInterest - Summation of interests.
 *
 *  @returns {{ principal: number, interest: number, scheduledPayment: number, endingBalance: number, cumulativeInterest: number }}
 */
var getNextPaymentSchedule = (
  month,
  amount,
  annualInterestRate,
  loanPeriodInYears,
  numberOfPaymentsPerYear,
  principalSum,
  cumulativeInterest,
  injection,
) => {
  var principal;
  var interest;
  var scheduledPayment;
  var irmPow;
  var interestRateMonth = annualInterestRate / 100 / numberOfPaymentsPerYear;
  var numberOfPayment;
  // var month = 0
  numberOfPayment = loanPeriodInYears * numberOfPaymentsPerYear;
 amount = injection;
 debugger
  irmPow = Math.pow(1 + interestRateMonth, -numberOfPayment);
  scheduledPayment = roundTheValue(
    (amount * (annualInterestRate / 100)) /
      (numberOfPaymentsPerYear * (1 - irmPow))
  );
  interest = roundTheValue((amount - principalSum) * interestRateMonth);
  principal = scheduledPayment - interest;
  // month += 1;
  return {
    month:month,
    principal: roundTheValue(principal),
    interest: interest,
    scheduledPayment: scheduledPayment,
    endingBalance: roundTheValue(amount - principalSum - principal),
    cumulativeInterest: roundTheValue(cumulativeInterest + interest),
  };
};
/**
 * It holds the parametrs we provide on the GUI, It has four parametrs
 * @param {number} amount - Original Loan
 * @param {number} annualInterestRate - Annual interest rate to be paid for loan
 * @param {number} loanPeriodInYears - Length of a year that a loan takes to complete
 * @param {number} numberOfPaymentsPerYear - It holds how many number of years it tooks to complete the loan
 *
 * @returns {{ scheduledPayments: number, amount: number, cumulativeInterest: number, principalSum: number, sum: number }}
 */

const CBEAmortization = (
  amount,
  annualInterestRate,
  loanPeriodInYears,
  riskPremium,
  // waiver,
  numberOfPaymentsPerYear,
  injection
) => {
  if (
    !amount ||
    amount <= 0 ||
    !loanPeriodInYears ||
    loanPeriodInYears <= 0 ||
    !annualInterestRate ||
    annualInterestRate <= 0 ||
    !riskPremium ||
    riskPremium <= 0 
    
  ) {
    throw new Error(
      "wrong parameters: "
        .concat(amount, " ")
        .concat(loanPeriodInYears, " ")
        .concat(riskPremium, " ")
        .concat(annualInterestRate)
    );
  }
  var scheduledPayments = [];
  var cumulativeInterest = 0;
  var principalSum = 0;
  var sum = 0;
  var p_s = 0;
  var s_s = 0;
  var i_s = 0;
  var m = 0;
  var yearlyScheduledPayment = [];
  var yearlyPrincipalSummation = [];
  var yearlyInterestSummation = [];  
  var yearlySummations = [];
  var NPV = [];  
  var month = 1;
  /**
    * Let me compute Cashflow, principal summation, and interest for each year as well.
  */ 
  // var yearlyPaymentsSummation = [];

 var paymentCounter = 0;
  for (var i = 0; i < loanPeriodInYears * numberOfPaymentsPerYear; i++) {
    var inst = getNextPaymentSchedule(
      month,
      amount, 
      annualInterestRate,
      loanPeriodInYears,
      numberOfPaymentsPerYear,
      principalSum,
      cumulativeInterest,
      injection,
    );
    amount = injection;
    month = month;
    sum += inst.scheduledPayment;
    principalSum += inst.principal;
    cumulativeInterest += inst.interest;
    s_s += inst.scheduledPayment;
    p_s += inst.principal;
    i_s += inst.interest;

    if (i === loanPeriodInYears * numberOfPaymentsPerYear - 1) {
      principalSum += inst.endingBalance;
      sum += inst.endingBalance;
      inst.endingBalance = 0;
    }
    if(m === (numberOfPaymentsPerYear - 1))  {
      yearlyScheduledPayment.push(s_s);
      yearlyPrincipalSummation.push(p_s);
      yearlyInterestSummation.push(i_s);
      // yearlyPaymentsSummation.push(yearlyInterestSummation);
      s_s = 0;
      i_s = 0;
      p_s = 0;
      m = -1;
    } 
    m++;
    month++;
    paymentCounter += 1;
    scheduledPayments.push(inst);
    yearlySummations.push(yearlyInterestSummation)
    var riskPremiumWithAnnualInterestRate = (1+(parseFloat(annualInterestRate) + parseFloat(riskPremium))/100);
    if(i === (loanPeriodInYears * numberOfPaymentsPerYear - 1)){
      /**
       *  Let me sum the following values
       *    yearlyPrincipalSummation
       *    yearlyInterestSummations
       *    And compute the NPV
       */
      var power = 1;      
      for(var n = 0;n < yearlyInterestSummation.length; n++){
        var npv1 = ((yearlyInterestSummation[n] + yearlyPrincipalSummation[n]) / Math.pow(riskPremiumWithAnnualInterestRate, power)); 
        NPV.push(npv1);
        npv1 = 0;
        power++; 
      }
      /**
       * Summation of NPV
       */
      var npmSummation = 0;
      for(var s = 0; s < NPV.length; s++){
        npmSummation += NPV[s];
      }
    }
  }
  return {
    scheduledPayments: scheduledPayments,
    amount: roundTheValue(amount),
    cumulativeInterest: roundTheValue(cumulativeInterest),
    principalSum: roundTheValue(principalSum),
    sum: roundTheValue(sum),
    scheduledPayment:inst.scheduledPayment,
    actualNumberOfPayments: (loanPeriodInYears * numberOfPaymentsPerYear),
    yearlyPrincipalSummation:yearlyPrincipalSummation,
    yearlyInterestSummation:yearlyInterestSummation,
    yearlyScheduledPayment:yearlyScheduledPayment,
    // yearlyPaymentsSummation:yearlyPaymentsSummation,
    NPV:roundTheValue(npmSummation),
  };
};
module.exports = CBEAmortization;