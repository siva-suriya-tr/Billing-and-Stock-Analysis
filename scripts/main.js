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
  var counter = 0;
  var counter1 = 0;
  var counter2 = 0;

  var division = document.getElementById('select'); 
  document.getElementById("select").style.display = "block";
  
  var Category = document.getElementById('CNum').value;
  var query = firebase.database().ref(Category).orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      //var childData = childSnapshot.val();
      var newDivThingy = document.createElement("option");
      newDivThingy.style.width = "100%";
      newDivThingy.id  = 'option' + (++counter);
      division.appendChild(newDivThingy);
      document.getElementById('option'+(++counter1)).value=key;
      document.getElementById('option'+(++counter2)).text=key;
      console.log(key);
  });
});
}