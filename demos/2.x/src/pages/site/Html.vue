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
                        value: -40,
                        options: [{
                            value: -50,
                            label: '<b class="spectrum-m50">-50</b>'
                        }, {
                            value: -40,
                            label: '<b class="spectrum-m40">-40</b>'
                        }, {
                            value: -30,
                            label: '<b class="spectrum-m30">-30</b>'
                        }, {
                            value: -20,
                            label: '<b class="spectrum-m20">-20</b>'
                        }, {
                            value: -10,
                            label: '<b class="spectrum-m10">-10</b>'
                        }, {
                            value: 0,
                            label: '<b class="spectrum-0">0</b>'
                        }, {
                            value: 10,
                            label: '<b class="spectrum-p10">10</b>'
                        }, {
                            value: 20,
                            label: '<b class="spectrum-p20">20</b>'
                        }, {
                            value: 30,
                            label: '<b class="spectrum-p30">30</b>'
                        }, {
                            value: 40,
                            label: '<b class="spectrum-p40">40</b>'
                        }, {
                            value: 50,
                            label: '<b class="spectrum-p50">50</b>'
                        }]
                    },

                    test2: {
                        value: 'a',
                        options: [{
                            value: 'we',
                        }, {
                            value: 'bs',
                        }, {
                            value: 'a',
                            label: '<img src="/img/logo-dark-text.png" height="15"/>'
                        }, {
                            value: 'no',
                        }, {
                            value: 'va',
                        }]
                    }
                }
            };
        }
    }
</script>

<style lang="scss">
    .spectrum-m50 {color: #0000ff;}
    .spectrum-m40 {color: #3366ff;}
    .spectrum-m30 {color: #6699ff;}
    .spectrum-m20 {color: #99ccff;}
    .spectrum-m10 {color: #ccffff;}
    .spectrum-0   {color: #00ff00;}
    .spectrum-p10 {color: #ffffcc;}
    .spectrum-p20 {color: #ffcc99;}
    .spectrum-p30 {color: #ff9966;}
    .spectrum-p40 {color: #ff6633;}
    .spectrum-p50 {color: #ff0000;}

</style>