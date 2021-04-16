<template>
    <div class="dashboard">
        <Navbar />
        <Add />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Add from '@/components/Add.vue';

export default {
    name: 'Dashboard',
    components: {
        Navbar,
        Add
    }
}
</script>
