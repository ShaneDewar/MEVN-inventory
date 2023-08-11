<template>
    <div>
        <h1>Express Test</h1>
        <button @click="getServerRes">Get Response</button>
        <p>{{ response }}</p>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Server",
    data() {
        return {
            response: null,
        };
    },
    methods: {
        async getServerRes() {
            // const response = await ObjectService.getAll();
            const response = await fetch("http://localhost:3033/objects/1");
            const data = await response.json();
            this.response = data.message;
        }
    },
});
</script>