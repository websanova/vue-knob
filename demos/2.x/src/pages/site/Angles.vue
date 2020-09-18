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
                :start-angle="knob.startAngle"
                :end-angle="knob.endAngle"
                @input="knob.value = $event.value"
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
                        value: 70,
                        startAngle: 90,
                        endAngle: 270,
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
                        value: 190,
                        options: [{
                            value: 190,
                            angle: 190,
                        }, {
                            value: 215,
                            angle: 215,
                        }, {
                            value: 240,
                            angle: 240,
                        }, {
                            value: 265,
                            angle: 265,
                        }, {
                            value: 290,
                            angle: 290,
                        }]
                    }
                }
            };
        }
    }
</script>