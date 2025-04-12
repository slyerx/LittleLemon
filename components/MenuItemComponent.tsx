import {Image, StyleSheet, Text, View} from "react-native";
import {appColors} from "../assets/appColors";

const MenuItemComponent = ({item}: { item: MenuItem }) => {

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.itemName}>{item.name}</Text>

			<View style={styles.detailsContainer}>
				<View style={styles.priceDescriptionColumn}>
					<Text style={styles.descriptionText}
						  numberOfLines={2}>{item.description}</Text>
					<Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
				</View>

				<Image
					source={{
						uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`
					}}
					style={styles.itemImage}
					resizeMode="cover"
				/>
			</View>
		</View>
	)
}

export default MenuItemComponent;

const styles = StyleSheet.create({
	mainContainer: {
		padding: 20
	},
	itemName: {
		fontWeight: 'bold',
		fontSize: 20
	},
	detailsContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	priceDescriptionColumn: {
		flex: 1,
		flexDirection: 'column',
		flexShrink: 1,
		justifyContent: 'space-between'
	},
	descriptionText: {
		marginTop: 15,
		fontSize: 16
	},
	priceText: {
		fontSize: 16,
		color: appColors.primaryGreen
	},
	itemImage: {
		width: 80,
		height: 100,
		marginLeft: 12
	}
})