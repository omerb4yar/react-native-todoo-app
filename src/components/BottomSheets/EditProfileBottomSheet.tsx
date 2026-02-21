import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, Ref, useEffect, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import Color from '../../assets/Color';
import { BORDER_RADIOUS } from '../../constants/spacing';
import CustomButton from '../CustomButton/CustomButton';
import Icon from "@react-native-vector-icons/material-design-icons"
import UserType from '../../types/User/User.type';

interface EditProfileBottomSheetProps {
    userData?: UserType,
    onSubmit: (updatedFields: Partial<UserType>) => Promise<void>,
    loading?: boolean,
    editingField?: string,
}

const EditProfileBottomSheet = forwardRef((props: EditProfileBottomSheetProps, bottomSheetRef: Ref<BottomSheet>) => {

    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    useEffect(() => {
        if (props.userData) {
            setUsername(props.userData.username ?? '');
            setName(props.userData.name ?? '');
            setSurname(props.userData.surname ?? '');
            setEmail(props.userData.email ?? '');
            setPhoneNumber(props.userData.phoneNumber ?? '');
        }
    }, [props.userData]);

    const handleSubmit = async () => {
        await props.onSubmit({
            username,
            name,
            surname,
            email,
            phoneNumber,
        });
    }

    return (
        <BottomSheet
            containerStyle={{ zIndex: 10000 }}
            snapPoints={['70%']}
            keyboardBehavior='interactive'
            backdropComponent={(backdropProps) => <BottomSheetBackdrop {...backdropProps} />}
            index={-1}
            enablePanDownToClose
            ref={bottomSheetRef}
        >
            <BottomSheetView style={styles.bottomSheetContent}>

                <Text style={styles.sheetTitle}>Edit Profile</Text>

                <Text style={styles.label}>Username</Text>
                <BottomSheetTextInput
                    placeholder='Username'
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    value={username}
                    autoFocus={props.editingField === 'username'}
                    onChangeText={setUsername} />

                <Text style={styles.label}>Name</Text>
                <BottomSheetTextInput
                    placeholder='Name'
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    value={name}
                    autoFocus={props.editingField === 'name'}
                    onChangeText={setName} />

                <Text style={styles.label}>Surname</Text>
                <BottomSheetTextInput
                    placeholder='Surname'
                    placeholderTextColor={"gray"}
                    style={styles.input}
                    value={surname}
                    autoFocus={props.editingField === 'surname'}
                    onChangeText={setSurname} />

                <Text style={styles.label}>Email</Text>
                <BottomSheetTextInput
                    placeholder='Email'
                    placeholderTextColor={"gray"}
                    keyboardType='email-address'
                    style={styles.input}
                    value={email}
                    autoFocus={props.editingField === 'email'}
                    onChangeText={setEmail} />

                <Text style={styles.label}>Phone</Text>
                <BottomSheetTextInput
                    placeholder='Phone Number'
                    placeholderTextColor={"gray"}
                    keyboardType='phone-pad'
                    style={styles.input}
                    value={phoneNumber}
                    autoFocus={props.editingField === 'phone'}
                    onChangeText={setPhoneNumber} />

                <CustomButton
                    loading={props.loading}
                    leftIcon={<Icon name='check' size={20} color={"white"} />}
                    title='Save'
                    containerStyle={styles.saveButton}
                    onPress={handleSubmit} />

            </BottomSheetView>
        </BottomSheet>
    )
})

export default EditProfileBottomSheet

const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.primary,
        marginBottom: 16,
        alignSelf: 'center',
    },
    label: {
        color: Color.primary,
        fontWeight: "600",
        fontSize: 13,
        marginBottom: 6,
        marginTop: 14,
    },
    input: {
        fontWeight: "400",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, .06)",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 15,
        color: Color.primary,
    },
    saveButton: {
        backgroundColor: Color.primary,
        borderRadius: BORDER_RADIOUS,
        width: 120,
        height: 48,
        alignSelf: "flex-end",
        marginTop: 24,
    },
})
