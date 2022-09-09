import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import Blog from './Blog';

test('renders blog title and author only by default', () => {
    const blog = {
        title: 'node js is wild',
        author: 'william',
        url: 'www.bloglist.com/user/123',
        likes: 2000,
    };

    const { container } = render(<Blog blog={blog} />);

    const element = screen.findByText('node js is wild');

    const div = container.querySelector('.visibleDiv');

    expect(element).toBeDefined();
    expect(div).toHaveStyle('display: none');
});

describe('testing note buttons', () => {
    let container, blog, addLikes;

    beforeEach(() => {
        blog = {
            title: 'node js is wild',
            author: 'william',
            url: 'www.bloglist.com/user/123',
            likes: 2000,
        };

        addLikes = jest.fn();

        container = render(<Blog blog={blog} addLikes={addLikes} />).container;
    });
    const user = userEvent.setup();
    test('when show button is clicked url and likes are shown', async () => {
        const showButton = container.querySelector('.toggleButton');
        await user.click(showButton);

        const div = container.querySelector('.visibleDiv');

        expect(div).not.toHaveStyle('display: none');
    });

    test('when clicked like twice the event handler should run twice', async () => {
        const likeButton = container.querySelector('.likeButton');
        await user.click(likeButton);
        await user.click(likeButton);

        expect(addLikes.mock.calls.length).toBe(2);
    });
});
