import { createContext, useReducer } from "react";


type AuthProviderProps = {
    children: React.ReactNode;
}
export interface AuthContextProps {
    authState: AUTH_STATE;
    showLoginForm: boolean;
}


export const enum AUTH_STATE {
    LOGGED_OUT,
    PENDING,
    LOGGED_IN,
}

const initAuthState: AUTH_STATE = AUTH_STATE.LOGGED_OUT

const initialAuthStat: AuthContextProps = {
    authState: initAuthState,
    showLoginForm: false
}

const enum AUTH_ACTION {
    LOGIN,
    LOGOUT,
    PENDING,
    SHOW_LOGIN_FORM,
    CLOSE_LOGIN_FORM
}

interface ActionType {
    type: AUTH_ACTION
}

const reducer = (state: AuthContextProps, action: ActionType): AuthContextProps => {
    switch(action.type) {
        case AUTH_ACTION.LOGIN:
            return {
                ...state,
                authState: AUTH_STATE.LOGGED_IN
            }
        case AUTH_ACTION.LOGOUT:
            return {
                ...state,
                authState: AUTH_STATE.LOGGED_OUT
            }
        case AUTH_ACTION.PENDING:
            return {
                ...state,
                authState: AUTH_STATE.PENDING
            }
        case AUTH_ACTION.SHOW_LOGIN_FORM:
            return {
                ...state,
                showLoginForm: true
            }
        case AUTH_ACTION.CLOSE_LOGIN_FORM:
            return {
                ...state,
                showLoginForm: false
            }
        default:
            throw new Error('NO TYPE KNOWN')
    }
}


const useAuthContext = (initState: AuthContextProps) => {
    const [state, dispatch] = useReducer(reducer, initState)
    const login = () =>  {
        dispatch({ type: AUTH_ACTION.PENDING })
        setTimeout(() => {
            dispatch({ type: AUTH_ACTION.LOGIN })
            dispatch({ type: AUTH_ACTION.CLOSE_LOGIN_FORM })
        }, 1000)
    }
    const logout = () =>  dispatch({ type: AUTH_ACTION.LOGOUT })
    const setShowingForm = () => dispatch({ type:  AUTH_ACTION.SHOW_LOGIN_FORM})
    const closeShowingForm = () => dispatch({ type:  AUTH_ACTION.CLOSE_LOGIN_FORM})

    return {
        authState: state.authState,
        showLoginForm: state.showLoginForm,
        login,
        logout,
        setShowingForm,
        closeShowingForm
    }
}

type UseAuthContext = ReturnType<typeof useAuthContext>

const initContextState: UseAuthContext = {
    authState: initialAuthStat.authState,
    showLoginForm: initialAuthStat.showLoginForm,
    login: () => {return},
    logout: () => {return},
    setShowingForm: () => {return},
    closeShowingForm: () => {return},
}

const AuthContext = createContext<UseAuthContext>(initContextState)

export const AuthProvider = ({children}: AuthProviderProps) => {
    const authState = useAuthContext(initialAuthStat)
    return (
        <AuthContext.Provider value={authState} >
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext