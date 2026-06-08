"use server"

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";
import path from "path";

interface CompanyForm {
    name: string;
    email: string;
    phone: string;
    industry: string;
    location: string;
    description: string;
    website: string;
}

export async function createEmployerCompany (formData: FormData) {
    const formResponse = Object.fromEntries(formData.entries());
    const companyData = formResponse as unknown as CompanyForm;

    const cookieStore = await cookies();
    const user_id = Number(cookieStore.get("userId")?.value);

    const company = await prisma.company.create({
        data: {
            name: companyData.name,
            email: companyData.email,
            phone: companyData.phone,
            industry: companyData.industry,
            location: companyData.location,
            description: companyData.description,
            website: companyData.website
        }
    })

    const employer = await prisma.employer.create({
        data: {
            user_id: user_id,
            company_id: company.id
        }
    })

    redirect(path.join(ROUTES.register.employer) + "/jobpost")

}