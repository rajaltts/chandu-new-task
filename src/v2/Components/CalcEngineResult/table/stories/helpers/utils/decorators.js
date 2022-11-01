import React from 'react'

export const createScrollDecorator = (Story) => (
    <div style={{ border: '1px solid black', height: '400px' }}>{Story()}</div>
)
