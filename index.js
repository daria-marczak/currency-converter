var inputAmount = document.getElementById("amount");
var inputCurrency = document.getElementById("inputCurrency");
var outputAmount = document.getElementById("output");
var outputCurrency = document.getElementById("outputCurrency");

var button = document.getElementById("calculate");

var xHttp = new XMLHttpRequest();

function loadCurrencies() {
	xHttp.onreadystatechange = function() {
		if(xHttp.readyState == 4 && xHttp.status == 200) {
			var obj = JSON.parse(this.responseText);
			var options = "";
			for (key in obj.rates) {
				options = options + "<option>" + key + "</option>";
			}
			inputCurrency.innerHTML = options;
			outputCurrency.innerHTML = options;
		}
		xHttp.open("GET", "https://api.fixer.io/latest", true);
		xHttp.send();
	}
}

function convertCurrency() {
	if (inputCurrency.length > 0 && outputCurrency.length > 0 && amount > 0) {
		xHttp.onreadystatechange = function() {
			if(xHttp.readyState == 4 && xHttp.status == 200) {
				var obj = JSON.parse(this.responseText);
				var fact = parseFloat(obj.rates[inputCurrency]);
				if (fact != undefined) {
					result.innerHTML = parseFloat(amount)*fact;
				}
			}
		}
		xHttp.open("GET", "https://api.fixer.io/latest?base=" + inputCurrency.value + "&symbols=" + outputCurrency.value, true);
		
	}
}
