import { StyleSheet, Text, View } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import CustomButton from './CustomButton/CustomButton'
import Color from '../assets/Color'
import { TodoProps } from './TodoCard/TodoCard'

type PriortySelectorType = {
    setPriorty : React.Dispatch<SetStateAction<TodoProps["priority"]>>,
    priortyState : TodoProps["priority"]
}

const PriortySelector = (
    { setPriorty, priortyState } : PriortySelectorType
) => {

    const priortySetter = (priority : TodoProps["priority"]) => {
        setPriorty(priority)
    }

  return (
    <View style = {styles.container}>
        <CustomButton
            titleStyle = {{ color : Color.primary }}
            containerStyle = {{backgroundColor : Color.primaryBg, elevation : 0, flex : 1, borderWidth : 3, borderColor : priortyState == "low" ? Color.primary : "white"}}
            title='Low'
            onPress={() => priortySetter("low")}/>
        <CustomButton
            titleStyle = {{ color : Color.orange }}
            containerStyle = {{backgroundColor : Color.orangeBg, elevation : 0, flex : 1, borderWidth : 3, borderColor : priortyState == "medium" ? Color.orange : "white"}}
            title='Middle'
            onPress={() => priortySetter("medium")}/>
        <CustomButton   
            titleStyle = {{ color : Color.danger }}
            containerStyle = {{backgroundColor : Color.dangerBg, elevation : 0, flex : 1, borderWidth : 3, borderColor : priortyState == "high" ? Color.danger : "white"}}
            title='High'
            onPress={() => priortySetter("high")}/>
    </View>
  )
}

export default PriortySelector

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        width : "100%",
        gap : 10
    }
})