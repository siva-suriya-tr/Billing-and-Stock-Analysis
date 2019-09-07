// Your web app's Firebase configuration
let firebaseConfig = {
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
   
   let Cnum = document.getElementById('Cnum').value,
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
  let Category = document.getElementById('CNum').value;
  if(Category === "")
  {
    document.getElementById('error').style.display="block";
  }
  else
  {
  document.getElementById('error').style.display="none";
  let dataList = document.getElementById('dataList');
  //let dataListInput = document.getElementById('dataListInput');
  let modal = document.getElementById("myModal");
  modal.style.display="block";
  document.getElementById('dataListInput').value = "";
  //document.getElementById('table').style.display = "block";
  while (dataList.options.length != 0 ) {
    dataList.children[0].remove()
  }
  let query = firebase.database().ref(Category).orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let key = childSnapshot.key;
      let childData = childSnapshot.val();
      let RP= childData.RetailPrice;
      let WP= childData.WholesalePrice;
      let CP= childData.CostPrice;
      addItem(key);
  });
});
  }
let modalWin = document.getElementById("myModal");
window.onclick = function(event) {
  if (event.target == modalWin) {
    modalWin.style.display = "none";
  }
}
$(document).keyup(function(e) {
  if (e.keyCode === 27)// esc
  {
    modalWin.style.display = "none";
  }
});
}
function addItem(key)
{
  let dataList = document.getElementById('dataList');
  let option = document.createElement('OPTION');
  option.innerHTML = key;
  option.setAttribute('onclick','tranferDetail()')
  dataList.appendChild(option);
}

let OnUpdate = function(error) {
  if (error) {
    // Get the modal
    let modal = document.getElementById("myModal1");
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
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
     let modal = document.getElementById("myModal");
     // Get the <span> element that closes the modal
     let span = document.getElementsByClassName("close")[0];
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

const CNum = document.getElementById('CNum');
CNum.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      display();
    }
});

const node = document.getElementById("dataListInput");
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      tranferDetail();
    }
});

function eraseText() {
  document.getElementById("dataListInput").value = "";
  document.getElementById("CNum").value = "";
  let modalWin = document.getElementById("myModal");
  modalWin.style.display = "none";
}

function tranferDetail()
{
      var input = document.getElementById("dataListInput").value;
      let table = document.getElementById('table');
      let row = table.insertRow();
  //row.style.width="100%";
  //row.onclick = function(){console.log(row.rowIndex)};
      row.style.border ="1px solid";
      let cell1 = row.insertCell(0);
      cell1.style.border ="1px solid";
      cell1.innerHTML = input;
      eraseText();

}

shortcut.add("Space",function() {
  if(document.getElementById('myModal').style.display === "none")
  {
  document.getElementById('CNum').focus();
  }
});
