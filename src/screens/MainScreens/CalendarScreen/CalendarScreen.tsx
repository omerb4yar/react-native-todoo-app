import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native';
import { Calendar, DateData } from "react-native-calendars"
import Color from '../../../assets/Color';
import { useTodoContext } from '../../../context/TodoContext';
import useTodos from '../../../hooks/useTodos';
import { getAuth } from '@firebase/auth';
import TodoList from '../../../components/TodoList';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const auth = getAuth()

const CalendarScreen = () => {

	const {
		loadingTodos,
		todos,
		reloadTodos
	} = useTodoContext();

	const {
		todos: archivedTodos,
		reloadTodos: reloadArchivedTodos
	} = useTodos(auth.currentUser, { isArchived: true });

	useFocusEffect(
		useCallback(() => {
			reloadTodos();
			reloadArchivedTodos();
		}, [reloadTodos, reloadArchivedTodos])
	);

	const allTodos = useMemo(() => [...todos, ...archivedTodos], [todos, archivedTodos]);

	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<DateData>({
		year: today.getFullYear(),
		month: today.getMonth() + 1,
		day: today.getDate(),
		timestamp: today.getTime(),
		dateString: today.toISOString().split('T')[0],
	});

	const todosByDate = useMemo(() => allTodos.filter((t: any) => {
		if (!t.createdAt) return false;
		const createdDate = new Date(t.createdAt.seconds * 1000);
		const dateString = createdDate.toISOString().split('T')[0];
		return dateString === selectedDate.dateString;
	}), [allTodos, selectedDate]);

	const onDayPress = async (date: DateData) => {
		setSelectedDate(date);
	}


	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}>
				<Calendar
					markedDates={{
						[selectedDate!.dateString]: { selected: true, disableTouchEvent: true, selectedColor: Color.primary }
					}}
					onDayPress={(date) => onDayPress(date)} />

				<TodoList
					onTodoLongPress={() => { }}
					todoList={todosByDate}
					title='Todos'
					emptyListTitle='No todos found'
					loading={loadingTodos} />
			</ScrollView>
		</SafeAreaView>
	)
}

export default CalendarScreen