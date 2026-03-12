/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import {
    useReducer,
    useEffect,
    useMemo,
    type ReactNode,
} from "react";

import { useRouter } from "@/i18n/routing";
import { paths } from "@/shared/config/paths";

import { login, signup, logout } from "../api/actions";
import { getCurrentUser, updateUserProfile } from "../api/user";
import { AuthActionsContext } from "../context/AuthActionsContext";
import { authReducer } from "../context/authReducer";
import { AuthStateContext } from "../context/AuthStateContext";
import type { AuthState } from "../types/auth-context";
import { SignupApiRequest } from "../types/request";
import { User } from "../types/user";

interface Props {
    children: ReactNode;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useReducer(
        authReducer,
        initialState
    );

    const router = useRouter()

    /**
     * restore session on app start
     */
    useEffect(() => {
        (async () => {
            try {
                const user =
                    await getCurrentUser();

                if (user) {
                    dispatch({
                        type: "RESTORE_SESSION",
                        payload: user,
                    });

                } else {
                    dispatch({
                        type: "SET_LOADING",
                        payload: false,
                    });
                }
            } catch (error) {


                dispatch({
                    type: "SET_LOADING",
                    payload: false,
                });
            }
        })();
    }, []);

    /**
     * auth actions
     */
    const actions = useMemo(
        () => ({
            login: async (
                email: string,
                password: string,
                remapUser?: (
                    user: User
                ) => User
            ) => {
                const response =
                    await login({
                        email,
                        password,
                    });

                let user = response.user;

                if (remapUser) {
                    user = remapUser(user);
                }

                dispatch({
                    type: "LOGIN",
                    payload: user,
                });
            },

            signup: async (
                data: SignupApiRequest,
                remapUser?: (
                    user: User
                ) => User
            ) => {
                const response =
                    await signup(data);

                let user = response.user;

                if (remapUser) {
                    user = remapUser(user);
                }

                dispatch({
                    type: "LOGIN",
                    payload: user,
                });
            },

            logout: async () => {
                await logout();

                dispatch({
                    type: "LOGOUT",
                });

                router.replace(paths.auth.login)

            },

            updateUser: async (
                id: string,
                data: Partial<User>
            ) => {
                await updateUserProfile(
                    id,
                    data
                );

                dispatch({
                    type: "UPDATE_USER",
                    payload: data,
                })
            },
        }),
        [router]
    );

    /**
     * provider
     */
    return (
        <AuthStateContext.Provider
            value={state}
        >
            <AuthActionsContext.Provider
                value={actions}
            >
                {children}
            </AuthActionsContext.Provider>
        </AuthStateContext.Provider>
    );
}
