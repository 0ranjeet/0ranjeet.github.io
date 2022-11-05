

function openNav() {
  document.getElementById("mySidenav").style.height = "260px";
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
  imageUrl: 'https://www.bing.com/th/id/OGC.e54fb1cd19059e92fe324095c0f83d07?pid=1.7&rurl=https%3a%2f%2fmedia.giphy.com%2fmedia%2f3o6ZtpxSZbQRRnwCKQ%2fgiphy.gif&ehk=0fAuTVCq1kuZCi9Tvfy0vFRtYajerdvNnIOzzt6za5U%3d',
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: 'Custom image',
  timer: 1500
})




// UPDATE: I was able to get this working again... Enjoy!

var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})