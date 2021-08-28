import { Connection, Query } from 'mysql';
import * as config from 'config';

class MysqlService {
	private initSuccess = false;
	private connection: Connection;

	constructor() {
	}

	init() {
		const dbConfig = config.get('database.default');
		let mysql = require('mysql');
		this.connection = mysql.createConnection(dbConfig);
		try {
			this.connection.connect();
			this.initSuccess = true;
		} catch ($e) {
			console.log('error catch: ', $e);
		}
	}


	async query(sql: string, arg: any[]): Promise<Query> {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, arg, function (error, results) {
				if (error) {
					reject(error);
				}
				resolve(results);
			});
		});
	}

	getGroup(uid: number) {
		return uid % 10;
	}

	async select(uid: number) {
		let group = this.getGroup(uid);
		let sql = 'SELECT * FROM `test_A_' + group + '` WHERE uid = ?';
		let arg = [ uid ];
		return await this.query(sql, arg);
	}


	async insert(uid: number) {
		let group = this.getGroup(uid);
		let sql = "INSERT INTO `test_A_" + group + "` (`uid`, `name`, `gender`, `data`) VALUES (?, \'asdf\', 1, ?)";
		let dataSize = Math.round(Math.random() * 20);
		let data = [ ...Array(dataSize) ].map(x => Math.round(Math.random() * 255)).join(',')
		let arg = [ uid, data ];
		return await this.query(sql, arg);
	}

	async update(uid: number) {
		let group = this.getGroup(uid);
		let name = [ ...Array(10) ].map(x => Math.round(Math.random() * 255)).join('')
		let sql = 'UPDATE `test_A_' + group + '` set name = ? WHERE uid = ?';
		let data = [ ...Array(group) ].map(x => Math.round(Math.random() * 255)).join(',')
		let arg = [ name, uid ];
		return await this.query(sql, arg);
	}
}

let mysqlService = new MysqlService();
export default mysqlService;
