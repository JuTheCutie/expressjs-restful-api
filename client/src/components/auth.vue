<template>
<div class="auth">

	<div v-if="alert" class="alert alert-danger" role="alert">
		{{ alert }}
	</div>

	<form v-if="isLogin" class="login">
		<h1>Sign In</h1><br><br>
		<input required v-model="nickname" type="text" placeholder="Nickname"><br>
		<input required v-model="password" type="password" placeholder="Password"><br>
		<div class="center">
			<button v-on:click="login($event)" class="btn">
			<svg class="btnEnter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/></svg>
			</button><br>
			<small v-on:click="changeIsLogin" class="link">Aren't you already registered?</small>
		</div>
	</form>

	<form v-else class="register">
		<h1>Sign Up</h1><br><br>
		<input required v-model="name" type="text" placeholder="Full name"><br>
		<input required v-model="nickname" type="text" placeholder="Nickname"><br>
		<input required v-model="email" type="email" placeholder="Email"><br>
		<input required v-model="password" type="password" placeholder="Password"><br>
		<input required v-model="reTypePassword" type="password" placeholder="Retype Password"><br>
		<div class="center">
			<button v-on:click="signUp($event)" class="btn">
				<svg class="btnEnter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/></svg>	
			</button><br>
			<small v-on:click="changeIsLogin" class="link">I already have an account</small>
		</div>
	</form>

</div>
</template>

<script>
import store from '../store'
import router from '../router'
export default {
	name: 'Auth',
	data() {
		return {
			isLogin: true,
			name: "",
			nickname: "",
			password: "",
			reTypePassword: "",
			email: "",
			alert: ""
		}
	},
	methods: {
		changeIsLogin () {
			this.isLogin = !this.isLogin
		},
		login (event) {
			event.preventDefault();
			if (this.nickname == "" || this.password == "") {
				this.alert = "Oops you forgot to type something"
			} else {
				store.dispatch('login', { nickname: this.nickname, password: this.password  })
				router.replace({ name: "Main" });
			}
		},
		signUp () {
			event.preventDefault();
			if (this.name == "" || this.nickname == "" || this.email == "" || this.password == "" || this.reTypePassword == "") {
				this.alert = "Oops you forgot to type something"
			} else {
				if (!this.email.includes("@")) {
					this.alert = "Retype your email"
				} else {
					if (this.password !== this.reTypePassword) {
						this.alert = "Password doesn't match"
					} else {
						this.alert = "Correct"
					}
				}
			}
		}
	}
}
</script>

<style scoped>
.center {
	text-align: center;
}
.auth{
	width: 400px;
	padding: 10px;
}
input{
	width: 375px;
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	border: solid 3px #BDBDBD;
	border-radius: 5px;
}
.btn{
	width: 100px;
	height: 100px;
	margin: 76px;
	border: solid 1.75px #BDBDBD;
	border-radius: 20px;
	transition: .25s;
}
.btnEnter {
	width: 100%;
	height: 100%;
	fill: #0099FF;
	transition: .25s;
}
.btn:hover {
	background-color: #0099FF;
}
.btnEnter:hover {
	fill: white;
}
.link{
	color: blue
}
.link:hover{
	cursor: pointer;
}
</style>
