describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'cfaenza',
      password: 'testpass',
      name: 'Ciro Faenza'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.loginForm').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('cfaenza')
      cy.get('#password').type('testpass')
      cy.get('#loginButton').click()
      cy.get('.notification').should('contain', 'Welcome cfaenza')
    })

    it('failed with incorrect credentials', function() {
      cy.get('#username').type('cfaenza')
      cy.get('#password').type('fakepass')
      cy.get('#loginButton').click()
      cy.get('.error').should('contain','Wrong')
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })
})