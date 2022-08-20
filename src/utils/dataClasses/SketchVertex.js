export default class SketchVertex {
    constructor(x, y, displayColor, index) {
        this.x = x;
        this.y = y;
        this.displayColor = displayColor;
        this.index = index;
    }

    renderCircle = (p, diam, borderColor=255, fillColor=null) => {
        const textSize = diam / 1.8;
        p.fill(fillColor ? fillColor : this.displayColor);
        p.stroke(borderColor);
        p.strokeWeight(1)
        p.circle(this.x, this.y, diam);
        p.fill(borderColor);
        p.noStroke();
        p.textSize(textSize);
        p.textAlign(p.CENTER)
        p.text(`${this.index}`, this.x, this.y + textSize / 3);
    }

    sendData = (p, diam) => {
        if (p.dist(this.x, this.y, p.mouseX, p.mouseY) <= diam / 2) {
            return {x: this.x / p.width, y: this.y / p.height, index: this.index}
        }
        else {
            return null;
        }
    }
}