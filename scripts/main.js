// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA4dErMZzeflYmezPQS15QizJFjfbYXQ0I",
    authDomain: "billing-and-stock-analysis.firebaseapp.com",
    databaseURL: "https://billing-and-stock-analysis.firebaseio.com",
    projectId: "billing-and-stock-analysis",
    storageBucket: "billing-and-stock-analysis.appspot.com",
    messagingSenderId: "801725518015",
    appId: "1:801725518015:web:895639ec51ea878b"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function FirebasePush()
{
   
   var Cnum = document.getElementById('Cnum').value,
       Name = document.getElementById('Name').value,
       TName = document.getElementById('TamilName').value,
       CP = document.getElementById('CP').value,
       RP = document.getElementById('RP').value,
       WP = document.getElementById('WP').value,
       CCP = document.getElementById('CCP').value,
       Measurement = document.getElementById('Measurement').value,
       Data = { Name: Name, TamilName : TName,
                CostPrice : CP, RetailPrice : RP,
                WholesalePrice : WP, CreditCardPrice : CCP,
                MeasurementType : Measurement};
   // Firebase Database Reference and the child
   const dbRef = firebase.database().ref();
   dbRef.once('value', function(snapshot) {
    if (!snapshot.hasChild(Cnum)) {
      const NewRef = dbRef.child(Cnum);
      const userRef = NewRef.child(TName);
      //userRef.update(Data);
      userRef.update(Data, OnUpdate);
    }
    else {
      const NewRef = dbRef.child(Cnum);
      const userRef = NewRef.child(TName);
      //userRef.update(Data);
      userRef.update(Data, OnUpdate);
    }
});
}

function display()
{  
  var division = document.getElementById('table'); 
  document.getElementById('table').style.display = "block";
  
  while (division.hasChildNodes()) {
    division.removeChild(division.firstChild);
  }

  var Category = document.getElementById('CNum').value;
  var query = firebase.database().ref(Category).orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      var RP= childData.RetailPrice;
      var WP= childData.WholesalePrice;
      var CP= childData.CostPrice;
      SetKey(key,RP,WP,CP);
      
  });
});
}

function SetKey(key,RP,WP,CP){
  var table = document.getElementById('table');
  var row = table.insertRow();
  row.style.width="100%";
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = key;
  cell2.innerHTML = RP;
  cell3.innerHTML = WP;
  cell4.innerHTML = CP;
}


var OnUpdate = function(error) {
  if (error) {
    // Get the modal
    var modal = document.getElementById("myModal1");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    document.getElementById("Form").reset();
    span.onclick = function() {
    modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 


  } 
  else {
     // Get the modal
     var modal = document.getElementById("myModal");
     // Get the <span> element that closes the modal
     var span = document.getElementsByClassName("close")[0];
     modal.style.display = "block";
     document.getElementById("Form").reset();
     span.onclick = function() {
     modal.style.display = "none";
     }
     // When the user clicks anywhere outside of the modal, close it
     window.onclick = function(event) {
     if (event.target == modal) {
       modal.style.display = "none";
     }
   } 


  }
}