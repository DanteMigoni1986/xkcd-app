import { Layout } from '@/components/Layout'
import Head from 'next/head'
import { search } from 'services/search.js'
import Link from 'next/link';
import Image from 'next/image';

export default function Component ({query, results}) {
    return (
        <>
            <Head>
                <title>xkcd - Results for {query}</title>
                <meta name="description" content={`Search results for ${query}`} />
            </Head>

            <Layout>
                <h1>Resultados para {query}</h1>
                {
                    results.map(result => {
                        return (
                            <Link href={`/comic/${result.id}`} key={result.id} className='flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50'>
                                <Image width='50' height='50' src={result.img} alt={result.alt} className='rounded-full'/>
                                <div>
                                    <h2>{result.title}</h2>
                                </div>
                            </Link>
                        )
                    })
                }
            </Layout>
        </>
    )
}

export async function getServerSideProps (context) {
    const { query } = context
    const { q = '' } = query

    // fetch('https://external-host.com')  ✅
    // fetch('https://mismo-host-o-localhost.com')  ❌
    
    const { results } = await search({query: q})

    return {
        props: {
            query: q,
            results
        }
    }
}