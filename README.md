jSnippets
--------------------
*V 0.0.1*-alpha

--------------------

jSnippets is a javasript library that grabs an HTML file that contains different HTML code snippets and allows you to use the snippet element to be appended,prepended or to replace the contents of a given DIV element from the DOM of the current file.

Requirements
============
1. jQuery
2. Bootstrap

Snippets declaration
====================
Snippets should be declared in the following form
<!--snippet#id_here--> html <!--snippet#id_here_end-->
Also, the snippets HTML should be ALWAYS defined within a *<span />* element to avoid multiple elements selection problem so that jquery _.find()_ function can find the targeted divs by their data attribute

Application
===========
jSnippets grabs the _html code snippets_ and uses the data attribute to set different things for the snippet.
There are, some *reserved* data attributes. They are the following:

1. _data-iterator_ ~ Represents an element that has child elements that will be iterated within a $.each structure there is only 1 iterator field allowed by now

Methods
=======
1. jsnippets.init(path); 
This function is getting the path argument which represents the path to the snippets HTML file. This loads all the snippets within an property of _jsnippets_ object. 
2. jsnippets.load(snippet_id); 
This represents the snippet ID to load from the file. This will be loaded as the current object to work with within the following methods.
3. jsnippets.unload(); 
Unloads the current working snippet from the memory.
4. jsnippets.dataload(object);
This receives an object representing the data to be bound to the snippet. Example of an object can be:
`{iterator:[{name:'alex',field:'test'},{name:'alex',field:'test'},{name:'alex',field:'test'},{name:'alex',field:'test'}],othername:'alex'}`
5. jsnippets.appendTo(div);jsnippets.prependTo(div);jsnippets.replace(div);
Those methods append,prepend, or replace the content of a #div/.div/DOM element with the current loaded snippet. Also, after the snippet is appended/prepended/replaced the library calls jsnippet.unload(); to clear the memory;

Current features
================
1. If <img data-attr/> tag is found within the snippet, jSnippets expects to have an URL of the image to build the image.


TO DO
=====
1. If <a> tag is found, jsnippet should expect an object that will have the URL as a key, and TEXT as another key to properly set the <a> element. 
2. Add multiple iterators to snippets or allow the iterator to be defined in another way. 
