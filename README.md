jSnippets
=========

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