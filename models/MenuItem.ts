interface MenuItem {
	name: string,
	price: number,
	description: string,
	image: string,
	category: string
}

interface Menu {
	menu: MenuItem[]
}