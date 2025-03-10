const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const companyBtn = document.getElementById('company');
const studentBtn = document.getElementById('student');
const nameInput = document.getElementById('name');
const btn = document.getElementById('btn');
const toggleSignUp = document.getElementById('toggleSignUp');
const toggleSignIn = document.getElementById('toggleSignIn');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

studentBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    nameInput.setAttribute('placeholder', 'Name');
    btn.style.left = '0';
    studentBtn.classList.add('active');
    companyBtn.classList.remove('active');
});

companyBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    nameInput.setAttribute('placeholder', 'Company Name');
    btn.style.left = '50%';
    companyBtn.classList.add('active');
    studentBtn.classList.remove('active');
});

if (toggleSignUp && toggleSignIn) {
    toggleSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add("activeb");
    });

toggleSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove("activeb");
    });
}
toggleSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add("activeb");
});