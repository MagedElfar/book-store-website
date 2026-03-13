import { User, MapPin, ShoppingBag, Settings, Lock } from "lucide-react";

import { paths } from "@/shared/config/paths";

export const ACCOUNT_NAVIGATION = [
    { label: "nav.profile", href: paths.account.root, icon: User },
    { label: "nav.addresses", href: paths.account.addresses, icon: MapPin },
    { label: "nav.orders", href: paths.account.orders, icon: ShoppingBag },
    { label: "nav.settings", href: paths.account.settings, icon: Settings },
];