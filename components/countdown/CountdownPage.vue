<template>
    <div id="countdown">
        <CountdownGroup :start-date-time="startDateTime" :end-date-time="endDateTime" :text-color="textColor"
                        :refresh-timeout="refreshTimeout" :bar-color="barColor" :track-color="trackColor"/>
    </div>
</template>

<script>
    import CountdownGroup from "./CountdownGroup";

    export default {
        name: "CountdownPage",
        components: {
            CountdownGroup
        },
        data() {
            return {
                refreshTimeout: this.overrideRefreshTimeout || 100,
                ringSize: this.overrideRingSize || 100
            };
        },
        props: [
            'startDateTime',
            'endDateTime',
            'overrideRefreshTimeout',
            'overrideRingSize',
            //TODO: These should be in a class instead.
            'textColor',
            'barColor',
            'trackColor'
        ],

    }
</script>

<style scoped>

</style>