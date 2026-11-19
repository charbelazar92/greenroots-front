export type AuthUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";
};