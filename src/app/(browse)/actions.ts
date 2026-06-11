"use server"

import { getUser } from "@/lib/auth";
import { filter_type } from "@prisma/client";
import { redirect } from "next/navigation";

export interface FilterForm {
    search: string,
    filter_type: filter_type
}

export async function globalSearch(formData: FormData) {
    const formResponse = formData.entries();
    const form = Object.fromEntries(formResponse) as unknown as FilterForm;

    const user = await getUser();
    const pathStart = user?.role == "EMPLOYER" ? "/candidates" : "/jobs"

    redirect(`${pathStart}?filter_type=${form.filter_type}&search=${encodeURIComponent(form.search)}`)
}