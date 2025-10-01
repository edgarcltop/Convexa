import { api, useQuery } from "@convexpo/backend";
import { Ionicons } from "@expo/vector-icons";
import { Button, Spinner, useTheme } from "heroui-native";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { authClient } from "@/lib/betterAuth/client";

export default function SettingsRoute() {
	const { colors } = useTheme();
	const [isDeletingUser, setIsDeletingUser] = useState(false);
	const userData = useQuery(api.user.fetchUserAndProfile);

	if (!userData?.profile || !userData.userMetadata) return null;

	// delete user
	const handleDeleteUser = async () => {
		const { error, data } = await authClient.deleteUser(
			{},
			{
				onRequest: () => {
					setIsDeletingUser(true);
				},
				onSuccess: () => {
					console.log("User deleted successfully");
					setIsDeletingUser(false);
					// The auth system will automatically handle the redirect
				},
				onError: (ctx) => {
					setIsDeletingUser(false);
					console.error(ctx.error);
					Alert.alert("Error", ctx.error.message || "Failed to delete user");
				},
			},
		);

		console.log(data, error);
	};

	return (
		<View className="flex-1">
			<ScrollView
				contentInsetAdjustmentBehavior="always"
				contentContainerClassName="px-6 py-2 gap-4 min-h-full "
			>
				{/* User Info Section */}
				<View className="flex">
					<Text className="text-lg text-muted-foreground">
						{userData.profile.name}
					</Text>
					<Text className="text-lg text-muted-foreground">
						{userData.userMetadata.email}
					</Text>
					<Text className="text-lg text-muted-foreground">
						created {new Date(userData.userMetadata.createdAt).toDateString()}
					</Text>
				</View>

				{/* Delete User*/}
				<View className="flex gap-4">
					<Button
						variant="tertiary"
						size="sm"
						className="self-start rounded-full"
						disabled={isDeletingUser}
						onPress={async () => {
							Alert.alert(
								"Delete User",
								"Are you sure you want to delete your account?",
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "Delete",
										onPress: async () => {
											await handleDeleteUser();
										},
									},
								],
							);
						}}
					>
						<Button.StartContent>
							<Ionicons
								name="trash-outline"
								size={18}
								color={colors.foreground}
							/>
						</Button.StartContent>
						<Button.LabelContent>
							{isDeletingUser ? "Deleting..." : "Delete User"}
						</Button.LabelContent>
						<Button.EndContent>
							{isDeletingUser ? <Spinner color={colors.foreground} /> : null}
						</Button.EndContent>
					</Button>
				</View>
			</ScrollView>
		</View>
	);
}
