import { useAppState } from './AppState';
import { executeApiRequest } from '../util/apiUtils';

type ApiRequest = (path: string, body?: object) => Promise<any>;

export default function useApiRequest(): ApiRequest {
    const appState = useAppState();
    const token = appState.state.token;

    return async (path: string, body?: object) => {
        if (!token) throw new Error('User token not found. Cannot make API request.');
        return executeApiRequest(path, body);
    };
}
