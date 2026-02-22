

import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Color from '../../assets/Color'
import Icon from "@react-native-vector-icons/material-design-icons"
import TodoCardStyle from './TodoCard.style'
import { BORDER_RADIOUS } from '../../constants/spacing'
import formatTime from '../../utils/formatTime'

type TodoStatus = "default" | "upcoming" | "overdue";

export interface TodoProps {
	id: string,
	content: string,
	isDone: boolean,
	deadlineTime: any,
	onPress: () => void,
	onLongPress: (id: string) => void,
	createdAt: any,
	title: string
	priority: "low" | "medium" | "high"
}

const TodoCard = ({
	id,
	content,
	isDone,
	createdAt,
	priority,
	deadlineTime,
	title,
	onPress,
	onLongPress,
}: TodoProps) => {


	let color = "";
	let backgroundColor = "";

	function getTodoStatus(deadline: number): TodoStatus {
		const now = Date.now();
		const diff = deadline - now;

		if (diff <= 0) return "overdue";
		if (diff <= 60 * 60 * 1000) return "upcoming";
		return "default";
	}

	const status = getTodoStatus(deadlineTime);

	switch (priority) {
		case "low":
			color = Color.primary;
			backgroundColor = Color.primaryBg;
			break;

		case "medium":
			color = Color.orange;
			backgroundColor = Color.orangeBg
			break;

		case 'high':
			color = Color.danger;
			backgroundColor = Color.dangerBg
			break;

		default:
			color = "red";
			break;
	}

	const PriortyText = () => {
		return (
			<Text style={{ color, fontWeight: "bold", fontSize: 15, backgroundColor, padding: 5, borderRadius: BORDER_RADIOUS }}>{priority}</Text>
		)
	}

	const HourCard = () => {

		const foreColorMap: Record<string, string> = {
			upcoming: Color.orange,
			overdue: Color.danger,
			default: Color.primary
		}

		const bgColorMap: Record<string, string> = {
			upcoming: Color.orangeBg,
			overdue: Color.dangerBg,
			default: Color.primaryBg
		}

		return (
			<View style={{ backgroundColor: bgColorMap[status], padding: 3, borderRadius: BORDER_RADIOUS, flexDirection: "row", alignItems: "center", gap: 2 }}>
				<Icon color={foreColorMap[status]} name='alarm' size={16} />
				<Text style={{ fontWeight: "bold", color: foreColorMap[status], fontSize: 12 }}>{formatTime(deadlineTime)}</Text>
			</View>
		)

	}




	return (
		<Pressable onLongPress={() => onLongPress(id)} android_ripple={{ color: "rgba(0, 0, 0, .05)", foreground: true }} onPress={onPress} style={[TodoCardStyle.container, isDone && { opacity: .8, elevation: 0 }]}>
			<View style={TodoCardStyle.top}>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
					<Icon name='pin' size={20} color={isDone ? "gray" : Color.lightblue} />
					<Text style={[TodoCardStyle.title, isDone && TodoCardStyle.doneText]}>{title}</Text>
				</View>
				<PriortyText />
			</View>

			<View style={TodoCardStyle.mid}>
				<Text style={TodoCardStyle.content}>{content}</Text>
			</View>

			<View style={TodoCardStyle.bottom}>

				<HourCard />

				{isDone && <Icon color={"white"} name="check" size={18} style={TodoCardStyle.icon} />}
			</View>
		</Pressable>
	)
}

export default TodoCard;