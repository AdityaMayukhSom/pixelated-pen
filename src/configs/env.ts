import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default("http://localhost:3000"),
    APP_MOCK_API_PORT: z.string().optional().default("8080"),
  });

  const envVars: Record<string, string> = {};

  for (const [key, value] of Object.entries(import.meta.env)) {
    if (key.startsWith("VITE_APP_")) {
      envVars[key.replace("VITE_APP_", "")] = value;
    }
  }

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    const missingFields = parsedEnv.error.flatten().fieldErrors;
    const missingVarsList = Object.entries(missingFields).map(([k, v]) => `- ${k}: ${v}`);
    const missingVarsString = missingVarsList.join("\n");
    const errorMessage = "Invalid env provided." + "The following variables are missing or invalid:\n";
    throw new Error(errorMessage + missingVarsString);
  }

  return parsedEnv.data;
};

export const env = createEnv();
console.log(env.API_URL);
