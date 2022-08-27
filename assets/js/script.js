//Receipt Total
subtotal = 0;

window.onload = function(){
	//cart box
	const iconShopping = document.querySelector('.iconShopping');
	const cartCloseBtn = document.querySelector('.fa-close');
	const cartBox = document.querySelector('.cartBox');
	iconShopping.addEventListener("click",function(){
		cartBox.classList.add('active');
	});
	cartCloseBtn.addEventListener("click",function(){
		cartBox.classList.remove('active');
	});

	if (window.location.href.match('cart.html') != null) {
		cartBox.classList.add('active');
	}

	if (window.location.href.match('order.html') != null) {
		order();
	}

	// adding data to localstorage
	const attToCartBtn = document.getElementsByClassName('attToCart');
	let items = [];
	for(let i=0; i<attToCartBtn.length; i++){
		attToCartBtn[i].addEventListener("click",function(e){
			if(typeof(Storage) !== 'undefined'){
				let item = {
						id:i+1,
						name:e.target.parentElement.children[0].textContent,
						price:e.target.parentElement.children[1].children[0].textContent,
						no:1
					};
				if(JSON.parse(localStorage.getItem('items')) === null){
					items.push(item);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
				}else{
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data=>{
						if(item.id == data.id){
							item.no = data.no + 1;
						}else{
							items.push(data);
						}
					});
					items.push(item);
					localStorage.setItem('items',JSON.stringify(items));
					window.location.reload();
				}
			}else{
				alert('local storage is not working on your browser');
			}
		});
	}
	// adding data to shopping cart 
	const iconShoppingP = document.querySelector('.iconShopping p');
	let no = 0;
	JSON.parse(localStorage.getItem('items')).map(data=>{
		no = no+data.no;	
	});
	iconShoppingP.innerHTML = no;

	
	//adding cartbox data in table
	const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>Item no.</th><th>Item Name</th><th>Item Quantity</th><th>Item Price</th><th>Subtotal</th><th></th></tr>';
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="5">No items found</td></tr>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			total = data.price * data.no;
			tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th>'+total.toFixed(2)+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
			subtotal = subtotal + total;
		});
	}
	if (window.location.href.match('order.html') != null) {
		tableData += '<tr><th>---</th><th>---</th><th>---</th><th>---</th><th>---</th></tr>';
		tableData += '<tr><th></th><th></th><th></th><th>Total:</th><th><u>'+subtotal.toFixed(2)+'</u></th></tr>';
		order();
	} else if (window.location.href.match('cart.html') != null) {
		tableData += '<tr><th>---</th><th>---</th><th>---</th><th>---</th><th>---</th></tr>';
		tableData += '<tr><th></th><th></th><th></th><th>Total:</th><th><u>$'+subtotal.toFixed(2)+'</u></th></tr>';
	}
	cardBoxTable.innerHTML = tableData;
}

//Form Save - Local Storage
function SaveItem() {

	var inputName= document.getElementById("name");
	localStorage.setItem("name", inputName.value);

	var inputPhone= document.getElementById("phone");
	localStorage.setItem("phone", inputPhone.value);

	var inputEmail= document.getElementById("email");
	localStorage.setItem("email", inputEmail.value);

	var inputBilling= document.getElementById("billing");
	localStorage.setItem("billing", inputBilling.value);

	var inputShipping= document.getElementById("shipping");
	localStorage.setItem("shipping", inputShipping.value);

	
}

//Print All - Local Storage
function order(){
	var total = subtotal;
	var total2 = subtotal + 10;
	var name = window.localStorage.getItem('name');
	var phone = window.localStorage.getItem('phone');
	var email = window.localStorage.getItem('email');
	var billing = window.localStorage.getItem('billing');
	var shipping = window.localStorage.getItem('shipping');
	
   
	document.getElementById("name").innerHTML = "Name: " + name;
	document.getElementById("phone").innerHTML = "Phone: " + phone;
	document.getElementById("email").innerHTML = "Email: " + email;
	document.getElementById("billing").innerHTML = "Billing Address: " + billing;
	document.getElementById("shipping").innerHTML = "Shipping Address: " + shipping;
	document.getElementById("subtotal").innerHTML = 'Subtotal <span> ' + total.toFixed(2) + ' $ </span>';
	document.getElementById("total").innerHTML = 'Total <span> ' + (total2.toFixed(2)) + ' $ </span>';

}

//Reset
function Clear() {
	window.localStorage.clear();
}