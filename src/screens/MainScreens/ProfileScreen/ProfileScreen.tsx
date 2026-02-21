
import { View, Text, Image, TouchableOpacity, Keyboard, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Icon from "@react-native-vector-icons/material-design-icons"
import ProfileScreenStyle from './ProfileScreen.style';
import Color from '../../../assets/Color';
import { showMessage } from 'react-native-flash-message';
import { signOutUser } from '../../../services/firebase/auth';
import { useUserContext } from '../../../context/UserContext';
import { useTodoContext } from '../../../context/TodoContext';
import useTodos from '../../../hooks/useTodos';
import { getAuth } from '@firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import EditProfileBottomSheet from '../../../components/BottomSheets/EditProfileBottomSheet';
import UserType from '../../../types/User/User.type';
import InfoRowButton from '../../../components/InfoRowButton';

const auth = getAuth()

const ProfileScreen = () => {

	const {
		userData,
		loadingUserData,
		updateUser,
		updatingUserData,
		reload,
	} = useUserContext();

	const { todos } = useTodoContext();


	const { todos: archivedTodos, reloadTodos: reloadArchivedTodos } = useTodos(auth.currentUser, { isArchived: true });

	function isOverdue(deadline: number, completed: boolean) {
		const now = Date.now();
		return !completed && deadline <= now;
	}

	const completedCount = useMemo(() => todos.filter((t: any) => t.isDone).length, [todos]);
	const activeCount = useMemo(() => todos.filter((t: any) => !t.isDone && !isOverdue(t.deadlineTime, t.isDone)).length, [todos]);
	const overdueCount = useMemo(() => todos.filter((t: any) => isOverdue(t.deadlineTime, t.isDone)).length, [todos]);

	const handleRefresh = useCallback(() => {
		reload();
		reloadArchivedTodos();
	}, [reload, reloadArchivedTodos]);

	const bottomSheetRef = useRef<BottomSheet>(null);
	const [editingField, setEditingField] = useState<string>('');

	const openEditSheet = (field: string) => {
		setEditingField(field);
		bottomSheetRef.current?.expand();
	}

	const handleUpdateProfile = async (updatedFields: Partial<UserType>) => {
		try {
			await updateUser(updatedFields);
			await reload();
			Keyboard.dismiss();
			bottomSheetRef.current?.close();
			showMessage({ type: "success", icon: "success", message: "Profile updated successfully!" });
		} catch (error: any) {
			console.log(error);
			showMessage({ type: "danger", icon: "danger", message: error.code ?? "Something went wrong" });
		}
	}

	const handleSignOut = async () => {
		try {
			await signOutUser();
		} catch (error: any) {
			console.log(error)
			showMessage({ type: "danger", icon: "danger", message: error.code })
			throw error
		}
	}

	if (loadingUserData && !userData) {
		return <ActivityIndicator />
	}

	const fullName = [userData?.name, userData?.surname].filter(Boolean).join(' ');

	return (
		<SafeAreaView style={ProfileScreenStyle.container}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
				refreshControl={
					<RefreshControl
						refreshing={loadingUserData}
						onRefresh={handleRefresh}
						colors={[Color.primary]}
						tintColor={Color.primary}
					/>
				}
			>

				<View style={ProfileScreenStyle.profileHeader}>
					<View style={ProfileScreenStyle.avatarContainer}>
						{userData?.photoUrl ? (
							<Image
								source={{ uri: userData.photoUrl }}
								style={ProfileScreenStyle.avatarImage}
							/>
						) : (
							<Icon name="account" size={48} color="rgba(255, 255, 255, 0.6)" />
						)}
					</View>

					{fullName ? (
						<Text style={ProfileScreenStyle.displayName}>{fullName}</Text>
					) : null}
					<Text style={ProfileScreenStyle.username}>@{userData?.username}</Text>


					<View style={ProfileScreenStyle.statsRow}>
						<View style={ProfileScreenStyle.statItem}>
							<Text style={ProfileScreenStyle.statValue}>{activeCount}</Text>
							<Text style={ProfileScreenStyle.statLabel}>Active</Text>
						</View>
						<View style={ProfileScreenStyle.statItem}>
							<Text style={ProfileScreenStyle.statValue}>{completedCount}</Text>
							<Text style={ProfileScreenStyle.statLabel}>Completed</Text>
						</View>
						<View style={ProfileScreenStyle.statItem}>
							<Text style={ProfileScreenStyle.statValue}>{overdueCount}</Text>
							<Text style={ProfileScreenStyle.statLabel}>Overdue</Text>
						</View>
						<View style={ProfileScreenStyle.statItem}>
							<Text style={ProfileScreenStyle.statValue}>{archivedTodos.length}</Text>
							<Text style={ProfileScreenStyle.statLabel}>All Time</Text>
						</View>
					</View>
				</View>


				<View style={ProfileScreenStyle.infoSection}>
					<View style={ProfileScreenStyle.infoCard}>

						<InfoRowButton
							icon="email-outline"
							label="Email"
							value={userData?.email || '—'}
							onPress={() => openEditSheet('email')}
						/>

						<InfoRowButton
							icon="phone-outline"
							label="Phone"
							value={userData?.phoneNumber || '—'}
							onPress={() => openEditSheet('phone')}
						/>

						<InfoRowButton
							icon="account-outline"
							label="Username"
							value={userData?.username || '—'}
							onPress={() => openEditSheet('username')}
						/>
					</View>
				</View>


				<View style={ProfileScreenStyle.signOutContainer}>
					<CustomButton
						containerStyle={{ backgroundColor: Color.danger, width: 140 }}
						leftIcon={<Icon name='exit-to-app' size={15} color={Color.bg} />}
						title='Sign Out'
						onPress={handleSignOut} />
				</View>

			</ScrollView>


			<EditProfileBottomSheet
				ref={bottomSheetRef}
				userData={userData}
				editingField={editingField}
				loading={updatingUserData}
				onSubmit={handleUpdateProfile} />

		</SafeAreaView>
	)
}

export default ProfileScreen;