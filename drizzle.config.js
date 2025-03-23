import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_T9rJ6PBpXEsZ@ep-noisy-dream-a5k35dn5-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
});
