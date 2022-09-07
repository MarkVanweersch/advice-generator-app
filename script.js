window.onload = onLoad;

function onLoad() {

  // set up elements from the page
  const id = document.querySelector(".advice-id");
  const advice = document.querySelector(".advice-text");
  const dice = document.querySelector(".dice");
  dice.addEventListener("click", getData);

  // retrieve api data and create inital quote
  getData();
  function getData() {
    fetch ("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then(function createAdviceObj(data) {
        if (id.innerText === "") {
          createAdvice(data);
        } else {
          newAdvice(data);
        }
      });
  };

  // create initial advice
  function createAdvice(obj) {
    let adviceId = obj.slip.id;
    let idNote = document.createTextNode(adviceId);
    id.appendChild(idNote);

    let adviceText = obj.slip.advice;
    let adviceNote = document.createTextNode(adviceText);
    advice.appendChild(adviceNote);
  }

  // change advice to a new one
  function newAdvice(obj) {
    let oldId = id.firstChild;
    let newId = document.createTextNode(obj.slip.id);
    id.replaceChild(newId, oldId);

    let oldAdvice = advice.firstChild;
    let newAdvice = document.createTextNode(obj.slip.advice);
    advice.replaceChild(newAdvice, oldAdvice);
  }

}