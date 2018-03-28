/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
function id(name) {
    return document.getElementById(name);
}

function name(name) {
    return document.getElementsByName(name);
}

function create(name) {
    return document.createElement(name);
}

function log(name) {
    return console.log(name);
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {
    height: 0,
    width: 5,
    marginLeft: 5
};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

function getNum(dateNum) {
    var air = [];
    var city = pageState.nowSelectCity;
    var m = 0;
    var column = Math.floor(aqiSourceData[city] / 7) + 1;
    console.log("getNum");
    var arr = Object.values(aqiSourceData[city]);
    for (var i = 0; i < arr.length; i++) {
        m += arr[i];
        if ((i + 1) % dateNum === 0) {
            var weekAir = m / dateNum;
            air.push(weekAir);
            m = 0;
        }
        if (i / 7 - column < 1) {
            var weekAir = m / (i % dateNum);
            air.push(weekAir);
            m = 0;
        }
    }
    console.log(air);
    return air;
}

/**
 * 渲染图表
 */
function renderChart() {
    var cWrap = id("aqi-chart-wrap");
    cWrap.innerHTML = "";
    // console.log(cWrap);

    var city = pageState.nowSelectCity;
    log(city);
    var arr = Object.values(aqiSourceData[city]);
    console.log(aqiSourceData[city]);


    var left = 0;
    // var height = aqiSourceData[city];
    console.log(pageState.nowGraTime);
    if (pageState.nowGraTime === "day") {
        console.log("a");
        var max = arr.sort(function (a, b) {
            return b - a;
        });
        for (var day in aqiSourceData[city]) {
            var height = aqiSourceData[city];
            var top = max[0] + 10 - height[day];
            var html = create("div");
            var style = "height: " + height[day] + ";  width: " + chartData.width + ";position: absolute; top: " + top + " ; left: " + left + ";  margin-left:" + chartData.marginLeft + "; background-color: red;";
            var title = "时间：" + day + "空气指数:" + height[day];
            html.setAttribute("title", title);
            html.setAttribute("style", style);
            html.setAttribute("background-color", "red");
            // var html = "<div style='height: "+height[day]+"; width:15px;'></div>";
            left += chartData.marginLeft * 2;
            cWrap.style.height = max[0] + 10;
            cWrap.appendChild(html);
        }
    } else if (pageState.nowGraTime === "week") {
        var dateNum2 = 7;
        var air2 = getNum(dateNum2);
        var maxWeekAir = air2.sort(function (a, b) {
            return b - a;
        });
        for (var i2 = 0; i2 < air2.length; i2++) {
            var top2 = maxWeekAir[0] + 10 - air2[i2];
            var html2 = create("div");
            var style2 = "height: " + air2[i2] + ";  width: " + chartData.width + ";position: absolute; top: " + top2 + " ; left: " + left + ";  margin-left:" + chartData.marginLeft + "; background-color: red;";
            var title2 = "时间：第" + i2 + "周空气指数:" + air2[i2];
            html2.setAttribute("title", title2);
            html2.setAttribute("style", style2);
            html2.setAttribute("background-color", "red");
            // var html = "<div style='height: "+height[day]+"; width:15px;'></div>";
            left += chartData.marginLeft * 2;
            cWrap.style.height = maxWeekAir[0] + 10;
            cWrap.appendChild(html2);
        }
    } else if (pageState.nowGraTime === "month") {

        var dateNum3 = 30;
        var air3 = getNum(dateNum3);
        var maxMonthAir = air3.sort(function (a, b) {
            return b - a;
        });
        for (var i3 = 0; i3 < air3.length; i3++) {
            var top3 = maxMonthAir[0] + 10 - air3[i3];
            var html3 = create("div");
            var style3 = "height: " + air3[i3] + ";  width: " + chartData.width + ";position: absolute; top: " + top3 + " ; left: " + left + ";  margin-left:" + chartData.marginLeft + "; background-color: red;";
            var title3 = "时间：第" + i3 + "周空气指数:" + air3[i3];
            html3.setAttribute("title", title3);
            html3.setAttribute("style", style3);
            html3.setAttribute("background-color", "red");
            // var html = "<div style='height: "+height[day]+"; width:15px;'></div>";
            left += chartData.marginLeft * 2;
            cWrap.style.height = maxMonthAir[0] + 10;
            console.log(html3);
            cWrap.appendChild(html3);
        }
        //获取周平均空气指数

    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    if (this.checked) {
        console.log("一次时间");
        var cycle = this.value;
        pageState.nowGraTime = cycle;
        log(cycle);
        switch (cycle) {
            case "day":
                chartData.width = 5;
                chartData.marginLeft = 5;
                break;
            case "week":
                pageState.nowGraTime = "week";
                chartData.width = 10;
                chartData.marginLeft = 10;
                break;
            case "month":
                pageState.nowGraTime = "month";
                chartData.width = 15;
                chartData.marginLeft = 15;
                break;
        }
    }
    // 设置对应数据

    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // console.log("city");
    // console.log(this.checked);
    //     console.log("一次城市");
    //     console.log(this.value);
    //     var cycle = this.value;
        // pageState.nowGraTime = cycle;
        // console.log(this.value);
        pageState.nowSelectCity = this.value;
    // log(this.value);
    console.log(this.value);
    // 设置对应数据

    console.log(aqiSourceData);
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var gTime = name("gra-time");
    for (var i = 0; i < gTime.length; i++) {
        addEventHandler(gTime[i], "click", graTimeChange)
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var selectList = id("city-select");
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for (var city in aqiSourceData) {

        var option = create("option");
        option.value = city;
        option.innerHTML = city;
        selectList.appendChild(option);
    }
    console.log("一次");
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    for (var i = 0; i < selectList.length; i++) {
        addEventHandler(selectList, "change", citySelectChange);
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式

    // 处理好的数据存到 chartData 中

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();