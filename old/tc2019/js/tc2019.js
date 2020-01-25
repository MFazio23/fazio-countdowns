const DateTime = luxon.DateTime;
const startTime = DateTime.local(2018, 8, 8, 17, 30);

const timers = {
    precon: {
        divId: 'precon-div',
        endDate: DateTime.local(2019, 8, 4, 8, 30, 0)
    },
    registration: {
        divId: 'registration-div',
        endDate: DateTime.local(2019, 8, 4, 18, 0, 0)
    },
    tc: {
        divId: 'tc-div',
        endDate: DateTime.local(2019, 8, 5, 7, 30, 0)
    }
};

$.each(timers, function (timerId, timer) {
    $('#' + timer.divId + ' .chart').each(function (ind, chart) {
        $(chart).easyPieChart({
            scaleColor: false,
            trackColor: 'rgba(255,255,255,0.3)',
            barColor: '#E7F7F5',
            lineWidth: 6,
            lineCap: 'butt',
            size: 95
        });
    });
});

setInterval(function (a, b, c) {
    $.each(timers, function (timerId, timer) {
        const diff = timer.endDate.diffNow(['days', 'hours', 'minutes', 'seconds']).toObject();
        const startDiff = timer.endDate.diff(startTime, ['days']).toObject();
        const diffs = {
            days: Math.round(100 * ((startDiff.days - diff.days) / startDiff.days)),
            hours: Math.round(100 * ((24 - diff.hours) / 24)),
            minutes: Math.round(100 * ((60 - diff.minutes) / 60)),
            seconds: Math.round(100 * ((60 - diff.seconds) / 60))
        };
        const values = {
            days: Math.round(diff.days),
            hours: Math.round(diff.hours),
            minutes: Math.round(diff.minutes),
            seconds: Math.round(diff.seconds)
        };
        updateCharts(timer.divId, diffs, values);
    });
}, 750);

function updateCharts(divId, diffs, values) {
    updateChart(divId, 'days', diffs.days, values.days);
    updateChart(divId, 'hours', diffs.hours, values.hours);
    updateChart(divId, 'minutes', diffs.minutes, values.minutes);
    updateChart(divId, 'seconds', diffs.seconds, values.seconds);
}

function updateChart(divId, chartName, diff, value) {
    $('#' + divId + ' .' + chartName + '-chart').data('easyPieChart').update(diff || 100);
    $('#' + divId + ' .' + chartName + '-value').text(value || 0);
}