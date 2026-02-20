import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535),
  DATABASE_URL: z.url(),
  SALT_ROUNDS: z.coerce.number().min(10).int(),
  ACCESS_JWT_SECRET: z.string().min(32),
  ACCESS_JWT_EXPIRES_IN: z.coerce.number().int().positive()
});

export type EnvConfig = z.infer<typeof envSchema>;

// config ==> process.env
export const validate = (config: Record<string, any>) => {
  const { success, error, data } = envSchema.safeParse(config);
  if (!success) {
    console.log(z.prettifyError(error));
    throw new Error('Env validation failed');
  }
  return data;
};
