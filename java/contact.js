let firebaseConfig = {
    apiKey: "AIzaSyD3GwFA5G_J0_9MfU_CgWRJHXQM4xW0qzw",
    authDomain: "localhost",
    projectId: "lab5-160e8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$('#submit').click((e) => {
    e.preventDefault();
    if(validate()){
    db.collection("users").add({
        firstname: $('#fname').val(),
        lastname: $('#lname').val(),
        email: $('#email').val(),
        gen: $('#gen').val(),
        massage: $('#massage').val(),   
        })
        .then(() => {
            reset();
        })
        .catch((error) => {
            console.log(error);
        });
    }
});

function reset(e){
    e.preventDefault();
    document.getElementById("mainform").reset();
}
function validate(){
    var email = $('#email').val();
    var xmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
    if($('#fname').val() == ''){
        alert('Please write your first name..');
        $('#fname').focus();
        return false;
    }
    if($('#lname').val() == ''){
        alert('Please write your last name..');
        $('#lname').focus();
        return false;
    }
    if(!xmail.test(String(email).toLowerCase())){
        alert('Please check your email..');
        $('#email').focus();
        return false;
    }
    return true;
}

db.collection("users").onSnapshot(doc=>{
    let table = $('tbody')[0]
    $("tbody tr").remove();
    
    doc.forEach(item=>{
        let row= table.insertRow(-1)
        let firstcell =row.insertCell(0)
        let secondcell =row.insertCell(1)
        let thirdcell =row.insertCell(2)
        let fourthcell = row.insertCell(3)
        let fivecell = row.insertCell(4)
        firstcell.textContent=item.data().firstname
        secondcell.textContent=item.data().lastname
        let mail = String(item.data().email).split("");
        let smail = mail[0];
        for(let j = 1 ; j < mail.length; j++){
            if(mail[j] != '@' && mail[j] != '.')smail += 'x';
            else smail += mail[j];
        }
        thirdcell.textContent = smail;
        fourthcell.textContent=item.data().gen
        fivecell.textContent=item.data().massage        
    }) 
})
