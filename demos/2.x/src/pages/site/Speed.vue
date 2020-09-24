<template>
    <div
        class="text-center"
    >
        <div
            v-for="knob in knobs"
        >
            <hr/>

            <br/>

            <vue-knob
                v-model="knob.value"
                :options="knob.options"
                :min-speed="knob.minSpeed"
            />

            <br/><br/>

            <button
                v-for="option in knob.options"
                @click="knob.value = option"
                :disabled="option === knob.value"
            >
                {{ option }}
            </button>
            
            <br/><br/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                knobs: {
                    test1: {
                        value: 'this',
                        options: ['this', 'knob', 'speed', 'is', 'very', 'fast'],
                        minSpeed: 0.2
                    },

                    test2: {
                        value: 'speed',
                        options: ['this', 'is', 'a', 'really', 'slow', 'speed'],
                        minSpeed: 5
                    }
                }
            };
        }
    }
</script>