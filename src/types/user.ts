export type Role = "SEEKER" | "EMPLOYER";

export type User = {
    id: string;
    email: string;
    role: Role;
}