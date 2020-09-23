<template>
  <div class="about">
    <h1>Need to be auth</h1>
    <h2>NICKNAME:{{ user.nickname }}</h2>
    <h2>PASSWORD: {{ user.password }}</h2>
    <button v-on:click="logout($event)">Logout</button>
  </div>
</template>

<script>
import store from '../store'
import router from '../router'
export default {
    name: 'Main',
    data () {
        return {
            user: store.state.user
        }
    },
    methods: {
        logout (event) {
            event.preventDefault();
            store.dispatch('logout');
            router.replace({ name: 'Home' });
        }
    }
}
</script>

<style scoped>

</style>