import AsyncStorage from '@react-native-async-storage/async-storage';

class UserAuth {
	constructor() {
		this.userID = -1;
		this.username = null;
		this.isLoggedIn = false;
		this.firstName = null;
		this.lastName = null;
		this.password = null;
		this.profilePicture = null;
		this.isPrivate = false;
	}

// TODO: add secondary auth key for persistent user sessions
	checkLogin = async () => {
		const key = JSON.parse(await AsyncStorage.getItem('user'))
		if (key !== -1 && key !== null) {
			const response = await fetch(serverAddress + '/api/user/get_user/' + key, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin': serverAddress,
				}//,
				// body: JSON.stringify({
				// 	'userID': key
				// }
				// )
			})
			this.userID = key;
			return Promise.resolve(await response.json())
		}
		return Promise.reject()
	}

	logout = async () => {
		try {
			await AsyncStorage.setItem('user', '-1')
			this.userID = -1;
			this.profilePicture = null;
			this.firstName = null;
			this.isPrivate = false;
			this.isLoggedIn = false;
			this.lastName = null;
			this.password = null;
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
			this.userID = userID;
		} catch (error) {
			console.error(error)
		}
	}

	async getuserID() {
		let no = await AsyncStorage.getItem('user')
		return JSON.parse(no)
	}
}

let User = new UserAuth();

export default User