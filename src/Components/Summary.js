import React, { Component } from 'react';
import { Row, Col,Table} from 'react-bootstrap';

export class Summary extends Component {
    render() {
        return (
            <div>
           <Row className="calculation-summary justify-content-md-center">
               <Col lg={12} md= {12}>
                   <p><h3> Calculation Summary</h3></p>
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
                            <td className= "amort-payments">{this.props.noOfPaymentAmortPeriod}</td>
                            </tr>
                            <tr>
                            <td>Mortgage Payment</td>
                            <td className= "term-mortgage">{this.props.mortgagePayment}</td>
                            <td className= "amort-mortgage">{this.props.mortgagePayment}</td>
                            </tr>
                            <tr>
                            <td>Principal Payments</td>
                            <td className="term-principal">{this.props.termPrincipalPayments}</td>
                            <td className="amort-principal">{this.props.amortPrincipalPayemnets}</td>
                            </tr>
                            <tr>
                            <td>Interest Payments</td>
                            <td className= "term-interest">{this.props.termInterestPayements}</td>
                            <td className= "amort-interest">{this.props.amortInterestPayements}</td>
                            </tr>
                            <tr>
                            <td>Total Cost</td>
                            <td className= "term-total-cost">{this.props.termTotalCost}</td>
                            <td className= "amort-total-cost">{this.props.amortTotalCost}</td>
                            </tr>
                        </tbody>
                    </Table>

               </Col>
           </Row>
                    
           </div>
        )
    }
}

export default Summary