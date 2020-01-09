export class CountdownPageConfig {
    constructor(imageType, imagePath, barColor = '#2a52be', trackColor = '#2a9cbe', textColor = '#DDD') {
        this.imageType = imageType;
        this.imagePath = imagePath;
        this.barColor = barColor;
        this.trackColor = trackColor;
        this.textColor = textColor;
    }
}