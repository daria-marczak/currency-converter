var inputAmount = $("#amount");
var inputCurrency = $("#inputDropdown");
var outputAmount = $("#output");
var outputCurrency = $("#outputDropdown");

var button = $("#calculate");
var api_key = "90ae500eada8f8eb3cb22e64174c56cb";

var url = `http://data.fixer.io/api/latest?access_key=${api_key}`;

button.click(convertCurrency);

var request = new XMLHttpRequest();
request.open("GET", url, true);
request.onload = function() {
  if (request.status === 200) {
    console.log(request.response);
  }
};
request.send();

inputCurrency.append("<option selected='true' disabled>Choose currency</option>");
outputCurrency.append("<option selected='true' disabled>Choose currency</option>");

$.getJSON(url, function(data) {
  console.log(data);
  var rates = Object.keys(data.rates)
    .concat([data.base])
    .sort();
  rates.forEach(function(key) {
    inputCurrency.append($("<option>").attr("value", key).text(key));
    outputCurrency.append($("<option>").attr("value", key).text(key));
  });
});


function convertCurrency(e) {
  e.preventDefault();
  var selectedInput = inputDropdown.options[inputDropdown.selectedIndex]     .value;
  var selectedOutput = outputDropdown.options[outputDropdown.selectedIndex]
    .value;
  console.log(selectedInput);
  console.log(selectedOutput);
  if (selectedInput !== 0 && selectedOutput !== 0 && selectedInput !== selectedOutput) {
    $.ajax({
      url: url + "?base=" + selectedInput + "&symbols=" + selectedOutput,
      method: "GET",
      success: convert
    });
    function convert(data) {
      var total = inputAmount.val() * data.rates[selectedOutput];

      givenAmount.innerHTML = inputAmount.val();
      baseCurrency.textContent = selectedInput + " = ";
      finalAmount.textContent = total.toFixed(2);
      finalCurrency.textContent = selectedOutput;
    }
  } else if (selectedInput == selectedOutput) {
    alert("Please select two different currencies");
  }
}