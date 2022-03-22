import AsyncStorage from '@react-native-async-storage/async-storage';

class UserAuth {
	constructor() {
		this.userId = -1;
		this.username = null;
	}

// TODO: add secondary auth key for persistent user sessions
	checkLogin = async () => {
		const key = await AsyncStorage.getItem('user')
		if (key !== -1) {
			const response = await fetch(serverAddress + '/api/user/get_user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin': serverAddress,
				},
				body: JSON.stringify({
					'userId': key
				})
			})
			this.userId = key;
			return Promise.resolve(await response.json())
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