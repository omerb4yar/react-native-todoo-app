import { Keyboard } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomSheet from '@gorhom/bottom-sheet'
import AddButton from '../../../components/AddButton'
import Header from '../../../components/Header'
import { Button as PaperButton, Dialog, Portal, PaperProvider, Text as PaperText } from 'react-native-paper';
import HomeStyle from './HomeScreen.style'
import AddTodoBottomSheet from '../../../components/BottomSheets/AddTodoBottomSheet'
import { showMessage } from 'react-native-flash-message'
import { getAuth } from '@firebase/auth'
import Color from '../../../assets/Color'
import ProgressBarCard from '../../../components/ProgressBarCard'
import { useTodoContext } from '../../../context/TodoContext'
import TodoList from '../../../components/TodoList'
import { ScrollView } from 'react-native-gesture-handler'
import { TodoProps } from '../../../components/TodoCard/TodoCard'

const auth = getAuth();

const HomeScreen = () => {


	const [progress, setProgress] = useState<number>(0);

	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["95"], []);

	function isOverdue(deadline: number, completed: boolean) {
		const now = Date.now();
		return !completed && deadline <= now;
	}

	const {
		todos,
		loadingTodos,

		addTodo,
		addingTodo,

		archiveTodo,
		archivingTodo,

		complateTodo,
		complatingTodo,

		reloadTodos

	} = useTodoContext();


	useEffect(() => {
		setProgress(calcProgress())
	}, [todos])


	const [selectedTodoId, setSelectedTodoId] = useState<string>("");

	const complatedTodos = useMemo(() => todos.filter((t: any) => t.isDone), [todos]);
	const activeTodos = useMemo(() => todos.filter((t: any) => !t.isDone && !isOverdue(t.deadlineTime, t.isDone)), [todos]);
	const overdueTodos = useMemo(() => todos.filter((t: any) => isOverdue(t.deadlineTime, t.isDone)), [todos])

	const calcProgress = (): number => {
		const value = todos.length === 0 ? 0 : (complatedTodos.length / todos.length) * 100;
		const roundedValue = Math.round(value);
		return roundedValue;
	}

	const [dialogVisible, setDialogVisible] = useState<boolean>(false);

	const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false);

	const [deleteAllDialogVisible, setDeleteAllDialogVisible] = useState<boolean>(false);

	const showDialog = () => setDialogVisible(true);

	const hideDialog = () => setDialogVisible(false);

	const showDeleteDialog = () => setDeleteDialogVisible(true);

	const hideDeleteDialog = () => setDeleteDialogVisible(false)

	const showDeleteAllDialog = () => setDeleteAllDialogVisible(true);

	const hideDeleteAllDialog = () => setDeleteAllDialogVisible(false)


	const handleDeleteTodo = async () => {

		try {
			await archiveTodo(selectedTodoId);
			hideDeleteDialog();
			showMessage({ type: "warning", icon: "warning", message: "Todo successfully deleted" })

		} catch (error: any) {
			showMessage({ type: "danger", icon: "danger", message: error.message || error.code || "An unknown error occurred" })
		}
	}

	const handleDeleteAllTodos = async () => {
		try {

			await Promise.all(
				complatedTodos.map(async (todo: any) => {
					await archiveTodo(todo.id);
				})
			);

			hideDeleteAllDialog();
			showMessage({ type: "warning", icon: "warning", message: "All complated todos successfully deleted" })

		} catch (error: any) {
			showMessage({ type: "danger", icon: "danger", message: error.message || error.code || "An unknown error occurred" })
		}
	}

	const handleSetTodoDone = async () => {


		if (!auth.currentUser) {
			showMessage({ message: "Something went wrong", type: "danger", icon: "danger" });
			return;
		}

		try {
			await complateTodo(selectedTodoId);

			hideDialog();
			showMessage({ message: "Todo complated successfully!", icon: "success", type: "success" });

		} catch (error: any) {
			showMessage({ type: "danger", icon: "danger", message: error.message || error.code || "An unknown error occurred" })
		}
	}

	const handleAddTodo = async (title: string, content: string, priority: TodoProps["priority"], deadline: number) => {

		if (!auth.currentUser) {
			showMessage({ message: "Something went wrong", type: "danger", icon: "danger" });
			return;
		}

		if (content.length <= 10) {
			showMessage({ message: "Content must be at least 10 char longs !", type: "danger", icon: "danger" })
			return;
		}

		if (title.length <= 5) {
			showMessage({ message: "Title must be at least 5 char longs", type: "danger", icon: "danger" });
			return;
		}

		try {

			await addTodo(content, title, priority, deadline);

			showMessage({ type: "success", icon: "success", message: "Todo successfully added" })
			Keyboard.dismiss();
			bottomSheetRef.current?.close();

		} catch (error: any) {
			showMessage({ type: "danger", icon: "danger", message: error.message || error.code || "An unknown error occurred" })
		}
	}

	return (
		<PaperProvider>
			<SafeAreaView style={HomeStyle.container}>
				<Header />

				<ProgressBarCard progress={progress} />

				<ScrollView style={{ width: "100%" }}>
					{
						overdueTodos.length > 0 ?
							<TodoList
								todoList={overdueTodos}
								onTodoLongPress={(id) => { setSelectedTodoId(id), showDialog() }}
								title='Overdue Todos'
								loading={loadingTodos} />
							:
							null
					}

					<TodoList
						title='Active Todos'
						onTodoLongPress={(id) => { setSelectedTodoId(id), showDialog(); }}
						loading={loadingTodos}
						todoList={activeTodos}
						emptyListTitle="You dont have any todos yet press  '+'  for add todo" />


					<TodoList
						onAllDelete={showDeleteAllDialog}
						todoList={complatedTodos}
						loading={loadingTodos}
						onTodoLongPress={(id) => { setSelectedTodoId(id), showDeleteDialog() }}
						title='Complated Todos' />
				</ScrollView>


				<AddTodoBottomSheet
					loading={addingTodo}
					onSubmit={handleAddTodo}
					ref={bottomSheetRef}
					children={null}
					keyboardBehavior='interactive'
					index={-11}
					enablePanDownToClose
					snapPoints={snapPoints}
				/>


				<AddButton
					style={HomeStyle.button}
					onPress={() => bottomSheetRef.current?.expand()} />


				<Portal>
					<Dialog visible={dialogVisible} onDismiss={hideDialog}>
						<Dialog.Title style={{ color: Color.primary }}>Complate Todo</Dialog.Title>
						<Dialog.Content>
							<PaperText variant="bodyMedium">Are you sure you want to complete this task?</PaperText>
						</Dialog.Content>
						<Dialog.Actions>
							<PaperButton labelStyle={{ color: Color.generateGray(.4) }} role='complementary' onPress={hideDialog}>No</PaperButton>
							<PaperButton loading={complatingTodo} disabled={complatingTodo} labelStyle={{ color: Color.primary }} role='complementary' onPress={handleSetTodoDone}>Yes, Im sure</PaperButton>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<Portal>
					<Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
						<Dialog.Title style={{ color: Color.primary }}>Delete Todo</Dialog.Title>
						<Dialog.Content>
							<PaperText variant="bodyMedium">Are you sure you want to delete this complated task?</PaperText>
						</Dialog.Content>
						<Dialog.Actions>
							<PaperButton labelStyle={{ color: Color.generateGray(.4) }} role='complementary' onPress={hideDeleteDialog}>No</PaperButton>
							<PaperButton loading={archivingTodo} disabled={archivingTodo} labelStyle={{ color: Color.primary }} role='complementary' onPress={handleDeleteTodo}>Delete</PaperButton>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<Portal>
					<Dialog visible={deleteAllDialogVisible} onDismiss={hideDeleteAllDialog}>
						<Dialog.Title style={{ color: Color.primary }}>Delete Todo</Dialog.Title>
						<Dialog.Content>
							<PaperText variant="bodyMedium">Are you sure you want to delete all complated tasks?</PaperText>
						</Dialog.Content>
						<Dialog.Actions>
							<PaperButton labelStyle={{ color: Color.generateGray(.4) }} role='complementary' onPress={hideDeleteAllDialog}>No</PaperButton>
							<PaperButton loading={archivingTodo} disabled={archivingTodo} labelStyle={{ color: Color.primary }} role='complementary' onPress={handleDeleteAllTodos}>Delete All</PaperButton>
						</Dialog.Actions>
					</Dialog>
				</Portal>


			</SafeAreaView>
		</PaperProvider>
	)
}



export default HomeScreen
