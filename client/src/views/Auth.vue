<template>
    <div class="page">
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