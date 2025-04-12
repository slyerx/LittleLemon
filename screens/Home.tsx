import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useLayoutEffect, useState} from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {appColors} from "../assets/appColors";
import DefaultProfilePicture from "../components/DefaultProfilePicture";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetch} from "expo/fetch";
import MenuItemComponent from "../components/MenuItemComponent";
import {createTable, getAllItems, saveMenuItems} from "../services/sqlite";
import ButtonComponent from "../components/ButtonComponent";

const Home = ({route, navigation}: any) => {

	const [image, setImage] = useState('');
	const [userInitials, setUserInitials] = useState('');

	const [menuData, setMenuData] = useState<MenuItem[]>();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Image
					source={require('../assets/images/Logo.png')}
					style={styles.headerImage}
				/>
			),
			headerRight: () => (
				<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
					{image === '' ? (
						<DefaultProfilePicture userInitials={userInitials} header={true}/>
					) : (
						<Image
							source={{uri: image}}
							style={styles.headerProfileImage}
						/>
					)}
				</TouchableOpacity>
			)
		});
	}, [navigation, userInitials, image]);

	useLayoutEffect(() => {
		return navigation.addListener('focus', () => {
			getDataFromStorage().then(() => {
				console.log("Data loaded on focus");
			});
		});
	}, [navigation]);


	useEffect(() => {
		getDataFromStorage().then(() => {
			console.log("Loaded data")
		});

		getLocalMenuData().then((data) => {
			if (data === undefined) {
				createTable().then(() => console.log("Table Created"))

				fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
					.then((response) => response.json())
					.then((data: Menu) => {
						setMenuData(data.menu)
						saveMenuItems(data.menu).then(() => console.log("Data Saved"))
						console.log(JSON.stringify(data, null, 4))
					})

				return;
			}

			setMenuData(data as MenuItem[])
		})
	}, [])

	const getLocalMenuData = async () => {
		try {
			return await getAllItems();
		} catch (e) {
			// does not exist
			console.log(e)
			return undefined;
		}
	}

	const getDataFromStorage = async () => {
		try {
			const values = await AsyncStorage.multiGet([
				'image',
				'firstName',
				'lastName',
			]);

			// serialize
			const data: any = values.reduce((acc: { [key: string]: any }, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {});

			setImage(data.image || '');

			if (data.lastName) {
				setUserInitials(`${data.firstName[0].toUpperCase()}${data.lastName[0].toUpperCase()}`);
			} else {
				setUserInitials(data.firstName[0]?.toUpperCase() ?? '');
			}

		} catch (e) {
			console.error('Failed to load data from storage:', e);
		}
	};


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.heroContainer}>

				<Text style={styles.heroTitle}>Little Lemon</Text>
				<View style={{flexDirection: 'row'}}>

					<View style={styles.heroDescriptionContainer}>
						<Text style={styles.heroSubtitle}>Chicago</Text>
						<Text style={styles.heroDescription}>We are a family owned Mediterranean restaurant, focused on
							traditional recipes served with a modern twist.</Text>
					</View>
					<Image style={styles.heroImage} source={require('../assets/images/Hero image.png')}/>
				</View>

				<View style={styles.searchContainer}>
					<TouchableOpacity style={styles.searchButton}>
						<FontAwesome name="search" size={25} color={appColors.primaryGreen}/>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.filterContainer}>
				<Text style={styles.orderText}>ORDER FOR DELIVERY!</Text>
				<View style={styles.filterButtonsContainer}>
					<ButtonComponent title={'Starters'} backgroundColor={appColors.secondaryGreen}
									 textColor={appColors.primaryGreen} filterButton={true}/>
					<ButtonComponent title={'Mains'} backgroundColor={appColors.secondaryGreen}
									 textColor={appColors.primaryGreen} filterButton={true}/>
					<ButtonComponent title={'Desserts'} backgroundColor={appColors.secondaryGreen}
									 textColor={appColors.primaryGreen} filterButton={true}/>
					<ButtonComponent title={'Drinks'} backgroundColor={appColors.secondaryGreen}
									 textColor={appColors.primaryGreen} filterButton={true}/>
				</View>
			</View>

			<View style={styles.separator}/>

			<FlatList style={{flex: 1}}
					  data={menuData}
					  keyExtractor={(item) => item.name}
					  renderItem={({item}) => (<MenuItemComponent item={item}/>)}
					  ItemSeparatorComponent={() => <View style={styles.separator}/>}
			/>
		</SafeAreaView>
	)
}

export default Home;

const styles = StyleSheet.create({
	headerImage: {
		width: 150,
		height: 40,
		resizeMode: 'contain'
	},
	headerProfileImage: {
		height: 40,
		width: 40,
		borderRadius: 20
	},
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	separator: {
		height: 1,
		marginHorizontal: 20,
		backgroundColor: appColors.highlightLight
	},
	heroContainer: {
		padding: 20,
		backgroundColor: appColors.primaryGreen,
	},
	heroTitle: {
		fontSize: 48,
		color: appColors.primaryYellow,
	},
	heroDescriptionContainer: {
		flex: 1,
		flexShrink: 1
	},
	heroSubtitle: {
		fontSize: 28,
		color: 'white'
	},
	heroDescription: {
		marginTop: 10,
		marginRight: 10,
		fontSize: 18,
		color: 'white'
	},
	heroImage: {
		height: 160,
		width: 140,
		borderRadius: 16,
		alignSelf: "center"
	},
	searchContainer: {
		marginTop: 10,
		marginLeft: 10,
	},
	searchButton: {
		backgroundColor: appColors.secondaryGreen,
		height: 50,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25
	},
	filterContainer: {
		height: 120,
		padding: 20,
	},
	orderText: {
		height: 40,
		fontSize: 20,
	},
	filterButtonsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	}
});