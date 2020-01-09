<template>
    <div id="countdown">
        <!-- Change to CountdownPage -->
        <CountdownGroup :start-date-time="startDateTime" :end-date-time="endDateTime" :page-config="selectedPageConfig"/>
    </div>
</template>

<script>
    import CountdownGroup from "../../components/countdown/CountdownGroup";
    import {CountdownImageType} from "../../types/CountdownImageType";

    export default {
        name: "Disney2020",
        components: {
            CountdownGroup
        },
        data() {
            return {
                startDateTime: "2019-09-03T08:15:00",
                endDateTime: "2020-06-09T15:35:00",
                pageConfigurations: [
                    //TODO: Turn into the images
                    1,2,3,4,5,6,7
                ]
            };
        },
        computed: {
            selectedPageConfig() {
                return this.pageConfigurations[Math.random() * this.pageConfigurations.length >> 0];
            }
        }
    }
</script>

<style scoped>

</style>