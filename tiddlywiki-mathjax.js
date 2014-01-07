/***
|''Name:''|MathJaxPlugin|
|''Description:''|Enable LaTeX formulas for TiddlyWiki|
|''Version:''|1.1.0|
|''Date:''|Jan 7, 2014|
|''Source:''|https://github.com/guyru/tiddlywiki-mathjax|
|''Author:''|Guy Rutenberg|
|''License:''|[[BSD open source license]]|
|''~CoreVersion:''|2.5.0|

!! Configuration
You will need to reload your TiddlyWiki for the changes to take effect.
<<option chkMathJaxUseHttps>> Use HTTPS for the MathJax resources.
<<option txtMathJaxOverrideUrl>> Override the URL of """MathJAx.js""". Leave empty to use the default URL.
 
!! How to Use
Currently the plugin supports the following delemiters:
* """\(""".."""\)""" - Inline equations
* """$$""".."""$$""" - Displayed equations
* """\[""".."""\]""" - Displayed equations
!! Demo
This is an inline equation \(P(E)   = {n \choose k} p^k (1-p)^{ n-k}\) and this is a displayed equation:
\[J_\alpha(x) = \sum_{m=0}^\infty \frac{(-1)^m}{m! \, \Gamma(m + \alpha + 1)}{\left({\frac{x}{2}}\right)}^{2 m + \alpha}\]
This is another displayed equation $$e=mc^2$$
!! Code
***/
//{{{
config.extensions.MathJax = {
  displayTiddler: function(TiddlerName) {
    config.extensions.MathJax.displayTiddler_old.apply(this, arguments);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }
};
 
(function (plugin) { // Start of plugin local scope

if (config.options.txtMathJaxOverrideUrl == undefined) {
	config.options.txtMathJaxOverrideUrl = "";
}

if (config.options.txtMathJaxOverrideUrl) {
	plugin.mathJaxScript = config.options.txtMathJaxOverrideUrl;
} else if (config.options.chkMathJaxUseHttps) {
	plugin.mathJaxScript = "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js";
} else {
	plugin.mathJaxScript = "http://cdn.mathjax.org/mathjax/latest/MathJax.js";
}

plugin.mathJaxScriptOptions = "?config=TeX-AMS-MML_HTMLorMML";
plugin.mathJaxScript += plugin.mathJaxScriptOptions;

jQuery.getScript(plugin.mathJaxScript, function(){
    MathJax.Hub.Config({
      extensions: ["tex2jax.js"],
      "HTML-CSS": { scale: 100 }
    });
 
    MathJax.Hub.Startup.onload();
    plugin.displayTiddler_old = story.displayTiddler;
    story.displayTiddler = plugin.displayTiddler;
});
})(config.extensions.MathJax); // End of plugin local scope
 
config.formatters.push({
	name: "MathJaxFormula",
	match: "\\\\\\[|\\$\\$|\\\\\\(",
	handler: function(w)
	{
		switch(w.matchText) {
		case "\\[": // displayed equations
			this.lookaheadRegExp = /\\\[((?:.|\n)*?)(\\\])/mg;
			break;
		case "$$": // inline equations
			this.lookaheadRegExp = /\$\$((?:.|\n)*?)(\$\$)/mg;
			break;
		case "\\(": // inline equations
			this.lookaheadRegExp = /\\\(((?:.|\n)*?)(\\\))/mg;
			break;
		default:
			break;
		}
		this.lookaheadRegExp.lastIndex = w.matchStart;
		var lookaheadMatch = this.lookaheadRegExp.exec(w.source);
		if(lookaheadMatch && lookaheadMatch.index == w.matchStart) {
			createTiddlyElement(w.output,"span",null,null,lookaheadMatch[0]);
			w.nextMatch = this.lookaheadRegExp.lastIndex;
		}
	}
});
//}}}
