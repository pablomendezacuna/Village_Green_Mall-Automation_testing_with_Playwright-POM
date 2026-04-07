import * as myMalls from '../fixtures/MyMalls.json';
import * as allCanadianMalls from '../fixtures/AllCanadianMalls.json';

/**
 * Decide qué malls usar basado en la variable de entorno MALL_INDICES.
 * Si está vacía, usa MyMalls.json (Default).
 * Si tiene números (ej: "0,2"), usa AllCanadianMalls.json filtrado por índice.
 */
export function getSelectedMalls() {
    const mallIndicesRaw = process.env.MALL_INDICES;

    // Caso por defecto: No hay índices definidos, usamos MyMalls.json
    if (!mallIndicesRaw || mallIndicesRaw.trim() === '') {
        const malls = (myMalls as any).default || myMalls;
        return Array.isArray(malls) ? malls : Object.values(malls).filter(m => typeof m === 'object');
    }

    // Caso con índices: Filtramos la lista AllCanadianMalls.json
    const indices = mallIndicesRaw.split(',').map(i => parseInt(i.trim()));
    
    // Forzamos que la importación se trate como un Array plano
    const allMallsArray = (allCanadianMalls as any).default || allCanadianMalls;
    const finalArray = Array.isArray(allMallsArray) 
        ? allMallsArray 
        : Object.values(allMallsArray).filter(m => typeof m === 'object');

    return indices
        .map(index => finalArray[index])
        .filter(mall => mall !== undefined); // Seguridad: ignora índices fuera de rango
}

/**
 * Obtiene las queries desde la variable de entorno QUERIES separadas por coma.
 */
export function getQueries() {
    const queriesRaw = process.env.QUERIES;
    if (!queriesRaw || queriesRaw.trim() === '') return ['shoes']; 
    return queriesRaw.split(',').map(q => q.trim());
}