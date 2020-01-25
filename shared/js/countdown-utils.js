// Alias for Luxon's DateTime objects
const DateTime = luxon.DateTime;

// Reload the page when clicked/touched
document.body.onclick = () => document.location.reload();

const IsMobile = window.matchMedia("(max-width: 576px)").matches;

// Converter for Hex to RGB
String.prototype.hexToRgb = function() {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

String.prototype.hexToRgba = function(a) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a
    } : null;
};
String.prototype.hexToRgbaString = function(a) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this);
    const colors = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a
    } : null;

    return colors ? `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${colors.a}` : null;
};