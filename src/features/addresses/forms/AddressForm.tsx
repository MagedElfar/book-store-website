"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { MapSkeleton } from '@/shared/components/map/MapSkeleton';
import { FormCheckbox } from '@/shared/form/components/inputs/FormCheckbox';
import { FormPhoneInput } from '@/shared/form/components/inputs/FormPhoneInput';
import { FormTextAreaField } from '@/shared/form/components/inputs/FormTextAreaField';
import { FormTextField } from '@/shared/form/components/inputs/FormTextField';
import { FormContainer } from '@/shared/form/components/layout/FormContainer';
import { AppFormProvider } from '@/shared/form/providers/AppFormProvider';
import { useAppTranslation } from '@/shared/hooks/use-translation';
import { errorMapper } from '@/shared/utils/error';

import { useCreateAddress } from '../hooks/useCreateAddress';
import { useUpdateAddress } from '../hooks/useUpdateAddress';
import { AddressFormSchemaType, AddressFormSchema } from '../schema/AddressFormSchema';
import { UserAddress } from '../types/address';
import { CreateAddressPayload } from '../types/request';



// ✅ استخدام next/dynamic لضمان التوافق مع SSR
const MapPickerField = dynamic(() => import('@/shared/components/map/MapPickerField'), {
    ssr: false,
    loading: () => <MapSkeleton />
});

interface Props {
    address?: UserAddress | null;
    onSuccess?: () => void;
}

export function AddressForm({ address, onSuccess }: Props) {
    const { t } = useAppTranslation("addresses");

    const { mutateAsync: createAddress } = useCreateAddress();
    const { mutateAsync: updateAddress } = useUpdateAddress();

    const defaultValues: AddressFormSchemaType = {
        full_name: address?.full_name || "",
        phone: address?.phone || "",
        country: address?.country || "",
        city: address?.city || "",
        street_address: address?.street_address || "",
        is_default: address?.is_default ?? true,
        lat: address?.lat ?? 0,
        lng: address?.lng ?? 0,
    };

    const methods = useForm<AddressFormSchemaType>({
        resolver: zodResolver(AddressFormSchema(t)),
        defaultValues,
    });

    const onSubmit = async (data: AddressFormSchemaType) => {
        try {
            if (address) {
                await updateAddress({ id: address.id, data });
                toast.success(t("feedback.successUpdateAddress"));
            } else {
                await createAddress(data as CreateAddressPayload);
                toast.success(t("feedback.successCreateAddress"));
            }

            onSuccess?.();

        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    return (
        <AppFormProvider<AddressFormSchemaType> methods={methods} onSubmit={onSubmit}>
            <FormContainer
                submitText={address ? t("actions.saveAddress") : t("actions.addAddress")}
                className="w-full"
                contentClassName='items-center'
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">

                    <div className="col-span-1">
                        <FormTextField
                            name="full_name"
                            label={t("labels.fullName")}
                            placeholder={t("placeHolder.fullName")}
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <FormPhoneInput
                            name="phone"
                            label={t("labels.phone")}
                        />
                    </div>

                    <div className="col-span-1">
                        <FormTextField
                            name="country"
                            label={t("labels.country")}
                            placeholder={t("placeHolder.country")}
                            required
                        />
                    </div>

                    <div className="col-span-1">
                        <FormTextField
                            name="city"
                            label={t("labels.city")}
                            placeholder={t("placeHolder.city")}
                            required
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <FormTextAreaField
                            name="street_address"
                            label={t("labels.streetAddress")}
                            placeholder={t("placeHolder.streetAddress")}
                            rows={3}
                            required
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <FormCheckbox
                            name="is_default"
                            label={t("labels.isDefault")}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        {/* الخريطة هنا ستظهر تلقائياً مع Skeleton بفضل next/dynamic */}
                        <MapPickerField
                            nameLat="lat"
                            nameLng="lng"
                            label={t("labels.location")}
                        />
                    </div>
                </div>
            </FormContainer>
        </AppFormProvider>
    );
}