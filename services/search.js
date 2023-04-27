import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('M5D0L8LFSW', 'aabadd952de36b38309ad62dae4d5a5c');
const index = client.initIndex('prod_comics');

const CACHE = {}

export const search = async({query}) => {
    if (CACHE[query]) {
        return {results: CACHE[query]}
    }

    const { hits } = await index.search(query, {
        attributesToRetrieve: ['id', 'title', 'img', 'alt'],
        hitsPerPage: 10
    })

    CACHE[query] = hits

    return {
        results: hits
    }
}