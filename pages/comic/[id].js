import Head from "next/head"
import Image from 'next/image'
import { readFile, stat } from 'fs/promises'
import Link from 'next/link'
import * as fs from 'fs/promises';
import { basename } from 'path'
import { Layout } from "@/components/Layout"

export default function Comic({id, img, alt, title, width, height, nextId, prevId, hasNext, hasPrevious}) {
    return (
        <>
            <Head>
                <title>xkcd - Comics for developers</title>
                <meta name="description" content="Comics for developers" />
            </Head>

            <Layout>
                <section className="max-w-lg m-auto">
                    <h1 className="font-bold text-xl text-center mb-4">{title}</h1>
                    <div className="max-w-xs m-auto mb-4">
                        <Image 
                            layout='responsive' 
                            width={width} 
                            height={height} 
                            src={img} 
                            alt={alt}
                        />
                    </div>
                    <p>{alt}</p>
                    <div className="flex justify-between mt-4 font-bold">
                        {
                            hasPrevious && <Link href='/comic/[id]' as={`/comic/${prevId}`} className="text-gray-500">
                                ⬅️ Previous
                            </Link>
                        }
                        {
                            hasNext && <Link href='/comic/[id]' as={`/comic/${nextId}`} className="text-gray-500">
                                Next ➡️
                            </Link>
                        }
                    </div>
                </section>
            </Layout>
        </>
    )
}

export async function getStaticPaths () {
    const files = await fs.readdir('./comics')

    const paths = files.map(file => {
        const id = basename(file, '.json')
        return { params: { id }}
    }) 

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { id } = params
    const content = await readFile(`./comics/${id}.json`, 'utf8')
    const comic = JSON.parse(content)
    console.log(comic)

    const idNumber = +id
    const prevId = idNumber - 1
    const nextId = idNumber + 1

    const [prevResult, nextResult] = await Promise.allSettled([
        stat(`./comics/${prevId}.json`),
        stat(`./comics/${nextId}.json`),
    ])

    const hasPrevious = prevResult.status === 'fulfilled'
    const hasNext = nextResult.status === 'fulfilled'
  
    return {
      props: {
        ...comic,
        hasPrevious,
        hasNext,
        nextId,
        prevId
      }
    }
  }