import { get, post } from '../utils/http';
export const getDir = (params?:any) => get('/dir',params);