<template>
    <div
        style="max-width:500px; margin:0 auto 50px auto;"
    >
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

        <hr/>
        
        <div class="text-center">
            <a href="https://websanova.com/docs/vue-knob"><b>DOCS</b></a> |
            <a href="https://github.com/websanova/vue-knob"><b>GITHUB</b></a> |
            <a href="https://patreon.com/websanova"><b>PATREON</b></a>
        </div>
        
        <hr/>

        <br/>

        <div
            class="text-center"
        >
            <router-link
                :to="{name: 'site-default'}"
            >
                default
            </router-link>

            <span class="text-muted">&bull;</span>

            <router-link
                :to="{name: 'site-sizes'}"
            >
                sizes
            </router-link>

            <span class="text-muted">&bull;</span>

            <router-link
                :to="{name: 'site-speed'}"
            >
                speed
            </router-link>

            <span class="text-muted">&bull;</span>

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

            <span class="text-muted">&bull;</span>

            <router-link
                :to="{name: 'site-angles'}"
            >
                angles
            </router-link>

            <span class="text-muted">&bull;</span>

            <router-link
                :to="{name: 'site-dial'}"
            >
                dial
            </router-link>

            <span class="text-muted">&bull;</span>

            <router-link
                :to="{name: 'site-ranges'}"
            >
                ranges
            </router-link>

            <span class="text-muted">&bull;</span>

            <router-link
                :to="{name: 'site-slider'}"
            >
                slider
            </router-link>
        </div>

        <br/>

        <div class="text-center">
            Click a label or button or drag the dial.
        </div>

        <br/>

        <div>
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

    .text-muted {
        color: #aeaeae;
    }

    button {
        padding: 5px 7px;
        margin: 2px;
        font-size: 10px;
    }
</style>