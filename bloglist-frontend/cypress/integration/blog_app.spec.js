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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'cfaenza', password: 'testpass'})
    })

    it('A blog can be created', function() {
      cy.contains('create post').click()
      cy.get('#title').type('titolo e2e')
      cy.get('#author').type('cfaenza')
      cy.get('#url').type('http://e2etesturl.com')
      cy.get('.createForm').contains('create').click()
      cy.get('body').contains('titolo e2e').should('be.visible')
    })
  })

  describe('And there is a post', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'mlenders',
        password: 'testpass2',
        name: 'Mark Lenders'
      })
      cy.login({ username: 'cfaenza', password: 'testpass' })
      cy.createPost({ title: 'titolo', author: 'autore', url: 'url' })
    })

    it('a like can be added', function() {
      cy.contains('show').click()
      cy.contains('like').click()
      cy.get('body').contains('likes 1').should('be.visible')
    })

    it('the user who added it can delete it', function() {
      cy.contains('show').click()
      cy.contains('delete').should('be.visible').click()
      cy.get('body').should('not.contain','titolo autore')
    })

    it.only('other users cannot delete it', function() {
      cy.contains('logout').click()
      cy.login({ username: 'mlenders', password: 'testpass2' })
      cy.get('html').should('contain', 'titolo autore')
      cy.contains('show').click()
      cy.contains('delete').should('not.be.visible')
    })
  })
})