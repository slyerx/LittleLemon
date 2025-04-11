import {StyleSheet, Text, View} from "react-native";
import {appColors} from "../assets/appColors";

const defaultProfilePicture = ({userInitials, header}: { userInitials: string, header?: boolean }) => {
	return (
		<View style={[styles.container, header && styles.headerContainer]}>
			<Text style={[styles.text, header && styles.headerText]}>{userInitials}</Text>
		</View>
	)
}

export default defaultProfilePicture;

const styles = StyleSheet.create({
	container: {
		height: 80,
		width: 80,
		borderRadius: 40,
		backgroundColor: appColors.primaryGreen,
		alignItems: "center",
		justifyContent: "center"
	},
	headerContainer: {
		height: 40,  // Half of the default height
		width: 40,   // Half of the default width
	},
	text: {
		color: 'white',
		fontSize: 30
	},
	headerText: {
		fontSize: 15
	}
})