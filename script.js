document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');

    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image');

    if (product === 'health_fitness') {
        productName.textContent = 'מדריך בריאות וכושר';
        productPrice.textContent = '₪20';
        productImage.src = 'b.png';
    } else if (product === 'online_business') {
        productName.textContent = 'מדריך עסקים אונליין';
        productPrice.textContent = '₪50';
        productImage.src = 'e.png';
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('התשלום בוצע בהצלחה!');
    });
});

function formatCardNumber(input) {
    const cardInput = document.getElementById('card');
    const cardType = document.getElementById('card-type');
    let cardNumber = cardInput.value.replace(/\D/g, '');

    if (cardNumber.startsWith('4')) {
        cardType.textContent = 'Visa';
    } else if (cardNumber.startsWith('5')) {
        cardType.textContent = 'MasterCard';
    } else {
        cardType.textContent = '';
    }

    if (cardNumber.length === 16) {
        cardInput.classList.add('valid');
    } else {
        cardInput.classList.remove('valid');
    }
    toggleCheckmark(cardInput);

    cardInput.value = cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    input.value = value;

    if (value.length === 5) {
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
    }
    toggleCheckmark(input);
}

function formatCVV(input) {
    input.value = input.value.replace(/\D/g, '').slice(0, 3);

    if (input.value.length === 3) {
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
    }
    toggleCheckmark(input);
}

function toggleCheckmark(input) {
    const checkmark = input.nextElementSibling;
    if (input.classList.contains('valid')) {
        checkmark.classList.add('show');
    } else {
        checkmark.classList.remove('show');
    }
}
