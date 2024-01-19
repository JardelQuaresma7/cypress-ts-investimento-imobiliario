describe('verificando textos da redefinição de senha', () => {
  beforeEach(() => {
    cy.visit({
      url: 'http://localhost:3001/auth/reset-password?cod=TOKEN_DE_TESTE', // <== sempre trocar token
      headers: { 'accept-language': 'pt' },
    })
  })

  it('Testando digitar no input Senha', () => {
    const senha = 'MinhaSenha123@'

    cy.get('#password').type(senha).should('have.value', senha)
  })
  it('Testando digitar no input Confirmar Senha', () => {
    const senha = Cypress.env('user_password')

    cy.get('#confirmPassword').type(senha).should('have.value', senha)
  })

  it('Testando enviar senha sem atender os requisitos', () => {
    cy.get('#password').type('123').should('have.value', '123')
    cy.get('#confirmPassword').type('123').should('have.value', '123')
    cy.get('.h-9').click()
  })

  it('testando enviar senha sem coincidir e verificando a msg do input', () => {
    cy.get('#password')
      .type('MinhaSenha123@')
      .should('have.value', 'MinhaSenha123@')
    cy.get('#confirmPassword')
      .type('MinhaSenha123')
      .should('have.value', 'MinhaSenha123')
    cy.get('.h-9').click()
    cy.contains('A senha deve ser forte e atender aos requisitos')
  })

  it('Testando show/hide password', () => {
    cy.get('#password').type('MinhaSenha123@')
    cy.get(':nth-child(1) > .relative > .absolute > img').click().click()
    cy.get('#confirmPassword').type('MinhaSenha123@')
    cy.get(':nth-child(2) > .relative > .absolute > img').click().click()
  })

  it('Testando redefinir senha com credenciais válidas', () => {
    const senha = Cypress.env('user_password')

    cy.get('#password').type(senha).should('have.value', senha)
    cy.get('#confirmPassword').type(senha).should('have.value', senha)
    cy.get('.h-9').click()
    cy.contains('Sua senha foi alterada com sucesso!')
  })
})
