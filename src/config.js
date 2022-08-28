import { PATH_DASHBOARD } from './routes/paths';

export const apiUrl = process.env.NODE_ENV === 'production' ? "https://api.muhammadsumon.me" : "http://localhost:5050";
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.analytics; // as '/dashboard/analytics'