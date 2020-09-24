<template>
    <div
        class="text-center"
    >
        <div
            v-for="(knob, key) in knobs"
        >
            <hr/>

            <br/>

            <vue-knob
                :value="knob.value"
                :size="knob.size"
                :step="knob.step"
                :slider="true"
                :slider-step-by="100"
                :slider-snap-to="false"
                :variant="'sliders-' + key"
                :options="knob.options"
                :start-angle="90"
                @input="change(knob, $event)"
                @hover="hoverVal = $event"
            >
                <div
                    slot="dial"
                    class="knob-dial-inner"
                />
            </vue-knob>

            <br/><br/>
            
            <table
                style="display:inline-block; text-align:left;"
            >
                <tr>
                    <td>Hover</td>
                    <td>{{ hoverVal }}</td>
                </tr><tr>
                    <td>Current</td>
                    <td>
                        <input
                            v-model="tempVal"
                        />
                    </td>
                </tr><tr>
                    <td></td>
                    <td>
                        <button
                            @click="knob.value = tempVal"
                        >
                            update
                        </button>
                    </td>
                </tr>
            </table>

            <br/><br/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tempVal: 0,
                hoverVal: 0,

                knobs: {
                    test1: {
                        value: 0,
                        size: 'xl',
                        step: 0.5,
                        options: [{
                            value: 0,
                            label: '0'
                        },

                        // NOTE: The value will pretty much be ignored here
                        //       with the snapTo off and this simply acts as
                        //       a label. The only values still checked against
                        //       will be the first and last in the set.
                        {
                            value: -500,
                            label: '-500',
                        },

                        {
                            value: -1000,
                            label: '-1000'
                        }],
                    }
                }
            };
        },

        methods: {
            change(knob, value) {
                knob.value   = value;
                this.tempVal = value
                this.hoverVal = value
            }
        }
    }
</script>

<style lang="scss">
    
</style>