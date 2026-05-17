function updateClock(){

    const now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    let seconds = now.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    hours = hours ? hours : 12;

    hours = hours < 10 ? "0" + hours : hours;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    const timeString =
        `${hours}:${minutes}:${seconds} ${ampm}`;

    document.getElementById("clock").innerText =
        timeString;

    document.getElementById("date").innerText =
        now.toDateString();

    let greeting = "";

    if(now.getHours() < 12){

        greeting = "Good Morning";

    }
    else if(now.getHours() < 18){

        greeting = "Good Afternoon";

    }
    else{

        greeting = "Good Evening";
    }

    document.getElementById("greeting").innerText =
        greeting;
}

setInterval(updateClock,1000);

updateClock();

const toggleBtn =
    document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        toggleBtn.innerText = "Dark Mode";

    }
    else{

        toggleBtn.innerText = "Light Mode";
    }

});
