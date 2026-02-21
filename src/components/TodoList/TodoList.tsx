

import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import TodoListStyle from './TodoList.style'
import Color from '../../assets/Color'
import Todo from '../../models/Todo'
import TodoCard from '../TodoCard'
import EmptyTodoList from '../EmptyTodoList'
import TextButton from '../TextButton'
import { IconButton } from 'react-native-paper'
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons'

interface TodoListProps {
    todoList: Todo[],
    title: string,
    emptyListTitle?: string,
    onAllDelete?: () => void,
    loading: boolean,
    onTodoLongPress: (id: string) => void
}

const TodoList = ({ todoList, title, emptyListTitle, loading, onTodoLongPress, onAllDelete }: TodoListProps) => {
    return (
        <View style={TodoListStyle.container}>

            <View style={TodoListStyle.header}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Text style={{ color: Color.lightblue, fontWeight: "bold", fontSize: 13 }}>{title}</Text>
                    <Text style={{ color: Color.lightblue, fontWeight: "bold", fontSize: 13 }} >({todoList.length})</Text>
                </View>
                {title == "Complated Todos" ?
                    <IconButton style={{ width: 20, height: 20 }} onPress={onAllDelete} hitSlop={12} icon={() => <MaterialDesignIcons name='trash-can' size={20} color={Color.danger} />} />
                    : null}
            </View>

            {todoList.length == 0 && emptyListTitle ? <EmptyTodoList title={emptyListTitle} /> : null}

            {loading ? <ActivityIndicator style={{ marginTop: 30 }} size={30} color={Color.primary} /> :

                <FlatList
                    scrollEnabled={false}
                    style={{ flexGrow: 0, width: "100%" }}
                    contentContainerStyle={{ rowGap: 10, padding: 20, marginTop: 0, width: "100%" }}
                    renderItem={({ item, index }) => {

                        return <TodoCard
                            deadlineTime={item.deadlineTime}
                            id={item.id}
                            key={index}
                            title={item.title}
                            priority={item.priority}
                            onPress={() => { }}
                            onLongPress={onTodoLongPress}
                            isDone={item.isDone}
                            createdAt={item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()}
                            content={item.content} />
                    }}

                    data={todoList} />
            }

        </View>
    )
}

export default TodoList