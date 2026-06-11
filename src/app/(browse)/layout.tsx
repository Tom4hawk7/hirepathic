"use server"

import { getUser } from "@/lib/auth";
import ClientBrowseLayout from "./BrowseLayout";
import { redirect } from "next/navigation";

type BrowseLayoutProps = {
  children: React.ReactNode;
};

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
    const user = await getUser();
    if (!user) redirect("/login");

    return (
        <ClientBrowseLayout user={user}  >
            {children}
        </ClientBrowseLayout>
    )
}