const DateTime = luxon.DateTime;
const startDateTime = DateTime.local(2019, 1, 1, 0, 0);
const endDateTime = DateTime.local(2019, 9, 3, 8, 40, 0);

const defaultBarColor = "#3950A2";
const defaultTrackColor = "57, 80, 162";

const images = {

    landscape: [
        {
            "imageName": "rose-glen-winter.png",
            "barColor": "#3950A2",
            "trackColor": "57, 80, 162"
        }
    ],
    portrait: [
        {
            "imageName": "rose-glen-logo-bg.png",
            "barColor": "#3950A2",
            "trackColor": "57, 80, 162"
        }
    ]
};

function configureTimers(barColor, trackColor) {
    const timers = {
        checkIn: {
            divId: 'school-div',
            endDate: endDateTime
        }
    };

    $.each(timers, function (timerId, timer) {
        $('#' + timer.divId + ' .chart').each(function (ind, chart) {
            $(chart).easyPieChart({
                scaleColor: false,
                trackColor: `rgba(${trackColor || defaultTrackColor},0.3)`,
                barColor: barColor || defaultBarColor,
                lineWidth: 6,
                lineCap: 'butt',
                size: 95
            });
        });
    });

    setInterval(function (a, b, c) {
        $.each(timers, function (timerId, timer) {
            const diff = timer.endDate.diffNow(['days', 'hours', 'minutes', 'seconds']).toObject();
            const startDiff = timer.endDate.diff(startDateTime, ['days']).toObject();
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
}

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

const $doc = $(document);
$doc.ready(() => {
    const imageType = ($doc.width() > $doc.height() ? "landscape" : "portrait");

    //TODO: Can I just round this instead?
    const randomImage = images[imageType][parseInt(Math.random() * (images[imageType].length))];

    const imagePath = `img/backgrounds/${imageType}/${randomImage.imageName}`;
    $("#school-div").css('background-image', `url(${imagePath})`);

    $('h4, body').css('color', `rgb(${randomImage.trackColor || defaultTrackColor})`);

    configureTimers(randomImage.barColor, randomImage.trackColor);

    $('body').click((e) => {
        document.location.reload();
    });

});