import type { NextPage } from 'next'
import type { GetServerSideProps } from 'next'

import Head from 'next/head'
import React from 'react'
import NavHeader from '../components/NavHeader'


/**
 * @author kdw
 * @param SSR for the news API 
 * pageSize=100 for more results, by default: 20 [results]
 */

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const res = await fetch(
    'https://newsapi.org/v2/top-headlines?country=de&pageSize=100&apiKey=f02e1a6900994374b4a26266442674b1'
  )
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { data: data.articles },
  }
}

interface Props {
  data: [
    {
      id: number
      title: string
      description: string
      url: string
      urlToImage: string
      source: {
        name: string
      }
      name: string
      publishedAt(): Date
    }
  ]
}

const Home: NextPage<Props> = ({ data }: Props) => {
  // console.log(data);

  return (
    <>
      <Head>
        <title>Deutschland top news !!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader />
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="mt-6 text-6xl font-bold">Deutschland News </h1>
        <div className="flex grid grid-cols-1 gap-x-6 max-w-4xl md:grid-cols-2 w-full">
          {/* map data */}
          {data.map(
            ({
              id,
              title,
              description,
              url,
              urlToImage,
              source,
              publishedAt,
            }) => (
              <div key={id} className="flex flex-wrap max-w-4xl mt-6 sm:w-full">
                <a
                  href={url}
                  className="p-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  {/* if data = null || undefined, show the placeholder image */}
                  {urlToImage === null ? (
                    <img
                      src="https://via.placeholder.com/800x450"
                      width={500}
                      alt="Placeholder"
                    />
                  ) : (
                    <img
                      className="rounded-lg"
                      src={urlToImage}
                      width={500}
                      height={500}
                      alt={description}
                    />
                  )}
                  <p className="mt-2 text-xs underline">
                    Quelle: {source.name}
                  </p>
                  <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                  <p className="mt-4"> {description} </p>
                  <div className="flex inline-flex">
                    <p className="mt-6 text-xs underline">
                      {/* display  YYYY-MM-DD */}
                      Datum: {publishedAt.toLocaleString().split('T', 1)}
                    </p>
                    <p className="mt-6 flex-shrink w-44"></p>
                    <p className="mt-6 ml-6 text-xs underline">
                      Uhrzeit:
                      {/* display HH:mm */}
                      {publishedAt.toLocaleString().split('T')[1].slice(0, 5)}
                    </p>
                  </div>
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Home
