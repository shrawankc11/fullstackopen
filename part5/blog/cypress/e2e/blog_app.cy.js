describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        cy.request('POST', 'http://localhost:3001/api/users/register', {
            username: 'testuser',
            password: 'test',
        });
        cy.visit('http://localhost:3000');
    });

    it('login form is shown', function () {
        cy.contains('log in to application');
    });

    const title = 'node js is a wild piece of software';
    const author = 'john doe';
    const url = 'www.bloglist.com/user/123';

    // describe('Login', function () {
    //     // it('succeeds with correct credentials', function () {
    //     //     cy.login({ username: 'testuser', password: 'test' });
    //     // });

    //     it('fails with wrong credentials', function () {
    //         cy.login({ username: 'testuser', password: 'wrong' });
    //         cy.get('.error')
    //             .should('contain', 'invalid username or password!')
    //             .and('have.css', 'color', 'rgb(255, 0, 0)');
    //     });
    // });
    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'testuser', password: 'test' });
        });

        it('a blog can be added', function () {
            cy.createBlog(title, url, author);

            cy.contains('node js is a wild piece of software : john doe');
        });

        it('a blog can be liked', function () {
            cy.createBlog(title, url, author);
            cy.get('.toggleButton').click();
            cy.get('.likeButton').click();
        });

        it('a blog can be deleted by the user who created it', function () {
            cy.createBlog(title, url, author);
            cy.get('.toggleButton').click();
            cy.get('.deleteButton').click();
            cy.on('window:confirm', () => true);
            cy.get('html').should(
                'not.contain',
                'node js is a wild piece of software : john doe'
            );
        });

        it.only('blogs are orderd with the most liked blog at the top', function () {
            cy.createBlog(title, url, author);
            cy.createBlog(
                'react js is wild',
                'www.bloglist.com/user/345',
                'picaso'
            );
            cy.createBlog(title, url, author);
            cy.get('.blog')
                .eq(0)
                .contains('node js is a wild piece of software');
            cy.get('.blog').eq(1).as('secondBlog').contains('show').click();
            cy.get('@secondBlog').contains('like').as('likeButton2');
            cy.get('@likeButton2').click();
            cy.get('@likeButton2').click();
            cy.get('@likeButton2').click();
            cy.get('.blog')
                .eq(0)
                .contains('node js is a wild piece of software');
        });
    });
});
