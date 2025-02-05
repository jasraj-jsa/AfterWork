import { sendOtp, verifyOtp } from "@/lib/appwrite";
import { createContext, useContext, useEffect } from "react";

const GlobalContext: any = createContext(undefined);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<any> = ({ children }) => {
	// const client = new Client();
	// client.setEndpoint(config.endpoint).setProject(config.projectId);

	// const account = new Account(client);
	return (
		<GlobalContext.Provider value={{ sendOtp, verifyOtp }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
