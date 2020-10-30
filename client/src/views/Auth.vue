<template>
    <div class="page">
        <router-link to="/">
            <svg class="minLogo" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M2,3v18h20V3H2z M10,17H5v-2h5V17z M10,13H5v-2h5V13z M10,9H5V7h5V9z M14.82,15 L12,12.16l1.41-1.41l1.41,1.42L17.99,9l1.42,1.42L14.82,15z" fill-rule="evenodd"/></g></g></svg>
        </router-link>
        <Auth class="center"/>
    </div>
</template>

<script>
import Auth from '@/components/auth.vue'
export default {
    name: 'Authenticate',
    components: {
        Auth
    }
}
</script>

<style scoped>
.minLogo {
    height: 50px;
    width: 50px;
    margin: 10px;
    transition: .5s;
}
.minLogo:hover {
    fill: #0099FF;
}
.leftSide {
    position: fixed;
    float: left;
    height: 100vh;
    width: 600px;
    background-color: white;
}
.center {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>