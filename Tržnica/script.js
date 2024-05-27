let allTotal = 0;

function addToCart(element) {
	let mainElement = element.closest('.single-item');
	let price = mainElement.querySelector('.price').innerText;
	let name = mainElement.querySelector('h3').innerText;
	let quantity = mainElement.querySelector('input').value;
	let cartItems = document.querySelector('.cart-items');

	if (parseInt(quantity) > 0) {
		price = price.substring(1);
		price = parseInt(price);
		let total = price * parseInt(quantity);

		allTotal += total;

		cartItems.innerHTML += `<div class="cart-single-item">
								<h3> ${name} </h3>
								<p>$${price} x ${quantity}= $<span>${total}</span></p>
								<button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
							</div>`;

		document.querySelector('.total').innerText = `Total: $${allTotal}`;

		element.innerText = 'Dodato ';
		element.setAttribute('disabled', 'true');

	} else {
		alert('Odaberi kolicinu !');
	}
}


function removeFromCart(element) {
	let mainElement = element.closest('.cart-single-item');
	let price = mainElement.querySelector('p span').innerText;
	let name = mainElement.querySelector('h3').innerText;
	let vegetables = document.querySelectorAll('.single-item');

	price = parseInt(price);

	allTotal -= price;

	document.querySelector('.total').innerText = `Total: $${allTotal}`;

	mainElement.remove();

	vegetables.forEach(function (vege) {
		let itemName = vege.querySelector('.si-content h3').innerText;

		if (itemName === name) {
			vege.querySelector('.actions input').value = 0;
			vege.querySelector('.actions button').removeAttribute('disabled');
			vege.querySelector('.actions button').innerText = 'Dodaj';
		}
	})


}

