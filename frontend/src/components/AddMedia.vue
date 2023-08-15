<template>
    <div class="add_object_form">
        <div v-if="!submitted">
            <div>
                <label for="object_name">Object Name: </label>
                <input type="text" id="object_name" required v-model="object.object" name="object_name" />
            </div>

            <div>
                <label for="object_message">Message: </label>
                <input type="text" id="object_messsage" required v-model="object.message" name="object_message" />
            </div>

            <button @click="addObject" class="btn submit_success">Add this Object</button>
        </div>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            object: {
                id: null,
                object: "",
                message: "",

            },
            submitted: false
        }
    },
    // beforeMount() {
    //     fetchObject(parseInt(this.$route.params.id))
    //         .then((response) => {
    //             this.object = response
    //         })
    // }
    methods: {
        addObject() {
            let data = {
                object: this.object.object,
                message: this.object.message

            };
            console.log(data);
        }
    }
}
</script>
    
<style></style>
    