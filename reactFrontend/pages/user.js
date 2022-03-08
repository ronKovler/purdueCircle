import AsyncStorage from '@react-native-async-storage/async-storage';

class UserAuth {
	constructor() {
		this.checkLogin().then(items => {
			this.isLoggedIn = true;
			this.userId = items[0].userID;
		}, () => {
			this.isLoggedIn = false
		})
	}

// TODO: add secondary auth key for persistent user sessions
	checkLogin = async () => {
		const key = JSON.parse(await AsyncStorage.getItem('user'))
		if (key !== -1) {
			const response = fetch(serverAddress + '/api/user/get_user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					'userID': id
				})
			})
			return Promise.resolve(JSON.parse(await response.json()))
		}
		return Promise.reject()
	}

	logout = async () => {
		try {
			await AsyncStorage.setItem('user', '-1')
			this.isLoggedIn = false;
			console.log('-1')
		} catch (error) {
			console.error(error)
		}
	}

	login = async (userID) => {
		try {
			await AsyncStorage.setItem('user', userID)
			this.isLoggedIn = true;
			this.userId = userID;
		} catch (error) {
			console.error(error)
		}
	}

	async getUserId() {
		let no = await AsyncStorage.getItem('user')
		return JSON.parse(no)
	}
}

let User = new UserAuth();

export default User