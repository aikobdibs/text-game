let db;

let position = 0;
let display = document.querySelector(".section");
let lenght;
let delay;
let myStorage = window.localStorage;
let done = false;
let progress = [];
let timeout = 3000;
let i = 0;
let start = document.querySelector(".start");
let loading = document.querySelector(".lds-ellipsis");
let innerdisplay = document.querySelector(".innerdisplay");
loading.style.display = "none";
let scroll = false;

start.addEventListener("click", function () {
  document.getElementById("backgroundmusic").loop = true;
  if (start.classList == "fas fa-volume-up start") {
    document.getElementById("backgroundmusic").pause();
    document.getElementById("backgroundmusic").currentTime = 0;
    start.classList = "fas fa-volume-mute start";
  } else {
    document.getElementById("backgroundmusic").play();
    start.classList = "fas fa-volume-up start";
  }
});

fetch("./db.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    function loadText() {
      let lenght = data[position].lenght[0];

      if (data[position].dialog[lenght[0]].delay === true) {
        if (localStorage.getItem(position) === null) {
          now = Date.now() / 1000;
          localStorage.setItem(position, now);
        }
      }
      var scrollPercentage =
        (100 * innerdisplay.scrollTop) /
        (innerdisplay.scrollHeight - innerdisplay.clientHeight);
      if (scrollPercentage >= 99) {
        scroll = true;
      } else {
        scroll = false;
      }
      if (Number.isNaN(scrollPercentage) === true) {
        scroll = true;
      }

      loading.style.display = "inline-block";

      if (scroll) {
        innerdisplay.scrollTop = innerdisplay.scrollHeight;
      }

      setTimeout(function () {
        var scrollPercentage =
          (100 * innerdisplay.scrollTop) /
          (innerdisplay.scrollHeight - innerdisplay.clientHeight);
        if (scrollPercentage >= 99) {
          scroll = true;
        } else {
          scroll = false;
        }
        if (Number.isNaN(scrollPercentage) === true) {
          scroll = true;
        }

        var textE = document.createElement("div");
        textE.className = "dialog";
        textE.innerText = data[position].dialog[i];
        display.appendChild(textE);

        if (scroll) {
          innerdisplay.scrollTop = innerdisplay.scrollHeight;
        }

        i++;
        if (i < lenght) {
          loadText();
        }
        if (i == lenght) {
          let lenght = data[position].lenght[0];
          if (data[position].dialog[lenght[0]].delay === true) {
            checkTimeout();
          } else {
            setTimeout(() => {
              loadAnswers();
            }, timeout);
          }
        }
      }, timeout);
    }

    function preLoad() {
      let emulatedposition = 0;
      let retrieved = JSON.parse(localStorage.getItem("progress"));
      let answersAmount = retrieved[0].lenght;

      let a = 0;

      for (a; a < answersAmount; a++) {
        let descission = retrieved[a + 1];

        let dialoglenght = data[emulatedposition].lenght[0];
        let dialoglenght1 = data[emulatedposition].lenght[1];
        let lenght = data[emulatedposition].lenght[0];

        for (b = 0; b < dialoglenght; b++) {
          var textE = document.createElement("div");
          textE.className = "dialog";
          textE.innerText = data[emulatedposition].dialog[b];
          display.appendChild(textE);

          if (
            data[emulatedposition].dialog[lenght].delay === true &&
            b == dialoglenght - 1
          ) {
            var Busy = document.createElement("div");
            Busy.className = "busy";
            Busy.innerText = "[Victor is busy]";
            display.appendChild(Busy);
          }
        }
        for (b = 0; b < dialoglenght1; b++) {
          var textE = document.createElement("div");
          textE.className = "dialog";
          textE.innerText = data[emulatedposition].dialog1[b];
          display.appendChild(textE);
        }

        var optionsE = document.createElement("div");
        optionsE.classList = "options";
        var option1E = document.createElement("button");
        option1E.className = "option1";
        var option2E = document.createElement("button");
        option2E.className = "option2";

        optionsE.appendChild(option1E);
        optionsE.appendChild(option2E);

        option1E.innerHTML = ` ${data[emulatedposition].answers[0].title}`;
        option2E.innerHTML = ` ${data[emulatedposition].answers[1].title}`;

        if (descission === 1) {
          option1E.classList.add("chosen");
        } else {
          option2E.classList.add("chosen");
        }
        display.appendChild(optionsE);
        if (a == answersAmount) {
          option1E.classList.add("active");
          option2E.classList.add("active");

          option2E.addEventListener("click", function () {
            position = data[position].answers[1].response;
            option1E.classList.remove("active");
            option2E.classList.remove("active");

            progress.push(1);
            progress[0].lenght++;
            localStorage.setItem("progress", JSON.stringify(progress));
            loadText();
          });
          option1E.addEventListener("click", function () {
            position = data[position].answers[1].response;
            option1E.classList.remove("active");
            option2E.classList.remove("active");
            progress.push(2);
            progress[0].lenght++;
            localStorage.setItem("progress", JSON.stringify(progress));
            loadText();
          });
        }

        emulatedposition =
          data[emulatedposition].answers[descission - 1].response;
      }
      position = emulatedposition;
      function loadTextfast() {
        let lenght = data[position].lenght[0];

        for (e = 0; e < lenght; e++) {
          if (data[position].dialog[lenght[0]].delay === true) {
            if (localStorage.getItem(position) === null) {
              now = Date.now() / 1000;
              localStorage.setItem(position, now);
            }
          }
          var textE = document.createElement("div");
          textE.className = "dialog";
          textE.innerText = data[position].dialog[e];
          display.appendChild(textE);
        }
        checkTimeoutfast();
      }
      loadTextfast();
    }

    function loadProgress() {
      if (localStorage.getItem("progress") === null) {
        progress.push({ lenght: 0 });
        loadText();
      } else {
        progress = JSON.parse(localStorage.getItem("progress"));
        preLoad();
      }
    }

    function loadText1() {
      let lenght = data[position].lenght[1];
      var scrollPercentage =
        (100 * innerdisplay.scrollTop) /
        (innerdisplay.scrollHeight - innerdisplay.clientHeight);
      if (scrollPercentage >= 99) {
        scroll = true;
      } else {
        scroll = false;
      }
      if (Number.isNaN(scrollPercentage) === true) {
        scroll = true;
      }
      loading.style.display = "inline-block";
      if (scroll) {
        innerdisplay.scrollTop = innerdisplay.scrollHeight;
      }

      setTimeout(function () {
        var scrollPercentage =
          (100 * innerdisplay.scrollTop) /
          (innerdisplay.scrollHeight - innerdisplay.clientHeight);
        if (scrollPercentage >= 99) {
          scroll = true;
        } else {
          scroll = false;
        }
        if (Number.isNaN(scrollPercentage) === true) {
          scroll = true;
        }
        var textE = document.createElement("div");
        textE.className = "dialog";
        textE.innerText = data[position].dialog1[i];
        display.appendChild(textE);
        if (scroll) {
          innerdisplay.scrollTop = innerdisplay.scrollHeight;
        }
        i++;
        if (i < lenght) {
          loadText1();
        }
        if (i == lenght) {
          setTimeout(() => {
            loadAnswers();
          }, timeout);
        }
      }, timeout);
    }
    function checkTimeoutfast() {
      let lenght = data[position].lenght[0];
      if (data[position].dialog[lenght[0]].delay === true) {
        let start = parseInt(localStorage.getItem(position));
        let delay = data[position].dialog[lenght].time;
        now = Date.now() / 1000;
        function finalCheck() {
          if (start + delay <= now) {
            if (data[position].dialog1 === undefined) {
              loadAnswers();
            } else {
              var Busy = document.createElement("div");
              Busy.className = "busy";
              Busy.innerText = "[Victor is busy]";
              display.appendChild(Busy);
              loadText1fast();
            }
          } else {
            countdown();
          }
        }
        finalCheck();
      } else loadAnswers();
    }

    function loadText1fast() {
      let lenght = data[position].lenght[0];

      for (e = 0; e < lenght; e++) {
        var scrollPercentage =
          (100 * innerdisplay.scrollTop) /
          (innerdisplay.scrollHeight - innerdisplay.clientHeight);
        if (scrollPercentage >= 99) {
          scroll = true;
          console.log("scroll");
        } else {
          scroll = false;
        }
        if (Number.isNaN(scrollPercentage) === true) {
          scroll = true;
        }
        var textE = document.createElement("div");
        textE.className = "dialog";
        textE.innerText = data[position].dialog1[e];
        display.appendChild(textE);
        if (scroll) {
          innerdisplay.scrollTop = innerdisplay.scrollHeight;
        }
      }
      loadAnswers();
    }
    function loadAnswers() {
      var scrollPercentage =
        (100 * innerdisplay.scrollTop) /
        (innerdisplay.scrollHeight - innerdisplay.clientHeight);
      loading.style.display = "none";

      lenght = data[position].lenght;
      i = 0;

      if (scrollPercentage >= 99) {
        scroll = true;
        console.log("scroll");
      } else {
        scroll = false;
      }
      if (Number.isNaN(scrollPercentage) === true) {
        scroll = true;
      }
      var optionsE = document.createElement("div");
      optionsE.classList = "options";
      var option1E = document.createElement("button");
      option1E.className = "option1";
      option1E.classList.add("active");
      var option2E = document.createElement("button");
      option2E.className = "option2";
      option2E.classList.add("active");

      optionsE.appendChild(option1E);
      optionsE.appendChild(option2E);

      option1E.innerHTML = ` ${data[position].answers[0].title}`;
      option2E.innerHTML = ` ${data[position].answers[1].title}`;

      display.appendChild(optionsE);
      if (scroll) {
        innerdisplay.scrollTop = innerdisplay.scrollHeight;
      }

      option1E.addEventListener("click", function () {
        if (option1E.classList.contains("active")) {
          position = data[position].answers[0].response;
          option1E.classList.remove("active");
          option2E.classList.remove("active");
          option1E.classList.add("chosen");
          loadText();

          progress.push(1);
          progress[0].lenght++;
          localStorage.setItem("progress", JSON.stringify(progress));
        }
      });

      option2E.addEventListener("click", function () {
        if (option2E.classList.contains("active")) {
          position = data[position].answers[1].response;
          option1E.classList.remove("active");
          option2E.classList.remove("active");
          option2E.classList.add("chosen");
          loadText();

          localStorage.setItem("progress", JSON.stringify(progress));

          progress.push(2);
          progress[0].lenght++;
          localStorage.setItem("progress", JSON.stringify(progress));
        }
      });
    }

    function checkTimeout() {
      let lenght = data[position].lenght[0];

      if (data[position].dialog[lenght[0]].delay === true) {
        if (localStorage.getItem(position) === null) {
          now = Date.now() / 1000;
          localStorage.setItem(position, now);
          setTimeout(() => {
            countdown();
            loading.style.display = "none";
          }, timeout);
        } else if (localStorage.getItem(position) !== null) {
          now = Date.now() / 1000;

          setTimeout(() => {
            countdown();
            loading.style.display = "none";
          }, timeout);
        }
      }
    }
    function countdown() {
      var scrollPercentage =
        (100 * innerdisplay.scrollTop) /
        (innerdisplay.scrollHeight - innerdisplay.clientHeight);
      if (scrollPercentage >= 99) {
        scroll = true;
      } else {
        scroll = false;
      }
      if (Number.isNaN(scrollPercentage) === true) {
        scroll = true;
      }
      var Busy = document.createElement("div");
      Busy.className = "busy";
      Busy.innerText = "[Victor is busy]";
      display.appendChild(Busy);

      if (scroll) {
        innerdisplay.scrollTop = innerdisplay.scrollHeight;
      }
      function countdowncheck() {
        setTimeout(function () {
          now = Date.now() / 1000;
          let lenght = parseInt(data[position].lenght);
          let start = parseInt(localStorage.getItem(position));
          let delay = data[position].dialog[lenght].time;
          now = Date.now() / 1000;

          if (start + delay <= now) {
            if (data[position].dialog1 === undefined) {
              loadAnswers();
            } else {
              i = 0;
              loadText1();
            }
          } else {
            countdowncheck();
          }
        }, 10);
      }
      countdowncheck();
    }

    loadProgress();
  });
