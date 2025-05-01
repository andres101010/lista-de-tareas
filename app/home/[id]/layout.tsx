import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Home"
}

export default function userLayout ({children}: Readonly<{children: React.ReactNode}>) {
    return <>
    {children}
    </>
}