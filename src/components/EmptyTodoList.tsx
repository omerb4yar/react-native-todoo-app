import { Image, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'

interface EmptyTodoListProps extends ViewProps {
  title : string
}

const EmptyTodoList = ({title, ...props} : EmptyTodoListProps) => {
  return (
    <View style = {styles.container} {...props} >
      <Image style = {{width : 50, height : 50}} resizeMode = 'contain' source={require("../assets/box.png")}/>
      <Text style = {styles.title}>{title}</Text>
    </View>
  )
}

export default EmptyTodoList

const styles = StyleSheet.create({
    container : {
        width : 160,
        flexDirection : "row",
        alignItems  :"center",
        justifyContent : "center",
        gap : 10,
        marginTop : 30
    },

    title : {
        fontWeight : "500",
        fontSize : 12,
        color : "gray"
    }
})