class CountdownTimer {

    constructor(config, backgrounds) {
        this.divId = "countdown-timer";
        this.refreshInterval = 750;

        this.config = config;
        this.backgrounds = backgrounds;

        this.diffs = {
            days: (startDiff, currentDiff) => 100 - Math.floor(100 * ((startDiff.days - currentDiff.days) / startDiff.days)),
            hours: (startDiff, currentDiff) => 100 - Math.round(100 * ((24 - currentDiff.hours) / 24)),
            minutes: (startDiff, currentDiff) => 100 - Math.round(100 * ((60 - currentDiff.minutes) / 60)),
            seconds: (startDiff, currentDiff) => 100 - Math.round(100 * ((60 - currentDiff.seconds) / 60))
        }
    }

    init() {
        this.selectBackground();
        this.config.setTitle(this.background.textColor);
        this.initializeCharts();
    }

    selectBackground() {
        const imageType = (window.innerWidth > window.innerHeight ? CountdownImageType.Landscape : CountdownImageType.Portrait);
        const sizedBackgrounds = this.backgrounds.filter((background) => background.imageType === imageType);

        this.background = sizedBackgrounds[Math.random() * sizedBackgrounds.length >> 0];

        document.body.style.backgroundImage = `url('img/backgrounds/${this.background.imagePath}')`
    }

    initializeCharts() {
        const charts = Array.from(document.querySelectorAll('li.chart'), (chartElement) => {
            chartElement.firstElementChild.innerText = '0';
            chartElement.style.color = this.background.textColor;

            return new EasyPieChart(chartElement, {
                scaleColor: false,
                trackColor: this.background.trackColor.hexToRgbaString(0.3),
                barColor: this.background.barColor,
                lineWidth: 6,
                lineCap: 'butt',
                size: 100,
                anticlockwise: true
            });
        });

        setInterval(() => {
            const startDiff = this.config.endDate.diff(this.config.startDate, ['days']).toObject();
            const currentDiff = this.config.endDate.diffNow(['days', 'hours', 'minutes', 'seconds']).toObject();

            for (let chart of charts) {
                const chartType = chart.el.dataset.type;

                const diff = this.diffs[chartType](startDiff, currentDiff);
                const value = Math.round(currentDiff[chartType]);

                chart.update(diff);
                chart.el.firstElementChild.innerText = value;
            }

        }, this.refreshInterval);

        document.getElementById('countdown-div').style.display = 'block';
    }
}