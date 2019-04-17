<template>
    <div class="app_container">
        <mt-header fixed title="Vue">
            <mt-button icon="back" slot="left" @click="goBack" v-show="flag">返回</mt-button>
        </mt-header>
        <transition>
            <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab">
            <router-link to="/home" class="mui-tab-item-my " href="#tabbar">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link to="/member" class="mui-tab-item-my" href="#tabbar-with-chat">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link to="shopcar" class="mui-tab-item-my" href="#tabbar-with-contact">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link to="search" class="mui-tab-item-my" href="#tabbar-with-map">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app",
        data() {
            return {
                flag: false
            }
        },
        methods: {
            //    点击后退
            goBack() {
                this.$router.go(-1)
            }
        },
        created() {
            this.flag = this.$route.path === '/home' ? false : true;
        },
        //    监听路由地址
        watch: {
            '$route.path':function (newVal) {
                if (newVal==='/home'){
                    this.flag=false;
                } else {
                    this.flag=true
                }
            }
        }
    }
</script>

<style scoped>
    .app_container {
        padding-top: 40px;
        overflow: hidden;
        padding-bottom: 50px;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active, v-leave-active {
        transition: all 1s;
    }

    .mui-bar-tab .mui-tab-item-my {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-my.mui-active {
        color: #007aff;
    }

    .mui-bar-tab .mui-tab-item-my .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>