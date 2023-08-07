<template>
    <div>
        <h2>{{ object.name }}</h2>>
    </div>
</template>
    
<script>
import { fetchObject } from '@/api'
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
    }
}
</script>
    
<style></style>
    