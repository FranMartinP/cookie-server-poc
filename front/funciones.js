$(document).ready(function(){
	
	$('#loginForm').submit(function(e){
		e.preventDefault()
		let username = $('#exampleInputEmail1').val()
		let password = $('#exampleInputPassword1').val()

		login({user: username, pass: password})
	});

	const login = function(data) {
		// $.post( "/login", data, function(response){
		// 	console.log(response)
		// 	location.href = '/dashboard.html'
		// }, 'json').fail(function(error){
		// 	console.log(error)
		// });

		$.ajax({
			url: '/login',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function(response){
				console.log(response)
				location.href = '/dashboard.html'
			},
			error: function(error){
				console.log(error)
			}
		})
	}

	$('#getDataBtn').click(function(){
		$.ajax({
			url: '/userData',
			type: 'GET',
			contentType: 'application/json',
			success: function(response){
				console.log(response)
				// alert('funciona!!!')
			},
			error: function(error){
				console.log(error)
			}
		})
	})

	$('#mostrar-cookies').click(function(){
		cookies = document.cookie
		$('.cookies').html(document.cookie)
	})


})
