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

function getArticleById(id, callback) {
  fetch(API + "/api/Article/" + id)
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

function changeArticle(id, data) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(API + "/api/Article/" + id, options)
    .then((response) => response.json())
    .then(function() {
      getArticle(renderArticle)
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function removeArticle(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    
  };
  fetch(API + "/api/Article/" + id, options)
    .then((response) => response.json())
    .then(function() {
      getArticle(renderArticle)
    })
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
  document.getElementById("firstname-input").value = "";
  document.getElementById("lastname-input").value = "";
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
      '<button class="js-log-Btn info-Btn"></button><button class="js-log-Btn logout-Btn" onclick="logOut()">Logout</button><div class="search-btn js-search"><input id="search" type="text" name="search" class="search-input" placeholder="Tìm kiếm"><div class="search-icon-block" onclick="clearSearch()"><i class="search-icon ti-search"></i></div></div>';
    document.querySelector(".info-Btn").innerText = userInput;
    reset();
  }
}

function checkSignup(response) {
  const firstName = document.getElementById("firstname-input").value;
  const lastName = document.getElementById("lastname-input").value;
  const emailSignupInput = document.getElementById("email-signup").value;
  const passSignupInput = document.getElementById("pass-signup").value;
  const repPassSignupInput = document.getElementById("re-pass-signup").value;
  if (firstName.trim() === "" || lastName.trim() === "") {
    document.querySelector('.empty-name').innerHTML = "Không được để trống"
  }
  else if (emailSignupInput.trim().length === 0) {
    document.querySelector('.empty-name').innerHTML = "";
    document.querySelector(".email-signup-err").innerHTML = "Bắt buộc nhập";
    document.querySelector(".pass-signup-err").innerHTML = "";
    document.querySelector(".repass-signup-err").innerHTML = "";
  } else if (passSignupInput.trim().length === 0) {
    document.querySelector('.empty-name').innerHTML = "";
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "Bắt buộc nhập";
    document.querySelector(".repass-signup-err").innerHTML = "";
  } else if (repPassSignupInput.trim().length === 0) {
    document.querySelector('.empty-name').innerHTML = "";
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "";
    document.querySelector(".repass-signup-err").innerHTML = "Bắt buộc nhập";
  } else if (passSignupInput.trim() != repPassSignupInput.trim()) {
    reset();
    document.querySelector('.empty-name').innerHTML = "";
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "";
    document.querySelector(".repass-signup-err").innerHTML =
      "Mật khẩu không trùng khớp";
  } else {
    document.querySelector('.empty-name').innerHTML = "";
    document.querySelector(".email-signup-err").innerHTML = "";
    document.querySelector(".pass-signup-err").innerHTML = "";
    document.querySelector(".repass-signup-err").innerHTML = "";
    reset();
    hidenSignup();
  }
  alert("Đăng ký thành công");
}

function logOut() {
  document.querySelector(".header__log-block").innerHTML =
    '<button class="js-log-Btn js-signin-Btn" onclick="showSignin()">Sign In</button><button class="js-log-Btn js-signup-Btn" onclick="showSignup()">Sign Up</button><div class="search-btn js-search"><input id="search" type="text" name="search" class="search-input" placeholder="Tìm kiếm"><div class="search-icon-block" onclick="clearSearch()"><i class="search-icon ti-search"></i></div></div>';
}

var ArticleLists = [];
var index = 0;
function renderArticle(Articles) {
  const listArticleBlock = document.querySelector(".News-list");
  ArticleLists = Articles.developerMessage.results;
  ArticleLists.reverse();
  const htmls = ArticleLists.map(function (Article) {
    return `
			<li >
				<div class="item-news">
					<a href="#" class="item-news__heading" onclick="showArticle(${Article.id})">${Article.title}</a>
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
  const firstName = document.getElementById("firstname-input").value;
  const lastName = document.getElementById("lastname-input").value;
  const emailSignupInput = document.getElementById("email-signup").value;
  const passSignupInput = document.getElementById("pass-signup").value;
  const repPassSignupInput = document.getElementById("re-pass-signup").value;
  const formData = {
    email: emailSignupInput,
    password: passSignupInput,
    confirmPassword: repPassSignupInput,
    firstName: firstName,
    lastName: lastName,
    roles: ["User"],
  };
  sendDataSignup(formData, checkSignup);
  
};

function submit() {
  var title = document.getElementById("Add-Article__body__title").value;
  var content = document.getElementById("Add-Article__body__content").innerText;
  var date = new Date();
  var formData = {
    title: title,
    created: date,
    content: content,
    authorId: 1,
  };
  if (title === "") {
    document.getElementById("empty-title").style.display = "block";
    document.getElementById("empty-content").style.display = "none";
  } else if (content === "") {
    document.getElementById("empty-title").style.display = "none";
    document.getElementById("empty-content").style.display = "block";
  } else {
    document.getElementById("empty-title").style.display = "none";
    document.getElementById("empty-content").style.display = "none";
    document.getElementById("Add-Article__body__title").value = "";
    document.getElementById("Add-Article__body__content").innerText = "";
    addArticle(formData, function () {
      getArticle(renderArticle);
      showHome();
      alert("Đăng bài thành công!");
    });
  }
};

function showArticle(id) {
    getArticleById(id, function(response) {
      const Article = response.data.result;
      document.querySelector(".Article__heading__title").innerHTML = Article.title;
      document.querySelector(".Article__heading__time-post").innerHTML = Article.created;
      document.querySelector(".Article__body--main__word").innerHTML = Article.content;
      document.querySelector(".member-name").innerHTML = Article.author.name;
    });
    document.getElementById("Home").style.display = "none";
    document.getElementById("Article").style.display = "block";
    document.getElementById("Add-Article").style.display = "none";
    document.querySelector('.change').onclick = function() {
      showAddArticle();
      document.querySelector('.Add-Article__heading').innerHTML =
      '<label for="">Chỉnh sửa bài viết</label><a href="#index.html" class="cancle-block unDecoration"><i class="fa-solid fa-arrow-right-to-bracket"></i><p class="cancle-block__word">Hủy</p></a>'
      document.querySelector('.cancle-block').onclick = showAddArticle(id)
      document.querySelector('.submit-block').innerHTML = '<a href="#index.html" class="btn submit-block__submit-btn unDecoration">Lưu</a>'
      document.querySelector('.submit-block__submit-btn').onclick = function() {
        var title = document.getElementById("Add-Article__body__title").value;
        var content = document.getElementById("Add-Article__body__content").innerText;
        var date = new Date();
        var formData = {
          title: title,
          created: date,
          content: content,
          authorId: 1,
        };
        if (title === "") {
          document.getElementById("empty-title").style.display = "block";
          document.getElementById("empty-content").style.display = "none";
        } else if (content === "") {
          document.getElementById("empty-title").style.display = "none";
          document.getElementById("empty-content").style.display = "block";
        } else {
          document.getElementById("empty-title").style.display = "none";
          document.getElementById("empty-content").style.display = "none";
          document.getElementById("Add-Article__body__title").value = "";
          document.getElementById("Add-Article__body__content").innerText = "";
          changeArticle(id, formData)          
          getArticle(renderArticle);
          showHome();
          alert("Sửa thành công!");
          };     
      }
    }
    document.querySelector('.remove').onclick = function() {
      if(confirm("Bạn có chắc muốn xóa bài viết?")) {
        removeArticle(id);
        showHome();
      }     
    }
}


function showHome() {
  document.getElementById("Home").style.display = "flex";
  document.getElementById("Article").style.display = "none";
  document.getElementById("Add-Article").style.display = "none";
}

function showAddArticle() {
  document.getElementById("Home").style.display = "none";
  document.getElementById("Article").style.display = "none";
  document.getElementById("Add-Article").style.display = "block";
}

function start() {
  getArticle(renderArticle);
  document.querySelector(".Article-count").innerHTML =
    "Số lượng bài viết: " + ArticleLists.length;
}

start();



function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// document.querySelector('.News__body').addEventListener('scroll', () => {
// 	const scrolled = document.getElementById('News__body').scrollTop
// 	if(Math.floor(scrolled) === 1011) {

// 		setTimeout(function(){alert('ok')} ,1000)
// 	}

// })

