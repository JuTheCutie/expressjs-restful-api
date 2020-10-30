<template>
    <div class="home">
        <div class="leftSide">
            <svg class="minLogo" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M2,3v18h20V3H2z M10,17H5v-2h5V17z M10,13H5v-2h5V13z M10,9H5V7h5V9z M14.82,15 L12,12.16l1.41-1.41l1.41,1.42L17.99,9l1.42,1.42L14.82,15z" fill-rule="evenodd"/></g></g></svg>
            <Auth class="auth"/>
        </div>
        <div class="rightSide">
            <div class="entry">
                <div class="center">
                    <svg class="maxLogo" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M2,3v18h20V3H2z M10,17H5v-2h5V17z M10,13H5v-2h5V13z M10,9H5V7h5V9z M14.82,15 L12,12.16l1.41-1.41l1.41,1.42L17.99,9l1.42,1.42L14.82,15z" fill-rule="evenodd"/></g></g></svg>
                    <br><b>ProjectCheck</b>
                    <router-link class="SignUpBtn" to="/auth"><h3>SignUp</h3></router-link>
                </div>
            </div>
            <div class="postEntry">
                <h1>Why You Should Use ProjectCheck?</h1><br><br>
                <div class="introItem">
                    <h3>Free Your Mind</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate nostrum iste esse autem nisi itaque recusandae hic magnam voluptatibus tempore. Cum, repellendus nobis. Fuga vitae soluta architecto fugiat voluptatem temporibus?</p>
                    <img class="introImg" src="../assets/img/todolist.png" alt="introImg">
                </div><br><br>
                <div class="introItem">
                    <h3>Free Your Mind</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate nostrum iste esse autem nisi itaque recusandae hic magnam voluptatibus tempore. Cum, repellendus nobis. Fuga vitae soluta architecto fugiat voluptatem temporibus?</p>
                    <img class="introImg" src="../assets/img/collaboration.png" alt="introImg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/auth.vue'

export default {
    name: 'Home',
    components: {
        Auth
    }
}
</script>

<style scoped>
.introItem {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: center;
}
.introImg {
    width: 75%;
}
.leftSide {
    position: fixed;
    float: left;
    height: 100vh;
    width: 600px;
    background-color: white;
}
.minLogo {
    height: 50px;
    width: 50px;
    margin: 10px;
}
.auth {
    position: absolute;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
.rightSide {
    margin-left: 600px;
}
.entry {
    position: relative;
    text-align: center;
    height: 100vh;
    background: linear-gradient(30deg, rgba(65,9,121,1) 6%, rgba(0,153,255,1) 100%);
    font-size: 100px;
    color: white;
}
.SignUpBtn {
    display: none;
}
.postEntry{
    padding: 50px;
}
.maxLogo {
    height: 250px;
    width: 250px;
    fill: white;
}
.center {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
@media only screen and (max-width: 1300px) {
    .leftSide {
        display: none;
    }
    .rightSide {
        margin: 0;
    }
    .entry{
        position: relative;
        font-size: 50px;
    }
    .SignUpBtn {
        display: block;
        margin: 75px;
        padding: 30px;
        border: 0;
        border-radius: 100px;
        background-color: white;
        text-decoration: none;
        color: #0099FF;
    }
    .SignUpBtn {
        display: block;
        margin: 75px;
        padding: 20px;
        border: 0;
        border-radius: 100px;
        background-color: white;
        text-decoration: none;
    }
}
</style>
