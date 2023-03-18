search("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})


$(document).scroll((e) => {

    if ($(document).scrollTop()) {
        $(".my").css("backgroundColor", "#0D0D0D")
    }
});

let userName,
    userEmail,
    userPhone,
    userAge,
    userPassword,
    userRePassword


var nvWidth = 0,
    isTrue = !0,
    arr = [];

$(".strip-toggel-menu").click(function () {
    isTrue ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"), nvWidth = $(".nav-tab-menu").width() - 10, $(".strip-header-nav").css("left", nvWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".nav-tab-menu .item1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1000), 
    $(".nav-tab-menu .item2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100), 
    $(".nav-tab-menu .item3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200), 
    $(".nav-tab-menu .item4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300), 
    $(".nav-tab-menu .item5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500), 
    $(".nav-tab-menu .item6").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500), isTrue = !isTrue) : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".strip-header-nav").css("left", 0), $(".nav-tab-menu li").animate({
        opacity: "0",
        paddingTop: "500px"
    }, 500), isTrue = !isTrue)
});

async function search(s) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    return meals
}
function displayMeals(arr) {
    let meals = ""
    for (let i = 0; i < arr.length; i++) {
        meals += `
        <div class="col-md-3 my-3">
        <div onclick="getMeal('${arr[i].idMeal}')" class="movie position-relative overflow-hidden rounded-3 cursor-pointer">
            <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
</div>

     `
    }
    row.innerHTML = meals;
}
var row = document.getElementById("rowData");


async function getCategories(listBy) {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
    x = await x.json()
    return x;

};

async function getByLetter(letter) {
    if (letter) {
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
    }
};

async function filterByCategory(category) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
};

function displayCategories() {
    let e = ""
    for (var i = 0; i < arr.length; i++) e += `

<div class="col-md-6 col-lg-3 my-3 myM shadow text-center">
<div class="movie shadow rounded-3 position-relative">
    <div onclick="filterByCategory('${arr[i].strCategory}')" class="post">
        <img src='${arr[i].strCategoryThumb}' class="w-100 rounded-3" />
        <div class="layer d-flex align-items-center ">
            <div class="info p-2">
                <h2>${arr[i].strCategory}</h2>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>
</div>
</div>
    
    `
    row.innerHTML = e
};

async function filterByArea(area) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
};

function displayArea() {
    let e = ""
    for (var i = 0; i < arr.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow text-center">
        <div class="movie shadow rounded position-relative">
            <div onclick=(filterByArea('${arr[i].strArea}')) class="post ">
                <i class="fa-solid fa-house-laptop fa-4x uy fa-3x"></i>
                <h2 class="text-white">${arr[i].strArea}</h2>
            </div>
        </div>
    </div>`
    row.innerHTML = e;
};

async function getMainIngredient(Name) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Name}`)
    meal = await meal.json()
    displayMeals(meal.meals)
};

function displayIngredients() {
    let e = ""
    for (var i = 0; i < arr.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow text-center">
        <div onclick="getMainIngredient('${arr[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x "></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p class="text-white ">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    row.innerHTML = e;
};

async function getMeal(ID) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
};

function displayMeal(meal) {
    let recip = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recip += `<li class="my-3 mx-1 p-1 ss rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tgs = meal.strTags?.split(",")
    let tagsStr = "" 
    for (let i = 0; i < tgs?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 dar rounded">${tgs[i]}</li>`
    }

    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100 rounded-3" src="${meal.strMealThumb}" ><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recip
    document.getElementById("tags").innerHTML = tagsStr
};

function signup() 
{
    var sign= 
    {
        name: userName.value,
        email: userEmail.value,
        phone: userPhone.value,
        age: userAge.value,
        password: userPassword.value,
        re: userRePassword.value,
    }
      arr.push(sign)
      localStorage.setItem('register', JSON.stringify(arr))
      document.getElementById('us').innerHTML ="Success";
   
   clearForm();
}
function clearForm() 
{
    userName.value="";
    userEmail.value= "";
    userPhone.value= "";
    userAge.value= "";
    userPassword.value= "";
    userRePassword.value= "";
}


$(".nav-item a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")
    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    if (listBy == "contact") {

        row.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 text-center  ">
		<div class="p-5 ">
			<h2 class="text-light mb-5">Contact Us...</h2>
			<div class="row d-flex align-items-center">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Your Email">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter Your phone">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Your Age">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Your Password">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder=" RePassword">
					</div>
				</div>

                <div id="us" class="text-danger mt-3"></div>
			</div>

			<button onclick="signup();" disabled type="submit" id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
		</div>

	</section>`
           userName = document.getElementById("name"),
            userEmail = document.getElementById("email"),
            userPhone = document.getElementById("phone"),
            userAge = document.getElementById("age"),
            userPassword = document.getElementById("password"),
            userRePassword = document.getElementById("rePassword")
        
            if (localStorage.getItem('products') != null) {
                arr = JSON.parse(localStorage.getItem('products'));
            }
    }
    if (listBy == "search") {
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`

        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }

    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);
    let x;
    if (listBy == "categories") {
        x = await getCategories(listBy + ".php")
        arr = x.categories.splice(0, 20);
        displayCategories()
    } else if (listBy == "a") {
        x = await getCategories("list.php?a=list")
        arr = x.meals.splice(0, 20);
        displayArea()
    } else if (listBy == "i") {
        x = await getCategories("list.php?i=list")
        arr = x.meals.splice(0, 20);
        displayIngredients()
    }
})

function userNameValid() {
    var nameregex=/^[a-zA-Z ]+$/
    if(nameregex.test(userName.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};

function userEmailValid() {
    var emailregex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     if(emailregex.test(userEmail.value)==true)
     {
        return true;
     }
     else
     {
        return false;
     }
};

function userPhoneValid() {
    var phoneregex =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if(phoneregex.test(userPhone.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};

function userAgeValid() {
    var ageregex =/^[1-9][0-9]?$|^100$/;
    if(ageregex.test(userAge.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    };
};

function userPasswordValid() {
    var passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(passwordregex.test(userPassword.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};

function userRePasswordValid() {
    if(userPassword.value == userRePassword.value)
    {
        return true;
    }
    else
    {
        return false;
    };
};

function validation() 
{
    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }
    else
    {
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }
}
