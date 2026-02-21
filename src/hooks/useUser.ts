import { useEffect, useState } from "react"
import { userService } from "../services/userService";
import UserType from "../types/User/User.type";
import { User } from "@firebase/auth";

export const useUser = (user: User | null) => {

	const [userData, setUserData] = useState<UserType>();
	const [loadingUserData, setLoadingUserData] = useState<boolean>(false);
	const [updatingUserData, setUpdatingUserData] = useState<boolean>(false);

	useEffect(() => {
		if (!user) {
			setUserData({});
			return;
		}

		setLoadingUserData(true);
		const unsubscribe = userService.subscribeToUser(user.uid, (newUser) => {
			setUserData(newUser);
			setLoadingUserData(false);
		});

		return () => {
			unsubscribe();
		};
	}, [user]);

	const loadUser = async (showLoading: boolean = true) => {

		if (!user) return;

		if (showLoading) setLoadingUserData(true)

		try {
			const userData = await userService.getUser(user.uid);
			setUserData(userData);

		} catch (error: any) {

			throw error;

		} finally {
			if (showLoading) setLoadingUserData(false);
		}
	}

	const updateUser = async (newUser: Partial<UserType>) => {

		if (!user) throw new Error("User not found")

		setUpdatingUserData(true)
		try {

			await userService.updateUser(user.uid, newUser);

		} catch (error: any) {

			throw error

		} finally {
			setUpdatingUserData(false)
		}

	}



	return {
		userData,
		loadingUserData,

		updatingUserData,
		updateUser,

		reload: loadUser
	}

}

