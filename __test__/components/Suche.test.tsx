import React from 'react';
import Suche from '../../components/Suche'
import { render, screen } from '@testing-library/react'

describe('Search component', () => {
    describe('initialize the search component and look some values', () => {
        beforeEach(async () => {
            render(<Suche />)
        })
        it('search field', () => {
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })
        it('search field icon', () => {
            expect(screen.getByText(/🔎/i)).toBeInTheDocument()
        })
        it('find text', () => {
            expect(screen.queryByPlaceholderText(/durchsuchen ... 🎯 /i))
        })
    })
})