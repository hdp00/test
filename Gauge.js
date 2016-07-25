//基础类
//by hdp 2016.03.25

//rect
function Rect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
}
Rect.prototype.xCenter = function () {
    return this.x + this.width / 2;
}
Rect.prototype.yCenter = function () {
    return this.y + this.height / 2;
}
Rect.prototype.right = function () {
    return this.x + this.width;
}
Rect.prototype.bottom = function () {
    return this.y + this.height;
}
Rect.prototype.radius = function () {
    return (this.width < this.height) ? this.width / 2 : this.height / 2;
}
Rect.prototype.inflate = function(x, y) {
    this.x -= x;
    this.y -= y;
    this.width = this.width + x * 2;
    this.height = this.height + y * 2;
}

//数据定义
//by hdp 2016.03.25

//绘图组件类型
var DrawType =
{
    Cap: "cap",
    Needle: "needle",
    Range: "range",
    ScaleText: "scaleText",
    Scale: "scale",
    ScaleBack: "scaleBack",
    Back: "back",
    HalfBack: "halfBack",
    Led: "led",
    Layer: "layer",
}

//线型
var LineStyle =
{
    Solid: "solid",
    Dash: "dash",
    Dot: "dot",
    DashDot: "dashDot",
    DashDotDot: "dashDotDot",
    Null: "null"
}

//渐变色
var GradientStyle =
{
    Solid: "solid",
    Gs1: "gs1",
    Gs2: "gs2",
    Gs3: "gs3",
    Gs4: "gs4",
    Gs5: "gs5",
    Gs6: "gs6",
    Gs7: "gs7",
    Gs8: "gs8",
    Gs9: "gs9",
    Null: "null",
}

//绘图数据类
//by hdp 2016.03.25

//数据类，基类
function Data() {
    this.drawType = DrawType.Cap;
}

//数据类，边缘线
function EdgeLine() {
    this.color = "black";
    this.width = 1;
    this.lineStyle = LineStyle.Solid;
}

//数据类，背景色
function BackColor() {
    this.color1 = "white";//渐变色1
    this.color2 = "white";//渐变色2
    this.gradientStyle = GradientStyle.Solid;//渐变类型
}

//数据类，控制层
function DataLayer() {
    this.drawType = DrawType.Layer;
    this.item = new Array();//绘图项列表
    this.rect = new Rect(3, 3, 94, 94);//绘图比例
    this.startAngle = 30;//起始角度		0-360
    this.angleRange = 300;//角度量程		0-360
    this.minValue = 0;//起始值
    this.valueRange = 100;//值量程		>0
    this.scaleCount = 11;//主刻度数		2-16
}
DataLayer.prototype = new Data;

//数据类，值
function DataValue() {
    this.value = 0;//当前值
}
DataValue.prototype = new Data;

//数据类，中心点
function DataCap() {
    this.drawType = DrawType.Cap;
    this.style = 0;//风格
    this.radius = 6;//半径		1.0-36.0
    this.edgeLine = new EdgeLine;
    this.edgeLine.color = "rgba(0,0,0,0.25)";
    this.backColor = new BackColor;
    this.backColor.color1 = "rgb(245,245,245)";
    this.backColor.color2 = "rgb(220,220,220)";
    this.backColor.gradientStyle = GradientStyle.Gs4;
}
DataCap.prototype = new Data;

//数据类，指针
function DataNeedle() {
    this.drawType = DrawType.Needle;

    this.style = 0;//风格
    this.edgeLine = new EdgeLine;
    this.edgeLine.color = "rgba(0,0,0,0.25)";
    this.backColor = new BackColor;
    this.backColor.color1 = "white";
    this.backColor.color2 = "red";
    this.backColor.gradientStyle = GradientStyle.Gs1;
    this.width = 7;
    this.len = 38;
    this.radius = 37;
    this.currentValue = 0;
}
DataNeedle.prototype = new DataValue;

//数据类，进度条
function DataRange() {
    this.drawType = DrawType.Range;

    this.arrangement = 0;//布局
    this.edgeLine = new EdgeLine;
    this.edgeLine.lineStyle = LineStyle.Null;
    this.backColor = new BackColor;
    this.backColor.color1 = "white";
    this.backColor.color2 = "green";
    this.backColor.gradientStyle = GradientStyle.Gs2;
    this.width = 5;
    this.radius = 25;
    this.minValue = 70;
    this.valueRange = 30;
}
DataRange.prototype = new Data;

//数据类，刻度
function DataScale() {
    this.drawType = DrawType.Scale;

    this.style = 0;
    this.arrangement = 1;//布局
    this.edgeLine = new EdgeLine;
    this.edgeLine.color = "rgba(0,0,0,0.31)";
    this.backColor = new BackColor;
    this.backColor.color1 = "rgba(65,140,240,0.5)";
    this.backColor.color2 = "rgba(0,0,0,0.13)";
    this.backColor.gradientStyle = GradientStyle.Gs4;
    this.isSubScale = false;
    this.width = 3;
    this.radius = 37;
    this.len = 6;
    this.subCount = 3;

}
DataScale.prototype = new Data;

//数据类，刻度背景
function DataScaleBack() {
    this.drawType = DrawType.ScaleBack;

    this.arrangement = 1;//布局
    this.edgeLine = new EdgeLine;
    this.edgeLine.lineStyle = LineStyle.Null;
    this.backColor = new BackColor;
    this.backColor.color1 = "rgba(0,0,0,0.18)";
    this.backColor.color2 = "rgba(0,0,0,0.5)";
    this.backColor.gradientStyle = GradientStyle.Solid;
    this.width = 2;
    this.radius = 37;

}
DataScaleBack.prototype = new Data;

//数据类，背景
function DataBack() {
    this.drawType = DrawType.Back;

    this.style = 2;
    this.edgeLine = new EdgeLine;
    this.edgeLine.lineStyle = LineStyle.Null;
    this.backColor = new BackColor;
    this.backColor.color1 = "white";
    this.backColor.color2 = "white";
    this.backColor.gradientStyle = GradientStyle.Gs4;
    this.edgeColor = new BackColor;
    this.edgeColor.color1 = "rgba(131,181,255,0.39)";
    this.edgeColor.color2 = "rgba(0,81,191,0.39)";
    this.edgeColor.gradientStyle = GradientStyle.Gs4;
    this.edgeWidth = 6.5;
}
DataBack.prototype = new Data;

//数据类，半圆背景
function DataHalfBack() {
    this.drawType = DrawType.HalfBack;

    this.style = 2
    this.arrangement = 0;
}
DataHalfBack.prototype = new DataBack;

//数据类，刻度文本
function DataScaleText() {
    this.drawType = DrawType.ScaleText;

    this.style = 0;
    this.name = "Tahoma";
    this.color = "black";
    this.isBold = false;
    this.decimals = 0;
    this.radius = 33;
    this.size = 7;
}
DataScaleText.prototype = new Data;


//绘图类
function DrawItem(context)
{
    this.ctx = context;
    this.rect = new Rect(0, 0, 600, 600);
    this.layer;
}
DrawItem.prototype.draw = function(data)
{
    switch (data.drawType)
    {
        case DrawType.Cap:
            this.drawCap(data, this.layer);
            break;
        case DrawType.Needle:
            this.drawNeedle(data, this.layer);
            break;
        case DrawType.Range:
            this.drawRange(data, this.layer);
            break;
        case DrawType.ScaleText:
            this.drawScaleText(data, this.layer);
            break;
        case DrawType.Scale:
            this.drawScale(data, this.layer);
            break;
        case DrawType.ScaleBack:
            this.drawScaleBack(data, this.layer);
            break;
        case DrawType.Back:
            this.drawBack(data, this.layer);
            break;
        case DrawType.HalfBack:
            this.drawHalfBack(data, this.layer);
            break;
        default:
            break;
    }
}
DrawItem.prototype.drawCap = function(data, layer)
{
    var c = this.ctx;
    var shift = this.rect.width * data.radius / 50;
    var rf = new Rect(-(shift/2), -(shift)/2, shift, shift);

    c.beginPath();
    c.arc(rf.xCenter(), rf.yCenter(), rf.radius(), 0, Math.PI * 2);

    //backcolor
    var brush = this.createBrush(data.backColor, rf);
    if(brush != null)
    {
        c.fillStyle = brush;
        c.fill();
    }

    this.resetPen(data.edgeLine);
    c.stroke();
}
DrawItem.prototype.drawNeedle = function (data, layer)
{
    var c = this.ctx;
    var value = data.currentValue;

    //值限制
    var min = layer.minValue;
    var max = min + layer.valueRange;
    value = (value >= min) ? value : min;
    value = (value <= max) ? value : max ;
	
    //计算角度
    var angle = (value - min) / layer.valueRange;
    angle *= layer.angleRange;
    angle += layer.startAngle;
    angle = angle*Math.PI/180;

    var width = this.rect.width * data.width / 100;
    var len = this.rect.width * data.len / 100;
    var radius = this.rect.width * data.radius / 100;
    var rf = new Rect(-width/2, radius-len, width, len);

    data.currentValue = value;

    //rotate
    c.rotate(angle);

    c.beginPath();
    //style
    switch(data.style)
    {
        case 0:
            c.moveTo(rf.x, rf.y);
            c.lineTo(rf.right(), rf.y);
            c.lineTo(rf.xCenter(), rf.bottom());
            break;
        case 1:
            c.rect(rf.x, rf.y, rf.width, rf.height);
            break;
        case 2:
            c.moveTo(rf.x, rf.y);
            c.lineTo(rf.right(), rf.y);
            c.lineTo(rf.x + rf.width*0.8, rf.y + rf.height*0.8);
            c.lineTo(rf.xCenter(), rf.bottom());
            c.lineTo(rf.x + rf.width*0.2, rf.y + rf.height*0.8);
            break;
        case 3:
            c.moveTo(rf.x, rf.y);
            c.lineTo(rf.right(), rf.y);
            c.lineTo(rf.x + rf.width*0.75, rf.bottom());
            c.lineTo(rf.x + rf.width*0.25, rf.bottom());
            break;
        case 4:
            {
                var length = rf.height - rf.width/2;
                if(length > 0)
                {
                    c.moveTo(rf.x, rf.y + length);
                    c.lineTo(rf.x, rf.y);
                    c.lineTo(rf.right(), rf.y);
                    c.lineTo(rf.right(), rf.y + length);
                    var r = new Rect(rf.x, rf.bottom() - rf.width, rf.width, rf.width);
                    c.arc(r.xCenter(), r.yCenter(), r.radius(), 0, Math.PI);
                }
                else
                {
                    var r = new Rect(rf.x, rf.y - rf.height, rf.width, rf.height*2);
                    //temp 这里应该画个椭圆，代码可能有问题
                    c.arc(r.xCenter(), rf.yCenter(), r.radius(), 0, Math.PI);
                }
            
            }
            break;
        default:
            break;
    }
    c.closePath();

    //backColor
    var brush = this.createBrush(data.backColor, rf);
    if(brush != null)
    {
        c.fillStyle = brush;
        c.fill();
    }

    //edgeline
    this.resetPen(data.edgeLine);
    c.stroke();

    //restore rotate
    c.rotate(-angle);
}
DrawItem.prototype.drawRange = function (data, layer)
{
    var c = this.ctx;

    //取值范围限制
    var layerMin = layer.minValue;
    var layerMax = layerMin + layer.valueRange;
    var min = data.minValue;
    min = (min >= layerMin) ? min : layerMin;
    if(min >= layerMax)
        return;
    var max = min + data.valueRange;
    max = (max <= layerMax) ? max : layerMax;

    var radius = this.rect.width * data.radius / 100;
    var width = this.rect.width * data.width / 100;

    //get angle
    var stAngle = (min - layerMin) / layer.valueRange * layer.angleRange;
    stAngle += layer.startAngle;
    stAngle = (stAngle + 90) * Math.PI / 180;
    var sweepAngle = (max - min) / layer.valueRange * layer.angleRange;
    sweepAngle = sweepAngle * Math.PI / 180;
    
    var offset1 = width / 2 * (data.arrangement - 1);
    var offset2 = width / 2;
    var inRadius = radius + offset1 - offset2;
    var outRadius = radius + offset1 + offset2;
    var rf = new Rect(-outRadius, -outRadius, outRadius*2, outRadius*2);

    c.beginPath();
    c.arc(0, 0, inRadius, stAngle, stAngle + sweepAngle);
    c.arc(0, 0, outRadius, stAngle + sweepAngle, stAngle, true);
    c.closePath(); 

    //backColor
    var brush = this.createBrush(data.backColor, rf);
    if(brush != null)
    {
        c.fillStyle = brush;
        c.fill();
    }

    //edgeline
    this.resetPen(data.edgeLine);
    c.stroke();
}
DrawItem.prototype.drawScaleText = function (data, layer)
{
    var c = this.ctx;
    
    var size = this.rect.width * data.size / 100;
    var radius = this.rect.width *data.radius / 100;
    var count = layer.scaleCount;
    var startAngle = layer.startAngle;
    var intervalAngle = layer.angleRange / (count - 1);
    var minValue = layer.minValue;
    var intervalValue = layer.valueRange / (count - 1);
    var decimal = data.decimals;
    var bold = (data.bold) ? "bold " : "";
    var font = bold + size + "px " + data.name;

    c.font = font;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = data.color;

    for(var i = 0; i < count; i++)
    {
        var value = minValue + intervalValue * i;
        value = value.toFixed(decimal);

        var angle = startAngle + intervalAngle * i;
        angle = angle * Math.PI / 180;
        var offsetW = c.measureText(value).width;
        var offsetH = size;
        var r = radius;

        switch(parseInt((data.style+0.1) / 4))
        {
            case 0:
                offsetW = -offsetW / 2;
                offsetH = -offsetH / 2;
                break;
            case 1:
                offsetW = 0;
                offsetH = 0;
                break;
            case 2:
                offsetW /= 2;
                offsetH /= 2;
                break;
            default:
                break;
        }

        //style
        switch(Math.round(data.style % 4))
        {
            case 0:
                {
                    var x = -(radius + offsetW) * Math.sin(angle);
                    var y = (radius + offsetH) * Math.cos(angle);
                    c.fillText(value, x, y);
                }
                break;
            case 1:
                {
                    if(i == 0)
                        c.rotate((startAngle + 180) * Math.PI / 180);

                    r += offsetH;

                    var actAngel = startAngle + intervalAngle * i;
                    actAngel = (actAngel < 360) ? actAngel : actAngel - 360;
                    if(actAngel < 90 || actAngel >= 270)
                    {
                        c.rotate(-Math.PI);
                        c.fillText(value, 0, r);
                        c.rotate(Math.PI);
                    }
                    else
                        c.fillText(value, 0, -r);

                    if(i < (count - 1))
                        c.rotate(intervalAngle * Math.PI / 180);
                    else
                        c.rotate((-startAngle - layer.angleRange - 180) * Math.PI / 180);
                }
                break;
            case 2:
                {
                    if(i == 0)
                        c.rotate((startAngle + 180) * Math.PI / 180);

                    r += offsetH;

                    c.fillText(value, 0, -r);

                    if(i < (count - 1))
                        c.rotate(intervalAngle * Math.PI / 180);
                    else
                        c.rotate((-startAngle - layer.angleRange - 180) * Math.PI / 180);
                }
                break;
            case 3:
                if(i == 0)
                    c.rotate(startAngle * Math.PI / 180);

                r += offsetH;

                c.fillText(value, 0, r);

                if(i < (count - 1))
                    c.rotate(intervalAngle * Math.PI / 180);
                else
                    c.rotate((-startAngle - layer.angleRange) * Math.PI / 180);
                break;
            default:
                break;
        }
    }
}
DrawItem.prototype.drawScale = function (data, layer)
{
    var c = this.ctx;

    var width = this.rect.width * data.width / 100;
    var len = this.rect.width * data.len / 100;
    var radius = this.rect.width * data.radius / 100;
    var count = layer.scaleCount;
    var interval = layer.angleRange / (count - 1) * Math.PI / 180;
    var subCount = data.subCount;
    var subInterval = interval / (subCount + 1);
    var startAngle = layer.startAngle * Math.PI / 180;
    var angleRange = layer.angleRange * Math.PI / 180;

    //arrangement
    var rf = new Rect(-width/2, radius-len, width, len);//default arrangement 0
    switch(data.arrangement)
    {
        case 0:
            break;
        case 1:
            rf.y = radius - len / 2;
            break;
        case 2:
            rf.y = radius;
            break;
        default:
            break;
    }

    //rotate
    c.rotate(startAngle);
	
    //backColor
    var brush = this.createBrush(data.backColor, rf);
    if(brush != null)
    {
        c.fillStyle = brush;
        
        for(var i = 0; i < count; i++)
        {
            if(data.isSubScale)
            {
                if(i == (count - 1))
                    break;

                c.rotate(subInterval);

                for(var j = 0; j < subCount; j++)
                {
                    this.generateScalePath(data.style, rf);
                    c.fill();
                    c.rotate(subInterval);
                }
            }
            else
            {
                this.generateScalePath(data.style, rf);
                c.fill();
                c.rotate(interval);
            }
        }

        if(data.isSubScale)
            c.rotate(-angleRange);
        else
            c.rotate(-angleRange - interval);
    }

    //edgeline
    this.resetPen(data.edgeLine);
    for(var i = 0; i < count; i++)
    {
        if(data.isSubScale)
        {
            if(i == (count - 1))
                break;

            c.rotate(subInterval);

            for(var j = 0; j < subCount; j++)
            {
                this.generateScalePath(data.style, rf);
                c.stroke();
                c.rotate(subInterval);
            }
        }
        else
        {
            this.generateScalePath(data.style, rf);
            c.stroke();
            c.rotate(interval);
        }
    }

    if(data.isSubScale)
        c.rotate(-angleRange);
    else
        c.rotate(-angleRange - interval);

    //restore rotate
    c.rotate(-startAngle);
}
DrawItem.prototype.drawScaleBack = function (data, layer)
{
    var c = this.ctx;

    var stAngle = layer.startAngle + 90;
    stAngle = stAngle * Math.PI / 180;
    var sweepAngle = layer.angleRange;
    sweepAngle = sweepAngle * Math.PI / 180;
    var width = this.rect.width * data.width / 100;
    var radius = this.rect.width * data.radius / 100;
    var offset1 = width / 2 * (data.arrangement - 1);
    var offset2 = width / 2;
    var r = radius + offset1 + offset2;
    var rf = new Rect(-r, -r, r*2, r*2);

    c.beginPath();
    c.arc(0, 0, r,  stAngle, stAngle + sweepAngle);
    c.arc(0, 0, radius + offset1 - offset2, stAngle + sweepAngle, stAngle, true);
    c.closePath();

    //backColor
    var brush = this.createBrush(data.backColor, rf);
    if(brush != null)
    {
        c.fillStyle = brush;
        c.fill();
    }

    //edgeline
    this.resetPen(data.edgeLine);
    c.stroke();
}
DrawItem.prototype.drawBack = function (data, layer)
{
    var c = this.ctx;
   
    var width = this.rect.width * data.edgeWidth / 100;
    var rf = new Rect(-this.rect.width/2, -this.rect.height/2,  this.rect.width, this.rect.height);
    var style = data.style;
    var styleMod = Math.round(style % 3);
    var styleDivider = parseInt((style+0.1) / 3);
    
    var r = new Rect(rf.x, rf.y, rf.width, rf.height);
    if(styleMod != 0)
        r.inflate(-width, -width);

    //edgeback
    if(styleMod != 0)
    {
        c.beginPath();
       
        this.generateBackPath(style, r);
        this.generateBackPath(style, rf, false);

        var brush = this.createBrush(data.edgeColor, rf);
        if(brush != null)
        {
            c.fillStyle = brush;
            c.fill();
        }
    }

    //edgeback1
    if(styleMod == 2)
    {
        var r1 = new Rect(r.x, r.y, r.width, r.height); ;
        var w1 = width * 0.33;
        r1.inflate(w1, w1);
           
        c.beginPath();
        this.generateBackPath(style, r);
        this.generateBackPath(style, r1, false);

        var backColor = new BackColor;
        backColor.color1 = data.edgeColor.color2;
        backColor.color2 = data.edgeColor.color1;
        backColor.gradientStyle = data.edgeColor.gradientStyle;

        var brush = this.createBrush(backColor, r1);
        if(brush != null)
        {
            c.fillStyle = brush;
            c.fill();
        }
    }

    //back
    c.beginPath();
    this.generateBackPath(style, r);

    var brush = this.createBrush(data.backColor, rf);
    if (brush != null) {
        c.fillStyle = brush;
        c.fill();
    }

    //edgeBackLine
    c.beginPath();
    this.generateBackPath(style, rf);

    this.resetPen(data.edgeLine);
    c.stroke();
}
DrawItem.prototype.drawHalfBack = function (data, layer)
{
    var c = this.ctx;

    var rate = 0.12;
    var width = this.rect.width * data.edgeWidth / 100;
    var rf = new Rect(-this.rect.width/2, -this.rect.height/2, this.rect.width, this.rect.height);
    var angle = (data.arrangement * 90) * Math.PI / 180;
    var rb = new Rect(rf.x, rf.y, rf.width, rf.height*(0.5 + rate));
	
    //rotate
    c.rotate(angle);

    //back
    c.beginPath();
    this.generateHalfBackPath(rf, true, false, 0);

    var brush = this.createBrush(data.backColor, rb);
    if(brush != null)
    {
        c.fillStyle = brush;
        c.fill();
    }

    //edgeback
    var r = new Rect(rf.x, rf.y, rf.width, rf.height);
    r.inflate(-width, -width);
    var radius = rf.width * rate - width;
    if(data.style == 1 || data.style == 2)
    {
        c.beginPath();
        this.generateHalfBackPath(rf, true, false, 0);
        this.generateHalfBackPath(r, false, true, radius);

        var brushEdge = this.createBrush(data.edgeColor, rb);
        if(brushEdge != null)
        {
            c.fillStyle = brushEdge;
            c.fill();
        }
    }

    //edgeback1
    var r1 = new Rect(r.x, r.y, r.width, r.height);
    var w1 = width * 0.33;
    r1.inflate(w1, w1);
    var radius1 = rf.width * rate - (width - w1);
    if(data.style == 2)
    {
        c.beginPath();
        this.generateHalfBackPath(r, false, true, radius);
        this.generateHalfBackPath(r1, true, true, radius1);

        var backColor = new BackColor;
        backColor.color1 = data.edgeColor.color2;
        backColor.color2 = data.edgeColor.color1;
        backColor.gradientStyle = data.edgeColor.gradientStyle;

        var brushEdge1 = this.createBrush(backColor, r1);
        if(brushEdge1 != null)
        {
            c.fillStyle = brushEdge1;
            c.fill();
        }
    }

    //edgeLine
    c.beginPath();
    this.generateHalfBackPath(rf, true, false, 0);

    this.resetPen(data.edgeLine);
    c.stroke();

    //restore rotate
    c.rotate(-angle);
}
DrawItem.prototype.createBrush = function(backColor, rect)
{
    var x = rect.x;
    var y = rect.y;
    var xCenter = rect.xCenter();
    var yCenter = rect.yCenter();
    var right = rect.right();
    var bottom = rect.bottom();
    var radius = rect.radius();

    var grad;

    switch(backColor.gradientStyle)
    {
        case GradientStyle.Solid:
            return backColor.color1;
        case GradientStyle.Gs1:
            grad = this.ctx.createLinearGradient(x, yCenter, right, yCenter);
            break;
        case GradientStyle.Gs2:
            grad = this.ctx.createLinearGradient(xCenter, y, xCenter, bottom);
            break;
        case GradientStyle.Gs3:
            grad = this.ctx.createLinearGradient(right, y, x, bottom);
            break;
        case GradientStyle.Gs4:
            grad = this.ctx.createLinearGradient(x, y, right, bottom);
            break;
        case GradientStyle.Gs5:
            grad = this.ctx.createRadialGradient(xCenter, yCenter, 0, xCenter, yCenter, radius*2);
            break;
        case GradientStyle.Gs6:
            grad = this.ctx.createLinearGradient(x, yCenter, right, yCenter);
            break;
        case GradientStyle.Gs7:
            grad = this.ctx.createLinearGradient(xCenter, y, xCenter, bottom);
            break;
        case GradientStyle.Gs8:
            grad = this.ctx.createLinearGradient(right, y, x, bottom);
            break;
        case GradientStyle.Gs9:
            grad = this.ctx.createLinearGradient(x, y, right, bottom);
            break;
        case GradientStyle.Null:
        default:
            return null;
    }

    if(grad != null)
    {
        switch(backColor.gradientStyle)
        {
            case GradientStyle.Gs1:
            case GradientStyle.Gs2:
            case GradientStyle.Gs3:
            case GradientStyle.Gs4:
            case GradientStyle.Gs5:
                grad.addColorStop(0,backColor.color1);
                grad.addColorStop(1, backColor.color2);
                return grad;
            case GradientStyle.Gs6:
            case GradientStyle.Gs7:
            case GradientStyle.Gs8:
            case GradientStyle.Gs9:
                grad.addColorStop(0, backColor.color1);
                grad.addColorStop(0.5, backColor.color2)
                grad.addColorStop(1, backColor.color1);
                return grad;
            default:
                return null;
        }
    }

    return null;
}
DrawItem.prototype.resetPen = function (edgeLine)
{
    var transparent = "rgba(0,0,0,0)";

    switch (edgeLine.lineStyle)
    {
        case LineStyle.Solid:
        case LineStyle.Dash:
        case LineStyle.Dot:
        case LineStyle.DashDot:
        case LineStyle.DashDotDot:
            this.ctx.strokeStyle = edgeLine.color;
            break;
        case LineStyle.Null:
            this.ctx.strokeStyle = transparent;
            break;
        default:
            break;
    }

    this.ctx.lineWidth = edgeLine.width;
    if (edgeLine.width == 0)
        this.ctx.strokeStyle = transparent;
}
DrawItem.prototype.generateScalePath = function (style, rect)
{
    var c = this.ctx;

    c.beginPath();
    //style
    switch (style) {
        case 0:
            c.moveTo(rect.x + rect.width * 0.25, rect.y);
            c.lineTo(rect.x + rect.width * 0.75, rect.y);
            c.lineTo(rect.right(), rect.bottom());
            c.lineTo(rect.x, rect.bottom());
            break;
        case 1:
            c.moveTo(rect.x, rect.y);
            c.lineTo(rect.right(), rect.y);
            c.lineTo(rect.x + rect.width * 0.5, rect.bottom());
            break;
        case 2:
            c.rect(rect.x, rect.y, rect.width, rect.height);
            break;
        case 3:
            c.moveTo(rect.x + rect.width * 0.5, rect.y);
            c.lineTo(rect.right(), rect.bottom());
            c.lineTo(rect.x, rect.bottom());
            break;
        case 4:
            {
                var l = rect.height - rect.width / 2;
                if (l > 0) {
                    c.moveTo(rect.right(), rect.y + rect.width / 2);
                    c.lineTo(rect.right(), rect.bottom());
                    c.lineTo(rect.x, rect.bottom());
                    c.lineTo(rect.x, rect.y + rect.width / 2);
                    c.arc(rect.xCenter(), rect.y + rect.width / 2, rect.width / 2, Math.PI, Math.PI*2);
                }
                else {
                    //temp,椭圆可能有问题
                    c.arc(rect.xCenter(), rect.bottom(), rect.width / 2, 0, Math.PI, true);
                }
            }
            break;
        case 5:
            {
                var l = rect.height - rect.width / 2;

                if (l > 0) {
                    c.moveTo(rect.x, rect.y + l);
                    c.lineTo(rect.x, rect.y);
                    c.lineTo(rect.right(), rect.y);
                    c.lineTo(rect.right(), rect.y + l);
                    c.arc(rect.xCenter(), rect.y + rect.height - rect.width / 2, rect.width / 2, 0, Math.PI);
                }
                else {
                    //temp
                    //c.arc();
                }
            }
            break;
        case 6:
            {
                var l = rect.height - rect.width;

                if (l > 0) {
                    c.moveTo(rect.right(), rect.y + rect.width / 2);
                    c.lineTo(rect.right(), rect.y + rect.width / 2 + l);
                    c.arc(rect.xCenter(), rect.y + l + rect.width / 2, rect.width / 2, 0, Math.PI);
                    c.lineTo(rect.x, rect.y + rect.width / 2);
                    c.arc(rect.xCenter(), rect.y + rect.width / 2 , rect.width / 2, Math.PI, Math.PI * 2);
                }
                else {
                    //temp 椭圆
                }
            }
            break;
        case 7:
            c.moveTo(rect.xCenter(), rect.y);
            c.lineTo(rect.right(), rect.yCenter());
            c.lineTo(rect.xCenter(), rect.bottom());
            c.lineTo(rect.x, rect.yCenter());
            break;
        default:
            break;
    }
    c.closePath();
}
DrawItem.prototype.generateBackPath = function(style, rect, clockwise)
{
    if (clockwise == null)
        clockwise = true;

    var c = this.ctx;
    var rate = 0.15;

    switch(style) {
        case 0:
        case 1:
        case 2:
            c.moveTo(rect.right(), rect.yCenter());
            if(clockwise)
                c.arc(0, 0, rect.radius(), 0, Math.PI * 2 *0.999, false);
            else
                c.arc(0, 0, rect.radius(), Math.PI*2 * 0.999, 0, true);
            break;
        case 3:
        case 4:
        case 5:
            c.moveTo(rect.x, rect.y);
            if (clockwise)
                c.rect(rect.x, rect.y, rect.width, rect.height);
            else
            {             
                c.lineTo(rect.x, rect.bottom());
                c.lineTo(rect.right(), rect.bottom());
                c.lineTo(rect.right(), rect.y);
                c.closePath;
            }
            break;
        case 6:
        case 7:
        case 8:
            {
                var w = rate * rect.width;
                var r = w / 2;

                if (clockwise) {
                    c.moveTo(rect.x, rect.y + r);
                    c.arc(rect.x + r, rect.y + r, r, Math.PI, Math.PI * 1.5);
                    c.arc(rect.right() - r, rect.y + r, r, Math.PI * 1.5, Math.PI * 2);
                    c.arc(rect.right() - r, rect.bottom() - r, r, 0, Math.PI * 0.5);
                    c.arc(rect.x + r, rect.bottom() - r, r, Math.PI * 0.5, Math.PI);
                }
                else {
                    c.moveTo(rect.x + r, rect.y);
                    c.arc(rect.x + r, rect.y + r, r, Math.PI*1.5, Math.PI, true);
                    c.arc(rect.x + r, rect.bottom() - r, r, Math.PI, Math.PI * 0.5, true);
                    c.arc(rect.right() - r, rect.bottom() - r, r, Math.PI * 0.5, 0,  true);
                    c.arc(rect.right() - r, rect.y + r, r, Math.PI * 2, Math.PI * 1.5, true);
                }
                c.closePath();
            }
            break;
        default:
            break;
    }
}
DrawItem.prototype.generateHalfBackPath = function(rect, clockwise, isEdge, radius)
{
    if (clockwise == null)
        clockwise = true;
    
    var c = this.ctx;
    var rate = 0.12;
    var smallWidth = rect.width * rate;
    if(isEdge)
        smallWidth = radius;

    if(clockwise)
    {
        c.moveTo(rect.x, rect.yCenter());
        c.arc(rect.xCenter(), rect.yCenter(), rect.radius(), Math.PI, Math.PI * 2);
        if(!isEdge || (isEdge && (smallWidth > 0)))
        {
            c.arc(rect.right() - smallWidth, rect.yCenter(),  smallWidth, 0, Math.PI * 0.5);
            c.arc(rect.x + smallWidth, rect.yCenter(), smallWidth, Math.PI * 0.5, Math.PI);
        }    
    }
    else
    {
        c.moveTo(rect.right(), rect.yCenter());
        c.arc(rect.xCenter(), rect.yCenter(), rect.radius(), Math.PI * 2, Math.PI, true);
        if (!isEdge || (isEdge && (smallWidth > 0)))
        {
            c.arc(rect.x + smallWidth, rect.yCenter(), smallWidth, Math.PI, Math.PI * 0.5, true);
            c.arc(rect.right() - smallWidth, rect.yCenter(),  smallWidth, Math.PI * 0.5, 0, true);          
        }    
    }

    c.closePath();
}
DrawItem.prototype.resetLayer = function (layer, rect)
{
    this.layer = layer;

    var x = rect.x + layer.rect.x * rect.width / 100;
    var y = rect.y + layer.rect.y * rect.height / 100;
    var w = layer.rect.width * rect.width / 100;
    var h = layer.rect.height * rect.height / 100;
    w = (w < h) ? w : h;

    this.rect = new Rect(x, y, w, h);
}

//仪表
function DrawGauge(context)
{
    this.ctx = context;
    this.drawItem = new DrawItem(context);
    this.layers = new Array();
    this.rect = new Rect(20, 20, 600, 600);
    this.needle = [];
    this.value = 0;

    //this.initGauge();
}
DrawGauge.prototype.initGauge = function ()
{
    //圆表
    var layer = new DataLayer;
    layer.item.push(new DataCap);
    var needle = new DataNeedle
    layer.item.push(needle);
    layer.item.push(new DataRange);
    layer.item.push(new DataScaleText);
    var scale = new DataScale;
    scale.isSubScale = true;
    scale.width = 1;
    scale.len = 4;
    layer.item.push(scale);
    layer.item.push(new DataScale);
    layer.item.push(new DataScaleBack);
    //layer.item.push(new DataHalfBack);
    layer.item.push(new DataBack);
    this.layers.push(layer);

    this.needle.push(needle);
}
DrawGauge.prototype.draw = function ()
{
    this.ctx.save();
    for (var i in this.layers)
    {
        var layer = this.layers[this.layers.length - i - 1];
        this.drawItem.resetLayer(layer, this.rect);
        var r = this.drawItem.rect;
        this.ctx.translate(r.xCenter(), r.yCenter());

        for (var j in layer.item)
            this.drawItem.draw(layer.item[layer.item.length - j  - 1]);

        this.ctx.translate(-r.xCenter(), -r.yCenter());
    }
    this.ctx.restore();
}
DrawGauge.prototype.resetValue = function ()
{
    this.value = this.value + 0.2;
    if (this.value > 100)
        this.value = 0;


    for (var i = 0; i < this.needle.length; i++)
        this.needle[i].currentValue = this.value/(i+1);
}
DrawGauge.prototype.setData = function(data)
{
	this.needle = [];
	this.layers = data;
	var index = 0;
	
	for (var i in this.layers)
    {
        var layer = this.layers[i];
        for (var j in layer.item)
		{
			if(layer.item[j].drawType == DrawType.Needle)
				this.needle.push(layer.item[j]);
		}   
    }
}
