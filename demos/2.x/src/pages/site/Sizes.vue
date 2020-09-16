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
                :size="knob.size"
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
                        size: 'xs',
                        value: 1,
                        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    },

                    test2: {
                        size: 'sm',
                        value: 3,
                        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    },

                    test3: {
                        size: 'md',
                        value: 5,
                        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    },

                    test4: {
                        size: 'lg',
                        value: 7,
                        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    },

                    test5: {
                        size: 'xl',
                        value: 9,
                        options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    }
                }
            };
        }
    }
</script>