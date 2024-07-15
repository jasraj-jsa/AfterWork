import {
	Client,
	Account,
	ID,
	AppwriteException,
	Models,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.afterwork.app",
	projectId: "6685b51e0007381757d3",
	databaseId: "6686a447000d93fd26fa",
	userCollectionId: "6686a44f000cef41485b",
	eventCollectionId: "6686a470003dc3363cc5",
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId);

const account = new Account(client);

export const sendOtp = async (phoneNo: string): Promise<string> => {
	const token = await account.createPhoneToken(ID.unique(), `+91${phoneNo}`);
	return token.userId;
};

export const verifyOtp = async (
	userId: any,
	secret: string
): Promise<Models.Session> => {
	const session = await account.createSession(userId, secret);
	return session;
};
