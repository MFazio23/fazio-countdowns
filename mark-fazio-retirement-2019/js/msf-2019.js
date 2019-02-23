const DateTime = luxon.DateTime;
const startDateTime = DateTime.local(2019, 1, 1, 0, 0);
const endDateTime = DateTime.local(2019, 7, 5, 22, 45, 0);

const defaultBarColor = "#E7F7F5";
const defaultTrackColor = "255, 255, 255";

const images = {
    portrait: [
        {
            "imageName": "edmond-ok-1986-16x9.png",
            "barColor": "#7E6977",
            "trackColor": "126, 105, 119"
        },
        {
            "imageName": "hazel-desk-2018.png",
            "barColor": "#F386A1",
            "trackColor": "243, 134, 161"
        },
        {
            "imageName": "hazel-papa-desk-2016.png",
            "barColor": "#61311B",
            "trackColor": "97, 49, 27"
        },
        {
            "imageName": "papa-grammie-hazel-desk-2018.png"/*,
            "barColor": "#4C2866",
            "trackColor": "76, 40, 102"*/
        }
    ],
    landscape: [
        {
            "imageName": "hazel-desk-2018.jpg",
            "barColor": "#F386A1",
            "trackColor": "243, 134, 161"
        },
        {
            "imageName": "mark-cake-landscape.jpg"
        },
        {
            "imageName": "papa-grammie-hazel-desk-2018.jpg"/*,
            "barColor": "#4C2866",
            "trackColor": "76, 40, 102"*/
        },
        {
            "imageName": "papa-hazel-desk-2016.jpg",
            "barColor": "#61311B",
            "trackColor": "97, 49, 27"
        },
        {
            "imageName": "papa-hazel-greenscreen.jpg"
        }
    ]
};

function configureTimers(barColor, trackColor) {
    const timers = {
        checkIn: {
            divId: 'retirement-div',
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

    const randomImage = images[imageType][parseInt(Math.random() * (images[imageType].length))];

    const imagePath = `img/backgrounds/${imageType}/${randomImage.imageName}`;
    $("#retirement-div").css('background-image', `url(${imagePath})`);

    $('h4, body').css('color', `rgb(${randomImage.trackColor || defaultTrackColor})`);

    configureTimers(randomImage.barColor, randomImage.trackColor);

    $('body').click((e) => {
        document.location.reload();
    });

});