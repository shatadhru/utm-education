import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { admin } from "better-auth/plugins"
import { sendEmail } from "./email/send";

const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: "https://v1.utmeducation.com",
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  plugins: [
    admin({
      adminUserIds: ["6a848b9bed8db412d5a70f91"]
    }) 
  ],
  trustedOrigins: [
	"https://*.utmeducation.com", // All HTTPS subdomains
	"http://localhost:*", // Any localhost port
	"exp://**", // Expo development URLs
	"myapp://", // Mobile app scheme
],

emailVerification: {
          sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            void sendEmail({
                to: user.email,
                subject: 'Verify your email address',
                html: `Click the link to verify your email: ${url}`
            })
        }
    } ,
    account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google"], // Add your providers
		},
	},
});
