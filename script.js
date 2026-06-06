    // CANVAS — Drawing a Dali mask using shapes

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // background
    ctx.fillStyle = "#1a0000";
    ctx.fillRect(0, 0, 500, 220);

    // face circle
    ctx.beginPath();
    ctx.arc(250, 110, 75, 0, Math.PI * 2);
    ctx.fillStyle = "#c0392b";
    ctx.fill();

    // left eye
    ctx.beginPath();
    ctx.arc(225, 95, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#1a0000";
    ctx.fill();

    // right eye
    ctx.beginPath();
    ctx.arc(275, 95, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#1a0000";
    ctx.fill();

    // smile
    ctx.beginPath();
    ctx.arc(250, 110, 35, 0.2, Math.PI - 0.2);
    ctx.strokeStyle = "#1a0000";
    ctx.lineWidth = 3;
    ctx.stroke();

    // text label
    ctx.font = "15px Arial";
    ctx.fillStyle = "#ffcccc";
    ctx.textAlign = "center";
    ctx.fillText("La Casa de Papel — HTML5 Canvas Demo", 250, 200);


    // =============================================
    // DRAG AND DROP
    // =============================================
    var dragSrc = null;

    document.querySelectorAll(".drag-item").forEach(function (item) {

      item.addEventListener("dragstart", function () {
        dragSrc = this;
        this.style.opacity = "0.5";
      });

      item.addEventListener("dragend", function () {
        this.style.opacity = "1";
        document.querySelectorAll(".drag-item").forEach(function (i) {
          i.classList.remove("drag-over");
        });
      });

      item.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.classList.add("drag-over");
      });

      item.addEventListener("dragleave", function () {
        this.classList.remove("drag-over");
      });

      item.addEventListener("drop", function (e) {
        e.preventDefault();
        if (dragSrc !== this) {
          var temp = dragSrc.innerHTML;
          dragSrc.innerHTML = this.innerHTML;
          this.innerHTML = temp;
        }
        this.classList.remove("drag-over");
      });

    });


    // =============================================
    // GEOLOCATION API
    // =============================================
    function getLocation() {
      var result = document.getElementById("geo-result");

      if (navigator.geolocation) {
        result.innerHTML = "Fetching location...";
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            result.innerHTML =
              "Latitude: " + pos.coords.latitude + "<br>" +
              "Longitude: " + pos.coords.longitude + "<br>" +
              "Accuracy: ±" + Math.round(pos.coords.accuracy) + " meters";
          },
          function () {
            result.innerHTML = "Permission denied or location unavailable.";
          }
        );
      } else {
        result.innerHTML = "Geolocation not supported by this browser.";
      }
    }

    // =============================================
    // CONTACT FORM
    // =============================================
    function submitForm(e) {
      e.preventDefault();
      document.getElementById("form-success").style.display = "block";
      e.target.reset();
    }