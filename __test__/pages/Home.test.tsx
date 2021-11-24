import React from 'react';
import { render, screen } from '@testing-library/react'
import Home from '../../pages';

describe('Search component', () => {
    describe('index page render one news', () => {

        beforeEach(() => {
            render(<Home data={[
                {
                    id: 0,
                    source: { name: 'merkur.de' },
                    title: 'Ärzte befürchten Anstieg einer Volkskrankheit durch Corona-Maßnahmen - Merkur Online',
                    description: 'Covid-19 ist nicht nur eine potenziell gefährliche Krankheit: auch die mit der Pandemie einhergehenden Maßnahmen bergen Schattenseiten.',
                    url: 'https://www.merkur.de/leben/gesundheit/corona-diabetes-aerzte-befuerchten-anstieg-der-volkskrankheit-91134524.html',
                    urlToImage: 'https://www.merkur.de/bilder/2021/11/23/91134524/27559452-zwei-kinder-sitzen-vor-dem-tv-2Pef.jpg',
                    publishedAt: '2021-11-24T08:28:00Z',
                }
            ]} />)
        })
        it('find title', () => {
            expect(screen.getByText(/Ärzte befürchten Anstieg einer Volkskrankheit durch Corona-Maßnahmen - Merkur Online/i)).toBeInTheDocument()
        })
        it('find time', () => {
            expect(screen.getByText(/08:28/i)).toBeInTheDocument()
        })
    })
})