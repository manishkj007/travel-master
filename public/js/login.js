let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

// Handle Sign-In Form Submission
signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;
    
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Login failed'); // Improved error handling
        }
        return res.json();
    })
    .then((data) => {
        window.location.href = data.redirectURL; // Redirect to the specified URL
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Wrong email or password!'); // Informative alert
    });
});

// Handle Registration Form Submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let rePassword = document.getElementById('register-re-enter-password').value;
    
    // Basic client-side validation
    if (password !== rePassword) {
        alert('Passwords do not match!');
        return;
    }

    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Registration failed'); // Improved error handling
        }
        return res.text();
    })
    .then((data) => {
        alert(data); // Display the response message
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during registration!'); // Informative alert
    });
});
