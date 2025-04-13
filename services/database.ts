import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('little_lemon');

export async function createTable() {
	return db.runAsync('create table if not exists menuitems (id integer primary key not null, name text, price number, description text, image text, category text);');
}

export async function dropTable() {
	return db.runAsync('DROP TABLE IF EXISTS menuitems')
}

export async function getAllItems() {
	return await db.getAllAsync('SELECT * FROM menuitems');
}

export async function saveMenuItems(menuItems: MenuItem[]) {
	try {

		for (const item of menuItems) {
			await db.runAsync('INSERT INTO menuitems (name, price, description, image, category) VALUES (?,?,?,?,?)',
				[item.name, item.price, item.description, item.image, item.category]
			)
		}
	} catch (e) {
		console.log(e)
	}
}

export async function filterByQueryAndCategories(query: string, activeCategories: string[]): Promise<MenuItem[]> {
	const formattedQuery = `%${query}%`;
	const placeholders = activeCategories.map(() => '?').join(', ');


	return await db.getAllAsync(`SELECT *
                                 FROM menuitems
                                 WHERE name LIKE ? COLLATE NOCASE
                                   AND category COLLATE NOCASE IN (${placeholders})`,
		[formattedQuery, ...activeCategories]);
}