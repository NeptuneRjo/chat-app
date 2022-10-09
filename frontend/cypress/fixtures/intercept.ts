export const intercept = (url: string, fixtureName: string) => {
	cy.intercept(url, { fixture: fixtureName })
}
