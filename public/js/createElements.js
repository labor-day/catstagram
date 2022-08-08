import {
  generateNewCat,
  upvote,
  downvote,
  comment
} from "./clickEvents.js";

export const createHeader = () => {
  let header = document.createElement("div");

  let icon = document.createElement("div");
  icon.innerHTML = '<i class="fa-solid fa-camera-retro"></i>';
  icon.classList.add("icon");
  let title = document.createElement("div");
  title.innerText = "catstagram";
  header.append(icon, title);

  return header;
}

export const createNewCatButton = () => {
  let button = document.createElement("div");
  button.id = "new";
  let icon = document.createElement("div");
  icon.innerHTML = '<i class="fa-solid fa-paw"></i>';
  icon.classList.add("icon");
  let title = document.createElement("div");
  title.innerText = "show me another cat";

  button.append(icon, title);
  button.addEventListener("click", generateNewCat);
  return button;
}

export const createCatPic = () => {
  //api fetch parameters
  let url = "https://api.thecatapi.com/v1/images/search";
  let key = {"x-api-key": "31bd242d-51ca-4b9b-9f12-ecfb652d8288"};
  let options = {
    method: "GET",
    headers: key
  }

  //create an image element
  let catImage = document.createElement("img");
  catImage.classList.add("cat-image");

  //check if url is already in localStorage
  let imageUrl = localStorage.getItem("url");
  if (imageUrl) {
    catImage.src = imageUrl;
  }

  //if no url is saved, fetch the image from api and assign src property on cat image
  if (!imageUrl) {
    fetch(url, options)
    .then(res => res.json())
    .then(resBody => {
      catImage.src = resBody[0].url
      localStorage.setItem("url", resBody[0].url);
    });
  }

  return catImage;
}

export const createScoreAndVoteContainer = () => {
  let container = document.createElement("div");
  container.id = "scoreAndVote";
  return container;
}

export const createScoreContainer = () => {
  let scoreContainer = document.createElement("div");
  scoreContainer.classList.add("score-container");

  let scoreText = document.createElement("div");
  scoreText.innerText = "popularity score:"

  let scoreNumber = document.createElement("div");
  scoreNumber.id = "scoreNumber";

  //check for score in local storage
  let score = localStorage.getItem("score") || "0";
  scoreNumber.innerText = score;
  localStorage.setItem("score", score);

  scoreContainer.append(scoreText, scoreNumber);
  return scoreContainer;
}

export const createVotingArea = () => {
  let votingContainer = document.createElement("div");
  votingContainer.classList.add("voting-container");

  let upvoteButton = document.createElement("div");
  upvoteButton.classList.add("voteButton");
  upvoteButton.classList.add("green");
  upvoteButton.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
  upvoteButton.addEventListener("click", upvote);

  let downvoteButton = document.createElement("div");
  downvoteButton.classList.add("voteButton");
  downvoteButton.classList.add("red");
  downvoteButton.innerHTML = '<i class="fa-solid fa-thumbs-down"></i>';
  downvoteButton.addEventListener("click", downvote);

  votingContainer.append(upvoteButton, downvoteButton);
  return votingContainer;
}

export const createCommentSection = () => {
  let commentSection = document.createElement("div");
  commentSection.classList.add("comment-section");

  let commentTextArea = document.createElement("textarea");
  commentTextArea.placeholder = "Add a comment!";
  commentTextArea.id = "comment-text";


  let commentButton = document.createElement("div");
  commentButton.id = "commentButton";
  let icon = document.createElement("div");
  icon.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
  icon.classList.add("icon");
  let text = document.createElement("div");
  text.innerText = "Post Comment";
  commentButton.append(icon, text);
  commentButton.addEventListener("click", comment);

  let commentButtonContainer = document.createElement("div");
  commentButtonContainer.id = "commentButtonContainer";
  commentButtonContainer.append(commentButton);

  let comments = document.createElement("div");
  comments.classList.add("comments");
  comments.id = "comments";

  //check for comments in local storage
  let storedComments = localStorage.getItem("storedComments");
  if (storedComments) {
    comments.innerHTML = storedComments;
  }

  commentSection.append(commentTextArea, commentButtonContainer, comments);
  return commentSection;
}

export const createComment = (commentText) => {
  let comment = document.createElement("div");
  comment.classList.add("comment")
  let text = document.createElement("div");
  text.innerText = commentText;
  let time = document.createElement("div");
  time.classList.add("time");
  time.innerText = new Date().toDateString();
  comment.append(text, time);
  return comment;
}

export const createMain = () => {

  let primaryContainer = document.createElement("div");
  primaryContainer.id = "main";

    //create header element
    let header = createHeader();
    header.id = "header";

    //create new cat button
    let newCatButton = createNewCatButton();

    //create container for cat pic
    let catImageContainer = document.createElement("div");
    catImageContainer.id = "cat-image-container";

    //create cat pic
    let catImage = createCatPic();
    catImageContainer.append(catImage);

    //create score and vote container
    let scoreAndVoteContainer = createScoreAndVoteContainer();

    //create score container
    let scoreContainer = createScoreContainer();

    //create voting area
    let votingArea = createVotingArea();

    scoreAndVoteContainer.append(scoreContainer, votingArea);

    //create comment section
    let commentSection = createCommentSection();

    //append elements to body
    primaryContainer.append(
      header,
      newCatButton,
      catImageContainer,
      scoreAndVoteContainer,
      commentSection
    );

    document.body.append(primaryContainer);
}
