import { setupServer } from 'msw/node'
import { DefaultRequestBody, rest } from 'msw'

import { render, screen } from '@testing-library/react'
import { Artikel } from '../../models/Artikel'
import Home from '../../pages';
import React from 'react';


// const server = setupServer(rest.get<DefaultRequestBody, Artikel[]>('https://newsapi.org/v2/top-headlines?country=de&pageSize=100&apiKey=f02e1a6900994374b4a26266442674b1', (req, res, ctx) => {
const server = setupServer(rest.get<DefaultRequestBody, Artikel[]>('https://newsapi.org/v2/top-headlines', (req, res, ctx) => {

    const query = req.url.searchParams
    const country = query.get("country")
    const pageSize = query.get("pageSize")
    const apiKey = query.get("apiKey")
    return res(
        // ctx.delay(100),
        ctx.json([
            {
                id: 0,
                source: { name: 'merkur.de' },
                title: 'Ärzte befürchten Anstieg einer Volkskrankheit durch Corona-Maßnahmen - Merkur Online',
                description: 'Covid-19 ist nicht nur eine potenziell gefährliche Krankheit: auch die mit der Pandemie einhergehenden Maßnahmen bergen Schattenseiten.',
                url: 'https://www.merkur.de/leben/gesundheit/corona-diabetes-aerzte-befuerchten-anstieg-der-volkskrankheit-91134524.html',
                urlToImage: 'https://www.merkur.de/bilder/2021/11/23/91134524/27559452-zwei-kinder-sitzen-vor-dem-tv-2Pef.jpg',
                publishedAt: '2021-11-24T08:28:00Z',
            }
        ]))
}))

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('renders after the application is loaded', () => {
    beforeEach(async () => {
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
    it('renders the newly loaded data', () => {
        expect(screen.getByText('Ärzte befürchten Anstieg einer Volkskrankheit durch Corona-Maßnahmen - Merkur Online')).toBeInTheDocument()
    })
})
