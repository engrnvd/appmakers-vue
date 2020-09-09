<template>
    <div id="app">
<!--        <div id="nav">-->
<!--            <router-link to="/home">Home</router-link>-->
<!--            |-->
<!--            <router-link to="/components">Components</router-link>-->
<!--        </div>-->

        <b-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/components">Components</b-nav-item>
        </b-nav>

        <router-view/>
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
