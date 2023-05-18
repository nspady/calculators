function secondsToTimeFormat(seconds) {
    seconds = Math.round(seconds); // rounding seconds to nearest whole number
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    seconds = seconds - (hours * 3600) - (minutes * 60);
    return hours.toString().padStart(2, '0') + ":" +
           minutes.toString().padStart(2, '0') + ":" +
           seconds.toString().padStart(2, '0');
}

function updatePaceDisplay() {
    var pace = document.getElementById("pace").value;
    document.getElementById("paceDisplay").innerText = secondsToTimeFormat(pace);
}

function calculateTotalTime() {
    var pace = document.getElementById("pace").value;
    var distance = document.getElementById("distance").value;
    var totalTime = pace * distance;
    document.getElementById("totalTimeDisplay").innerText = secondsToTimeFormat(totalTime);
}

function calculateRaceTimes() {
    var pace = document.getElementById("pace").value;
    var unit = document.getElementById("unit").value;
    var raceDistances = {time5k: 5, time10k: 10, timeHalf: 13.1, timeFull: 26.2, time50k: 50, time50m: 50};
    if (unit === "km") {
        raceDistances = {time5k: 5, time10k: 10, timeHalf: 21.0975, timeFull: 42.195, time50k: 50, time50m: 80.4672};
    }
    for (var race in raceDistances) {
        var totalTime = pace * raceDistances[race];
        document.getElementById(race).innerText = secondsToTimeFormat(totalTime);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("pace").addEventListener("input", function() { // change "change" to "input"
        updatePaceDisplay();
        calculateTotalTime();
        calculateRaceTimes();
    });

    document.getElementById("distance").addEventListener("input", calculateTotalTime); // change "change" to "input"

    document.getElementById("unit").addEventListener("input", function() { // change "change" to "input"
        calculateTotalTime();
        calculateRaceTimes();
    });

    updatePaceDisplay();
    calculateTotalTime();
    calculateRaceTimes();
});
