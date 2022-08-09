// show/hide form with button


const showForm = document.getElementById("show-form");
const formElement = document.getElementById('post-form');

showForm.addEventListener("click", function () {

    let formStatus = formElement.classList.contains('d-none');
    if (formStatus) {
        formElement.classList.remove('d-none');
        showForm.classList.remove("btn-outline-primary");
        showForm.classList.add("btn-outline-secondary");
        showForm.innerText = 'Hide the Form';
    }
    else {
        formElement.classList.add('d-none');
        showForm.innerText = 'Create a New Post'
        showForm.classList.remove("btn-outline-secondary");
        showForm.classList.add("btn-outline-primary");
    }
})

// submit blog post

async function postBlogPost(event) {
  event.preventDefault();

  const post_text = document
    .querySelector('textarea[name="post-body"]')
    .value.trim();
    const title = document
        .querySelector('#post-title')
    .value.trim();

  if (post_text && title) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        post_text,
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".new-post").addEventListener("submit", postBlogPost);

// delete button




async function deleteBlogPost(event) {
  console.log('clicked delete button')
  event.preventDefault();
  const btnText = this.innerText
  const id = btnText.charAt(btnText.length - 1);

  if(confirm('Are you sure you want to delete this post?') == true) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

deleteBtns = document.getElementsByClassName('delete-btn');

for (var i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener("click", deleteBlogPost);
}