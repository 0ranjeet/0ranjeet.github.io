

function openNav() {
  document.getElementById("mySidenav").style.height = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.height = "0";

}

function sendmail(){
  var templateParams = {
      from_name:document.getElementById("Name").value,
      email_id :document.getElementById("Sender").value,
      message :document.getElementById("Message").value,
  }
  
    
  emailjs.send("service_3sq8qdj","template_7jjfw6s",templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       Swal.fire(
  'Happy to connect'
)
    }, function(error) {
       console.log('FAILED...', error);
    });

      document.getElementById("Name").value="";
      document.getElementById("Sender").value="";
      document.getElementById("Message").value="";

  }
  

Swal.fire({
  title: 'welcome',
  text: 'So glad to see you😊',
  timer: 1500
})




// UPDATE: I was able to get this working again... Enjoy!

