<template>
<div class="page">
    <div class="center">
        <h1 class="gradient-text">404</h1>
        <router-link to="/main"><h1>Are you lost?</h1></router-link>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.page {
    position: relative;
    background-color: white;
    height: 100vh;
    width: 100%;
}
.center {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.gradient-text {
    font-size: 175px;

    background-image: linear-gradient(30deg, rgba(65,9,121,1) 6%, rgba(0,255,207,1) 100%);
    background-size: 100%;
    background-repeat: repeat;

    background-clip: text;
    
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
}
</style>