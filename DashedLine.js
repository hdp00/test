//hdp 2016.07.24

function Point(x, y) {
    this.x = x;
    this.y = y;
}

//流动虚线绘制
function DashedLine(context) {
    this.ctx = context;
    //虚线线长
    this.lineInterval = 12;
    //虚线空隙长
    this.emptyInterval = 8;
    //虚线总长
    this.interval = this.lineInterval + this.emptyInterval;
    //流动偏移量
    this.offInterval = 0;
    //圆弧分割角
    this.angleInterval = Math.PI / 18;
}

//将圆弧拟合为直线数组
DashedLine.prototype.fittinArc = function (x, y, r, sAngle, eAngle) {
    var count = parseInt((eAngle - sAngle) / this.angleInterval) + 2;
    var lines = [];

    for (var i = 0; i < count; i++) {
        var angle = sAngle + this.angleInterval * i;
        //last point
        if (i == count - 1)
            angle = eAngle;
        var lineX = x + r * Math.cos(angle);
        var lineY = y + r * Math.sin(angle);
        lines.push(new Point(lineX, lineY));
    }

    return lines;
}

//流动
DashedLine.prototype.flow = function () {
    this.offInterval = (this.offInterval + 1) % this.interval;
}

DashedLine.prototype.draw = function (lines) {
    var ctx = this.ctx;
    var lineInterval = this.lineInterval;
    var emptyInterval = this.emptyInterval;
    var interval = this.interval;
    var offset = this.offInterval;

    ctx.beginPath();
    ctx.moveTo(lines[0].x, lines[0].y);
    
    for (var i = 0; i < lines.length - 1; i++) {
        var xbegin = lines[i].x;
        var yBegin = lines[i].y;
        var xEnd = lines[i + 1].x
        var yEnd = lines[i + 1].y;
        var xOff = xEnd - xbegin;
        var yOff = yEnd - yBegin;
        var len = Math.sqrt(xOff * xOff + yOff * yOff);
        var xRate = xOff / len;
        var yRate = yOff / len;
        var count = parseInt((len - offset) / interval);
        
        //begin line
        if (offset > emptyInterval) {
            var beginLen = offset - emptyInterval;
            if (beginLen > len)
                beginLen = len;
            //ctx.moveTo(xbegin, yBegin);
            var x = xbegin + beginLen * xRate;
            var y = yBegin + beginLen * yRate;
            ctx.lineTo(x, y);
        }

        //middle line
        xbegin += offset * xRate;
        yBegin += offset * yRate;
        for (var j = 0; j < count; j++) {
            var x = xbegin + interval * j * xRate;
            var y = yBegin + interval * j * yRate;
            ctx.moveTo(x, y);
            x += lineInterval * xRate;
            y += lineInterval * yRate;
           ctx.lineTo(x, y);
        }
        
        //end line
        if ((len - offset) > 0) {
            var endLen = len - offset - count * interval;
            xbegin += count * interval * xRate;
            yBegin += count * interval * yRate;
            ctx.moveTo(xbegin, yBegin);
            var endLine =  (endLen < lineInterval) ? endLen : lineInterval;
            x = xbegin + endLine * xRate;
            y = yBegin + endLine * yRate;
            ctx.lineTo(x, y);
        }

        //offset
        var lineOffset = interval - len % interval;
        offset = (offset + lineOffset) % interval;
    }

    ctx.stroke();
}
