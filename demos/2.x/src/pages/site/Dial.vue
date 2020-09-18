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
                :variant="'dial-' + key"
                v-model="knob.value"
                :start-angle="knob.startAngle"
                :end-angle="knob.endAngle"
                :options="knob.options"
            >
                <div
                    slot="dial"
                    class="knob-dial-inner"
                    v-html="knob.html"
                />

                <div
                    class="knob-current"
                    v-if="knob.current"
                >
                    {{ knob.value }}
                </div>
            </vue-knob>

            <br/><br/>

            <button
                v-for="option in knob.options"
                @click="knob.value = option"
                :disabled="option === knob.value"
            >
                {{ option.value || option }}
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
                        value: 200,
                        options: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                        html: '',
                        current: true
                    },

                    test2: {
                        value: 0,
                        startAngle: 0,
                        endAngle: 270,
                        options: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
                        html: '<img src="/img/logo-dark.png" />'
                    },
                }
            };
        }
    }
</script>

<style lang="scss">
    .knob-dial-test1 {
        > .knob-current {
            position: absolute;
            left: 23px;
            top: 42px;
            width: 50px;
            z-index: 1000;
        }
    }

    .knob-dial-test1 {
        border-width: 1px;
        border-color: #eaeaea;

        > .knob-dial {
            padding: 15px;

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

    .knob-dial-test2 {
        > .knob-dial {
            padding: 30px;

            > .knob-dial-inner {
                background-color: transparent;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;

                > img {
                    width: 100%;
                    height: 100%;
                }
            }

            > .knob-dial-anchor {
                > .knob-dial-pointer {
                    background-color: #6699ff;
                }
            }
        }
    }
</style>