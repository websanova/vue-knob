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
                        value: 3,
                        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    },

                    test2: {
                        value: 'seven',
                        options: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
                    }
                }
            };
        }
    }
</script>