import Ionicons from "@expo/vector-icons/build/Ionicons";
import Linking from "expo-linking";
import { useRouter } from "expo-router";
import { Button, Spinner, TextField, useTheme } from "heroui-native";
import { useState } from "react";
import { Alert } from "react-native";
import FormHeader, { FormContainer } from "@/components/form";
import { authClient } from "@/lib/betterAuth/client";

export default function RequestPasswordResetRoute() {
	const router = useRouter();
	const { colors } = useTheme();
	/* ---------------------------------- state --------------------------------- */
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	/* ------------------------ handle request reset --------------------------- */
	const handleRequestReset = async () => {
		/**
		 * FEAT: Add your own form validation validation here
		 * i've been using tanstack form for react native with zod
		 *
		 * but this is just a base for you to get started
		 */
		if (!email.trim()) {
			Alert.alert("Error", "Please enter your email");
			return;
		}
		const { error, data } = await authClient.requestPasswordReset(
			{
				email: email,
				redirectTo: Linking.createURL("email/reset-password"),
			},
			{
				onRequest: () => {
					setIsLoading(true);
				},

				onError: (ctx) => {
					setIsLoading(false);
					Alert.alert(
						"Error",
						ctx.error.message || "Failed to send reset link",
					);
				},
				onSuccess: () => {
					setIsLoading(false);
					Alert.alert("Success", "Reset link sent to your email");
					router.back();
					console.log("success!");
				},
			},
		);
		console.log(data, error);
	};
	/* --------------------------------- return --------------------------------- */
	return (
		<FormContainer>
			{/* header */}
			<FormHeader
				title="Reset Password"
				description="Enter your email to receive a password reset link"
			/>
			{/* email */}
			<TextField isRequired>
				<TextField.Input
					className="h-16 rounded-3xl"
					placeholder="Enter your email"
					keyboardType="email-address"
					autoCapitalize="none"
					value={email}
					onChangeText={setEmail}
				>
					<TextField.InputStartContent className="pointer-events-none pl-2">
						<Ionicons
							name="mail-outline"
							size={20}
							color={colors.mutedForeground}
						/>
					</TextField.InputStartContent>
				</TextField.Input>
			</TextField>
			{/* submit button */}
			<Button
				onPress={handleRequestReset}
				disabled={isLoading}
				className="rounded-3xl"
				size="lg"
			>
				<Button.LabelContent>
					{isLoading ? "Sending..." : "Send Reset Link"}
				</Button.LabelContent>
				<Button.EndContent>
					{isLoading ? <Spinner color={colors.background} /> : null}
				</Button.EndContent>
			</Button>
		</FormContainer>
	);
}
