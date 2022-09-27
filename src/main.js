try {
  // Obtain Data
  let main = document.querySelector(".main");
  const obj = await fetch("./data.json");
  const data = await obj.json();

  //Function to delete items of arrays
  function removeItemFromArr(arr, item) {
    let i = arr.indexOf(item);

    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

  // Fuction to show jobs
  data.map((el) => {
    // Create a new div for each job
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");

    let newImg = document.createElement("img");
    newImg.setAttribute("src", `${el.logo}`);
    newImg.classList.add("card-img");

    let newBody = document.createElement("div");
    newBody.classList.add("card-body");

    let newBodyTitle = document.createElement("h2");
    newBodyTitle.innerHTML = el.company;
    newBodyTitle.classList.add("card-body-title");
    newBody.appendChild(newBodyTitle);

    if (el.new) {
      let spanNew = document.createElement("span");
      spanNew.classList.add("card-body-title-span-new");
      spanNew.innerHTML = "new!";
      newBodyTitle.appendChild(spanNew);
    }

    if (el.featured) {
      let spanFeatured = document.createElement("span");
      spanFeatured.classList.add("card-body-title-span-featured");
      spanFeatured.innerHTML = "featured";
      newBodyTitle.appendChild(spanFeatured);
      newDiv.classList.add("featured");
    }

    let newBodyPosition = document.createElement("h1");
    newBodyPosition.innerHTML = el.position;
    newBodyPosition.classList.add("card-body-position");
    newBody.appendChild(newBodyPosition);

    let newDescription = document.createElement("div");
    let description1 = document.createElement("span");
    description1.innerHTML = el.postedAt;
    let description2 = document.createElement("span");
    description2.innerHTML = el.contract;
    let description3 = document.createElement("span");
    description3.innerHTML = el.location;
    newDescription.appendChild(description1);
    newDescription.appendChild(description2);
    newDescription.appendChild(description3);
    newDescription.classList.add("card-body-description");
    newBody.appendChild(newDescription);

    let newList = document.createElement("ul");
    let elements = [el.role, el.level, ...el.languages];
    elements.map((el) => {
      let newLi = document.createElement("li");
      newLi.classList.add("card-list-item");
      newLi.innerHTML = el;
      newList.appendChild(newLi);
    });
    newList.classList.add("card-list");

    newDiv.appendChild(newImg);
    newDiv.appendChild(newBody);
    newDiv.appendChild(newList);

    main.appendChild(newDiv);
  });

  // Filter Jobs
  let filterContainer = document.querySelector(".filter-container");
  let filterContainerBar = document.querySelector(".filter-container-bar");
  let filterContainerBtn = document.querySelector(".filter-container-btn");
  let spans = [...document.querySelectorAll(".card-list-item")];

  // Array created to compare items that have already been filtered previously
  let arrayOfBar = [];

  // Put a event to each span
  spans.map((el) => {
    el.addEventListener("click", () => {
      if (
        filterContainer.style.display == "" ||
        filterContainer.style.display == "none"
      ) {
        filterContainer.style.display = "flex";
      }

      if (filterContainerBar.innerHTML == "") {
        // Create a new div in the container bar
        let divBar = document.createElement("div");
        divBar.classList.add("filter-container-bar-div");
        let spanNew = document.createElement("span");
        let x = document.createElement("i");
        x.classList.add("fa-solid", "fa-x");
        // Event to delete div of container bar
        x.addEventListener("click", (e) => {
          removeItemFromArr(arrayOfBar, e.target.previousSibling.innerText);
          filterContainerBar.removeChild(e.target.parentNode);
          if (filterContainerBar.innerText == "") {
            filterContainer.style.display = "none";
            // If the container remains empty, we print the job list again.
            [...main.children].map((el) => {
              el.style.display = "flex";
            });
          }
          let roles = [...main.children].map((el) => {
            return [...el.lastChild.children];
          });
          // We list each of the job announcements
          roles.map((el, index) => {
            let textOfUl = [];
            el.map((el) => {
              textOfUl.push(el.innerHTML);
            });
            // We create an object that will show us if this word has already been searched for before.
            let obj = [...textOfUl, ...arrayOfBar].reduce((acc, current) => {
              acc[current] = acc[current] ? acc[current] + 1 : 1;
              return acc;
            }, {});

            // Array created to compre with "arrayOfBar"
            let arrToCompare = [];
            // Iteration to know wichs offers matchs with the words the we are searching
            Object.entries(obj).map((el) => {
              if (el[1] == 2) arrToCompare.push(el[0]);
            });
            // We eliminate all the annoucements that not matchs witch the words in container bar
            if (arrayOfBar.length !== arrToCompare.length) {
              return ([...main.children][index].style.display = "none");
            }
            // Event to delete all the continer bar with only one click y the button clear
            filterContainerBtn.addEventListener("click", () => {
              filterContainerBar.innerHTML = "";
              filterContainer.style.display = "none";
              arrToCompare = [];
              arrayOfBar = [];
              [...main.children].map((el) => {
                el.style.display = "flex";
              });
            });
          });
        });
        spanNew.innerHTML = el.innerHTML;
        spanNew.classList.add("filter-container-bar-div-item");
        divBar.appendChild(spanNew);
        divBar.appendChild(x);
        filterContainerBar.appendChild(divBar);
        arrayOfBar.push(el.innerHTML);
        let roles = [...main.children].map((el) => {
          return [...el.lastChild.children];
        });
        // We list each of the job announcements
        roles.map((el, index) => {
          let textOfUl = [];
          el.map((el) => {
            textOfUl.push(el.innerHTML);
          });
          // We create an object that will show us if this word has already been searched for before.
          let obj = [...textOfUl, ...arrayOfBar].reduce((acc, current) => {
            acc[current] = acc[current] ? acc[current] + 1 : 1;
            return acc;
          }, {});
          let arrToCompare = [];
          Object.entries(obj).map((el) => {
            if (el[1] == 2) arrToCompare.push(el[0]);
          });
          if (arrayOfBar.length !== arrToCompare.length) {
            return ([...main.children][index].style.display = "none");
          }
          filterContainerBtn.addEventListener("click", () => {
            filterContainerBar.innerHTML = "";
            filterContainer.style.display = "none";
            arrToCompare = [];
            arrayOfBar = [];
            [...main.children].map((el) => {
              el.style.display = "flex";
            });
          });
        });
      } else {
        let textToCompare = el.innerHTML;

        if (arrayOfBar.some((el) => el == textToCompare)) return;
        // Create a new div in the container bar
        let divBar = document.createElement("div");
        divBar.classList.add("filter-container-bar-div");
        let spanNew = document.createElement("span");
        let x = document.createElement("i");
        x.classList.add("fa-solid", "fa-x");
        // Event to delete div of container bar
        x.addEventListener("click", (e) => {
          // Event to delete div of container bar
          removeItemFromArr(arrayOfBar, e.target.previousSibling.innerText);
          filterContainerBar.removeChild(e.target.parentNode);
          if (filterContainerBar.innerText == "") {
            filterContainer.style.display = "none";
          }
          let roles = [...main.children].map((el) => {
            return [...el.lastChild.children];
          });
          // We list each of the job announcements
          roles.map((el, index) => {
            let textOfUl = [];
            el.map((el) => {
              textOfUl.push(el.innerHTML);
            });
            let obj = [...textOfUl, ...arrayOfBar].reduce((acc, current) => {
              acc[current] = acc[current] ? acc[current] + 1 : 1;
              return acc;
            }, {});
            let arrToCompare = [];
            Object.entries(obj).map((el) => {
              if (el[1] == 2) arrToCompare.push(el[0]);
            });
            filterContainerBtn.addEventListener("click", () => {
              filterContainerBar.innerHTML = "";
              filterContainer.style.display = "none";
              arrToCompare = [];
              arrayOfBar = [];
              [...main.children].map((el) => {
                el.style.display = "flex";
              });
            });
            if (arrayOfBar.length !== arrToCompare.length) {
              return ([...main.children][index].style.display = "none");
            } else {
              return ([...main.children][index].style.display = "flex");
            }
          });
        });
        spanNew.innerHTML = el.innerHTML;
        spanNew.classList.add("filter-container-bar-div-item");
        divBar.appendChild(spanNew);
        divBar.appendChild(x);
        filterContainerBar.appendChild(divBar);
        arrayOfBar.push(el.innerHTML);
        let roles = [...main.children].map((el) => {
          return [...el.lastChild.children];
        });
        // We list each of the job announcements
        roles.map((el, index) => {
          let textOfUl = [];
          el.map((el) => {
            textOfUl.push(el.innerHTML);
          });
          let obj = [...textOfUl, ...arrayOfBar].reduce((acc, current) => {
            acc[current] = acc[current] ? acc[current] + 1 : 1;
            return acc;
          }, {});
          let arrToCompare = [];
          Object.entries(obj).map((el) => {
            if (el[1] == 2) arrToCompare.push(el[0]);
          });
          filterContainerBtn.addEventListener("click", () => {
            filterContainerBar.innerHTML = "";
            filterContainer.style.display = "none";
            arrToCompare = [];
            arrayOfBar = [];
            console.log(arrToCompare, arrayOfBar);
            [...main.children].map((el) => {
              el.style.display = "flex";
            });
          });
          if (arrayOfBar.length !== arrToCompare.length) {
            return ([...main.children][index].style.display = "none");
          }
        });
      }
    });
  });
} catch (error) {
  console.error(error);
}
