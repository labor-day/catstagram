import { createMain,
  createComment
} from "./createElements.js";

export const generateNewCat = () => {
  localStorage.clear();
  let primaryContainer = document.getElementById("main");
  primaryContainer.remove();
  createMain();
}

export const upvote = () => {
  let scoreNumber = document.getElementById("scoreNumber");
  let score = parseInt(localStorage.getItem("score"));
  score++;
  scoreNumber.innerText = score;
  localStorage.setItem("score", score);
}

export const downvote = () => {
  let scoreNumber = document.getElementById("scoreNumber");
  let score = parseInt(localStorage.getItem("score"));
  score--;
  scoreNumber.innerText = score;
  localStorage.setItem("score", score);
}

export const comment = () => {
  let commentText = document.getElementById("comment-text").value;
  if (!commentText) {return}

  let comment = createComment(commentText);
  let commentSection = document.getElementById("comments");
  commentSection.prepend(comment);

  let comments = commentSection.innerHTML;

  localStorage.setItem("storedComments", comments);

  //reset text entry field
  document.getElementById("comment-text").value = "";
}
