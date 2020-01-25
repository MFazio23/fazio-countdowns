class CountdownPageConfig {
    constructor(startDate, endDate, title) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.title = title;
    }

    setTitle(textColor) {
        const title = document.getElementById('countdown-timer-header');
        title.innerHTML = `${this.title} starts in:`;
        title.style.color = textColor;
        document.title = this.title;
    }
}