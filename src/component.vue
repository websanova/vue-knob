<template>
    <div
        class="knob"
        v-bind:class="{
            'disabled': disabled,
            'dragging': isDragging,
            ['knob-' + size]: size,
            ['knob-' + variant]: variant,
        }"
        @click="$emit('click')"
    >
        <div
            v-for="(option, index) in _options"
            v-if="option.anchor === true"
            :key="index"
            class="knob-label-anchor"
            v-bind:class="[
                'knob-label-anchor-' + option.angle,
                'knob-label-' + option.labelPosition,
                getLabelActive(index) ? 'active' : '',
                getLabelHover(index) ? 'hover' : '',
            ]"
            v-bind:style="{
                transform: 'rotate(' + option.angle + 'deg)'
            }"
        >
            <div
                v-if="option.label !== false"
                class="knob-label"
                v-bind:style="{
                    transform: 'rotate(-' + option.angle + 'deg)'
                }"
                v-on:click.stop="onClickLabel(index)"
            >
                <div
                    v-html="option.label"
                />
            </div>
        </div>

        <div
            class="knob-dial"
            v-on:mousedown="onDragStart"
            v-on:touchstart="onDragStart"
            v-bind:style="{
                transform: 'rotate('  + anchorAngle + 'deg)',
                '--knob-anchor-angle-transition-distance': anchorAngleDistance
            }"
        >
            <slot
                name="dial"
            />
            
            <div
                :id="'knob-dial-anchor-' + _id"
                class="knob-dial-anchor"
            >
                <div
                    class="knob-dial-pointer"
                />
            </div>
        </div>

        <slot />
    </div>
</template>

<script>
    export default {
        name: 'VueKnob',

        props: {
            value: {
                default: null
            },

            variant: {
                default: ''
            },

            size: {
                default: ''
            },

            disabled: {
                type: Boolean,
                default: false
            },

            options: {
                default() {
                    return [];
                }
            },

            valueKey: {
                default: 'value'
            },

            labelKey: {
                default: 'label'
            },

            startAngle: {
                type: Number,
                default: 30
            },

            endAngle: {
                type: Number,
                default: 330
            },

            skipAngle: {
                type: Number,
                default: 150
            },

            anchorOffset: {
                type: Number,
                default: 0
            },

            minSpeed: {
                type: Number,
                default: 0.2
            },

            slider: {
                type: Boolean,
                default: false,
            },

            sliderSnapTo: {
                type: Boolean,
                default: false,
            },

            sliderStepBy: {
                type: Number,
                default: 1
            }
        },

        data() {
            return {
                valueInternal: null,
                
                anchorAngle: 0,

                anchorAngleDistance: 0,

                isDragging: false,

                drag: {},
            };
        },

        computed: {
            _id() {
                return Math.random();
            },

            _rotation() {
                var degrees = this.endAngle - this.startAngle;

                return degrees / (this.options.length - 1);
            },

            _index() {
                var i = 0,
                    ii = this._options.length,
                    option,
                    index = null;

                if (!this.slider) {
                    for (; i < ii; i++) {
                        option = this._options[i];

                        if (
                            option.value === this.value ||
                            (option.value !== undefined && this.value !== undefined && this.value !== null && option.value === this.value[this.valueKey])
                        ) {
                            index = i;

                            break;
                        }
                    }
                }

                return index;
            },

            _indexHover() {
                return this.getIndexActive(this.anchorAngle);
            },

            _options() {
                var i = 0,
                    ii = this.options.length,
                    options = [];

                for (; i < ii; i++) {
                    ((i) => {
                        options.push(this.formatOption(i));
                    })(i);
                }

                return options;
            }
        },

        watch: {
            _index(val) {
                if (this._options[val]) {
                    this.setAnchorAngle(this._options[val].angle + this.anchorOffset);
                }
            },

            value(val) {
                if (
                    this.slider && 
                    (this.sliderSnapTo || val !== this.valueInternal)
                ) {
                    this.processAngle(this.processValue(val), true);
                }

                this.valueInternal = val;
            }
        },

        mounted() {
            this.valueInternal = this.value;

            if (!this.slider) {
                this.setAnchorAngle(((this._options[this._index] || {}).angle || 0) + this.anchorOffset);
            }
            else {
                this.processAngle(this.processValue(this.value));
            }
        },

        methods: {
            toggle(index) {
                var option;

                if (this.disabled) {
                    return;
                }

                if (index === undefined) {
                    index = this.options[this._index + 1] ? this._index + 1 : 0;
                }

                if (index !== this._index) {
                    option = this._options[index];

                    this.setAnchorAngle(option.angle);
                    this.$emit('input', !this.slider ? option.original : option.value);
                }
            },

            formatOption(i) {
                var value = this.options[i][this.valueKey] !== undefined ? this.options[i][this.valueKey] : this.options[i];
                var angle = this.options[i].angle !== undefined ? this.options[i].angle : this.startAngle + (Math.round(this._rotation * i * 100) / 100);

                return {
                    value:         value,
                    angle:         angle,
                    label:         this.options[i][this.labelKey] !== undefined ? this.options[i][this.labelKey] : value,
                    anchor:        (this.options[i].anchor === false || (this.options[i][this.labelKey] === false && this.options[i].anchor !== true)) ? false : true,
                    labelPosition: this.getLabelPosition(angle),
                    original:      this.options[i],
                };
            },

            getLabelPosition(angle) {
                if (angle > 0 && angle < 180) {
                    return 'left';
                }
                else if (angle < 360 && angle > 180) {
                    return 'right';
                }
                
                return 'center';
            },

            getLabelActive(index) {
                return index === this._index;
            },

            getLabelHover(index) {
                return index === this._indexHover;
            },

            getIndexActive(angle) {
                var i, ii;

                for (i = 0, ii = this._options.length; i < ii; i++) {
                    if (angle >= this._options[i].angle && angle <= this._options[i + 1].angle) {
                        if (Math.abs(angle - this._options[i].angle) < Math.abs(angle - this._options[i + 1].angle)) {
                            return i;
                        }
                        else {
                            return i + 1;
                        }
                    }
                }
            },

            getOffset(el) {
                var top = 0,
                    left = 0,
                    element = el;
  
                // TODO: Note there is issue if an elements scrollbar
                //       position changes while rotating. But this would
                //       require watching scroll changes or recalculating
                //       offset top on drag. Possible to perhaps recalculate
                //       offset on every tenth drag or something like this
                //       as well.

                do {
                    top += (element.offsetTop || 0) - (element.scrollTop || 0);
                    left += (element.offsetLeft || 0);
                    
                    // NOTE: This is fix for content (scroll type) containers
                    //       Seems to not skip a scroll container so we will
                    //       check one node immediate below. A bit hacky but
                    //       seems to work for now.
                    if (
                        element.offsetParent && 
                        element.offsetParent.childNodes
                    ) {
                        top -= element.offsetParent.childNodes[0].scrollTop || 0;
                    }

                    element = element.offsetParent;
                }
                while (element);
  
                return {
                    x: left,
                    y: top
                };
            },

            setAnchorAngle(angle) {
                var distance = Math.abs(this.anchorAngle - angle) / 360;

                this.anchorAngleDistance = distance < this.minSpeed ? this.minSpeed : distance;

                this.anchorAngle = angle;
            },

            processValue(value) {
                value = parseFloat(value);

                return (value - this._options[0].value) / (this._options[this.options.length - 1].value - this._options[0].value) * (this._options[this.options.length - 1].angle - this._options[0].angle) + this._options[0].angle;
            },

            processAngle(angle, isAngleChange) {
                var value       = null;
                var anchorIndex = null;
                var anchorAngle = this.anchorAngle;
                var angleChange = isAngleChange || Math.abs(angle - anchorAngle) <= this.skipAngle;

                if (isNaN(angle) || angleChange) {
                    if (isNaN(angle) || angle < this._options[0].angle) {
                        anchorAngle = this._options[0].angle;
                    }
                    else if (angle > this._options[this._options.length - 1].angle) {
                        anchorAngle = this._options[this._options.length - 1].angle;
                    }
                    else {
                        anchorAngle = Math.round(angle * 100) / 100;
                    }
                }

                if (!this.slider) {
                    anchorIndex = this.getIndexActive(anchorAngle);
                    this.drag.i = anchorIndex;
                    
                    this.setAnchorAngle(anchorAngle);

                    return this._options[this._indexHover].original;
                }
                else {
                    this.setAnchorAngle(anchorAngle);

                    // Get the value first.
                    value = ((anchorAngle - this.startAngle) / (this.endAngle - this.startAngle)) * (this._options[this.options.length - 1].value - this._options[0].value) + this._options[0].value;

                    // Round to the nearest step.
                    value = Math.round(Math.round(value / this.sliderStepBy) * this.sliderStepBy * 100) / 100;

                    return value;
                }
            },

            onClickLabel(index) {
                this.toggle(index);
                
                this.$emit('click');
            },

            onDragStart($e) {
                var anchor;

                if (this.disabled) {
                    return;
                }

                anchor = this.getOffset(document.getElementById('knob-dial-anchor-' + this._id));

                this.drag = {
                    x: anchor.x,
                    y: anchor.y,
                    i: this._index,
                };

                this.isDragging = true;

                // Prevent any highlights or drags.
                $e.stopPropagation();
                $e.preventDefault();
                
                $e.cancelBubble = true;
                $e.returnValue = false;

                document.addEventListener('mouseup', this.onDragEnd, false);
                document.addEventListener('mousemove', this.onDragMove, false);

                document.addEventListener('touchend', this.onDragEnd, false);
                document.addEventListener('touchmove', this.onDragMove, false);
            },

            onDragMove($e) {
                var sX = this.drag.x,
                    sY = this.drag.y,
                    cX = ($e.touches ? $e.touches[0] : $e).pageX,
                    cY = ($e.touches ? $e.touches[0] : $e).pageY,
                    index = this.drag.i,
                    angle = Math.atan2(cX - sX, - (cY -sY) ) * (180 / Math.PI) + 180;

                this.$emit('hover', this.processAngle(angle));
            },

            onDragEnd () {
                var index,
                    value;

                if (!this.slider) {
                    index = this.getIndexActive(this.anchorAngle);

                    this.toggle(index);
                    this.setAnchorAngle(this._options[index].angle);
                }
                else {
                    this.valueInternal = this.processAngle(this.anchorAngle);
                    this.$emit('input', this.valueInternal);
                }

                this.isDragging = false;
                
                document.removeEventListener('mouseup', this.onDragEnd, false);
                document.removeEventListener('mousemove', this.onDragMove, false);

                document.removeEventListener('touchend', this.onDragEnd, false);
                document.removeEventListener('touchmove', this.onDragMove, false);
            }
        },
    }
</script>

<style lang="scss">
    @import './styles.scss';
</style>