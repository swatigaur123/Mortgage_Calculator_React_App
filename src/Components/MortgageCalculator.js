import React, { Component } from 'react'
import { Bootstrap, Grid, Row,Jumbotron , Container, Form, Button, Col,InputGroup } from 'react-bootstrap';
import mortgageCalc from '../Img/mortgageCalc.jpg';
import questionMark from '../Img/question-mark.png';
import Summary from './Summary';
import CalculatorLogic from '../CalculatorLogic';

export class MortgageCalculator extends Component {

    constructor() {
        super()

        this.state = {
            mortgageAmount: '',
            interestRate: '',
            amortizationPeriod: '',
            paymentFrequency: '',
            term: '',
            prePaymentAmount: '',
            prePayementFrequency: '',
            startPayemnt: '',
            monthlyInterestRate: '',
            termMonths: '',
            monthlyRate: '',
            monthlyPayment: '',
            noOfPayementsTerm: '',
            noOfPaymentAmortPeriod: '',
            paymentSchedule: CalculatorLogic.paymentSchedule,
            loanAmount: '',
            monthlyRate: '',
            months: '',
            mortgagePayment: '',
            termPrincipalPayments: '',
            amortPrincipalPayemnets: '',
            termInterestPayements: '',
            amortInterestPayements: '',
            termTotalCost: '',
            amortTotalCost: ''


            //calculatePaymentSchedule:Algorithm.calculatePaymentSchedule
        }

    }

    

    onChangeMortgageAmount = (e) => {
        this.setState({
            mortgageAmount: e.target.value
        })
        console.log("mortgageAmount", this.state.mortgageAmount);
    }
    onChangeInterestRate = (e) => {
        this.setState({
            interestRate: e.target.value
        })
    }
    onChangeAmortizationPeriod = (e) => {
        this.setState({
            amortizationPeriod: e.target.value
        })
        console.log("amortizationPeriod", this.state.amortizationPeriod);
    }
    onChangePaymentFrequency = (e) => {
        this.setState({
            paymentFrequency: e.target.value
        })
        console.log("amortizationPeriod", this.state.amortizationPeriod);
    }
    onChangeTerm = (e) => {
        this.setState({
            term: e.target.value
        })
        console.log("amortizationPeriod", this.state.amortizationPeriod);
    }

    paymentFrequencyCount = (paymentFrequency) => {
        switch (paymentFrequency) {

            case "monthly":
                return 12
            case "semi_monthly":
                return 24
            case "regular_biweekly":
                return 26
            case "acclerated_biweekly":
                return 26
            case "regular_weekly":
                return 52
            case "acclerated_weekly":
                return 52
        }

    }
    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
      };

    calculateMortgage = (mortgagenAmount, interestRate, amortizationPeriod, paymentFrequency) => {
        
         if(this.state.mortgageAmount && this.state.interestRate && this.state.amortizationPeriod && this.state.paymentFrequency && this.state.term && (this.state.amortizationPeriod>=this.state.term)){

            let mortgageParameters = CalculatorLogic.calculatePayment(mortgagenAmount, interestRate, amortizationPeriod, paymentFrequency)
            let termCount = this.state.term * this.paymentFrequencyCount(this.state.paymentFrequency)
            let amortCount = mortgageParameters.paymentSchedule.length
    
            this.setState({
                noOfPayementsTerm: this.state.term * this.paymentFrequencyCount(this.state.paymentFrequency)
            })
            // this.setState({
            //     noOfPaymentAmortPeriod: this.state.amortizationPeriod * this.paymentFrequencyCount(this.state.paymentFrequency)
            // })
    
            this.setState({
                noOfPaymentAmortPeriod: amortCount
            })
            console.log("term count", termCount);
            console.log("amort count", amortCount);
            this.state.termPrincipalPayments = mortgageParameters.paymentSchedule[termCount - 1].totalPrincipalPaid
            console.log("totalPrincipalPaid", this.state.termPrincipalPayments);
    
    
            this.state.amortPrincipalPayemnets = mortgageParameters.paymentSchedule[amortCount - 1].totalPrincipalPaid
    
            this.state.termInterestPayements = mortgageParameters.paymentSchedule[termCount - 1].totalInterestPaid
    
    
            this.state.amortInterestPayements = mortgageParameters.paymentSchedule[amortCount - 1].totalInterestPaid
    
            this.state.termTotalCost = mortgageParameters.paymentSchedule[termCount - 1].totalMortgagePaid
    
            this.state.amortTotalCost = mortgageParameters.paymentSchedule[amortCount - 1].totalMortgagePaid
    
            this.state.mortgagePayment = mortgageParameters.paymentSchedule[termCount - 1].mortgagePayment
    
         }
 
    }
		
    limitInputCharacter(e) {
        const re = /[0-9.:]+/g;
        if (!re.test(e.key)) {
          e.preventDefault();
        }
      }
	  
     

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1 style={headerDiv} className="mortgage-calculator-header">
                                <img src={mortgageCalc} style={calcImg}></img>
                                <span style={headingSpan}>Mortgage Application</span>
                            </h1>
                           
                            <span>
                                <strong>
                                    From <a href="https://www.canada.ca/en/financial-consumer-agency.html">Financial Consumer Agency Of Canada</a>
                                </strong>
                            </span>
                            <p>This calculator determines your mortgage payment and provides you with a mortgage payment schedule. The calculator also shows how much money and how many years you can save by making prepayments.
                        To help determine whether or not you qualify for a home mortgage based on income and expenses, visit the <a href="https://itools-ioutils.fcac-acfc.gc.ca/MQ-HQ/MQ-EAPH-eng.aspx">Mortgage Qualifier Tool</a></p>
                            <p> <strong>Note:</strong> As of July 9, 2012, the maximum amortization period for mortgages with less than a 20 percent down payment is <strong>25 years</strong></p>
                </Jumbotron>
                
                <Form onSubmit={this.submitHandler} noValidate>
                    <Form.Group as={Row} controlId="mortgageAmount" className="mortgageAmount">
                        <Form.Label column sm="2">
                        Mortgage Amount
                        </Form.Label>
                        <Col sm="10">
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                        </InputGroup.Prepend>
                            <Form.Control  inputref={node => this.state.mortgageAmount = node} 
                            onChange={this.onChangeMortgageAmount}
                            placeholder="100000.00"
                            onKeyPress={(e) => this.limitInputCharacter(e)}
                            autoComplete="off"
                            required/>
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="interestRate" className="interestRate">
                        <Form.Label column sm="2">
                        Interest Rate
                        </Form.Label>
                        <Col sm="10">
                        <InputGroup>
                            <Form.Control  placeholder="5.00"  
                            inputref={node => this.state.interestRate = node} 
                            onChange={this.onChangeInterestRate}
                            onKeyPress={(e) => this.limitInputCharacter(e)}
                            autoComplete="off"
                            required/>
                        <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="amortizationPeriod" className="amortizationPeriod">
                            <Form.Label  column sm="2">Amortization Period
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" className="amortization-period"  inputref={node => this.state.amortizationPeriod = node}  onChange={this.onChangeAmortizationPeriod} required>
                                <option value="">Select Amortization Period</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                </Form.Control>
                                { this.state.amortizationPeriod < this.state.term? <strong style={validationError}>The amortization period must be equal to or greater than the term.</strong> : ''}
                                </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="paymentFrequency" className="paymentFrequency">
                            <Form.Label  column sm="2">Payment Frequncy
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" className="payment-frequency"  inputref={node => this.state.paymentFrequency = node}  onChange={this.onChangePaymentFrequency} required>
                                    <option value="">Select Payement Frequency</option>
                                    <option value="regular_weekly">Weekly</option>
                                    <option value="acclerated_weekly">Accelarated weekly</option>
                                    <option value="acclerated_biweekly">Accelarated Biweekly</option>
                                    <option value="regular_biweekly">Bi Weekly</option>
                                    <option value="semi_monthly">Semi Monthly</option>
                                    <option value="monthly">Monthly</option>
                                </Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="term" className="term" >
                            <Form.Label  column sm="2">Term
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" className= "term-select"  inputref={node => this.state.term = node} onChange={this.onChangeTerm} required>  
                                    <option value="">Select Term</option>                        
                                     <option value="01">1 Year</option>
                                     <option value="02">2 Year</option>
                                     <option value="03">3 Year</option>
                                     <option value="04">4 Year</option>
                                     <option value="05">5 Year</option>
                                </Form.Control>
                            </Col>
                    </Form.Group>
                   
                        <Col sm="2">
                            <button type="submit" style= {styleButton} className="calculate-button" onClick={() => this.calculateMortgage(this.state.mortgageAmount,this.state.interestRate, this.state.amortizationPeriod,this.state.paymentFrequency)}>
                                Calculate
                            </button>
                        </Col>
                   
                
                <Summary
                                amortTotalCost={this.state.amortTotalCost}
                                termTotalCost={this.state.termTotalCost}
                                termInterestPayements={this.state.termInterestPayements}
                                amortInterestPayements={this.state.amortInterestPayements}
                                mortgagePayment={this.state.mortgagePayment}
                                termPrincipalPayments={this.state.termPrincipalPayments}
                                amortPrincipalPayemnets={this.state.amortPrincipalPayemnets}
                                noOfPayementsTerm={this.state.noOfPayementsTerm}
                                noOfPaymentAmortPeriod={this.state.noOfPaymentAmortPeriod}>

                </Summary>
            </Form>              
              
            </Container>
        )
    }
}

const calcImg = {
    height: '120px'
}
const headingSpan = {
    paddingBottom: '10px',
    fontSize: '40px'
}
const headerDiv = {
    borderBottomStyle: 'solid',
    borderBottomColor: '#DC143C'
}
const validationError = {
    color: 'red'
}

const styleButton = {
    backgroundColor: '#335075',
    color: 'white',
    marginBottom: '10px',
    marginTop: '10px'
}

export default MortgageCalculator