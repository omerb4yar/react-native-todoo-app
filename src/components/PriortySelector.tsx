import { StyleSheet, Text, View } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import CustomButton from './CustomButton/CustomButton'
import Color from '../assets/Color'
import { TodoProps } from '../types/components/ToDoItemType'

type PriortySelectorType = {
    setPriorty : React.Dispatch<SetStateAction<TodoProps["priority"]>>
}

const PriortySelector = (
    { setPriorty } : PriortySelectorType
) => {

    const [selectedButton, setSelectedButton] = useState<TodoProps["priority"] | undefined>(undefined);

    const priortySetter = (priority : TodoProps["priority"]) => {
        setSelectedButton(priority);
        setPriorty(priority)
    }

  return (
    <View style = {styles.container}>
        <CustomButton
            titleStyle = {{ color : Color.primary }}
            containerStyle = {{backgroundColor : Color.primaryBg, elevation : 0, flex : 1, borderWidth : 3, borderColor : selectedButton == "low" ? Color.primary : "white"}}
            title='Low'
            onPress={() => priortySetter("low")}/>
        <CustomButton
            titleStyle = {{ color : Color.orange }}
            containerStyle = {{backgroundColor : Color.orangeBg, elevation : 0, flex : 1, borderWidth : 3, borderColor : selectedButton == "medium" ? Color.orange : "white"}}
            title='Middle'
            onPress={() => priortySetter("medium")}/>
        <CustomButton   
            titleStyle = {{ color : Color.danger }}
            containerStyle = {{backgroundColor : Color.dangerBg, elevation : 0, flex : 1, borderWidth : 3, borderColor : selectedButton == "high" ? Color.danger : "white"}}
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