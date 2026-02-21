import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import * as Yup from "yup"
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from '../../assets/Color'
import OrDivider from '../../components/OrDivider'
import LottieView from 'lottie-react-native'
import { useMemo } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import TermsAndPolicy from '../../components/TermsAndPolicy'
import TermsAndPolicyBottomSheet from '../../components/BottomSheets/TermsAndPolicyBottomSheet'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import FormikForm from '../../components/Forms/FormikForm'
import WelcomeHeader from '../../components/WelcomeHeader'
import TextButton from '../../components/TextButton/TextButton'
import { showMessage } from 'react-native-flash-message'
import { signInUser } from '../../services/firebase/auth'
import { getAuth } from '@firebase/auth'

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password : Yup.string().required("Required")
})

type INITIAL_VALUES  = {
    email : string
    password : string
}

const initialValues : INITIAL_VALUES = {
    email : "",
    password : ""
}

const LoginScreen = ({navigation, route} : NativeStackScreenProps<any>) => {

    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (values : INITIAL_VALUES) => {

        setLoading(true);
        try {
            
            await signInUser(values.email, values.password);
            
            showMessage({message : "Sucsessfully signed in!", type : "success", icon : "success"});

        } catch (error : any) {
            switch (error.code) {
                case "auth/invalid-credential":
                    showMessage({type : "danger", message : "Invalid email or password", icon : "danger"})
                    break;
            
                default:
                showMessage({type : "danger", message : error.code, icon : "danger"})
                    break;
            }

            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["60"], []);

    return (
        <SafeAreaView
            style = {styles.container}>

            <WelcomeHeader/>

                    
                <FormikForm
                    loading = {loading}
                    validationSchema={SignInSchema}
                    type='sign-in'
                    onSubmitHandler={(values) => onSubmitHandler(values)}
                    initialValues={initialValues}/>

                <View style = {styles.bottom}>
                    <Text style = {styles.bottomTitle}>Dont you have an account?</Text>

                    <TextButton
                        onPress={() => navigation.navigate("Register")}
                        hitSlop={15}
                        title='Create Account'/>

                    <OrDivider/>

                    <CustomButton
                        leftIcon = {<Image resizeMode='contain' style = {{width : 25, height : 25, marginRight : 5}} source={require("../../assets/google.png")}/>}
                        titleStyle = {{color : Color.primary}}
                        containerStyle = {{backgroundColor : "white"}}
                        onPress={() => {}}
                        title='Sign in with Google'/>
                </View> 

                <TermsAndPolicy hitSlop={20} onPress={() => bottomSheetRef.current?.expand()}/>
                
        <TermsAndPolicyBottomSheet 
            children = {null}
            snapPoints={snapPoints}
            ref={bottomSheetRef} />

        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        flex : 1,
        paddingTop : 0,
        gap : 50,
    },
    form : {
        width : "100%",
        alignItems : "center",
        gap : 20
    },
   
    bottom : {
        alignItems : "center",
        gap : 6
    },

    bottomTitle : {
        fontWeight : "600",
        fontSize : 13,
        color : Color.lightblue
    },

    

    lottie : {
        width : 200,
        height : 200,
    },

    bottomSheetContent : {
        flex : 1,
        padding : 10,
        alignItems : "center"
    },

    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        color : "#313131",
        fontWeight: "bold",
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 8,
        color: "#1a1a1a",
    },
})