import { prisma } from "@/lib/prisma";
import { createSkills } from "./skills";
import { createEmployers } from "./employers";
import { createJobs } from "./jobs";
import { createCandidates } from "./candidate";

const SEED_TRIGGER_NUM = 10;

async function seedDatabase() {
    const userCount = await prisma.user.count();

    if (userCount > SEED_TRIGGER_NUM) {
        console.log("Database already seeded...")
        return;
    }

    await createSkills();
    await createEmployers();
    await createJobs();
    await createCandidates();

}

seedDatabase();