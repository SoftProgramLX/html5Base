


function onload() {
	setTodayTime();
	//在电脑上使用时初始设置一次
	totalProbability();
	reservationManagement();
	timeQuery();
}

function setTodayTime () {
	var xx=document.getElementById("baseName");  
	var name = localStorage.getItem("userName");
	xx.innerHTML="Hello "+ name;

	today = new Date();
	// document.write(today.getFullYear(),"年","",today.getMonth()+1,"月","",today.getDate(),"日 ");
	// document.write(showweek());
	var xx=document.getElementById("week");  
	xx.innerHTML=today.getFullYear() + "年" + (today.getMonth()+1) + "月" + today.getDate() + "日 " + showweek()
	function showweek()
	{
		  now = new Date();
		  if (now.getDay()==0) return("星期日");
		  if (now.getDay()==1) return("星期一");
		  if (now.getDay()==2) return("星期二");
		  if (now.getDay()==3) return("星期三");
		  if (now.getDay()==4) return ("星期四");
		  if (now.getDay()==5) return ("星期五");
		  if (now.getDay()==6) return ("星期六");
	}
}

function signOut () {
	var r=confirm("确认退出吗？");
	if (r==true) {
		window.location.assign("Origin.html")
	}
}

//实验室总览
function totalProbability () {
	//计算机类
	var computerClassArr = [];
	for (var i = 0; i < 8; i++) {
		computerClassArr[i] = ("C21" + i.toString()) + "#param3#" + (35+i*2%5).toString() + "#param3#" + "无" + "#param3#" + (35+i*2%5).toString() + "#param3#" + "安全";
	}
	var computerClassStr = computerClassArr.join("#param2#") 

	//物理类
	var physicsClassArr = [];
	for (var i = 10; i < 23; i++) {
		physicsClassArr[i-10] = ("A3" + i.toString()) + "#param3#" + (45+i*2%5).toString() + "#param3#" + "无" + "#param3#" + (43+i*2%5).toString() + "#param3#" + "安全";
	}
	var physicsClassStr = physicsClassArr.join("#param2#")

	//艺术类
	var ArtsClassArr = [];
	for (var i = 0; i < 6; i++) {
		ArtsClassArr[i] = ("E1" + i.toString()) + "#param3#" + (85+i*2%5).toString() + "#param3#" + "无" + "#param3#" + (80+i*2%5).toString() + "#param3#" + "安全";
	}
	var ArtsClassStr = ArtsClassArr.join("#param2#")

	//化学类
	var chemistryClassArr = [];
	for (var i = 10; i < 25; i++) {
		chemistryClassArr[i-10] = ("B2" + i.toString()) + "#param3#" + (55+i*2%5).toString() + "#param3#" + "无" + "#param3#" + (53+i*2%5).toString() + "#param3#" + "安全";
	}
	var chemistryClassStr = chemistryClassArr.join("#param2#")

	//硬件类
	var hardwareClassArr = [];
	for (var i = 0; i < 5; i++) {
		hardwareClassArr[i] = ("C1" + i.toString()) + "#param3#" + (50+i*2%5).toString() + "#param3#" + "无" + "#param3#" + (43+i*2%5).toString() + "#param3#" + "安全";
	}
	var hardwareClassStr = hardwareClassArr.join("#param2#")

	//其它类
	var otherClassArr = [];
	for (var i = 0; i < 3; i++) {
		otherClassArr[i] = ("D2" + i.toString()) + "#param3#" + (33+i*2%5).toString() + "#param3#" + "无" + "#param3#" + (33+i*2%5).toString() + "#param3#" + "安全";
	}
	var otherClassStr = otherClassArr.join("#param2#")

	//汇总
	var tolalStr = computerClassStr + "#param1#" + physicsClassStr + "#param1#" + ArtsClassStr + "#param1#" + chemistryClassStr + "#param1#" + hardwareClassStr + "#param1#" + otherClassStr;
    localStorage.setItem("totalProbability", tolalStr);
}

//取到实验室号
function getLabID (classIndex) {
    var data = localStorage.getItem("totalProbability");

	if (data) {
		var totalArr = data.split("#param1#");
		var arr = totalArr[parseInt(classIndex)-1].split("#param2#");
		return arr;
	}
	return null;
}

//取到今天的号数
function getTodayDate () {
  var now= new Date();
  var date =[parseInt(now.getMonth()), parseInt(now.getDate())]
  return date;
}

//查到某类的哪些实验室被预定了
function laboratoryScheduled (value) {
    var data = localStorage.getItem("reservationManagement");		
    var dataArr = new Array();

	if (data) {
		var totalArr = data.split("#param1#");
		var arr = totalArr[parseInt(value)-1].split("#param2#");//arr[i]为第i间实验室详情
		// var arr = totalArr[0].split("#param2#");
		var arrCount=0;
		for (var i = 0; i < arr.length-1; i++) {
					 
			var labData = arr[i].split("#param3#");//labData[0]就是实验室室号
			for (var j = 1; j < labData.length; j++) {
				var dateValueArr = labData[j].split("#param4#");//dateValueArr[0]就是时间号数
				var string00 = labData[0] + "#param#" + dateValueArr[0];
				for (var k = 1; k < dateValueArr.length; k++, arrCount++) {
					string00 += "#param#" + dateValueArr[k];
					dataArr[arrCount] = string00;
				};
			};
		}
	}
	return dataArr;
}

//预约管理
function reservationManagement () {
	var today = getTodayDate();

	//计算机类
	var labIDArr = getLabID("1");
	var computerClassArr = [];
	for (var i = 0; i < labIDArr.length-1; i++) {
		var labDataArr = labIDArr[i].split("#param3#");
		computerClassArr[i] = labDataArr[0] + "#param3#" + today[0] + "/" + today[1] + "#param4#" + (i%2+1) + "#param3#" + today[0] + "/" + (today[1]+2) + "#param4#" + (i%2+2) + "#param3#" + today[0] + "/" + (today[1]+3*i%7+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+i*2%7+1) + "#param4#" + "1";
	}
	var computerClassStr = "";
	for (var i = 0; i < computerClassArr.length; i++) {
		computerClassStr += computerClassArr[i] + "#param2#";
	};


	//物理类
	var labIDArr = getLabID("2");
	var physicsClassArr = [];
	for (var i = 0; i < labIDArr.length-1; i++) {
		var labDataArr = labIDArr[i].split("#param3#");
		physicsClassArr[i] = labDataArr[0] + "#param3#" + today[0] + "/" + (today[1]+(i+3)*2%7) + "#param4#" + (i%2+1) + "#param3#" + today[0] + "/" + (today[1]+i%7) + "#param4#" + (i%2+2) + "#param3#" + today[0] + "/" + (today[1]+3*i%7+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+i*2%7+1) + "#param4#" + (i%3+1);
		
	}
	var physicsClassStr = "";
	for (var i = 0; i < physicsClassArr.length; i++) {
		physicsClassStr += physicsClassArr[i] + "#param2#";
	}

	//艺术类
	var labIDArr = getLabID("3");
	var ArtsClassArr = [];
	for (var i = 0; i < labIDArr.length-1; i++) {
		var labDataArr = labIDArr[i].split("#param3#");
		ArtsClassArr[i] = labDataArr[0] + "#param3#" + today[0] + "/" + (today[1]+(i+5)*2%7) + "#param4#" + (i%2+2) + "#param3#" + today[0] + "/" + (today[1]+i%7+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+3*i%7+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+i%7+1) + "#param4#" + (i%3+1);
		
	}
	var ArtsClassStr = "";
	for (var i = 0; i < ArtsClassArr.length; i++) {
		ArtsClassStr += ArtsClassArr[i] + "#param2#";
	}

	//化学类
	var labIDArr = getLabID("4");
	var chemistryClassArr = [];
	for (var i = 0; i < labIDArr.length-1; i++) {
		var labDataArr = labIDArr[i].split("#param3#");
		chemistryClassArr[i] = labDataArr[0] + "#param3#" + today[0] + "/" + (today[1]+(i+2)*2%7) + "#param4#" + (i%2+2) + "#param3#" + today[0] + "/" + (today[1]+i%7+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+5*i%7+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+i%7+1) + "#param4#" + (i%3+1);
		
	}
	var chemistryClassStr = "";
	for (var i = 0; i < chemistryClassArr.length; i++) {
		chemistryClassStr += chemistryClassArr[i] + "#param2#";
	}

	//硬件类
	var labIDArr = getLabID("5");
	var hardwareClassArr = [];
	for (var i = 0; i < labIDArr.length-1; i++) {
		var labDataArr = labIDArr[i].split("#param3#");
		hardwareClassArr[i] = labDataArr[0] + "#param3#" + today[0] + "/" + (today[1]+(i+2)*2%7) + "#param4#" + (i%2+2) + "#param3#" + today[0] + "/" + (today[1]+i%5+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+2*i%7+1) + "#param4#" + (i%2+1) + "#param3#" + today[0] + "/" + (today[1]+i%7+1) + "#param4#" + (i%2+2);
		
	}
	var hardwareClassStr = "";
	for (var i = 0; i < hardwareClassArr.length; i++) {
		hardwareClassStr += hardwareClassArr[i] + "#param2#";
	}

	//其它类
	var labIDArr = getLabID("6");
	var otherClassArr = [];
	for (var i = 0; i < labIDArr.length-1; i++) {
		var labDataArr = labIDArr[i].split("#param3#");
		otherClassArr[i] = labDataArr[0] + "#param3#" + today[0] + "/" + (today[1]+i*2%7) + "#param4#" + ((i+5)%3+1) + "#param3#" + today[0] + "/" + (today[1]+i%5+1) + "#param4#" + (i%3+1) + "#param3#" + today[0] + "/" + (today[1]+2*i%7+1) + "#param4#" + (i%2+2) + "#param3#" + today[0] + "/" + (today[1]+i%5+1) + "#param4#" + (i%2+1);
		
	}
	var otherClassStr = "";
	for (var i = 0; i < otherClassArr.length; i++) {
		otherClassStr += otherClassArr[i] + "#param2#";
	}

	// //汇总
	var tolalStr = computerClassStr + "#param1#" + physicsClassStr + "#param1#" + ArtsClassStr + "#param1#" + chemistryClassStr + "#param1#" + hardwareClassStr + "#param1#" + otherClassStr;
    localStorage.setItem("reservationManagement", tolalStr);
}

//时刻查询
function timeQuery () {
	//计算机类 //电信学院 //为了方便把计算机类的实验室仅仅提供给电信学院的教学，若需改动，仅需改动labIDArr
	var labIDArr = laboratoryScheduled("1");//这个方法是取到这个类的所有实验室对应的预订时间
	// labIDArr = labIDArr.concat(laboratoryScheduled("2"))
	var subjectArr = ["单片机实验", "EDA实验", "DSP实验", "硬件调试", "数学建模", "电子集成试验", "C语言上机"];
	var teacherArr = ["张伟", "王刚", "陈亮", "张杰", "赵丽", "马超", "李杰", "刘强", "郭达", "程阳阳"];
	var classNameArr = ["电子15-1", "电子15-2", "电信15-1", "电信15-2", "计算15-1", "计算15-2"];
	var subArr = new Array();
	var index = parseInt(labIDArr.length/classNameArr.length);
	var computerClassArr = new Array();
	for (var i = 0; i < labIDArr.length; i++) {
		var labDataArr = labIDArr[i].split("#param#");
		var data1 = "";
		var data1 = subjectArr[i%subjectArr.length] + "#param4#" + labDataArr[1]+"#param4#"+labDataArr[2] + "#param4#" + labDataArr[0] + "#param4#" + teacherArr[i%subjectArr.length];
		subArr.push(data1);
		if ((i%index != 0 || i == index*classNameArr.length) && i != labIDArr.length-1) {//
		} else if (subArr.length > 0 && (i != 0 || labIDArr.length == 1)) {
			subArr.unshift(classNameArr[index==0? 0: parseInt(i/index-1)]);
			var str11 = subArr.join("#param3#");
			computerClassArr.push(str11);
			subArr = new Array()
		};
	}
	var computerClassStr = computerClassArr.join("#param2#");

	//物理类 //工商学院
	labIDArr = laboratoryScheduled("2");
	subjectArr = ["审计学实验", "表单实验", "中级会计实验", "数学建模", "C语言上机"];
	teacherArr = ["张伟", "王刚", "陈亮", "张杰", "赵丽", "马超", "李杰", "刘强", "郭达", "程阳阳"];
	classNameArr = ["会计15-1" , "会计15-2", "信管15-1", "信管15-2", "信管15-3"];
	subArr = new Array();
	index = parseInt(labIDArr.length/classNameArr.length);
	var physicsClassArr = new Array();
	for (var i = 0; i < labIDArr.length; i++) {
		var labDataArr = labIDArr[i].split("#param#");
		var data1 = "";
		var data1 = subjectArr[i%subjectArr.length] + "#param4#" + labDataArr[1]+"#param4#"+labDataArr[2] + "#param4#" + labDataArr[0] + "#param4#" + teacherArr[i%subjectArr.length];
		subArr.push(data1);
		if ((i%index != 0 || i == index*classNameArr.length) && i != labIDArr.length-1) {//
		} else if (subArr.length > 0 && (i != 0 || labIDArr.length == 1)) {
			subArr.unshift(classNameArr[index==0? 0: parseInt(i/index-1)]);
			var str11 = subArr.join("#param3#");
			physicsClassArr.push(str11);
			subArr = new Array()
		};
	}
	var physicsClassStr = physicsClassArr.join("#param2#");


	//艺术类  //艺术学院
	labIDArr = laboratoryScheduled("3");
	subjectArr = ["交际舞实践", "太极实践", "武术教学", "音乐会", "数学建模", "钢琴教学", "C语言上机"];
	teacherArr = ["张伟", "王刚", "陈亮", "张杰", "赵丽", "马超", "李杰", "刘强", "郭达", "程阳阳"];
	classNameArr = ["音乐15-1", "音乐15-2", "音乐15-3", "武术15-1", "武术15-2", "舞蹈15-1", "舞蹈15-2"];
	subArr = new Array();
	index = parseInt(labIDArr.length/classNameArr.length);
	var artsClassArr = new Array();
	for (var i = 0; i < labIDArr.length; i++) {
		var labDataArr = labIDArr[i].split("#param#");
		var data1 = "";
		var data1 = subjectArr[i%subjectArr.length] + "#param4#" + labDataArr[1]+"#param4#"+labDataArr[2] + "#param4#" + labDataArr[0] + "#param4#" + teacherArr[i%subjectArr.length];
		subArr.push(data1);
		if ((i%index != 0 || i == index*classNameArr.length) && i != labIDArr.length-1) {//
		} else if (subArr.length > 0 && (i != 0 || labIDArr.length == 1)) {
			subArr.unshift(classNameArr[index==0? 0: parseInt(i/index-1)]);
			var str11 = subArr.join("#param3#");
			artsClassArr.push(str11);
			subArr = new Array()
		};
	}
	var ArtsClassStr = artsClassArr.join("#param2#");

	//化学类   //软件学院
	labIDArr = laboratoryScheduled("4");
	subjectArr = ["软件开发上机", "软件工程", "C++语言", "Cocos2d", "环境检测"];
	teacherArr = ["张伟", "王刚", "陈亮", "张杰", "赵丽", "马超", "李杰", "刘强", "郭达", "程阳阳"];
	classNameArr = ["软件15-1", "软件15-2", "网络15-1", "网络15-2", "网络15-3"];
	subArr = new Array();
	index = parseInt(labIDArr.length/classNameArr.length);
	var chemistryClassArr = new Array();
	for (var i = 0; i < labIDArr.length; i++) {
		var labDataArr = labIDArr[i].split("#param#");
		var data1 = "";
		var data1 = subjectArr[i%subjectArr.length] + "#param4#" + labDataArr[1]+"#param4#"+labDataArr[2] + "#param4#" + labDataArr[0] + "#param4#" + teacherArr[i%subjectArr.length];
		subArr.push(data1);
		if ((i%index != 0 || i == index*classNameArr.length) && i != labIDArr.length-1) {//
		} else if (subArr.length > 0 && (i != 0 || labIDArr.length == 1)) {
			subArr.unshift(classNameArr[index==0? 0: parseInt(i/index-1)]);
			var str11 = subArr.join("#param3#");
			chemistryClassArr.push(str11);
			subArr = new Array()
		};
	}
	var chemistryClassStr = chemistryClassArr.join("#param2#");

	//硬件类   营销学院
	labIDArr = laboratoryScheduled("5");
	subjectArr = ["机器人研究实验", "单片机实验", "硬件描述语言实验", "DSP实验", "硬件调试", "数学建模", "电子集成试验", "C语言上机"];
	teacherArr = ["张伟", "王刚", "陈亮", "张杰", "赵丽", "马超", "李杰", "刘强", "郭达", "程阳阳"];
	classNameArr = ["营销15-1", "营销15-2", "市场15-1", "市场15-2", "金融15-1", "金融15-2"];
	subArr = new Array();
	index = parseInt(labIDArr.length/classNameArr.length);
	var hardwareClassArr = new Array();
	for (var i = 0; i < labIDArr.length; i++) {
		var labDataArr = labIDArr[i].split("#param#");
		var data1 = "";
		var data1 = subjectArr[i%subjectArr.length] + "#param4#" + labDataArr[1]+"#param4#"+labDataArr[2] + "#param4#" + labDataArr[0] + "#param4#" + teacherArr[i%subjectArr.length];
		subArr.push(data1);
		if ((i%index != 0 || i == index*classNameArr.length) && i != labIDArr.length-1) {//
		} else if (subArr.length > 0 && (i != 0 || labIDArr.length == 1)) {
			subArr.unshift(classNameArr[index==0? 0: parseInt(i/index-1)]);
			var str11 = subArr.join("#param3#");
			hardwareClassArr.push(str11);
			subArr = new Array()
		};
	}
	var hardwareClassStr = hardwareClassArr.join("#param2#");

	//其它类   //安全学院
	labIDArr = laboratoryScheduled("6");
	subjectArr = ["单片机实验", "EDA实验", "DSP实验", "硬件调试", "数学建模", "电子集成试验", "C语言上机"];
	teacherArr = ["张伟", "王刚", "陈亮", "张杰", "赵丽", "马超", "李杰", "刘强", "郭达", "程阳阳"];
	classNameArr = ["安全15-1", "安全15-2", "测量15-1", "测量15-2"];
	subArr = new Array();
	index = parseInt(labIDArr.length/classNameArr.length);
	var otherClassArr = new Array();
	for (var i = 0; i < labIDArr.length; i++) {
		var labDataArr = labIDArr[i].split("#param#");
		var data1 = "";
		var data1 = subjectArr[i%subjectArr.length] + "#param4#" + labDataArr[1]+"#param4#"+labDataArr[2] + "#param4#" + labDataArr[0] + "#param4#" + teacherArr[i%subjectArr.length];
		subArr.push(data1);
		if ((i%index != 0 || i == index*classNameArr.length) && i != labIDArr.length-1) {//
		} else if (subArr.length > 0 && (i != 0 || labIDArr.length == 1)) {
			subArr.unshift(classNameArr[index==0? 0: parseInt(i/index-1)]);
			var str11 = subArr.join("#param3#");
			otherClassArr.push(str11);
			subArr = new Array()
		};
	}
	var otherClassStr = otherClassArr.join("#param2#");


	// //汇总
	var tolalStr = computerClassStr + "#param1#" + physicsClassStr + "#param1#" + ArtsClassStr + "#param1#" + chemistryClassStr + "#param1#" + hardwareClassStr + "#param1#" + otherClassStr;
    localStorage.setItem("timeQuery", tolalStr);
}


function index(index0) {
	var element=document.getElementById('iframe');
	if (index0 == 1) {
	  	element.src="One.html";
	} else if (index0 == 2) {
	  	element.src="Two.html";
	} else if (index0 == 3) {
	  	element.src="Three.html";
  	} else if (index0 == 4) {
	  	element.src="Four.html";
  	} else if (index0 == 5) {
	  	element.src="Five.html";
  	}

  	for (var i = 1; i < 6; i++) {
  		if (i == index0) {
			document.getElementById(i.toString()).style.color="red";
  		} else {
			document.getElementById(i.toString()).style.color="black";
  		}
  	}
}





