try {
  let main = document.querySelector(".main");
  const obj = await fetch("./data.json");
  const data = await obj.json();
  console.log(data);

  data.map((el) => {
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
    newDiv.appendChild(newList)

    main.appendChild(newDiv);
  });
} catch (error) {
  console.error(error);
}
