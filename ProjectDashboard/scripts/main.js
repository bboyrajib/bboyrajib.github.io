window.onload = function(){
	$("#profileImage").click(function(e) {
    	$("#imgUpload").click();
	});

	var firstName = askFirstName("");
	var lastName = askLastName("");
	document.getElementById("fullName").innerText = firstName+" "+lastName;	//concatenation

	var dob = askDOB("");
	document.getElementById("dob").innerText = dob;

	var age = calculateExactAge(dob);
	document.getElementById("age").innerText = age;

	var address = askAddress("");												//string variable
	document.getElementById("address").innerText = address;

	document.getElementById("isPremiumMem").innerText = generateMembershipDetails();

	document.getElementById("customerDetailsCard").style.display="block";
	document.getElementById("customerDetailsCard").style.animation="fadein 1.5s";
	document.getElementById("customerOrdersCard").style.display="block";
	document.getElementById("customerOrdersCard").style.animation="fadein 1.5s";

	var heightCardA = document.getElementById("customerDetails").offsetHeight;

	document.getElementById("customerOrders").style.minHeight=heightCardA+"px";

	var heightCardB = document.getElementById("customerOrders").offsetHeight;
	
	if(heightCardB>heightCardA){
		document.getElementById("customerDetails").style.minHeight=heightCardB+"px";
	}

	//add table data
	addTableData();

	//calculate subtotal and set it
	var subTotal = calculateColumn(2);
	document.getElementById("subTotal").innerText = "$"+subTotal;

	//calculate premium and set it
	var premium = calaculatePremium(subTotal);
	document.getElementById("premiumAdded").innerText = "$"+premium;

	//calculate total and set it
	document.getElementById("price").innerText = "$"+(subTotal+premium);

};

function changeProfilePic(uploader) {

    if ( uploader.files && uploader.files[0] ){
          $('#profileImage').attr('src', 
             window.URL.createObjectURL(uploader.files[0]) );
    }
}

function askFirstName(error){
	if(error!=="")
		error=error+"\n";														//function
	var input = prompt(error+"Enter First Name :");										//prompt
	if(input===undefined || input==="" || input===null)							//condition
		return askFirstName("Error: First Name cannot be empty!");
	else
		return input;
}

function askLastName(error){
	if(error!=="")
		error=error+"\n";	
	var input = prompt(error+"Enter Last Name :");										//prompt
	if(input===undefined || input==="" || input===null)
		return askLastName("Error: Last Name cannot be empty!");
	else
		return input;
}

function askDOB(error){
	if(error!=="")
		error=error+"\n";	
	var input = prompt(error+"Enter Date of Birth (mm/dd/yyyy) :");						//prompt
	if(input===undefined || input==="" || input===null)
		return askDOB("Error: Date of Birth cannot be empty!");
	else{
		var isValidDate = new Date(input);
		if(isValidDate=="Invalid Date")
			return askDOB("Error: Date of Birth provided is invalid!");
		else if((new Date()-isValidDate)<0)
			return askDOB("Error: Date of Birth cannot be a future date!");
		else
			return input;
	}
}

function calculateAge(dob){
	var today = new Date();
	var diff = Math.abs(today-new Date(dob));							
	var days = diff/(1000 * 60 * 60 * 24);										//number variable
	var years = Math.floor(days/365);											//calculations
	var months = Math.floor(((days/365)-years)*12);
	return years+"y "+months+"m";
}

function calculateExactAge(dob){
	var nowDate = new Date(new Date().setHours(0, 0, 0, 0));

    var dobDate = new Date(dob);
    if ((nowDate - dobDate)===0) {
      return "Newborn";
    }

    var years = nowDate.getFullYear() - dobDate.getFullYear();
    var months = nowDate.getMonth() - dobDate.getMonth();
    var days = nowDate.getDate() - dobDate.getDate();

    // Work out the difference in months.
    months += years * 12;
    if (days < 0) {
      months -= 1;
    }
    // Now add those months to the date of birth.
    dobDate.setMonth(dobDate.getMonth() + months);
    // Calculate the difference in milliseconds.
    var diff = nowDate - dobDate;
    // Divide that by 86400 to get the number of days.
    var days = Math.round(diff / 86400 / 1000);
    // Now convert months back to years and months.
    years = parseInt(months / 12);
    months -= (years * 12);
    // Format age 
    var text = "";
    if (years) {
      text = years + (years > 1 ? "y" : "y");
    }
    if (months) {
      if (text.length) {
        text = text + " ";
      }
      text = text + months + (months > 1 ? "m" : "m")
    }
    if (days) {
      if (text.length) {
        text = text + " ";
      }
      text = text + days + (days > 1 ? "d" : "d")
    }
    
    return text;
}

function askAddress(error){
	if(error!=="")
		error=error+"\n";	
	var input = prompt(error+"Enter Full Address :");									//prompt
	if(input===undefined || input==="" || input===null)
		return askAddress("Error: Address cannot be empty!");
	else
		return input;
}

function generateMembershipDetails(){
	var isPremiumMem = true;													//boolean variable
	isPremiumMem = Math.random()>0.5;
	return isPremiumMem?"Premium Membership":"Premium not active";
}

function addTableData(){
	var orders = ["MacBookAir 2013","iPhone 11", "iPad Pro 2018", "Apple Watch 5", "Apple HomePod"];
	var price = ["$1299","$799","$999","$349","$349"];
	$.each(orders, function(index,value){
		$('table tbody').append("<tr><td>"+(index+1)+"</td><td>"+value+"</td><td>"+price[index]+"</td></tr>");
	});
}

function calculateColumn(index){
    var total = 0;
    $('table tbody tr').each(function(){
    	var valueWithSymbol = $('td', this).eq(index).text();
        var value = parseFloat(valueWithSymbol.substring(1,valueWithSymbol.length));
        if (!isNaN(value)){
            total += value;
        }
    });

    return total;
}

function calaculatePremium(price){
	return (0.05*price);
}