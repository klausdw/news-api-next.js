import NavHeader from '../components/NavHeader'
import { GetServerSideProps, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://newsapi.org/v2/top-headlines?country=de&category=sports&pageSize=100&apiKey=f02e1a6900994374b4a26266442674b1'
  )
  const data = await res.json()
  return {
    props: { data },
  }
}

const Sport: NextPage = ({ data }: any) => {
  // console.log(data);

  return (
    <>
      <NavHeader />
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="mt-6 text-6xl font-bold">Sport News</h1>
        <div className="flex grid grid-cols-1 gap-x-6 max-w-4xl md:grid-cols-2 w-full">
          {data.articles.map(
            (article: {
              id: number | null | undefined
              title: string
              description: string
              url: string
              urlToImage: string
              source: {
                name: string
              }
              publishedAt(): Date
            }) => {
              return (
                <div
                  key={article.id}
                  className="flex flex-wrap max-w-4xl mt-6 sm:w-full"
                >
                  <a
                    href={article.url}
                    className="p-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600"
                  >
                    {article.urlToImage === null ? (
                      <img
                        src="https://via.placeholder.com/800x450"
                        width={500}
                        alt="Placeholder"
                      />
                    ) : (
                      <img
                        className="rounded-lg"
                        src={article.urlToImage}
                        width={500}
                        height={500}
                        alt={article.description}
                      />
                    )}
                    <p className="mt-2 text-xs underline">
                      Quelle: {article.source.name}
                    </p>
                    <h3 className="mt-6 text-2xl font-bold">{article.title}</h3>
                    <p className="mt-4"> {article.description} </p>
                    <div className="flex inline-flex">
                      <p className="mt-6 text-xs underline">
                        Datum:
                        {article.publishedAt.toLocaleString().split('T', 1)}
                      </p>
                      <p className="mt-6 flex-shrink w-44"></p>
                      <p className="mt-6 ml-6 text-xs underline">
                        Uhrzeit:
                        {article.publishedAt
                          .toLocaleString()
                          .split('T')[1]
                          .slice(0, 5)}
                      </p>
                    </div>
                  </a>
                </div>
              )
            }
          )}
        </div>
      </div>
    </>
  )
}

export default Sport
