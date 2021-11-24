import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://newsapi.org/v2/top-headlines?country=de&category=politics&pageSize=100&apiKey=f02e1a6900994374b4a26266442674b1'
  )
  const data = await res.json()
  return {
    props: { data },
  }
}

const Politik: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log(data)

  return (
    <>
      <h1 className="mt-6 mb-4 text-6xl font-bold text-center">Politik News</h1>
      <main className="grid grid-cols-1 justify-center w-full flex-1 px-2 text-center md:grid-cols-3 gap-2 align-top">
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
                className="p-4 bg-gray-200 rounded-xl text-left justify-center max-w-4xl"
              >
                <a
                  href={article.url}
                  className="rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  {article.urlToImage === null ? (
                    <img
                      src="https://via.placeholder.com/800x450"
                      width={500}
                      alt="Placeholder"
                    />
                  ) : (
                    <img
                      className="rounded-lg mx-auto"
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
                  <p className="flex float-left inline-flex mt-6 text-xs underline">
                    {/* display  YYYY-MM-DD */}
                    Datum: {article.publishedAt.toLocaleString().split('T', 1)}
                  </p>
                  <p className="flex float-right inline-flex mt-6 ml-6 text-xs underline">
                    Uhrzeit:
                    {/* display HH:mm */}
                    {article.publishedAt
                      .toLocaleString()
                      .split('T')[1]
                      .slice(0, 5)}
                  </p>
                </a>
              </div>
            )
          }
        )}
      </main>
    </>
  )
}

export default Politik
