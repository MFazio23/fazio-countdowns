class CountdownTimer {
    constructor(id, title, startDate, endDate, timers = [TimerType.Days, TimerType.Hours, TimerType.Minutes, TimerType.Seconds], dayOfWeek = null) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.timers = timers;

        this.refreshInterval = 750;

        if (dayOfWeek) {
            TimerType.DayOfWeek.id = dayOfWeek.toLowerCase();
            TimerType.DayOfWeek.text = dayOfWeek;
        }

        this.diffs = {
            days: (startDiff, currentDiff) => 100 - Math.floor(100 * ((startDiff.days - currentDiff.days) / startDiff.days)),
            hours: (startDiff, currentDiff) => 100 - Math.round(100 * ((24 - currentDiff.hours) / 24)),
            minutes: (startDiff, currentDiff) => 100 - Math.round(100 * ((60 - currentDiff.minutes) / 60)),
            seconds: (startDiff, currentDiff) => 100 - Math.round(100 * ((60 - currentDiff.seconds) / 60)),
            mondays: (startDiff, currentDiff) => -2 //TODO: Figure this out.
        }
    }

    init(selectedBackground) {
        this.background = selectedBackground;
        this.initializeCharts();
    }

    getHtml(titleColor) {
        return `
<div id="${this.id}-countdown-div" class="countdown-div hidden">
    <h4 id="${this.id}-countdown-timer-header" style="color: ${titleColor || '#FFF'}">${this.title}</h4>
    <div id="${this.id}-countdown-timer">
        ${this.getTimersHtml()}
    </div>
</div>`
    }

    getTimersHtml() {
        let timersHtml = '<ul class="countdown-chart-list">';

        this.timers.forEach((timerType) => {
            timersHtml += `
            <li class="chart ${timerType.id}-chart" data-percent="0" data-type="${timerType.id}">
                <span id="${timerType.id}-value chart-value">0</span><span class="chart-text">${timerType.text}</span>
            </li>
        `
        });

        timersHtml += `</ul>`;

        return timersHtml;
    }

    initializeCharts() {
        const charts = Array.from(document.querySelectorAll(`#${this.id}-countdown-timer ul li.chart`), (chartElement) => {
            chartElement.firstElementChild.innerText = '0';
            chartElement.style.color = this.background.textColor;

            return new EasyPieChart(chartElement, {
                scaleColor: false,
                trackColor: this.background.trackColor.hexToRgbaString(0.3),
                barColor: this.background.barColor,
                lineWidth: IsMobile ? 4 : 6,
                lineCap: 'butt',
                size: IsMobile ? 75 : 100,
                anticlockwise: true
            });
        });

        setInterval(() => {
            const startDiff = this.endDate.diff(this.startDate, ['days']).toObject();
            const currentDiff = this.endDate.diffNow(['days', 'hours', 'minutes', 'seconds']).toObject();

            for (let chart of charts) {
                const chartType = chart.el.dataset.type;

                const diff = this.diffs[chartType](startDiff, currentDiff);
                let value = Math.round(currentDiff[chartType]);
                if(isNaN(value)) value = 0;

                chart.update(diff);
                chart.el.firstElementChild.innerText = value;

            }

        }, this.refreshInterval);

        document.getElementById(`${this.id}-countdown-div`).classList.remove('hidden');
    }
}

const TimerType = {
    Days: {
        id: 'days',
        text: 'Days'
    },
    Hours: {
        id: 'hours',
        text: 'Hours'
    },
    Minutes: {
        id: 'minutes',
        text: 'Minutes'
    },
    Seconds: {
        id: 'seconds',
        text: 'Seconds'
    },
    DayOfWeek: {
        id: 'dayOfWeek',
        text: 'Days'
    }
};