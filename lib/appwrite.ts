import {
	Client,
	Account,
	ID,
	AppwriteException,
	Models,
	Databases,
	Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.afterwork.app",
	projectId: "6685b51e0007381757d3",
	databaseId: "6686a447000d93fd26fa",
	userCollectionId: "6686a44f000cef41485b",
	eventCollectionId: "6686a470003dc3363cc5",
};

const client = new Client();
client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId);

const account = new Account(client);
// const storage = new Storage(client);
// const avatars = new Avatars(client);
const databases = new Databases(client);

export const sendOtp = async (
	phoneNo: string,
	account: Account
): Promise<string> => {
	const token = await account.createPhoneToken(ID.unique(), `+91${phoneNo}`);
	return token.userId;
};

export const verifyOtp = async (
	userId: any,
	secret: string,
	account: Account
): Promise<Models.Session> => {
	const session = await account.createSession(userId, secret);
	return session;
};

export async function createEvent(event: any) {
	try {
		const newPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.eventCollectionId,
			ID.unique(),
			event
		);

		return newPost;
	} catch (error: any) {
		throw new Error(error);
	}
}

export async function getAllEvents() {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.eventCollectionId
		);

		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}
