class CalculatorLogic{

    static calculatePayment(loanAmount, annualRate, amortizationPeriod,paymentFrequency){
          
        let months= amortizationPeriod * 12
        let monthlyRate= annualRate / 1200
        
        
        console.log("loan",loanAmount);
        console.log("monthlyRate",monthlyRate);
        console.log("months",months);
        console.log("frequency",paymentFrequency);
        var paymentSchedule = CalculatorLogic.calculatePaymentScheduleWise (loanAmount, monthlyRate, months,paymentFrequency);
        console.log("paymentSchedule",paymentSchedule);
        let piPayment = paymentSchedule.length ? paymentSchedule[0].mortgagePayment : 0   
        return {
            loanAmount: loanAmount,
            principalAndInterest: piPayment,
            termMonths: months,
            paymentSchedule: paymentSchedule
        };
    }
    
    static calculateScheduledPayment(monthlyPayment,paymentFrequency){
        let scheduledPayment=monthlyPayment
        switch(paymentFrequency){

            case 'monthly':
                break
             case 'regular_biweekly':
                scheduledPayment= (monthlyPayment * 12) /26
                break
             case 'acclerated_biweekly':
                scheduledPayment= (monthlyPayment ) /2
                break
             case 'semi_monthly':
                scheduledPayment= (monthlyPayment ) /2
                break
             case 'regular_weekly':
                scheduledPayment= (monthlyPayment * 12) /52
                break
             case 'acclerated_weekly':
                scheduledPayment= (monthlyPayment ) /4
        }
        console.log("schedule payment",scheduledPayment);
        return CalculatorLogic.roundToXDigits(scheduledPayment,2);
    }


    static roundToXDigits(value, digits){
        if(!digits){
            digits = 2;
        }
        value = value * Math.pow(10, digits);
        value = Math.round(value);
        value = value / Math.pow(10, digits);
        return value;
    }

    static calculatePaymentScheduleWise(loanAmount, monthlyRate, months, paymentFrequency)  {
        let monthlyPayment=CalculatorLogic.calculateMonthlyPIPayment(loanAmount, monthlyRate, months)
        let scheduledPayment= CalculatorLogic.calculateScheduledPayment(monthlyPayment,paymentFrequency);
        return CalculatorLogic.calculateMonthlyPaymentSchedule(loanAmount, monthlyRate, months,scheduledPayment,paymentFrequency);
             
    }
    
    static calculateMonthlyPaymentSchedule (loanAmount, monthlyRate, months, mortgagePayment, paymentFrequency) {
        
        console.log("mortgage payment",mortgagePayment);
        let loopCounter=months
        let interestDivider=1
        switch(paymentFrequency){

            case "monthly":
                loopCounter= loopCounter * 12
                interestDivider=1
                break
            case "semi_monthly":
                loopCounter=loopCounter * 24
                interestDivider=1/2
                break
            case "regular_biweekly":
                loopCounter= loopCounter * 26
                interestDivider= 12/26
                break
            case "acclerated_biweekly":
                loopCounter= loopCounter * 26
                interestDivider= 12/26
                break
            case "regular_weekly":
                loopCounter= loopCounter * 52
                interestDivider= 12/52
                break
            case "acclerated_weekly":
                loopCounter= loopCounter * 52
                interestDivider= 12/52
                break

        }
   
        let principal=loanAmount
        console.log("principal", principal)
        let totalInterest=0
        let totalPayments=0
        let totalPrincipal=0
        let i=0
        let payments = []
        

        while (principal > 0 && i < (loopCounter)) {
            let interestPayment = CalculatorLogic.roundToXDigits((principal * monthlyRate) * interestDivider,2)
            let principalPayment = CalculatorLogic.roundToXDigits(mortgagePayment - interestPayment,2) 
            if (principal > principalPayment) {
                principal= CalculatorLogic.roundToXDigits(principal - principalPayment,2)
            }
            else {
                principalPayment = principal
                principal=0
            }
            let totalPayment = CalculatorLogic.roundToXDigits( interestPayment + principalPayment,2)
            totalInterest = CalculatorLogic.roundToXDigits(totalInterest+ interestPayment ,2)
            totalPrincipal = CalculatorLogic.roundToXDigits(totalPrincipal+ principalPayment,2)
            totalPayments = CalculatorLogic.roundToXDigits(totalPayments+ totalPayment,2)
            payments[i] = {
                count: i+1,
                monthlyInterestPayment: interestPayment,
                totalInterestPaid: totalInterest,
                monthlyPrincipalPayment: principalPayment,
                mortgagePayment: totalPayment,
                totalPrincipalPaid: totalPrincipal,
                totalMortgagePaid: totalPayments,
                balance: principal
            };
            i++;
        }
        console.log("payments array", payments);
        return payments;
    }
   static calculateMonthlyPIPayment(loanAmount, monthlyRate, termMonths) {
             
        let monthlyPayment = (monthlyRate * loanAmount * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
        console.log("monthly payment", monthlyPayment);
        return CalculatorLogic.roundToXDigits(monthlyPayment,2);
    }


}

export default CalculatorLogic;

    