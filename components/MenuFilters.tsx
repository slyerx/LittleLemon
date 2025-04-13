import {StyleSheet, View} from "react-native";
import ButtonComponent from "./ButtonComponent";
import {appColors} from "../assets/appColors";

const menuFilters = ({onChange, selections, sections}: {
	onChange: (index: number) => Promise<void>,
	selections: boolean[],
	sections: string[]
}) => {

	return (
		<View style={styles.filterButtonsContainer}>
			{sections.map((section, index) => (
					<ButtonComponent key={index}
									 title={section}
									 backgroundColor={selections[index] ? appColors.secondaryDark : appColors.secondaryGreen}
									 textColor={selections[index] ? appColors.secondaryLight : appColors.primaryGreen}
									 filterButton={true}
									 onPress={async () => {
										 await onChange(index)
									 }}/>
				)
			)}
		</View>
	)
}

export default menuFilters;

const styles = StyleSheet.create({
	filterButtonsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	}
})