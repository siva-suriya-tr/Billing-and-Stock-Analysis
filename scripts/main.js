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
      userRef.update(Data);
    }
    else {
      const NewRef = dbRef.child(Cnum);
      const userRef = NewRef.child(TName);
      userRef.update(Data);
    }
});
}

function display()
{  
  var division = document.getElementById('ul'); 
  document.getElementById('ul').style.display = "block";
  
  while (division.hasChildNodes()) {
    division.removeChild(division.firstChild);
  }

  var Category = document.getElementById('CNum').value;
  var query = firebase.database().ref(Category).orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var li = document.createElement('li');
      SetKey(key,li);
      //console.log(key);
  });
});
}

function SetKey(key,li){
  var division = document.getElementById('ul');
  li.innerHTML=key;
  li.style.width = "100%";
  division.appendChild(li);
}