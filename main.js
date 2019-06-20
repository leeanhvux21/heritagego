function get_photo(photos, offset_number){
  for (index = 0; index < photos.length; index++)
  mHeritageGoService.getPhoto(photos[index])
.then(function (photo) {display(photo, offset_number); })
};

function display(photo, offset_number){

  var clone = $('.post_1:last').clone(false).appendTo("section").hide().fadeIn(1600) ;
  clone.removeClass("post_1")
  clone.find('#photo').attr('src',"http:" + photo['image_url']);
  clone.find('#area_name').text(" " + photo["area_name"]);
  clone.find('#photo_name').text(" " + photo["title"][0]["content"]);
  clone.find('#user_avatar').attr('src',"http:" + photo["account"]["picture_url"]);
  clone.find('#creation_time').text(" " + photo["creation_time"].substring(0,4));
  clone.find("#demo").attr('src', "./img/jp.png");
  clone.attr('id', ""+offset_number)

  var x = $("#"+offset_number+' [id^="lang_"]');
  console.log(offset_number);
  for (index = 0; index < x.length; index++) {
    var y = $("#"+offset_number+' [id^="lang_'+index+'"]');
    y.attr("id", "lang_"+index+"_"+offset_number)
  }
};

function get_photos(offset){
  mHeritageGoService.getPhotos({offset:offset, limit:1})
  .then(photos => { get_photo(photos, offset); })
};

var offset_number = 3;

$(window).scroll(function() {
  if($(window).scrollTop() == $(document).height() - $(window).height()) {
    get_photos(offset_number, 1);
    offset_number++;
  }
  document.getElementById("clone-feed").innerHTML = document.getElementById("new_feed").innerHTML;
  document.getElementById("clone-feed-container").scrollTop = window.scrollY;
});


$(document).ready(get_three_photos());

function get_three_photos(){
  for (i = 0; i < 3; i++) {
    get_photos(i);
  }
};
