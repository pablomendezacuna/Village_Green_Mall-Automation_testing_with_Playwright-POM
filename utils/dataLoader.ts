import * as myMalls from '../fixtures/MyMalls.json';
import * as allCanadianMalls from '../fixtures/AllCanadianMalls.json';

export function getSelectedMalls() {
  const mallIndicesRaw = process.env.MALL_INDICES;

  // Si no hay índices (Local o GH), usamos MyMalls.json
  if (!mallIndicesRaw || mallIndicesRaw.trim() === '') {
    const defaultMalls = (myMalls as any).default || myMalls;
    return Array.isArray(defaultMalls) ? defaultMalls : Object.values(defaultMalls);
  }

  // Si hay índices, usamos AllCanadianMalls.json
  const indices = mallIndicesRaw.split(',').map(i => parseInt(i.trim()));
  const allMallsArray = (allCanadianMalls as any).default || allCanadianMalls;
  const finalArray = Array.isArray(allMallsArray) ? allMallsArray : Object.values(allMallsArray);

  return indices
    .map(index => finalArray[index])
    .filter(mall => mall !== undefined && mall.url);
}

export function getQueries() {
  const queriesRaw = process.env.QUERIES;
  if (!queriesRaw || queriesRaw.trim() === '') return ['shoes']; 
  return queriesRaw.split(',').map(q => q.trim());
}