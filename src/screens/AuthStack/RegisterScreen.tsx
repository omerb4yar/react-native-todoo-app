import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import * as Yup from "yup"
import { SafeAreaView } from 'react-native-safe-area-context';
import FormikForm from '../../components/Forms/FormikForm';
import CustomButton from '../../components/CustomButton/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Color from '../../assets/Color';
import WelcomeHeader from '../../components/WelcomeHeader';
import TermsAndPolicyBottomSheet from '../../components/BottomSheets/TermsAndPolicyBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import TermsAndPolicy from '../../components/TermsAndPolicy';
import OrDivider from '../../components/OrDivider';
import TextButton from '../../components/TextButton/TextButton';
import { showMessage } from 'react-native-flash-message';
import { userService } from '../../services/userService';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup
    .string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
    passwordAgain : Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match")
})

type INITIAL_VALUES  = {
    email : string
    password : string,
    passwordAgain : string
}

const initialValues : INITIAL_VALUES = {
    email : "",
    password : "",
    passwordAgain : ""
}


const RegisterScreen = ({navigation} : NativeStackScreenProps<any>) => {

  const [loading, setLoading] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const createUser = async (values : INITIAL_VALUES) => {

    setLoading(true);
    try {
      await userService.createUser(values.email, values.password);

      showMessage({message : "You are signed up sucsessfully!", type : "success", icon : "success"});

    } catch (error : any) {
      switch (error.code) {
        case "auth/email-already-in-use":
        showMessage({message : "Email already in use", type : "danger", icon : "danger"});  
          break;
      
        default:
        showMessage({message : error.code, type : "danger", icon : "danger"});  
          break;
      }
      
      
      throw new Error(error.message);
    } finally {
      setLoading(false)
    }

  }

  const snapPoints = useMemo(() => ["60"], []);

  return (
    <SafeAreaView style = {styles.container}>

      <WelcomeHeader/>
      <Text style = {{fontSize : 14, fontWeight : "bold", color : Color.lightblue}}>Create An Account Now!</Text>
      <FormikForm
        loading = {loading}
        type='sign-up'
        validationSchema={SignUpSchema}
        onSubmitHandler={(values) => createUser(values)}
        initialValues={{email : "", password : "", passwordAgain : ""}}/>

      

      <View style = {{alignItems : "center"}}>
        <View style = {styles.navigator}>
          <Text style = {styles.navigatorText}>Already have an account?</Text>
          <TextButton title='Sign in' onPress={() => navigation.navigate("Login")}/>
        </View>

        <OrDivider/>

        <CustomButton
          loading = {loading}
          leftIcon = {<Image resizeMode='contain' style = {{width : 25, height : 25, marginRight : 5}} source={require("../../assets/google.png")}/>}
          titleStyle = {{color : Color.primary}}
          containerStyle = {{backgroundColor : "white"}}
          onPress={() => {}}
          title='Sign in with Google'/>
      </View>

      <TermsAndPolicy
        hitSlop={20}
        onPress={() => bottomSheetRef.current?.expand()}/>

      <TermsAndPolicyBottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        children = {null}/>

    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    gap :20,
    flex : 1
  },
  navigator : {
    alignItems : "center",
    gap : 10
  },
  navigatorText : {
    fontWeight : "bold",
    color : "gray",
    fontSize : 13
  }
})