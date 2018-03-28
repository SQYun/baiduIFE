/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = [];
function id(name) {
    return document.getElementById(name);
}
function create(name) {
    return document.createElement(name);
}
// var english = "EdrEd";
// var chinese = "我";
// console.log(ischina_english(english));
// console.log(ischina_english(chinese));

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    console.log("addData")
    var city = id("aqi-city-input").value.trim();
    var aqi_value =id("aqi-value-input").value.trim();
    var aqi_int = parseInt(aqi_value);
    if (!ischina_english(city)){
        alert("请使用中文或英文字母！");
        return 0;
    };
    if (city.replace(/(^s*)|(s*$)/g, "").length ==0)
    {
        alert('不能为空');
    };
    if (!isNum(aqi_int)){
        alert("温度请使用0到9位的数字！");
        return 0;
    };
    aqiData.push([city,aqi_value]);
    console.log(aqiData);
    return aqiData;
}

function isNum(str) {
    var reg=/^[0-9]{0,9}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}
function ischina_english(str) {
    var reg=/^[\u4E00-\u9FA5]{0,4}|[A-Za-z]{0,5}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    console.log("render")
    var table =id("aqi-table");
    // var title = document.getElementsByClassName("title");
    var headTr = create("tr");
    var cityTd = create("td");
    var tempTd = create("td");
    var btnTd = create("td");
    table.innerHTML="";//清空table

    cityTd.innerHTML="城市";
    tempTd.innerHTML = "温度";
    btnTd.innerHTML = "操作"

    headTr.appendChild(cityTd);
    headTr.appendChild(tempTd);
    headTr.appendChild(btnTd);
    table.appendChild(headTr);
    if (aqiData.length === 0){
        table.innerHTML ="";
    }
    for (var i = 0; i<aqiData.length;i++){
        var twoTr =create("tr"),
            twoCity = create("td"),
            twoTemp = create("td"),
            twoBtn =  create("td");
        twoCity.innerHTML=aqiData[i][0];
        twoTemp.innerHTML = aqiData[i][1];
        twoBtn.innerHTML = "<button"+ " "+ "id='delTr"+i+"'"+"onclick='delBtnHandle("+i+")'>删除</button>"
        twoTr.appendChild(twoCity);
        twoTr.appendChild(twoTemp);
        twoTr.appendChild(twoBtn);
        console.log(twoTr);
        table.appendChild(twoTr);
        console.log(table);
    }
    // console.log(str);




}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    console.log("buttonHandle");
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(i) {
    // do sth.
    aqiData.splice(i,1);
        renderAqiList();
}

function init() {
     // console.log(2)
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    var btn= id("a");
    // console.log(a);
    // btn.click(addBtnHandle());
    //
    btn.onclick = addBtnHandle;
    var delbt = id("delTr0");
    var delBtn = document.getElementsByClassName("delTr");
    // delbt.onclick = delBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函

}

init();
