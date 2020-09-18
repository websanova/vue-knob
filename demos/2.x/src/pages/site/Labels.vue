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
                :value="knob.value"
                :options="knob.options"
                @input="knob.value = $event.value"
                class="knob-labels"
            />

            <br/><br/>

            <button
                v-for="option in knob.options"
                @click="knob.value = option.value"
                :disabled="option.value === knob.value"
            >
                {{ option.value }}
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
                        value: 20,
                        options: [{
                            value: 0,
                            label: 'min'
                        }, {
                            value: 10,
                        }, {
                            value: 20,
                        }, {
                            value: 30,
                        }, {
                            value: 40,
                        }, {
                            value: 50,
                        }, {
                            value: 60,
                        }, {
                            value: 70,
                        }, {
                            value: 80,
                        }, {
                            value: 90,
                        }, {
                            value: 100,
                            label: 'max'
                        }]
                    },

                    test2: {
                        value: 0,
                        options: [{
                            value: -50,
                        }, {
                            value: -40,
                        }, {
                            value: -30,
                        }, {
                            value: -20,
                        }, {
                            value: -10,
                        }, {
                            value: 0,
                        }, {
                            value: 10,
                            label: '10+'
                        }, {
                            value: 20,
                            label: '20+'
                        }, {
                            value: 30,
                            label: '30+'
                        }, {
                            value: 40,
                            label: '40+'
                        }, {
                            value: 50,
                            label: '50+'
                        }]
                    }
                }
            };
        }
    }
</script>

<style lang="scss">
    .knob-labels {
        > .knob-label-anchor.active > .knob-label {
            color: red;
        }

        > .knob-label-anchor.hover:not(.active) > .knob-label {
            color: blue;
        }

        > .knob-label-anchor > .knob-label:hover {
            color: #333;
        }
    }
</style>