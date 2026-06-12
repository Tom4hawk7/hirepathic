"use server"

import { getUser } from "@/lib/auth";
import { work_mode } from "@prisma/client";
import { redirect } from "next/navigation";

export interface FilterForm {
    search: string,
    location: string,
    work_mode: work_mode,
}

export async function globalSearch(formData: FormData) {
    const formResponse = formData.entries();
    const form = Object.fromEntries(formResponse) as unknown as FilterForm;

    const user = await getUser();
    const pathStart = user?.role == "EMPLOYER" ? "/candidates" : "/jobs"

    redirect(`${pathStart}?search=${encodeURIComponent(form.search)}&location=${form.location}&work_mode=${form.work_mode}`)
}