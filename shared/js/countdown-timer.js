class CountdownTimer {
    constructor(id, title, startDate, endDate,
                timers = [TimerType.Days, TimerType.Hours, TimerType.Minutes, TimerType.Seconds],
                dayOfWeek = null, startOfDay = null, endOfDay = null) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.timers = timers;

        this.refreshInterval = 750;
        this.overrideWithWhiteText = false;

        if (dayOfWeek) {
            TimerType.DayOfWeek.id = dayOfWeek.id;
            TimerType.DayOfWeek.text = dayOfWeek.text;
            TimerType.DayOfWeek.startOfDay = startOfDay || DateTime.local().startOf('day');
            TimerType.DayOfWeek.endOfDay = endOfDay || DateTime.local().endOf('day');
        }

        this.diffs = {
            days: (startDiff, currentDiff) => 100 - Math.floor(100 * ((startDiff.days - currentDiff.days) / startDiff.days)),
            hours: (startDiff, currentDiff) => 100 - Math.round(100 * ((24 - currentDiff.hours) / 24)),
            minutes: (startDiff, currentDiff) => 100 - Math.round(100 * ((60 - currentDiff.minutes) / 60)),
            seconds: (startDiff, currentDiff) => 100 - Math.round(100 * ((60 - currentDiff.seconds) / 60))
        };
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
            <li class="chart ${timerType.id}-chart" data-type="${timerType.id}">
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
            chartElement.style.color = this.overrideWithWhiteText ? "#FFF" : this.background.textColor;

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
            const startDiff = this.endDate.diff(this.startDate, ['weeks', 'days']).toObject();
            const currentDiff = this.endDate.diffNow(['days', 'hours', 'minutes', 'seconds']).toObject();

            for (let chart of charts) {
                let value = 0;
                let diffPct = 0;
                const chartType = chart.el.dataset.type;
                const diffFunc = this.diffs[chartType];

                if (diffFunc) {
                    diffPct = diffFunc(startDiff, currentDiff);
                    value = Math.round(currentDiff[chartType]);
                    if (isNaN(value)) value = 0;
                } else {
                    const weekdayCount = getWeekdayCount(this.startDate, this.endDate, TimerType.DayOfWeek.id);

                    value = weekdayCount;
                    diffPct = 100 - Math.round(100 * (weekdayCount / startDiff.weeks));
                }

                chart.update(diffPct);
                chart.el.firstElementChild.innerText = value;
            }

        }, this.refreshInterval);

        document.getElementById(`${this.id}-countdown-div`).classList.remove('hidden');
    }

    withWhiteText() {
        this.overrideWithWhiteText = true;
        return this;
    }
}

const getWeekdayCount = (startDate, endDate, weekDayId) => {
    const weekDay = Object.values(WeekDays).filter(wd => wd.id === weekDayId)[0];

    let currentDate = DateTime.local();
    let dateCount = 0;
    let weeksRemaining = 0;

    //TODO: Handle counting down that day, maybe.
    /*if (currentDate.weekday === weekDay.num &&
        luxon.Interval.fromDateTimes(TimerType.DayOfWeek.startOfDay, TimerType.DayOfWeek.endOfDay).contains(currentDate)) {
        const daySeconds = TimerType.DayOfWeek.endOfDay.diff(TimerType.DayOfWeek.startOfDay, 'seconds').seconds;
        const currentSeconds = TimerType.DayOfWeek.endOfDay.diff(currentDate, 'seconds').seconds;

        weeksRemaining = (endDate.diff(currentDate, ['weeks']).weeks + (currentSeconds / daySeconds)).toPrecision(3);

    } else {*/
        while (currentDate.weekday !== weekDay.num && dateCount <= 7) {
            currentDate = currentDate.plus({days: 1});
            dateCount++;
        }

        weeksRemaining = Math.ceil(endDate.diff(currentDate, ['weeks']).weeks);
    //}

    return weeksRemaining;
};

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

const WeekDays = {
    Monday: {
        id: 'mondays',
        text: 'Mondays',
        num: 1
    },
    Tuesday: {
        id: 'tuesdays',
        text: 'Tuesdays',
        num: 2
    },
    Wednesday: {
        id: 'wednesdays',
        text: 'Wednesdays',
        num: 3
    },
    Thursday: {
        id: 'thursdays',
        text: 'Thursdays',
        num: 4
    },
    Friday: {
        id: 'fridays',
        text: 'Fridays',
        num: 5
    },
    Saturday: {
        id: 'saturdays',
        text: 'Saturdays',
        num: 6
    },
    Sunday: {
        id: 'sundays',
        text: 'Sundays',
        num: 7
    }
};