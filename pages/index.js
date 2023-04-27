import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import * as fs from 'node:fs/promises';
import Link from 'next/link'
import { Layout } from '@/components/Layout.js';

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
          <h2 className='text-3xl font-bold text-center mb-10'>Latest comics</h2>
          <section className='columns-1 gap-2 max-w-md m-auto sm:columns-2 md:columns-3'>
            {
              latestComics.map(comic => {
                return (
                  <Link href={`/comic/${comic.id}`} key={comic.id} className='mb-4 pb-4 m-auto'>
                    <h3 className='font-bold text-sm text-center pb-2'>{comic.title}</h3>
                    <Image className='aspect-square' width={comic.width} height={comic.height} src={comic.img} alt={comic.alt} />
                  </Link>
                )
              })
            }
          </section>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-70, files.length)
  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}
