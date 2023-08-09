<template>
    <div>
        <ul>
            <li :class="{ active: index == currentIndex }" v-for="(object, index) in objects" :key="index">
                {{ currentObject.name }}
            </li>
        </ul>
    </div>
    <div> <button @click="clickAllObjects()">Get Objects</button></div>
</template>
    
<script>

import { getObjects } from '@/frontend-services';
import ObjectService from "../frontend-services/ObjectService";

export default {
    name: "object-list",
    data() {
        return {
            objects: [],
            currentObject: { name: "nothing" },
            currentIndex: -1,
            name: ""
        };
    },
    methods: {
        retrieveObjects() {
            ObjectService.getAll()
                .then(response => {
                    this.objects = response.data;
                    console.log(response.data);
                })
                .catch(x => {
                    console.log(x);
                });
        },
        setFocusObject(object, index) {
            this.currentObject = object;
            this.currentIndex = object ? index : -1;
        },
        clickAllObjects() {
            getObjects().then(response => {
                this.objects = response.data;
                this.currentObject = response.name;
                console.log(this.currentObject);
            })


        }
    },
    mounted() {
        // this.retrieveObjects();
        this.clickAllObjects();
    }
};
</script>
    
<style></style>
    