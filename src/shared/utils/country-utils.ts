import { defaultCountries, parseCountry, type CountryData } from "react-international-phone";

import { SUPPORTED_COUNTRIES_ISO } from "../config";


export const storeSupportedCountries: CountryData[] = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return SUPPORTED_COUNTRIES_ISO.includes(iso2);
});

export const normalizePhone = (phone: string) =>
    phone.replace(/\s+/g, "");
