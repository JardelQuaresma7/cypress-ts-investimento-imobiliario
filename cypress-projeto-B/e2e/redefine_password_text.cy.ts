describe('verificando textos da redefinição de senha', () => {
  beforeEach(() => {
    cy.visit({
      url: 'http://localhost:3000/auth/reset-password?cod=TOKEN_DE_TESTE', // <== change this ever
      headers: { 'accept-language': 'pt' },
    })
    cy.fecharCookie()
  })
  it('verificando textos da redefinição de senha', () => {
    cy.verificarTextosPaginaRedefinirSenha()
  })
})
