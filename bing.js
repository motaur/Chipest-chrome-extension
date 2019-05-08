const duck = `https://api.duckduckgo.com/?q=${v}&format=json`

const bing = `https://api.cognitive.microsoft.com/bing/v7.0/search?answerCount=10&q=${v}`
const subscriptionKey = 'd45526cb0da54c798a8938fde0f8592e'
const sites = `ebay.com OR site: aliexpress.com OR site:amazon.com`

function search(e)
{
  if (e.keyCode == 13) //enter pressed
  {
    var v = document.getElementById("expression").value.trim()    
    
    if (v != "")
    {
      $.ajaxSetup({headers:{'Ocp-Apim-Subscription-Key' : subscriptionKey}})
	  
      $.get(bing + `${v} (site: ${sites})`, (data, status)=>
      {           
          var results = data.webPages.value

          console.log(status)
          console.log(results)

          $(".results").empty()

          results.forEach((i)=>{
            $(".results").append(`<p><a href="${i.url}">${i.name}</a></p>\n`)      
          })
            
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
    var expression = document.getElementById('expression')    
    expression.addEventListener('keyup', search)
})