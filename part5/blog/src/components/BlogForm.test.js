import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import BlogForm from './BlogForm';

test('a blog can be created', async () => {
    const addBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={addBlog} />);

    const input = screen.getByPlaceholderText('enter a title...');
    const sendButton = screen.getByText('create');

    await user.type(input, 'adding a Blog...');
    await user.click(sendButton);

    expect(addBlog.mock.calls.length).toBe(1);
    expect(addBlog.mock.calls[0][0].title).toBe('adding a Blog...');
});
