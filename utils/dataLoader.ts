import * as myMalls from '../fixtures/MyMalls.json';
import * as allCanadianMalls from '../fixtures/AllCanadianMalls.json';
import * as dataQueries from '../fixtures/Queries.json';

export function getMallsToTest() {
    const indicesRaw = process.env.MALL_INDICES;
    
    // Si no hay índices, devolvemos la lista por defecto (MyMalls.json)
    if (!indicesRaw || indicesRaw.trim() === '') {
        const malls = (myMalls as any).default || myMalls;
        return Array.isArray(malls) ? malls : Object.values(malls);
    }

    // Si hay índices, filtramos AllCanadianMalls.json
    const indices = indicesRaw.split(',').map(i => parseInt(i.trim()));
    const allMalls = (allCanadianMalls as any).default || allCanadianMalls;
    const allMallsArray = Array.isArray(allMalls) ? allMalls : Object.values(allMalls);

    return indices
        .map(index => allMallsArray[index])
        .filter(mall => mall !== undefined);
}

export function getQueriesToTest() {
    const manualQueriesEnv = process.env.MANUAL_QUERIES;
    if (manualQueriesEnv && manualQueriesEnv.trim() !== '') {
        return manualQueriesEnv.split(',').map(q => ({ term: q.trim() }));
    }
    const defaultQueries = (dataQueries as any).default || dataQueries;
    return defaultQueries;
}