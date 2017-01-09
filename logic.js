//Start clock
function start(){
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	min = check(min);
	sec = check(sec);
	document.querySelector("#clock").innerHTML = hour+" : "+min+" : "+sec;
}
check = function(i){
	if(i < 10){
		i = "0"+i
	}
	return i;
}
//When body loads, call start function
document.body.addEventListener("load", start);
//Call start function at interval of 1 sec.
setInterval(start, 1000);

//background effect when clicked
var buttons = Array.from(document.querySelectorAll("button"));

function mousedown(e){
	this.style.background = "grey";
}
function mouseup(){
	this.style.background = "white";
}
buttons.map(function(button){
	return button.addEventListener("mousedown", mousedown);
});
buttons.map(function(button){
	return button.addEventListener("mouseup", mouseup);
});

//Calculator

function onClick(e){
	var result;
	var answer;
	var val = e.target.value;
	var checkButton = document.querySelector(".result").innerHTML.length < 44 && val == Number(val) || val === "^" || val === "sqrt(" ||val === "." || val === "(" || val === ")" || val === "sin(" || val === "cos(" || val === "tan(" || val === "asin(" || val === "acos(" || val === "atan(" || val === "3.141592654" || val === "inverse(" || val === "log(" || val === "e" || val === "In(";
	if(checkButton){
		if(document.querySelector(".answer").innerHTML){
			document.querySelector(".answer").innerHTML = "";		
		}
		result = document.querySelector(".result").innerHTML;
		result += val;
		document.querySelector(".result").innerHTML = result;
	}else if(val === "*" || val === "/" || val === "+" || val === "-"){
		result = document.querySelector(".result").innerHTML;
		result += val;
		document.querySelector(".result").innerHTML = result;
	}else if(val === "C"){
		if(document.querySelector(".answer").innerHTML){
			document.querySelector(".answer").innerHTML = "";
		}
		else{
			document.querySelector(".result").innerHTML = "";
		}
	}else if(val === "DEL"){
		if(document.querySelector(".result").innerHTML !== ""){
			result = document.querySelector(".result").innerHTML;
			var del = result.substring(0, result.length - 1);
			document.querySelector(".result").innerHTML = del;
		}
		else if(document.querySelector(".answer").innerHTML !== ""){
			result = document.querySelector(".answer").innerHTML;
			var del = result.substring(0, result.length - 1);
			document.querySelector(".answer").innerHTML = del;
		}
	}
	else if (val === "=" && !document.querySelector(".answer").innerHTML) {
		result = document.querySelector(".result").innerHTML;
		if(/(\d+\^\d+)/.test(result)){
			var matchIndex = /[\^]/.exec(result).index;
			var base = Number(result.substring(0, matchIndex));
			var power = Number(result.substring(matchIndex + 1));
			result = Math.pow(base, power);
		}
		if(/(\d+\(\d+\))/.test(result)){
			result = result.replace(/\(/, "*").replace(/\)/, "");
			console.log(result);
		}
		if(/(\(\d+\)\d+)/.test(result)){
			result = result.replace(/\(/, "").replace(/\)/, "*");
		}
		if(/(sqrt\(\d+\))/.test(result)){
			result = result.replace(/[sqrt\(\)]/g, "");
			result = Math.sqrt(Number(result));
		}
		if(/(sin\(\d+\))/.test(result)){
			result = result.replace(/[sin\(\)]/g, "");
			result = Math.sin(Number(result));
		}
		if(/(cos\(\d+\))/.test(result)){
			result = result.replace(/[cos\(\)]/g, "");
			result = Math.cos(Number(result));
		}
		if(/(tan\(\d+\))/.test(result)){
			result = result.replace(/[tan\(\)]/g, "");
			result = Math.tan(Number(result));
		}
		if(/^(asin\(\d\.\d*\))$/.test(result)){
			result = result.replace(/[asin\(\)]/g, "");
			result = Math.asin(Number(result));
		}
		if(/^(acos\(\d\.\d*\))$/.test(result)){
			result = result.replace(/[acos\(\)]/g, "");
			result = Math.acos(Number(result));
		}
		if(/^(atan\(\d\.\d*\))$/.test(result)){
			result = result.replace(/[atan\(\)]/g, "");
			result = Math.atan(Number(result));
		}
		if(/^(inverse\(\d+\))$/.test(result)){
			result = result.replace(/[inverse\(\)]/g, "");
			result = 1/result
		}
		if(/^(log\(\d+\))$/.test(result)){
			result = result.replace(/[log\(\)]/g, "");
			result = Math.log10(Number(result));
		}
		if(/^(\d+e\d+)$/.test(result)){
			var num = result.substring(0,1);
			var exp = result.substring(2);
			result = Number(num) * Math.pow(10, Number(exp));
		}
		if(/^(In\(\d+\))$/.test(result)){
			result = result.replace(/[In\(\)]/g, "");
			result = Math.log(Number(result));
		}
		answer = eval(result);
		document.querySelector(".result").innerHTML = "";
		document.querySelector(".answer").innerHTML = answer;
		localStorage.setItem("answer", answer);
	}else if(val === "Ans"){
		document.querySelector(".result").innerHTML = "";
		document.querySelector(".answer").innerHTML = localStorage.answer;
	}
}

buttons.map(function(button){
	return button.addEventListener("click", onClick);
});

