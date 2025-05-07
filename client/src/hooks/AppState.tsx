import { createContext, useContext, useReducer, FC, ReactNode } from 'react';

type AppState = {
	user: User | 'loading' | 'unregistered';
	token: string | null;
	lessons: Lesson[] | null;
	completedLessons: string[] | null;
	shoppingCart: ProductInCart[];
};

type SetUserAction = {type: 'SET_USER'; user: User};
type SetUnauthenticatedAction = {type: 'SET_UNAUTHENTICATED'};
type SetToken = {type: 'SET_TOKEN'; token: string};
type SetLessons = {type: 'SET_LESSONS'; lessons: Lesson[]; completedLessons: string[] | null};
type ClearShoppingCart = {type: 'CLEAR_SHOPPING_CART'};
type Action = SetUserAction | SetUnauthenticatedAction | SetToken | SetLessons | ClearShoppingCart;


type StateContext = {
	state: AppState;
	dispatchState: React.Dispatch<Action>;
};

type UseStateReturnType = {
	state: {
		user: User, 
		token: string, 
		lessons: Lesson[] | null,
		completedLessons: string[] | null,
		shoppingCart: ProductInCart[],
	};
	dispatchState: (action: Action) => void, 
}

const stateReducer = (state: AppState, action: Action): AppState => {
	if (action.type === 'SET_USER') 
		return { ...state, user: action.user };
	if (action.type === 'SET_UNAUTHENTICATED')
		return { ...state, user: 'unregistered' };
	if (action.type === 'SET_TOKEN') 
		return { ...state, token: action.token };
	if (action.type === 'SET_LESSONS')
		return { ...state, lessons: action.lessons, completedLessons: action.completedLessons };
	if (action.type === 'CLEAR_SHOPPING_CART')
		return { ...state, shoppingCart: [] };

		
	throw new Error(`Unhandled action type: ${(action as Action).type}`);
};

const initialState: AppState = {
	user: 'loading',
	token: null,
	lessons: null,
	completedLessons: null,
	shoppingCart: [
		{
			id: '68129d14aa680c4fc357ac3b',
			type: 'lesson',
			price: 499,
		}
	],
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
