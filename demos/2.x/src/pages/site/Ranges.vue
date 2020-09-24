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
                :variant="'ranges-' + key"
                :options="knob.options"
                @input="knob.value = $event.value"
            >
                <div
                    slot="dial"
                    class="knob-dial-inner"
                />
            </vue-knob>

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
                        value: 3,
                        options: [],
                    },

                    test2: {
                        value: 50,
                        options: []
                    }
                }
            };
        },

        mounted() {
            var i = 0,
                ii = 100;

            for (; i <= ii; i++) {
                ((i) => {
                    this.knobs.test1.options.push({
                        value: i,
                        label: false
                    });

                    //

                    this.knobs.test2.options.push({
                        value: i,
                        label: false
                    });
                })(i);
            }

            this.knobs.test1.options[0].label = '0%';
            this.knobs.test1.options[100].label = '100%';
            
            //

            this.knobs.test2.options[0].label = '0%';
            this.knobs.test2.options[10].label = '10%';
            this.knobs.test2.options[20].label = '20%';
            this.knobs.test2.options[30].label = '30%';
            this.knobs.test2.options[40].label = '40%';
            this.knobs.test2.options[50].label = '50%';
            this.knobs.test2.options[60].label = '60%';
            this.knobs.test2.options[70].label = '70%';
            this.knobs.test2.options[80].label = '80%';
            this.knobs.test2.options[90].label = '90%';
            this.knobs.test2.options[100].label = '100%';
            
            this.knobs.test2.options[10].anchor = true;
            this.knobs.test2.options[20].anchor = true;
            this.knobs.test2.options[30].anchor = true;
            this.knobs.test2.options[40].anchor = true;
            this.knobs.test2.options[50].anchor = true;
            this.knobs.test2.options[60].anchor = true;
            this.knobs.test2.options[70].anchor = true;
            this.knobs.test2.options[80].anchor = true;
            this.knobs.test2.options[90].anchor = true;
        }
    }
</script>

<style lang="scss">
    .knob-ranges-test1,
    .knob-ranges-test2 {
        border-width: 1px;
        border-color: #eaeaea;

        > .knob-dial {
            padding: 20px;

            > .knob-dial-inner {
                background-color: #cacaca;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }

            > .knob-dial-anchor {
                > .knob-dial-pointer {
                    width: 1px;
                    background-color: red;
                }
            }
        }

        > .knob-label-anchor {
            border-left: solid #eaeaea 1px;
        }
    }
</style>