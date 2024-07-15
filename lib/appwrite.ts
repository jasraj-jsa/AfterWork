import { Client, Account, ID } from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.afterwork.app",
	projectId: "6685b51e0007381757d3",
	databaseId: "6686a447000d93fd26fa",
	userCollectionId: "6686a44f000cef41485b",
	eventCollectionId: "6686a470003dc3363cc5",
};

type loginScreen = "Phone" | "Login";

export const handlePhoneLogin = async (
	loginScreen: loginScreen,
	phoneNo?: string,
	userId?: string,
	secret?: string
) => {
	const client = new Client();
	client.setEndpoint(config.endpoint).setProject(config.projectId);

	const account = new Account(client);
	if (loginScreen === "Phone") {
		if (!phoneNo) throw console.error("No number provided!");

		const token = await account.createPhoneToken(ID.unique(), `+91${phoneNo}`);
		return token.userId;
	}
	if (userId && secret) {
		const session = await account.createSession(userId, secret);
		return session;
	} else {
		throw console.error("Login Failed! User id and/or Secret not provided");
	}
};
