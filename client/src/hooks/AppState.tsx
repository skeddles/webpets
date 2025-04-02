import { createContext, useContext, useReducer, FC, ReactNode } from 'react';

type User = {
	_id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
};

type AppState = {
	user: User | 'loading' | 'unregistered';
};

type SetUserAction = {type: 'SET_USER'; user: User};
type Action = SetUserAction;

const stateReducer = (state:AppState, action:Action) => {
	if (action.type === 'SET_USER') {
		return { ...state, user: action.user };
	}
	else {
		throw new Error(`Unhandled action type: ${action.type}`);
	}
};

type StateContext = {
	state: AppState;
	dispatchState: React.Dispatch<Action>;
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

	return context;
};
