<template>
    <div>
        <h2>{{ object.name }}</h2>>
    </div>
    <div>
        <button @click="getObjectById">Get Object #</button>
    </div>
</template>
    
<script>

import { fetchObject } from '@/frontend-services'
import ObjectService from '@/frontend-services/ObjectService'

export default {
    data() {
        return {
            object: {}
        }
    },
    beforeMount() {
        fetchObject(parseInt(this.$route.params.id))
            .then((response) => {
                this.object = response
            })
    },
    mounted() {
        getObjectById(id) {
            ObjectService.get(1)
                .then(response => {
                    console.log(response.data);
                })
                .catch(x => {
                    console.log(x);
                })
        }
    }
}
</script>
    
<style></style>
    