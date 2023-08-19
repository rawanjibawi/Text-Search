const posts = [
  {
    title: "Understanding the difference between grid-template and grid-auto",
    post_date: "Oct 09,2018",
    description:
      "with all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. specifically",
  },
  {
    title: "Recreating the GitHub Contribution Graph with CSS Grid Layout",
    post_date: "Apr 03,2021",
    description:
      "Discover how to recreate the familiar GitHub contribution graph using the power of CSS Grid Layout. This tutorial guides you through the steps to achieve a visually appealing and interactive representation of your coding activity, similar to the one seen on GitHub profiles.  ",
  },
  {
    title: "Mastering Flexbox: A Comprehensive Guide to CSS Flex Layout",
    post_date: "Sept 03,2021",
    description:
      "Unlock the full potential of web layout design with our comprehensive guide to CSS Flexbox. Dive into the world of flexible box layout and learn how to effortlessly create dynamic, responsive designs for your web projects.",
  },
];
const post_container = document.getElementById("articles-list");
function createPost(){
    posts.forEach((post) => {
      const post_Div = document.createElement("div");
      post_Div.classList.add("post");

      const titleH2 = document.createElement("h2");
      titleH2.textContent = post.title;

      const datePara = document.createElement("p");
      datePara.textContent = post.post_date;
      datePara.classList.add("date");

      const descriptionPara = document.createElement("p");
      descriptionPara.textContent = post.description;

      post_Div.appendChild(titleH2);
      post_Div.appendChild(datePara);
      post_Div.appendChild(descriptionPara);

      post_container.appendChild(post_Div);
    });
}
window.onload = createPost;

const input = document.getElementById('search');

function processSearch(search) {
    if (input.value.trim() === "") {
      document.getElementById("post-num").style.display = "none";
    } else {
      document.getElementById("post-num").style.display = "block";
    }
    let count = 0;
    let divs = post_container.querySelectorAll(".post");
    divs.forEach((div) => {
        const titleH2 = div.querySelector("h2");
        const descriptionP = div.querySelector("p:last-of-type");

        const titleMatches = titleH2.textContent.toLowerCase().includes(search);
        const descriptionMatches = descriptionP.textContent.toLowerCase().includes(search);

        if (titleMatches || descriptionMatches) {
        div.style.display = "block";
        titleH2.innerHTML = highlightMatches(titleH2.textContent, search);
        descriptionP.innerHTML = highlightMatches(descriptionP.textContent, search);
        count++;
        } else {
        div.style.display = "none";
        }
    });
    document.getElementById("post-num").innerHTML="<b>"+count+"</b> <b>Post</b> were found.";
    
    }

    function highlightMatches(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, "gi");
        return text.replace(regex, "<mark>$1</mark>");
    }

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            processSearch(input.value.trim().toLowerCase());
        }
    });

    input.addEventListener("input", function (evt) {
              processSearch(input.value.trim().toLowerCase());

    });
 
function clearSearch(){
    
    document.getElementById("search").value = "";
    document.getElementById("post-num").style.display = "none";

    const divs = post_container.querySelectorAll(".post");
    divs.forEach((div) => {
    removeHighlightFromDiv(div);
    div.style.display = "block"; // Make sure the posts are visible after clearing the search
    });
}



function removeHighlightFromDiv(divElement) {
    const mark_element = divElement.querySelectorAll("mark");
    mark_element.forEach(markElement => {
        const copy_text = document.createTextNode(markElement.textContent);
        markElement.parentNode.replaceChild(copy_text, markElement);
    });
}
