import { createContext, useContext } from "react";

export const LoaderContext = createContext({
    setIsUpdating: (val: boolean) => { },
});

export const useLoaderContext = () => useContext(LoaderContext);