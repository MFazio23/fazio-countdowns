<template>
    <div class="countdown-ring">
        <vue-easy-pie-chart
                font-size="16px"
                :scale-color="scale"
                :percent="currentPercent"
                :bar-color="barColor"
                :track-color="trackColor"
                :size="ringSize">
            <div class="countdown-ring-text-container" :style="{height: `${ringSize}px`, color: textColor}">
                <div class="countdown-ring-text">
                    <div class="countdown-ring-text-item countdown-ring-text-number">{{currentCount}}</div>
                    <div class="countdown-ring-text-item">{{textValue}}</div>
                </div>
            </div>
        </vue-easy-pie-chart>
    </div>
</template>

<script>
    import VueEasyPieChart from 'vue-easy-pie-chart'
    import 'vue-easy-pie-chart/dist/vue-easy-pie-chart.css'

    export default {
        name: "CountdownRing",
        components: {
            VueEasyPieChart
        },
        props: {
            textValue: String,
            maxCount: Number,
            currentCount: Number,
            initialRingSize: Number,
            barColor: String,
            trackColor: String,
            textColor: String
        },
        data: function () {
            return {
                ringSize: this.initialRingSize || 100,
                animationSettings: {
                    duration: 100,
                    enabled: true
                },
                scale: '',
                testTextColor: 'cyan'
            }
        },
        computed: {
            currentPercent: function () {
                return parseFloat(((this.currentCount / this.maxCount) * 100).toFixed(2));
            }
        }
    }
</script>

<style scoped>
    div.countdown-ring {
        display: inline-block;
        padding: 5px;
    }

    div.countdown-ring-text-container {
        line-height: normal;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .countdown-ring-text {
        flex: 0 0 50px;
        font-weight: 300;
    }

    .countdown-ring-text-number {
        font-size: 32px;
        font-weight: bold;
    }
</style>