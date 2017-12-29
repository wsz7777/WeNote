var obj = { abc: "ss", nn: 90 };
var v1 = obj.abc; //使用点的方式
var v2 = obj["abc"]; //使用中括号的方式
// 在实际项目中一般使用点，会方便许多，但是如果key是变量的话就不能使用点了，js会理解变量为对象的key值，造成混淆
var v3 = obj[key]; //key是一个变量