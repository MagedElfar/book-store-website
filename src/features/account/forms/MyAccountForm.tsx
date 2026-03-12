"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { FormPhoneInput } from '@/shared/form/components/inputs/FormPhoneInput';
import { FormTextField } from '@/shared/form/components/inputs/FormTextField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { DropzoneField } from '@/shared/media/components/ui/DropzoneField';
import { errorMapper } from '@/shared/utils/error';

import { AccountSchemaType, AccountSchema } from '../schema/AccountSchema';

export function MyAccountForm() {
    const { updateUser } = useAuthActions()
    const { user } = useAuthState()
    const { t } = useAppTranslation("account")

    const defaultValues: AccountSchemaType = {
        phone: user?.phone,
        full_name: user?.full_name || "",
        avatar_url: user?.avatar_url
    }

    const methods = useForm<AccountSchemaType>({
        resolver: zodResolver(AccountSchema(t)),
        defaultValues,
    });

    const onsubmit = async (data: AccountSchemaType) => {
        try {
            await updateUser(user!.id, data)
            toast.success(t("feedBack.successAccountUpdate"))
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    }

    return (
        <AppFormProvider<AccountSchemaType> methods={methods} onSubmit={onsubmit}>
            <FormContainer
                contentClassName="items-center"
                buttonClassName="w-full sm:w-auto min-w-[150px]"
            >
                <div className="grid grid-cols-1 gap-6 w-full">

                    <div className="w-full">
                        <FormTextField
                            name="full_name"
                            label={t("label.fullName")}
                            placeholder={t("placeHolder.fullName")}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <FormPhoneInput
                            name="phone"
                            label={t("label.phone")}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium mb-2">
                            {t("label.avatar")}
                        </label>
                        <DropzoneField
                            name="avatar_url"
                            maxSize={2 * 1024 * 1024} // 2 MB
                            accept={{
                                "image/jpeg": [".jpeg", ".jpg"],
                                "image/png": [".png"],
                                "image/webp": [".webp"]
                            }}
                        />
                    </div>

                </div>
            </FormContainer>
        </AppFormProvider>
    )
}