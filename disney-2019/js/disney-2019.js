const DateTime = luxon.DateTime;
const startTime = DateTime.local(2018, 7, 22, 16, 40);

const defaultBarColor = "#E7F7F5";
const defaultTrackColor = "255, 255, 255";

const images = {
    portrait: [
        {
            "imageName": "9322026dbcf95e28b6f49b97e5afce46.jpg"
        },
        {
            "imageName": "fh9z9tbojonz.png"
        },
        {
            "imageName": "Disneyworld-Castle-1440x2560.jpg",
            "barColor": "#102055",
            "trackColor": "10, 20, 55"
        },
        {
            "imageName": "wdw-sign.jpg",
            "barColor": "#C73951",
            "trackColor": "199, 57, 81"
        }
    ],
    landscape: [
        {
            "imageName": "160f9f9f3eff6c613ad2b5f980e4913e.jpg"
        },
        {
            "imageName": "royal-holiday-hotel-resort-the-rosen-centre-hotel-estados-unidos-florida-orlando.jpg",
            "barColor": "#263749",
            "trackColor": "38, 55, 73"
        },
        {
            "imageName": "videoblocks-monorail-disney-world-park-epcot-orlando-usa_rzncodv0x_thumbnail-full09.png",
            "barColor": "#4EFCDB"
        },
        {
            "imageName": "videoblocks-sunny-day-in-walt-disney-world-magic-kingdom-orlando-usa_rztcz-8cg_thumbnail-full11.png",
            "barColor": "#294B84",
            "trackColor": "41, 75, 132"
        },
        {
            "imageName": "walt-disney-world-six-parks-uk-video-loop.jpg"
        },
        {
            "imageName": "disney-hero.jpg",
            "barColor": "#32454B",
            "trackColor": "50, 69, 75"
        },
        {
            "imageName": "disney-princesses.jpg",
            "barColor": "#19449A",
            "trackColor": "10, 27, 60"
        },
        {
            "imageName": "disney-world-secrets1215.jpg"
        },
        {
            "imageName": "wdw-balloons.jpg",
            "barColor": "#251968",
            "trackColor": "37, 25, 104"
        },
        {
            "imageName": "wdw-fireworks.jpg",
            "barColor": "#03C9EC",
            "trackColor": "3, 201, 236"
        }
    ]
};

function configureTimers(barColor, trackColor) {
    const timers = {
        checkIn: {
            divId: 'check-in-div',
            endDate: DateTime.local(2019, 1, 23, 6, 25, 0)
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
    $("#check-in-div").css('background-image', `url(${imagePath})`);

    $('h4, body').css('color', `rgb(${randomImage.trackColor || defaultTrackColor})`);

    configureTimers(randomImage.barColor, randomImage.trackColor);

    $('body').click((e) => {
        document.location.reload();
    });

});