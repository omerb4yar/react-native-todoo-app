import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik'
import Input from '../TextInput/Input'
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import Color from '../../assets/Color'
import CustomButton from '../CustomButton/CustomButton'
import FormikError from '../ErrorMessages/FormikError'

interface FormikFormProps extends FormikValues {
    initialValues : {
        email : string,
        password : string,
        passwordAgain? : string
    },
    onSubmitHandler : ((values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>) & ((values: any) => any)
    validationSchema : any,
    type : "sign-in" | "sign-up",
    loading? : boolean
}

const FormikForm = ({initialValues, loading = false, type = "sign-in", validationSchema, onSubmitHandler} : FormikFormProps) => {

    return (

    <Formik
        
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmitHandler(values)}
        initialValues={initialValues} 
        >{({handleChange, handleBlur, errors, values, touched, handleSubmit}) => (

            <View style = {styles.form}> 
                <View style = {{alignItems : "center", gap : 8}}>
                <Input
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    leftIcon = {<Icon name='email' size={16} color={Color.primary}/>}
                    error = {!!errors.email}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder='Email'/>
                {errors.email && touched.email ? (<FormikError errMsg={errors.email}/>) : null}
                </View>

                <View style = {{alignItems : "center", gap : 8}}>
                <Input
                    isPasswordInput
                    leftIcon = {<Icon name='lock' size={17} color={Color.primary}/>}
                    error = {!!errors.password}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder='Password'/>
                {errors.password && touched.password ? (<FormikError errMsg={errors.password}/>) : null}
                </View>

                {type == "sign-up" && 
                
                <>
                <View style = {{alignItems : "center", gap : 8}}>
                    <Input
                        isPasswordInput
                        leftIcon = {<Icon name='lock' size={17} color={Color.primary}/>}
                        error = {!!errors.passwordAgain}
                        value={values.passwordAgain}
                        onChangeText={handleChange("passwordAgain")}
                        placeholder='Password again'/>
                    {errors.passwordAgain && touched.passwordAgain ? (<FormikError errMsg={errors.passwordAgain}/>) : null}
                </View>
                </>
                
                }

                <CustomButton
                    loading = {loading}
                    leftIcon = {<Icon name = "login" size={14} color={"white"}/>}
                    title={type == "sign-in" ? 'Sign in' : 'Create Account'}
                    onPress={handleSubmit}/>          
            </View>
        )}</Formik>
  )
}

export default FormikForm

const styles = StyleSheet.create({
    form : {
        width : "100%",
        alignItems : "center",
        gap : 20
    },
})