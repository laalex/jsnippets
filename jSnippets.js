/**
 * jSnippets
 * --------------------------
 * A simple library/object that grabs HTML code snippets delimited by
 * comment lines and appends custom data to them
 * --------------------------
 * All rights go to www.qbyco.com
 * --------------------------
 * Requires:
 * jQuery
 * Bootstrap
 * --------------------------
 * jSnippets grabs the html code snippets and uses the data attribute to set different things for the snippet.
 * There are, some reserved data attributes. They are the following:
 * data-iterator ~ Represents an element that has child elements that will be iterated within a $.each structure
 *               | there is only 1 iterator field allowed by now
 * --------------------------
 * Snippets should be declared in the following form
 * <!--snippet#id_here--> html <!--snippet#id_here_end-->
 * Also, the snippets HTML should be ALWAYS defined within a <span /> element to avoid multiple elements selection problem
 * so that jquery .find() function can find the targeted divs by their data attribute
 */

if(typeof window.jsnippets === 'undefined'){
    /** Start jsnippets object */
    window.jsnippets = {};

    /** Init jsnippets with the right data */
    jsnippets.init = function(snippets_path){
        /** Set the path for the snippets */
        jsnippets.path = snippets_path;
        /** Load the snippets string */
        $.get(snippets_path,function(result){
            jsnippets._snippets = result;
            console.log("jSnippets inited.");
        });
        if(jsnippets._snippets === "" || jsnippets._snippets === 'undefined'){
            console.log("Error loading snippets file. Please check configuration");
        }
        /** Init other properties of this object  */
        jsnippets._loaded = null;
    }

    /**
     * [load - loads a snippet of code]
     * @param  {[string]} snippet_id [snippet id in the following form: snippet_id]
     * @return {[boolean]}            [returns true if the snippet has been found and loaded; false eitherway]
     */
    jsnippets.load = function(snippet_id){
        var delimiter_len = "<!--snippet#"+snippet_id+"-->"; delimiter_len = delimiter_len.length + 1;
        var snippet_start = jsnippets._snippets.search("<!--snippet#"+snippet_id+"-->");
        var start = snippet_start + delimiter_len;
        var end = jsnippets._snippets.search("<!--snippet#"+snippet_id+"_end-->");
        //Load the HTML snippet and return jquery DOM object
        jsnippets._loaded = $(jsnippets._snippets.slice(start,end));
        return;
    }

    /** Unload the string we have */
    jsnippets.unload = function(){
        jsnippets._loaded = null;
    }

    /** Load the data within a snippet */
    jsnippets.dataload = function(dataObject){
        /** Iterate trough the dataObject and append to the HTML snippets keys */
        $.each(dataObject,function(k,v){
            /** Check if k = iterator and if v = object and create an iterator object */
            if(k=='iterator' && typeof v == 'object'){
                var iterator = $(jsnippets._loaded).find("[data-iterator]");
                /** Iterate the v object and append all the information for the iterator */
                $.each(v,function(){
                    /** Iterate trough each object and append the data, and the clone */
                    var clone = iterator.clone();
                    $.each(this,function(k,v){
                        var domobj = $(clone).find("[data-"+k+"]");
                        //Check object type
                        if(domobj.prop('tagName') === 'IMG'){
                            domobj.attr('src',v)
                        } else {
                            domobj.html(v);
                        }
                    });
                    //Append the clone to the parent
                    $(iterator).parent().append(clone);
                });
                iterator.remove();
            } else {
                var domobj = $(jsnippets._loaded).find("[data-"+k+"]");
                //Check object type
                if(domobj.prop('tagName') === 'IMG'){
                    domobj.attr('src',v)
                } else {
                    domobj.html(v);
                }
            }

        });
    }

    /** Append the snippet to a given DIV */
    jsnippets.appendTo = function(div){
        $(div).append(jsnippets._loaded);
        jsnippets.unload();
    }

    /** Prepend the snippet to the given DIV */
    jsnippets.prependTo = function(div){
        $(div).prepend(jsnippets._loaded);
        jsnippets.unload();
    }

    /** Replace the html with the given snippet by element DIV */
    jsnippets.replace = function(div){
        $(div).html(jsnippets._loaded);
        jsnippets.unload();
    }
}

/**
 * CHANGELOG
 * ---------
 * 0.1 - Added image src support for image tags.
 */