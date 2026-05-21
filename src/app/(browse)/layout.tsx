import React from "react";

type BrowseLayoutProps = {
    children: React.ReactNode
}

export default function BrowseLayout({ children }: BrowseLayoutProps) {
    return (
        <section>
            {children}
        </section>
    )
}