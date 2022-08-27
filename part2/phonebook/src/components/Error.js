import React from 'react'

export default function Error({ message }) {
    return (message && <div className='error'>{message}</div>)
}
