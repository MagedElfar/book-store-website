import { useCallback, useMemo, useState } from "react";

import { DialogState } from "../types/common";


export function useDialog<T>(initialState: DialogState<T> = { type: null }) {
    const [dialog, setDialog] = useState<DialogState<T>>(initialState);

    const openCreate = useCallback(() => {
        setDialog({ type: "create" });
    }, []);

    const openEdit = useCallback((data: T) => {
        setDialog({ type: "edit", data });
    }, []);

    const openDelete = useCallback((data: T) => {
        setDialog({ type: "delete", data });
    }, []);


    const openView = useCallback((data: T) => {
        setDialog({ type: "view", data });
    }, []);

    const closeDialog = useCallback(() => {
        setDialog({ type: null });
    }, []);

    const data = useMemo(() => {
        if (dialog.type === "edit" || dialog.type === "delete" || dialog.type === "view") {
            return dialog.data ?? null;
        }
        return null;
    }, [dialog]);

    return useMemo(() => ({
        dialog,
        isOpen: dialog.type !== null,
        isCreate: dialog.type === "create",
        isEdit: dialog.type === "edit",
        isDelete: dialog.type === "delete",
        isView: dialog.type === "view",

        data,

        openCreate,
        openEdit,
        openDelete,
        closeDialog,
        openView,
        setDialog,
    }), [dialog, data, openCreate, openEdit, openDelete, closeDialog, openView]);

}