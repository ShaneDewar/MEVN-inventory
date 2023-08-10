<template>
    <div>
        <h2>{{ object.name }}</h2>>
    </div>
    <div>
        <button @click="increment"> !{{ counter }}! </button>
    </div>
</template>
    
<script>

import { fetchObject } from '@/frontend-services'
import ObjectService from '@/frontend-services/ObjectService'

export default {
    data() {
        return {
            object: {},
            counter: 0,
        }
    },
    beforeMount() {
        fetchObject(parseInt(this.$route.params.id))
            .then((response) => {
                this.object = response
            })
    },
    mounted() {

        ObjectService.get(1)
            .then(response => {
                console.log(response.data);
            })
            .catch(x => {
                console.log(x);
            })

    },
    methods: {
        increment() {
            this.counter++;
        },
    },
    updated() {
        console.log("clicking!");
    }
}
</script>
    
<style></style>
    