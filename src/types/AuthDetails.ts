export type AuthDetails = Readonly<{
  gender?: "M" | "F" | "T";
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}>;
