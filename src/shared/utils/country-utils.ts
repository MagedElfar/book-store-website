import { defaultCountries, parseCountry, type CountryData } from "react-international-phone";

import { COUNTRIES } from "../config/constants";



export const storeSupportedCountries: CountryData[] = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return COUNTRIES.map((c) => c.value.toLocaleLowerCase()).includes(iso2);
});

export const normalizePhone = (phone: string) =>
    phone.replace(/\s+/g, "");
