/* jQuery to fetch the files from firebase */

/**
 * these codes change the object id to server the correct file.
 */
$(document).ready(function() {
  let urlpart = document.URL.split('?')
  $('#object').attr('src', urlpart[1]+'?'+urlpart[2]);
  $('#material').attr('src', urlpart[3]+'?'+urlpart[4]);
})
