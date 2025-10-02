import { expo } from "@better-auth/expo";
import type { GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import type { DataModel } from "../../_generated/dataModel";
import { requireEnv } from "../../util";
import { authComponent } from "./component";
/**
 * NOTE:
 * This createAuth is needed for integrating Convex with Better Auth,
 */
export const createAuth = (
	ctx: GenericCtx<DataModel>,
	{ optionsOnly } = {
		optionsOnly: false,
	},
) => {
	return betterAuth({
		database: authComponent.adapter(ctx),
		trustedOrigins: [
			"https://appleid.apple.com",
			requireEnv("EXPO_MOBILE_URL"),
			// requireEnv("EXPO_WEB_URL"),
		],
		emailAndPassword: {
			enabled: true,
		},
		// baseURL: requireEnv("CONVEX_SITE_URL"),
		user: {
			deleteUser: {
				enabled: true,
			},
		},
		socialProviders: {
			// apple: {
			// 	clientId: requireEnv("APPLE_CLIENT_ID"),
			// 	clientSecret: requireEnv("APPLE_CLIENT_SECRET"),
			// 	appBundleIdentifier: requireEnv("APPLE_APP_BUNDLE_IDENTIFIER"),
			// },
			// google: {
			// 	clientId: requireEnv("GOOGLE_CLIENT_ID"),
			// 	clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
			// },
		},
		logger: {
			disabled: optionsOnly,
		},
		plugins: [expo(), convex()],
	});
};
