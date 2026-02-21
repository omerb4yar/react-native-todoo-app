import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const AddButton = ( props : TouchableOpacityProps ) => {
  return (
    <TouchableOpacity 
        {...props}
        style = {[styles.container, props.style]} >
        <Ionicons name='add' color={"white"} size={25}/>
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
    container : {
        backgroundColor : "steelblue",
        width : 60,
        height : 60,
        borderRadius : 60,
        alignItems : "center",
        justifyContent : "center"
    },
    icon : {}
})