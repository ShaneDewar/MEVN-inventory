<script>
import { getObjects } from '@/frontend-services'
export default {
    data() {
        return {
            objects: []
        }
    },
    beforeMount() {
        getObjects().then(response => {
            this.objects = response
        })
    }
}
</script>

<template>
    <h1>Objects:</h1>
    <div>
        <section>
            <div class="container">
                <h2 class="title">Check out the neat objects!</h2>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="card" v-for="object in objects" v-bind:key="object.id">
                    <div>
                        <p class="title">{{ object.name }}</p>
                        <p class='subtitle'>{{ object.created_at.toDateString() }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
