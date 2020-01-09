<template>
    <div id="disney-2020">
        <CountdownGroup :start-date-time="startDateTime" :end-date-time="endDateTime" :text-color="textColor"
                        refresh-timeout="100" :bar-color="barColor" :track-color="trackColor"/>
    </div>
</template>

<script>
    import CountdownGroup from "./countdown/CountdownGroup";

    export default {
        name: "Disney2020",
        components: {
            CountdownGroup
        },
        data() {
            return {
                startDateTime: "2019-08-26T08:00:00",
                endDateTime: "2020-06-09T15:35:00",
                barColor: "#5E1668",
                trackColor: "#000",
                textColor: "#FFF"
            };
        }
    }
</script>

<style scoped>

</style>