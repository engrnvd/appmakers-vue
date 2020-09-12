<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">
                <img src="/icon.svg" alt="Logo" class="logo">
                AppMakers-Vue
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/">Home</b-nav-item>

                    <b-nav-item-dropdown
                        :text="item.path.replace('/', '')"
                        v-for="item in menu" :key="item.path"
                        class="text-capitalize">
                        <b-dropdown-item
                            :to="item.path + '/' + subItem.path"
                            class="text-lowercase"
                            v-for="subItem in item.children" :key="subItem.path">
                            {{ subItem.path }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <main class="d-flex">
            <div class="menu p-4">
                <div v-for="item in menu" :key="item.path"
                     class="text-capitalize mb-4">
                    <div class="title mb-2">{{ item.path.replace('/', '') }}</div>
                    <router-link :to="item.path + '/' + subItem.path"
                       class="text-lowercase d-block menu-sub-item"
                       v-for="subItem in item.children" :key="subItem.path">
                        {{ subItem.path }}
                    </router-link>
                </div>
            </div>

            <div class="content flex-grow-1 p-4">
                <router-view/>
            </div>
        </main>
    </div>
</template>

<script>

import {menuRoutes} from "@/router/menu-routes";

export default {
    name: "App",
    props: {},
    data() {
        return {
            menu: menuRoutes
        }
    },
    methods: {}
}
</script>

<style lang="scss">

.logo {
    width: 1.5em;
    height: auto;
}

.menu-sub-item {
    color: black;
}

.router-link-exact-active {
    color: #42b983;
}
</style>
