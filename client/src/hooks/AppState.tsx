import { createContext, useContext, useReducer, FC, ReactNode } from 'react';

type AppState = {
	user: ClientUser | 'loading' | 'unregistered';
};

type SetUserAction = {type: 'SET_USER'; user: ClientUser};
type SetUnauthenticatedAction = {type: 'SET_UNAUTHENTICATED'};
type Action = SetUserAction | SetUnauthenticatedAction;


type StateContext = {
	state: AppState;
	dispatchState: React.Dispatch<Action>;
};

type UseStateReturnType = {
	state: {user: ClientUser};
	dispatchState: (action: Action) => void, 
}

const stateReducer = (state: AppState, action: Action): AppState => {
	if (action.type === 'SET_USER') {
		return { ...state, user: action.user };
	}
	if (action.type === 'SET_UNAUTHENTICATED') {
		return { ...state, user: 'unregistered' };
	}
	throw new Error(`Unhandled action type: ${(action as Action).type}`);
};


export const AppStateContext = createContext<StateContext>({
	state: { user: 'loading' },
	dispatchState: () => undefined,
});

export const AppStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [appState, dispatchState] = useReducer(stateReducer, {user: 'loading'});

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
