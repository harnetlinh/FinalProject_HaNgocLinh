<template>
    <b-navbar toggleable="lg" type="dark">
        
        <b-navbar-brand href="#" v-on:click.prevent.stop="$emit('toggle')">
            <i class="icofont-navigation-menu"></i>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        
        <b-collapse id="nav-collapse" is-nav class="d-none d-lg-block">
            <b-navbar-nav id="text-educhat">
                {{currentrouter}}
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-button style="margin-right:30px" @click="$router.push('/dashboard/feedback')">Feedback</b-button>
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <i class="icofont-ui-user"></i>
                    </template>
                    <b-dropdown-item href="#"><i class="icofont-tools"></i> Settings</b-dropdown-item>
                    <b-dropdown-item href="#"><i class="icofont-logout"></i> Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>

    </b-navbar>
</template>

<script>
export default {
    name: 'Topbar',
    data(){
        return{
            currentrouter:""
        }
    },

    computed:{
        currentRouter(){
            return this.$route.name;
        }
    },

    watch:{
        currentRouter(){
            this.currentRouter = this.$route.name;
            console.log(this.$route.name);
        }
    },

}
</script>

<style>
    
</style>

<style scoped src="../assets/css/Topbar.css"></style>