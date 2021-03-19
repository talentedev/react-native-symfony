<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <img src="https://media.licdn.com/dms/image/C4E0BAQHJPJTT9dw5VA/company-logo_200_200/0?e=2159024400&v=beta&t=nSyHjSssMX23xEdOVkbyem5MBEJQXbucO5uqfqPm56I" class="ambassador-header-logo">
                <h3>ambassador</h3>
                <span class="user-id">Admin</span>
            </div>

            <ul class="list-unstyled components">
                <li>
                    <router-link class="nav-link" tag="a":to="{ path: 'accounts' }" active-class="active">Account management</router-link>
                </li>
                <li>
                    <router-link class="nav-link" tag="a" :to="{ path: 'promotions' }" active-class="active">Promotion list</router-link>
                </li>

            </ul>
            <div class="image-container">
                <img src="/public/images/sider_image.png" class="sidebar-image">
            </div>
            <ul class="list-unstyled CTAs">
                <li>
                    <router-link tag="a" class="bottom-menu right" :to="{ path: 'Settings' }">Setting</router-link>
                </li>
                <li>
                    <a class="bottom-menu left" href="/login/logout">Logout</a>
                </li>
            </ul>
        </nav>

        <!-- Page Content  -->
        <div class="ambassador-content">
            <div class="top-header" @click.self="hideMenu">
                <i class="fa fa-bars menu-icon" @click.stop="showHideMenu"></i>
                <span class="mobile-menu-logo">ambassador</span>
                <div v-if="showMobileMenu" class="mobile-menu" @click.stop="hideMenu">
                    <div class="mobile-menu-item"><router-link class="nav-link" tag="a":to="{ path: 'accounts' }" active-class="active">Account management</router-link></div>
                    <div class="mobile-menu-item"><router-link class="nav-link" tag="a":to="{ path: 'promotions' }" active-class="active">Promotion list</router-link></div>
                    <div class="mobile-menu-item"><router-link class="nav-link" tag="a" :to="{ path: 'Settings' }" active-class="active">Setting</router-link></div>
                    <div class="mobile-menu-item"><router-link class="nav-link" tag="a" to="/login/logout">Logout</router-link></div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'app',
        data(){
            return{
                lang : '',
                showMobileMenu:false
            }
        },
        methods:{
            hideMenu(){
                this.showMobileMenu = false ;
            },
            showHideMenu(){
              this.showMobileMenu = !this.showMobileMenu ;
            },
            changeLang(){
                axios.post('/config/lang',{lang : this.lang}).then(
                   data=>{
                       this.$notify({
                           group: 'default',
                           title: 'Success',
                           text: "Language switched",
                           type: 'success',
                       }) ;
                       document.location.reload(true);
                   }
                ).catch(error=>{
                        this.$notify({
                            group: 'default',
                            title: 'Error',
                            text: "Unable to switch language".error,
                            type: 'error',
                        })
                }) ;
            }
        },
        created () {
            axios.interceptors.response.use(undefined, (err) => {
                return new Promise(() => {
                    if (err.response.status === 403 || err.response.status === 401) {
                        window.location.href = '/login/logout';
                    } else if (err.response.status === 500) {
                        document.open();
                        document.write(err.response.data);
                        document.close();
                    }
                    throw err;
                });
            });
        },
    }
</script>
