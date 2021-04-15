<template>
    <div class="app">
        <div class="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/login">Login</router-link> |
            <router-link to="/signup">Create New Account</router-link>
        </div>
        <router-view />
    </div>
</template>