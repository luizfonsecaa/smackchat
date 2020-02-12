import Vue from 'vue'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
let messagesRef = ''

const state = {
  userDetails: {},
  users: {},
  messages: {},
}

const mutations = {
	setUserDetails(state, payload){
		state.userDetails = payload
	},

	addUser(state, payload){
		Vue.set(state.users, payload.userId, payload.userDetails)
	},

	updateUser(state, payload) {
		Object.assign(state.users[payload.userId], payload.userDetails)
	},

	addMessage(state, payload) {
		Vue.set(state.messages, payload.messageId, payload.messageDetails)
	},

	clearMessages() {
		state.messages = {}
	}
}

const actions = {
	async registerUser({}, payload) {
		try {
			await firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
			let userId = firebaseAuth.currentUser.uid
			firebaseDb.ref('users/' + userId).set({
				name:payload.name,
				email:payload.email,
				online: true
			})
		}
		catch(e) {
				console.log(e)
		}
	},

	async loginUser({}, payload) {
		try {
			let user = await firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
		}
		catch(e) {
			console.log(e)
		}
	},

	async logoutUser() { 
		//promisse <void> 
		await firebaseAuth.signOut()
	},

	hundleAuthStateChanged({ commit, dispatch, state }) {
		firebaseAuth.onAuthStateChanged(user => {
				if (user) {
					let userId = firebaseAuth.currentUser.uid
					firebaseDb.ref('users/' + userId).once('value', snapshot => {
						let userDetails = snapshot.val()
						commit('setUserDetails', {
							name:userDetails.name,
							email:userDetails.email,
							userId:userId,
						})
					})

					dispatch('firebaseUpdateUser', {
						userId: userId,
						updates:{
							online: true
						}
					})
					dispatch('firebaseGetUsers')
					this.$router.push('/')
				} else {
					let userId = state.userDetails.userId
					if(userId) {
						dispatch('firebaseUpdateUser', {
							userId,
							updates:{
								online: false
							}
						})
					}
					
					commit('setUserDetails', {})
					if(this.$router.history.current.fullPath != '/auth') {
						this.$router.push('/auth')
					}
				}
		});
	},

	firebaseUpdateUser({}, payload) {
		firebaseDb.ref('users/'+ payload.userId ).update(payload.updates)
	},

	firebaseGetUsers({ commit }) {
		firebaseDb.ref('users').on('child_added', snapshot => {
			let userDetails = snapshot.val()
			let userId = snapshot.key
			commit('addUser', {
				userId,
				userDetails
			})
		})

		firebaseDb.ref('users').on('child_changed', snapshot => {
			let userDetails = snapshot.val()
			let userId = snapshot.key
			commit('updateUser', {
				userId,
				userDetails
			})
		})
	},

	firebaseGetMessages({ commit, state }, otherUserId) {
		let userId = state.userDetails.userId
		messagesRef = firebaseDb.ref(`chats/${userId}/${otherUserId}`)
		messagesRef.on('child_added', snapshot => {
			let messageDetails = snapshot.val()
			let messageId = snapshot.key
			commit('addMessage', {
				messageId,
				messageDetails
			})

		})
	},

	firebaseStopGettingMessages({ commit }) {
		if(messagesRef) messagesRef.off('child_added')
		commit('clearMessages')
	},

	firebaseSendMessage({}, payload) {
		firebaseDb.ref(`chats/${state.userDetails.userId}/${payload.otherUserId}`).push(payload.message)
		payload.message.from = 'them'
		firebaseDb.ref(`chats/${payload.otherUserId}/${state.userDetails.userId}`).push(payload.message)

	}
}

const getters = {
	users: state => {
		let userFiltered = {}
		Object.keys(state.users).map(key => {
			if(key !== state.userDetails.userId){
				userFiltered[key] = state.users[key]
			}
		})
		return userFiltered
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
