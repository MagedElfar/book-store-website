import { createContext, useContext } from "react";

export const LoaderContext = createContext({
    setIsUpdating: (_val: boolean) => { },
});

export const useLoaderContext = () => useContext(LoaderContext); 