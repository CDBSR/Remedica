
import { navbar } from "./navbar.js";
import { footer } from "./footer.js";
import { baseurl } from "./baseUrl.js";

navbar();
footer();

const signUpButton = document.getElementById('sigUp');
const signInButton = document.getElementById('sigin');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

let signUpform = document.getElementById('signupForm');
signUpform.addEventListener('submit', async function(){
    let userName = signUpform.name.value;
    let email= signUpform.email.value;
    let password = signUpform.password.value;
    let userObj = {userName, email, password};

    try {

        const response = await fetch(`${baseurl}/users`);
        const users = await response.json();

        let user = user.filter((el, i) => el.email == email);

        if(user.length != 0){
            alert('User already Exists, please login');
            window.location.href = 'login.html';
        }

        await fetch(`${baseurl}/users`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userObj)
        });
        alert('sign up successfully');
    } catch(error){
        console.log("Error i signing Up: ", error);
    }
});