<template>
  <div class="main">
    
    <div class="nav">
        <div class="navBtn">
            <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/></svg>
        </div>
        <div class="navBtn">
            <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9.29 16.29L6.7 13.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l5.88-5.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-6.59 6.59c-.38.39-1.02.39-1.41 0z"/></svg>
        </div>
        <div class="navBtn">
            <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M10,17H5v-2h5V17z M10,13H5v-2h5V13z M10,9H5V7h5V9z M14.82,15L12,12.16l1.41-1.41l1.41,1.42L17.99,9 l1.42,1.42L14.82,15z" fill-rule="evenodd"/></g></g></svg>
        </div>
        <div class="navBtn">
            <svg class="navIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
        </div>
    </div>

    <div class="app">
        <h1>Need to be auth</h1>
        <h2>NICKNAME:{{ user.nickname }}</h2>
        <h2>PASSWORD: {{ user.password }}</h2>
        <button v-on:click="logout($event)">Logout</button>
    </div>

  </div>
</template>

<script>
import store from '../store'
import router from '../router'
export default {
    name: 'Main',
    data () {
        return {
            user: store.state.user,
            activeComp: 0
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
.main {
    height: 100vh;
    background-color: #313131;
}
.nav {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    align-content: center;

    position: fixed;
    width: 75px;
    height: 100vh;

    background-color: #313131;
    padding: 25px;
}
.navBtn {
    padding: 9px;
    background-color: transparent;
    border: 0;
    border-radius: 50%;
}
.navIcon {
    height: 40px;
    width: 40px;
    fill: #33abfc;
    cursor: pointer;
    padding: 5px;
}
.app {
    margin-left: 75px;
}
</style>