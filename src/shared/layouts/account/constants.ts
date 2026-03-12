import { User, MapPin, ShoppingBag, Mail, Lock } from "lucide-react";

import { paths } from "@/shared/config/paths";

export const ACCOUNT_NAVIGATION = [
    { label: "nav.profile", href: paths.account.root, icon: User },
    { label: "nav.addresses", href: paths.account.addresses, icon: MapPin },
    { label: "nav.orders", href: paths.account.orders, icon: ShoppingBag },
    { label: "nav.email", href: paths.account.email, icon: Mail },
    { label: "nav.password", href: paths.account.password, icon: Lock },
];