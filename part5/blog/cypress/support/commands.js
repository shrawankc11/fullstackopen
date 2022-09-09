// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', ({ username, password }) => {
    // cy.get('#username').type(username);
    // cy.get('#password').type(password);
    // cy.get('#button-login').click();
    cy.request({
        url: 'http://localhost:3001/api/users/login',
        method: 'POST',
        body: { username, password },
    }).then((response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body));
    });
    cy.visit('http://localhost:3000');
});

Cypress.Commands.add('createBlog', (title, url, author) => {
    cy.contains('add Blog').click();
    cy.get('#title').type(title);
    cy.get('#url').type(url);
    cy.get('#author').type(author);

    cy.get('#button-create').click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
