describe('MortgageCalculator Tests', () => {
    describe('new flow', () => {
        beforeEach(() => {
           cy.visit('localhost:3000')
        })

        it('Renders the elements Correctly',() => {
            //the header should be visible
            cy.get('.mortgage-calculator-header').should('be.visible')
          
            //Mortgage Amount input box is visible
            cy.get('.mortgageAmount').should('be.visible')
            
            //Interest Rate input box is visible
             cy.get('.interestRate').should('be.visible')

              //Amortization period select box is visible
            cy.get('.amortizationPeriod').should('be.visible')

             //Payment Frequency select box is visible
             cy.get('.paymentFrequency').should('be.visible')

              //Term Select box is visible
            cy.get('.term').should('be.visible')

            //Calcualte Button is visible
            cy.get('.calculate-button').should('be.visible')

            //Calculation Summary Table is visible
            cy.get('.calculation-summary').should('be.visible')
        })

        it('Calculates the payments in the table correctly',() => {

            //Fill out all the values in the boxes
            cy.get('.mortgageAmount').type('265000'),
            cy.get('.interestRate').type('4.32'),
            cy.get('.amortization-period').select('15'),
            cy.get('.payment-frequency').select('Monthly'),
            cy.get('.term-select').select('1')
            .then(() => {
                cy.get('.calculate-button')
                .click()

                //Check the values in the Calculation-Summary Table
                cy.get('.term-payments').should('contain', '12')
                cy.get('.amort-payments').should('contain', '180')
                cy.get('.term-mortgage').should('contain', '2002.94')
                cy.get('.amort-mortgage').should('contain', '2002.94')
                cy.get('.term-principal').should('contain', '12839.53')
                cy.get('.amort-principal').should('contain', '265000')
                cy.get('.term-interest').should('contain', '11195.75')
                cy.get('.amort-interest').should('contain', '95529.02')
                cy.get('.term-total-cost').should('contain', '24035.28')
                cy.get('.amort-total-cost').should('contain', '360529.02')

            })
         } )
    })
})