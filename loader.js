loadSend();

function loadHome () {
  //Generation d'ID
  if(localStorage.getItem("ID") == null) {
    localStorage.setItem("ID", guid());
    localStorage.setItem("euro", 100);
    //Insertion en base
  }
  //Jauge
  //Bouton de conversion
  //Waiting
  //Prix en euros et en Coin
  //Collecte du solde
}

function loadReceive() {
  //Formulaire Montant
  //QRCode
  //Bouton reset
}

function loadSend() {
  let main = document.querySelector("main");
  let title = document.createElement("h2");
  title.textContent = "Scan the receiver transaction QRCode";
  main.appendChild(title);
  let changeButtonArea = document.createElement("div");
  changeButtonArea.id = "changeButtonArea";

  let switchCamLabel = document.createElement("label");
  switchCamLabel.setAttribute("for","switchCam");
  switchCamLabel.className = "mdl-switch mdl-js-switch mdl-js-ripple-effect";

  let switchCamInput = document.createElement("input");
  switchCamInput.id = "switchCam";
  switchCamInput.setAttribute("type","checkbox");
  switchCamInput.className = "mdl-switch__input";
  switchCamInput.checked = "false";
  
  switchCamLabel.appendChild(switchCamInput);

  let switchCamSpan = document.createElement("span");
  switchCamSpan.className ="mdl-switch__label";
  switchCamSpan.textContent = "Change Cam";
  switchCamLabel.appendChild(switchCamSpan);

  changeButtonArea.appendChild(switchCamLabel);
  main.appendChild(changeButtonArea);
  changeButtonArea.style.display ="none";

  let validationArea = document.createElement("div");
  validationArea.id = "validationArea";
  main.appendChild(validationArea);
  validationArea.style.display = "none";

  let videoPreview = document.createElement("video");
  videoPreview.id="preview";
  main.appendChild(videoPreview);
  InstaScan();

}

function loadValidationArea(content){
  let result = content.split('|');
  if (result == content) return;
  let validationArea = document.querySelector("#validationArea");
  validationArea.clear();
  validationArea.style.display = "block";
  let receiverSpan = document.createElement("span");
  receiverSpan.id = "receiverID";
  receiverSpan.textContent = result[0];
  validationArea.appendChild(receiverSpan);
  let amount = document.createElement("span");
  amount.id = "amountSpan";
  amount.textContent = result[0];
  validationArea.appendChild(amount);

  let validateButton = document.createElement("button");
  validateButton.className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored";
  validateButton.innerHTML = '<i class="material-icons">checked_icon</i>';
  validationArea.appendChild(validateButton);
  validateButton.addEventListener("click",function() {
    //send transac
  });
  let cancelButton = document.createElement("button");
  cancelButton.className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored";
  cancelButton.innerHTML = '<i class="material-icons">cancel_icon</i>';
  validationArea.appendChild(cancelButton);
  cancelButton.addEventListener("click",function() {
    validationArea.clear();
    validationArea.style.display = "none";
  });
}

function clear() {
  let element = document.querySelector("main");
  main.clear();
}

function InstaScan () {
  let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
  scanner.addListener('scan', function (content) {
    loadValidationArea(content);
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 1) {
      //localStorage.setItem("camSelected", "1");
      document.querySelector("#changeButtonArea").style.display ="block";
      let element = document.querySelector("#switchCam");  
      element.addEventListener("click", function () {
        localStorage.setItem("camSelected",
          (localStorage.getItem("camSelected") == "0") ? "1" :"0");
        scanner.start(cameras[localStorage.getItem("camSelected")]);
      });
      scanner.start(cameras[localStorage.getItem("camSelected")]);*/
    }
    if (cameras.length == 1 ) {
      localStorage.setItem("camSelected","0");
      scanner.start(cameras[localStorage.getItem("camSelected")]);
      //scanner.start(cameras[0]);
    } else {
      console.error('No cameras found.');
    }
  }).catch(function (e) {
    console.error(e);
  });
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}