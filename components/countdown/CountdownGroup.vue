<template>
    <div class="countdown-group">
        <CountdownRing class="days-ring" text-value="Days" :max-count="maxDaysBetween" :current-count="days"
                       :ring-size="ringSize" :text-color="textColor"
                       :bar-color="barColor" :track-color="trackColor"/>
        <CountdownRing class="hours-ring" text-value="Hours" :max-count="24" :current-count="hours"
                       :ring-size="ringSize" :text-color="textColor"
                       :bar-color="barColor" :track-color="trackColor"/>
        <CountdownRing class="minutes-ring" text-value="Minutes" :max-count="60" :current-count="minutes"
                       :ring-size="ringSize" :text-color="textColor"
                       :bar-color="barColor" :track-color="trackColor"/>
        <CountdownRing class="seconds-ring" text-value="Seconds" :max-count="60" :current-count="seconds"
                       :ring-size="ringSize" :text-color="textColor"
                       :bar-color="barColor" :track-color="trackColor"/>
        <pre>
            {{testObj}}
        </pre>
    </div>
</template>

<script>
    import CountdownRing from "./CountdownRing";
    import DateTime from "luxon/src/datetime";

    export default {
        name: "CountdownGroup",
        components: {
            CountdownRing
        },
        props: [
            'startDateTime',
            'endDateTime',
            'refreshTimeout',
            'ringSize',
            'barColor',
            'trackColor',
            'textColor',
            'testObj'
        ],
        data() {
            return {
                startDate: DateTime.fromISO(this.startDateTime),
                endDate: DateTime.fromISO(this.endDateTime),
                currentDate: DateTime.local()
            };
        },
        computed: {
            maxDaysBetween: function () {
                return Math.floor(this.endDate.diff(this.startDate, ['days']).days);
            },
            dateDiff: function () {
                return this.endDate.diff(this.currentDate, ['days', 'hours', 'minutes', 'seconds'])
            },
            days: function () {
                return Math.floor(this.dateDiff.days)
            },
            hours: function () {
                return Math.floor(this.dateDiff.hours)
            },
            minutes: function () {
                return Math.floor(this.dateDiff.minutes)
            },
            seconds: function () {
                return Math.floor(this.dateDiff.seconds)
            }
        },
        mounted() {
            setInterval(() => {
                this.currentDate = DateTime.local()
            }, this.refreshTimeout || 100);
        }
    }
</script>