import {StyleSheet, Text, TouchableOpacity} from "react-native";

const ButtonComponent = ({title, onPress, backgroundColor, textColor, borderColor, filterButton}: {
	title: string,
	onPress?: () => void,
	backgroundColor: string,
	textColor: string,
	borderColor?: string,
	filterButton?: boolean
}) => {

	return (
		<TouchableOpacity
			style={[style.button, {
				backgroundColor: backgroundColor,
				borderColor: borderColor || 'transparent',
				borderRadius: filterButton ? 16 : 8
			}]}
			onPress={onPress}>
			<Text
				style={[style.buttonText, {color: textColor, marginHorizontal: filterButton ? 10 : 20}]}>{title}</Text>
		</TouchableOpacity>
	)
}

export default ButtonComponent;

const style = StyleSheet.create({
	button: {
		height: 40,
		borderWidth: 1,
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 16,
		alignSelf: "center"
	}
})