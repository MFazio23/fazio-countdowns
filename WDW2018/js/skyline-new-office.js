/**
 * Created with IntelliJ IDEA.
 * User: MFazio
 * Date: 8/5/15
 * Time: 9:58 PM
 * To change this template use File | Settings | File Templates.
 */
var cd = {
    endDate: moment('2018-01-24T06:00:00-05:00'),
    Times: {
        days: 0,
        hours: 1,
        minutes: 2,
        seconds: 3
    },
    epcOptions: {
        scaleColor: false,
        trackColor: 'rgba(255,255,255,0.3)',
        barColor: '#E7F7F5',
        lineWidth: 6,
        lineCap: 'butt',
        size: 95
    },
    updateCountdown: function () {
        var duration = moment.duration(cd.endDate.diff(moment())).format('d,H,m,s', {trim: false});
        var durationSplit = duration.split(",");

        $.each(cd.Times, function (id, durationIndex) {
            cd.updateChart(id, durationSplit[durationIndex]);
        });
    },
    updateChart: function updateChart(id, val) {
        var pct = cd.getPercentage(id, val);

        $("#" + id + "-chart").data('easyPieChart').update(pct);
        $("#" + id).text(val);
    },
    getPercentage: function getPercentage(id, val) {
        switch (cd.Times[id]) {
            case cd.Times.days:
                return 100 * (val / 33); //Relative to July 30th
                break;
            case cd.Times.hours:
                return 100 * (val / 24);
                break;
            case cd.Times.minutes:
            case cd.Times.seconds:
                return 100 * (val / 60);
                break;
            default:
                return val;
                break;
        }
    }
};

$(
    function () {
        $(".chart").easyPieChart(cd.epcOptions);
        cd.updateCountdown();
        cd.interval = setInterval(cd.updateCountdown, 1000);
    }
);




