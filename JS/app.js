//The URIs of the REST endpoint
RAAURI = "";
CIAURI = "";

DIAURI0 = "";
DIAURI1 = "";
//RemovedCode 1/assets/<<%7Bid%7D>>?api-version


CIA = "https://prod-36.northeurope.logic.azure.com:443/workflows/fd2436673cca4665a2e5b92de831b9c5/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=YR3NSs-c57lX_xVYqvmy3zfrHAvcjiNnjq8nVpHt76A";


//The URIs of the REST endpoint
IUPS = "https://prod-19.northeurope.logic.azure.com:443/workflows/20814145c826447f8da0cf286593b169/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=01a03IAp0lpxNrEGfUW00cpj_6huv6KtNpkqLwm026s";

RAI = "https://prod-47.northeurope.logic.azure.com:443/workflows/52dcf0bfa9f14213890e85009425bfab/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=3D-yGhfHOqIe0LIXKjg-bPDiQ1weeGV-uWvYx6ItRUo";

BLOB_ACCOUNT = "https://blobstore5469.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
   
  //Create a form data object 
  submitData = new FormData(); 
 
  //Get form variables and append them to the form data object   

  submitData.append('userID', $('#userID').val()); 
  submitData.append('userName', $('#userName').val()); 
  
  submitData.append('Comments', $('#Comments').val());
  submitData.append('KeyWords', $('#KeyWords').val());
  submitData.append('VideoRating', $('#VideoRating').val());

  submitData.append('FileName', $('#FileName').val()); 
  submitData.append('File', $("#UpFile")[0].files[0]); 
   
  //Post the form data  to the endpoint, note the need to set the content type header 
  $.ajax({ 
      url: IUPS, 
      data: submitData, 
      cache: false, 
      enctype: 'multipart/form-data', 
      contentType: false, 
      processData: false, 
      type: 'POST', 
      success: function(data){    
      } 
  }); 











   
  
  //Construct JSON Object for new item
  var subObj = {
    UserID: $('#userID').val(),
    FileName: $('#FileName').val(),
    VideoRating: $('#VideoRating').val(),
    KeyWords: $('#KeyWords').val()
    }

  //Convert to a JSON String
  subObj = JSON.stringify(subObj);


  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CIA,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
    }).done(function (response) {
    getAssetList();
    });
    }









//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){
    $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>'); 
    $.getJSON(RAI, function(data) { 
      console.log(data); // Log the entire response
      var items = []; 
      $.each(data, function(key, val) { 
          console.log("filePath: " + val["filePath"]); // Debugging line
          items.push("<hr  />"); 
        
          { (val["filepath"].endsWith(".mp4") || val["filepath"].endsWith(".avi")) 
            items.push("<video width='400' controls><source src='" + BLOB_ACCOUNT + val["filepath"] + "' type='video/mp4'>Your browser does not support the video tag.</video><br />");
        }
          items.push("video : " + val["fileName"] + "<br />"); 
          items.push(" user id: "+val["userID"]+  "<br />"+"Uploaded by: " + val["userName"] + "<br />"+         "Comments: "+val["Comments"]    +               "<br />"); 
          
 


//addDelButn
          items.push("<button class='deleteButton' data-filepath='" + val["filePath"] + "'>Delete</button><br />");
//addedDelButn
 


          items.push("<hr  />"); 
      }); 
      $('#VideoList').empty(); 
      $("<ul/>", { 
          "class": "my-new-list", 
          html: items.join("") 
      }).appendTo("#VideoList"); 
      
      

      //addDelButnPt2
      // Attach click event to delete buttons
      $('.deleteButton').click(function() {
        var filePath = $(this).data('filepath');
        deleteVideo(filePath);
    });
      //addedDelButnPt2



  });
  }

  //A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){

    $.ajax({
    
      type: "DELETE",
      //Note the need to concatenate the
      url: DIAURI0 + id + DIAURI1,
  
      }).done(function( msg ) {
      //On success, update the assetlist.
      getVideos();
      });
  }
  