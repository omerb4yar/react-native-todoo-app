import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { forwardRef, Ref, useEffect, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetProps, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { EvilIcons, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import Color from '../../assets/Color';
import PriortySelector from '../PriortySelector';
import { BORDER_RADIOUS } from '../../constants/spacing';
import CustomButton from '../CustomButton/CustomButton';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { TodoProps } from '../TodoCard/TodoCard';

interface AddTodoBottomSheetProps extends BottomSheetProps {
    onSubmit: (title: string, content: string, priority: TodoProps["priority"], deadline: number) => Promise<void>,
    loading?: boolean
}


const AddTodoBottomSheet = forwardRef((props: AddTodoBottomSheetProps, bottomSheetRef: Ref<BottomSheet>) => {


    const [deadline, setDeadline] = useState<number | null>(null);

    const showTimePicker = () => {

        DateTimePickerAndroid.open({
            minimumDate: new Date(),
            title: 'Deadline',
            design: 'material',
            onChange: (e) => { setDeadline(e.nativeEvent.timestamp) },
            mode: 'time',
            value: deadline ? new Date(deadline) : new Date(),
            display: 'spinner'
        })
    }

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [priorty, setPriorty] = useState<TodoProps["priority"]>("low");

    useEffect(() => {
        if (title.length >= 1 && content.length >= 1 && priorty && deadline) {
            setValid(true);
        } else {
            setValid(false)
        }

    }, [title, content, priorty])

    const [valid, setValid] = useState<boolean>(false);

    return (
        <BottomSheet
            containerStyle={{ zIndex: 10000 }}
            snapPoints={props.snapPoints}
            keyboardBehavior={props.keyboardBehavior}
            backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
            index={props.index}
            enablePanDownToClose
            ref={bottomSheetRef}
        >
            <BottomSheetView style={styles.bottomSheetContent}>

                <Text style={styles.title}>Title</Text>
                <BottomSheetTextInput

                    placeholderTextColor={"gray"}
                    multiline
                    textAlignVertical='top'
                    style={{ fontWeight: 400, width: "100%", backgroundColor: "rgba(0, 0, 0, .08)", borderRadius: 10, paddingLeft: 15 }}
                    value={title}
                    onChangeText={(text) => setTitle(text)} />

                <Text style={styles.title}>Description</Text>
                <BottomSheetTextInput

                    placeholderTextColor={"gray"}
                    multiline
                    textAlignVertical='top'
                    style={{ fontWeight: 400, width: "100%", minHeight: 100, backgroundColor: "rgba(0, 0, 0, .08)", borderRadius: 10, paddingLeft: 15 }}
                    value={content}
                    onChangeText={(text) => setContent(text)} />

                <Text style={styles.title}>Priorty</Text>
                <PriortySelector setPriorty={setPriorty} />

                <CustomButton
                    containerStyle={[styles.deadlineButton, deadline ? styles.filledDeadlineButton : null]}
                    titleStyle={{ color: deadline ? "white" : Color.primary, fontSize: 15 }}
                    leftIcon={<MaterialIcons name='alarm' color={deadline ? "white" : Color.primary} size={20} />}
                    onPress={showTimePicker}
                    title={deadline ? convertToClock(deadline) : "Set Deadline"} />

                <CustomButton
                    loading={props.loading}
                    buttonDisabled={!valid}
                    leftIcon={<MaterialIcons name='add' size={20} color={"white"} />}
                    title='Add'
                    containerStyle={{ backgroundColor: Color.primary, borderRadius: BORDER_RADIOUS, width: 100, height: 50, alignSelf: "flex-end", marginTop: 30, opacity: valid ? 1 : .5 }}
                    onPress={async () => {
                        await props.onSubmit(title, content, priorty, deadline!);
                    }} />


            </BottomSheetView>
        </BottomSheet>

    )
})

const convertToClock = (time: number) => {
    const date = new Date(time);

    return date.toLocaleTimeString("tr", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
}

export default AddTodoBottomSheet

const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center"
    },

    title: {
        color: Color.primary,
        alignSelf: "flex-start",
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 20
    },

    deadlineButton: {
        marginTop: 30,
        width: "100%",
        backgroundColor: "white",
        borderColor: Color.primary,
        borderWidth: 2,
        borderStyle: "dashed"
    },

    filledDeadlineButton: {
        backgroundColor: Color.lightblue,
        borderStyle: "solid",
        borderColor: Color.lightblue
    },

})