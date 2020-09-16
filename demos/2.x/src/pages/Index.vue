<template>
    <div>
        <h1 class="text-center">
            <a href="https://websanova.com">
                <img src="/img/logo-dark-text.png" height="30" />
            </a>
        </h1>

        <h1
            class="text-center"
        >
            Vue Knob Component Demo
        </h1>

        <div
            class="text-center"
        >
            <router-link
                :to="{name: 'site-default'}"
            >
                default
            </router-link>

            |

            <router-link
                :to="{name: 'site-sizes'}"
            >
                sizes
            </router-link>

            |

            <router-link
                :to="{name: 'site-labels'}"
            >
                labels
            </router-link>

            <br/><br/>

            <router-link
                :to="{name: 'site-html'}"
            >
                html
            </router-link>

            |

            <router-link
                :to="{name: 'site-angles'}"
            >
                angles
            </router-link>

            |

            <router-link
                :to="{name: 'site-dial'}"
            >
                dial
            </router-link>
        </div>

        <br/>

        <div class="text-center">
            Click a label or button or drag the dial.
        </div>

        <br/>

        <div
            class="content"
        >
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    body {
        font-family: Verdana;
        font-size: 12px;
    }

    a {
        color: #6699ff;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;
    }

    .text-center {
        text-align: center;
    }

    .content {
        max-width: 500px;
        margin: 0 auto;
        padding: 0 20px;
    }

    button {
        padding: 5px 7px;
        margin: 2px;
        font-size: 10px;
    }

    @for $i from 0 through 360 {
        .knob-label-anchor-#{$i} {transform: rotate(#{$i}deg);}
        .knob-label-anchor-#{$i} > .knob-label {transform: rotate(-#{$i}deg);}
    }
</style>