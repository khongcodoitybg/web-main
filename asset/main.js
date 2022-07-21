const signupBtn = document.querySelector(".js-signup-Btn");
const signinBtn = document.querySelector(".js-signin-Btn");
const modal = document.querySelector(".modal");
const modalSignIn = document.querySelector(".modal-Signin");
const modalClose = document.querySelector(".modal-close");
const modalClose1 = document.querySelector(".modal-close1");
const modalContainers = document.querySelectorAll(".modal-container");

function showSignup() {
  modalSignIn.classList.remove("open");
  modal.classList.add("open");
}
function showSignin() {
  modal.classList.remove("open");
  modalSignIn.classList.add("open");
}
function hidenSignup() {
  modal.classList.remove("open");
}
function hidenSignin() {
  modalSignIn.classList.remove("open");
}
function clearSearch() {
  searchInput.value = "";
}
function stop(event) {
  event.stopPropagation();
}

for (modalContainer of modalContainers) {
  modalContainer.addEventListener("click", stop);
}

var API = "https://localhost:5001";

function sendDataLog(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(API + "/login", options)
    .then((response) => response.json())
    .then(callback)
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function sendDataSignup(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(API + "/register", options)
    .then((response) => response.json())
    .then(callback)
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function getArticle(callback) {
  fetch(API + "/api/Article")
    .then((response) => response.json())
    .then(callback)
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function addArticle(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(API + "/api/Article", options)
    .then((response) => response.json())
    .then(callback)
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function reset() {
  document.getElementById("email-login").value = "";
  document.getElementById("pass-login").value = "";
  document.getElementById("email-signup").value = "";
  document.getElementById("pass-signup").value = "";
  document.getElementById("re-pass-signup").value = "";
}

function checkLog(response) {
  var userInput = document.getElementById("email-login").value;
  var passInput = document.getElementById("pass-login").value;
  if (userInput.trim().length === 0) {
    document.querySelector(".email-err").innerHTML = "Bắt buộc nhập";
  } else if (passInput.trim().length === 0) {
    document.querySelector(".pass-err").innerHTML = "Bắt buộc nhập";
  } else if (response.Message === "Tài khoản hoặc mật khẩu không chính xác.") {
    //sửa
    document.querySelector(".pass-err").innerHTML =
      "Tài khoản hoặc mật khẩu không đúng";
    reset();
  } else {
    hidenSignin();
    document.querySelector(".header__log-block").innerHTML =
      '<button class="js-log-Btn info-Btn"></button><button class="js-log-Btn">Logout</button><div class="search-btn js-search"><input id="search" type="text" name="search" class="search-input" placeholder="Tìm kiếm"><div class="search-icon-block" onclick="clearSearch()"><i class="search-icon ti-search"></i></div></div>';
    document.querySelector(".info-Btn").innerText = userInput;
    reset();
  }
}

function checkSignup(response) {
  var emailSignupInput = document.getElementById("email-signup").value;
  var passSignupInput = document.getElementById("pass-signup").value;
  var repPassSignupInput = document.getElementById("re-pass-signup").value;
  if (emailSignupInput.trim().length === 0) {
    document.querySelector(".email-signup-err").innerHTML = "Bắt buộc nhập";
  } else if (passSignupInput.trim().length === 0) {
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "Bắt buộc nhập";
  } else if (repPassSignupInput.trim().length === 0) {
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "";
    document.querySelector(".repass-signup-err").innerHTML = "Bắt buộc nhập";
  } else if (passSignupInput.trim() != repPassSignupInput.trim()) {
    reset();
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "";
    document.querySelector(".repass-signup-err").innerHTML =
      "Mật khẩu không trùng khớp";
  } else {
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "";
    document.querySelector(".repass-signup-err").innerHTML = "";
    reset();
    hidenSignup();
    alert("Đăng ký thành công");
  }
}
//

var ArticleLists = [];
index = 0;
function renderArticle(Articles) {
  const listArticleBlock = document.querySelector(".News-list");
  ArticleLists = Articles.developerMessage.results;
  ArticleLists.reverse();
  const htmls = ArticleLists.map(function (Article) {
	const b = Article
    return `
			<li >
				<div class="item-news">
					<a href="#Article" class="item-news__heading" onclick="showArticle(${b})">${Article.title}</a>
					<div class="item-news__block">
						<div class="time-post">${Article.created}</div>
						<div class="author">${Article.author}</div>
					</div>
				</div>		
			</li>
		`;
  });
  listArticleBlock.innerHTML = htmls.join("");
}

document.querySelector(".submit-block__submit-btn").onclick = function () {
  var title = document.getElementById("Add-Article__body__title").value;
  var content = document.getElementById("Add-Article__body__content").innerText;
  var date = new Date();
  var formData = {
    title: title,
    created: "2022-07-19T14:23:44.486Z",
    content: content,
    authorId: 1, /// tác giả
  };
  addArticle(formData, function () {
    getArticle(renderArticle);
  });
  showHome();
  alert("Đăng bài thành công!");
};

var logBtn = document.getElementById("signin-button");
logBtn.onclick = function dataLog() {
  var emailLogInput = document.getElementById("email-login").value;
  var passLogInput = document.getElementById("pass-login").value;
  var formData = {
    email: emailLogInput,
    password: passLogInput,
  };
  sendDataLog(formData, checkLog);
};

var signupButton = document.querySelector("#signup-button");
signupButton.onclick = function dataSignup() {
  var emailSignupInput = document.getElementById("email-signup").value;
  var passSignupInput = document.getElementById("pass-signup").value;
  var repPassSignupInput = document.getElementById("re-pass-signup").value;
  var formData = {
    email: emailSignupInput,
    password: passSignupInput,
    confirmPassword: repPassSignupInput,
    firstName: "hung",
    lastName: "hung",
    roles: ["User"],
  };
  sendDataSignup(formData, checkSignup);
};

function showArticle(a) {
    document.querySelector(".Article__heading__title").innerHTML =
      a.title;
    document.querySelector(".Article__heading__time-post").innerHTML =
      a.created;
    document.querySelector(".Article__body--main__word").innerHTML =
      a.content;
    document.querySelector(".member-name").innerHTML = a.author;
	document.getElementById("Home").style.display = "none";
	document.getElementById("Article").style.display = "block";
	document.getElementById("Add-Article").style.display = "none";
	
}

function showHome() {
  document.getElementById("Home").style.display = "flex";
  document.getElementById("Article").style.display = "none";
  document.getElementById("Add-Article").style.display = "none";
}

function showAddArticle() {
  document.querySelector(".Article__heading__title").innerHTML = response.title;
  document.querySelector(".Article__heading__time-post").innerHTML =
    response.created;
  document.querySelector(".Article__body--main__word").innerHTML =
    response.content;
  document.querySelector(".member-name").innerHTML = response.author;
  document.getElementById("Home").style.display = "none";
  document.getElementById("Article").style.display = "block";
  document.getElementById("Add-Article").style.display = "none";
}

function start() {
  getArticle(renderArticle);
  document.querySelector(".Article-count").innerHTML =
    "Số lượng bài viết: " + ArticleLists.length;
}

start();

// document.querySelector('.News__body').addEventListener('scroll', () => {
// 	const scrolled = document.getElementById('News__body').scrollTop
// 	if(Math.floor(scrolled) === 1011) {

// 		setTimeout(function(){alert('ok')} ,1000)
// 	}

// })

// a = [1, 2, 3]
// a.reverse()
// console.log(a)
