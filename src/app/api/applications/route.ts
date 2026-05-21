import { getAuthUser } from "@/lib/auth";
import { error } from "console";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const user = await getAuthUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "SEEKER") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = request.json();

    // TODO: Deal with logic of creating an application
    return NextResponse.json({ success: true });
}