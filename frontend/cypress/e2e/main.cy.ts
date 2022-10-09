import { cli } from 'cypress'
import { intercept } from '../fixtures/intercept'

describe('Main', () => {
	beforeEach(() => {
		intercept('/chat/room-1', 'room.json')
		intercept('/chat/room-2', 'room.json')
		intercept('/chat/room-3', 'room.json')
	})

	it('renders the main page with intercepted data', async () => {
		cy.visit('http://localhost:3000/')
	})

	describe('Navbar', () => {
		describe('Title', () => {
			it('displays the title', () => {
				cy.visit('http://localhost:3000/')
				cy.get('a.navbar-brand').should('be.visible').contains('Harmony')
			})

			it('the title has the correct href', () => {
				cy.visit('http://localhost:3000/')
				cy.get('a.navbar-brand')
					.invoke('attr', 'href')
					.should('eq', '#/chat/room-1')
			})

			it('the title takes you to the correct page', () => {
				cy.visit('http://localhost:3000/')
				cy.get('a.navbar-brand').click()
				cy.url().should('include', '#/chat/room-1')
			})
		})

		describe('Rooms list', () => {
			it('the drop down list is visible when it is toggled', () => {
				cy.visit('http://localhost:3000/')
				cy.get('.nav-item.dropdown').should('be.visible').click()
				cy.get('.nav-item.dropdown > .dropdown-menu').should('be.visible')
			})

			it('each dropdown link takes you to the correct page', () => {
				cy.visit('http://localhost:3000')

				// Routes to Room-1
				cy.get('.nav-item.dropdown').should('be.visible').click()
				cy.get('.nav-item.dropdown > .dropdown-menu > .dropdown-item')
					.eq(0)
					.click()
				cy.url().should('include', '#/chat/room-1')

				// Routes to Room-2
				cy.get('.nav-item.dropdown').should('be.visible').click()
				cy.get('.nav-item.dropdown > .dropdown-menu > .dropdown-item')
					.eq(1)
					.click()
				cy.url().should('include', '#/chat/room-2')

				// Routes to Room-3
				cy.get('.nav-item.dropdown').should('be.visible').click()
				cy.get('.nav-item.dropdown > .dropdown-menu > .dropdown-item')
					.eq(2)
					.click()
				cy.url().should('include', '#/chat/room-3')
			})

			it('the sign in button contains the correct path', () => {
				cy.get('.navbar-nav > .nav-link')
					.should('be.visible')
					.invoke('attr', 'href')
					.should('eq', 'http://localhost:4000/auth/google')
			})
		})
	})

	describe('Room', () => {
		describe('Room titles', () => {
			it('should show room 1 for title', () => {
				cy.get('.nav-item.dropdown').should('be.visible').click()
				cy.get('.nav-item.dropdown > .dropdown-menu > .dropdown-item')
					.eq(0)
					.click()
				cy.get('#room-main > h3.p-2')
					.should('be.visible')
					.contains('Chat Room 1')
			})

			it('should show room 2 for title', () => {
				cy.get('.nav-item.dropdown').should('be.visible').click()
				cy.get('.nav-item.dropdown > .dropdown-menu > .dropdown-item')
					.eq(1)
					.click()
				cy.get('#room-main > h3.p-2')
					.should('be.visible')
					.contains('Chat Room 2')
			})

			it('should show room 3 for title', () => {
				cy.get('.nav-item.dropdown').should('be.visible').click()
				cy.get('.nav-item.dropdown > .dropdown-menu > .dropdown-item')
					.eq(2)
					.click()
				cy.get('#room-main > h3.p-2')
					.should('be.visible')
					.contains('Chat Room 3')
			})
		})

		describe('Chat box', () => {
			describe('Message', () => {
				it('should display the message in the incoming column', () => {
					cy.get('#chat-incoming > .card')
						.should('be.visible')
						.get('p#message-content')
						.should('be.visible')
				})

				it('should NOT display the message in the outgoing column', () => {
					cy.get('#chat-outgoing > .card')
						.should('not.exist')
						.get('#chat-outgoing > .card > p#message-content')
						.should('not.exist')
				})
			})

			describe('Text box', () => {
				it('should be disabled', () => {
					cy.get('textarea#chat-input').should('be.disabled')
					cy.get('button.btn.btn-primary').should('be.disabled')
				})
			})
		})
	})
})
