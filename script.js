/**
 * This script file is for demo purposes
 */

//Load jsnippets and init the snippets file
jsnippets.init("snippets.html");

//jsnippets in action - get some info from flickr and use the jsnippets to format the HTML
var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    tags: "dogs",
    tagmode: "any",
    format: "json",
  }).done(function(result){

     //This is where the magic happens
     //First we load the snippet we want
     jsnippets.load("images"); //This will load the snippet#images HTML code.
     //Create the object we want for this snippet
     var data = {};
     //We have fields in the object that will be iterated, so we create an array for the iterator data field
     data.iterator = [];
     $.each(result.items,function(){
        //We create an object for the current iteration and add the keys required
        var entry = {};
        entry.author = this.author;
        entry.author_id = this.author_id;
        entry.link = this.link;
        entry.image = this.media.m;
        //We push the item within the iterator array
        data.iterator.push(entry);
     });
     //After we've finished building the data we go forward and append the data to our snippet
     jsnippets.dataload(data);
     //And now we either appendTo,prependTo, or replace the contents of a div with our snippet
     jsnippets.replace("#content");
  });