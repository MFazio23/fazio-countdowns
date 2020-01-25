class CountdownTimers {

    constructor(id, header, timers, backgrounds, headerIsHtml) {
        this.id = id;
        this.header = header;
        this.timers = timers;
        this.backgrounds = backgrounds;
        this.headerIsHtml = headerIsHtml || false;
    }

    async init() {
        await this.selectBackground();

        $(`#${this.id}`).append(this.getHtml());

        this.timers.forEach((timer) => timer.init(this.background));
    }

    async selectBackground() {
        const imageType = (window.innerWidth > window.innerHeight ? CountdownImageType.Landscape : CountdownImageType.Portrait);
        const sizedBackgrounds = this.backgrounds.filter((background) => background.imageType === imageType);

        this.background = sizedBackgrounds[Math.random() * sizedBackgrounds.length >> 0];

        const palette = await Vibrant.from(`img/backgrounds/${this.background.imagePath}`).getPalette();

        this.background.barColor = palette.Vibrant.hex;
        this.background.trackColor = palette.LightVibrant.hex;
        this.background.textColor = palette.DarkVibrant.hex;
        this.background.titleColor = palette.DarkMuted.hex;

        document.body.style.backgroundImage = `url('img/backgrounds/${this.background.imagePath}')`;
    }

    getHtml = () =>
        (this.headerIsHtml ? this.header : `<h1 class="header">${this.header}</h1>`) +
        this.timers.map((timer) => timer.getHtml(this.background.titleColor)).join("");
}