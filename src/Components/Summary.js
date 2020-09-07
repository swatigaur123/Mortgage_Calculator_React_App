import React, { Component } from 'react';
import { Row, Col, Table } from 'react-bootstrap';

export class Summary extends Component {
    componentDidMount() {
        console.log("in summary paymentSchedule ", this.props.paymentSchedule);
        console.log("in summary mortgagePayment ", this.props.mortgagePayment);
    }
    render() {
        return (
            <div>
                <Row className="calculation-summary">
                    <Col lg={12} md={12}>
                        <h3> Calculation Summary</h3>
                        <Table striped bordered hover size="lg" responsive>
                            <thead>
                                <tr>
                                    <th> Category</th>
                                    <th> Term</th>
                                    <th> Amortization Period</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Number of Payments</td>
                                    <td className="term-payments">{this.props.noOfPayementsTerm}</td>
                                    <td className="amort-payments">{this.props.noOfPaymentAmortPeriod}</td>
                                </tr>
                                <tr>
                                    <td>Mortgage Payment</td>
                                    <td className="term-mortgage">{this.props.mortgagePayment}</td>
                                    <td className="amort-mortgage">{this.props.mortgagePayment}</td>
                                </tr>
                                <tr>
                                    <td>Principal Payments</td>
                                    <td className="term-principal">{this.props.termPrincipalPayments}</td>
                                    <td className="amort-principal">{this.props.amortPrincipalPayemnets}</td>
                                </tr>
                                <tr>
                                    <td>Interest Payments</td>
                                    <td className="term-interest">{this.props.termInterestPayements}</td>
                                    <td className="amort-interest">{this.props.amortInterestPayements}</td>
                                </tr>
                                <tr>
                                    <td>Total Cost</td>
                                    <td className="term-total-cost">{this.props.termTotalCost}</td>
                                    <td className="amort-total-cost">{this.props.amortTotalCost}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h3 style={paymentScheduleTableHead}> Payment Schedule</h3>
                        <p>

                        </p>
                        <Table responsive striped bordered hover size="sm" style={paymentScheduleTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Mortgage Payment</th>
                                    <th>Monthly Interest</th>
                                    <th>Monthly Principal</th>
                                    <th>Total Interest Paid</th>
                                    <th>Total Principal Paid</th>
                                    <th>Total Mortgage Paid</th>
                                    <th>Outstanding Principal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.paymentSchedule.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{item.count}</td>
                                            <td>{item.mortgagePayment}</td>
                                            <td>{item.monthlyInterestPayment}</td>
                                            <td>{item.monthlyPrincipalPayment}</td>
                                            <td>{item.totalInterestPaid}</td>
                                            <td>{item.totalPrincipalPaid}</td>
                                            <td>{item.totalMortgagePaid}</td>
                                            <td>{item.balance}</td>

                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>

                    </Col>
                </Row>

            </div>
        )
    }
}
const paymentScheduleTable = {
    backgroundColor: '#335075',
    color: 'white',
    marginBottom: '10px',
    width: '100%'
}
const paymentScheduleTableHead = {
    marginTop: '20px'
}

export default Summary