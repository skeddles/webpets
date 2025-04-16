import { createContext, useContext, useReducer, FC, ReactNode } from 'react';

type AppState = {
	user: User | 'loading' | 'unregistered';
	token: string | null;
};

type SetUserAction = {type: 'SET_USER'; user: User};
type SetUnauthenticatedAction = {type: 'SET_UNAUTHENTICATED'};
type SetToken = {type: 'SET_TOKEN'; token: string};
type Action = SetUserAction | SetUnauthenticatedAction | SetToken;


type StateContext = {
	state: AppState;
	dispatchState: React.Dispatch<Action>;
};

type UseStateReturnType = {
	state: {user: User, token: string};
	dispatchState: (action: Action) => void, 
}

const stateReducer = (state: AppState, action: Action): AppState => {
	if (action.type === 'SET_USER') 
		return { ...state, user: action.user };
	if (action.type === 'SET_UNAUTHENTICATED')
		return { ...state, user: 'unregistered' };
	if (action.type === 'SET_TOKEN') 
		return { ...state, token: action.token };
	throw new Error(`Unhandled action type: ${(action as Action).type}`);
};

const initialState: AppState = {
	user: 'loading',
	token: null,
};

export const AppStateContext = createContext<StateContext>({
	state: initialState,
	dispatchState: () => undefined,
});

export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [appState, dispatchState] = useReducer(stateReducer, initialState);

	const contextValue = { 
		state: appState,
		dispatchState 
	};

	return (
		<AppStateContext.Provider value={contextValue}>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = () => {
	const context = useContext(AppStateContext);

	if (context === undefined) throw new Error('useAppState must be used within an StateProvider');
	if (context.state.user === 'loading') throw new Error('User not loaded yet');
	if (context.state.user === 'unregistered') throw new Error('User is unregistered');

	return context as UseStateReturnType;
};
