const amount = 12
const chipest = "https://new.chipest.co.il"
var ebayparam

function search()
{  
    
    var v = document.getElementById("expression").value.trim()
        
    if (v != "")
    {  
      if ($('#ebay').is(":checked"))
          ebayparam = "&stores=ebay"
       else
          ebayparam = ""

      console.log("expression check: " + v)     
      console.log("ebay: value:" + ebayparam) 

      $.get(`https://new.chipest.co.il/api/products/multi/search?q=${v}&translatedSearchTerm=&stores=aliexpress${ebayparam}&page=1&offers=30`, (data, status)=>
      {           
          var offers = data.offers

          console.log("api get status: " + status)
          console.log("offers array: ")
          console.log(offers)

          $(".row").empty()

          if (offers === undefined || offers.length == 0)
            $(".row").append('<p style="color: grey;">Nothing found<p>')
          else
          {
            for(i = 0; i < amount; i++)
            {
              var imgurl
  
              if (offers[i].store === "ebay")
                imgurl = "http:" +  offers[i].image 
              else
                imgurl = offers[i].image
                
  
              $(".row").append(
              `<div class="col-6">
                 <div class="card">
                    <img class="card-img-top" src="${imgurl}">
                    <div class="card-body">
                      <h6 class="card-title">${offers[i].price.price} ${offers[i].price.currency}</h6>
                      <p class="card-text">${offers[i].productName}</p>
                      <a target="_blank" href="${chipest}${offers[i].productPageLink}" class="btn btn-primary">View on Chipest</a>
                    </div>
                  </div>
                </div>    
              `)      
            } 
          }

            
            
      })
    }
    else
    {    
        $(".row").empty() 
        $(".row").append('<p style="color: grey;">Input is empty<p>')
    }
  
}

//enter button listener
document.addEventListener('DOMContentLoaded', function() {
    var expression = document.getElementById('expression')    
    expression.addEventListener('keyup', search)
})


//click search button
var btn = document.getElementById('search')
btn.onclick = ()=>{search()}

//open product new tab
$('body').on('click', 'a[target="_blank"]', function(e){
  e.preventDefault();
  chrome.tabs.create({url: $(this).prop('href'), active: false});
  return false;
})