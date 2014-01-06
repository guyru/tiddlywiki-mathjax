=============
MathJaxPlugin
=============

Author: `Guy Rutenberg`_

The original plugin appeared in `this blog post`_.

.. _`Guy Rutenberg`: http://www.guyrutenberg.com
.. _`this blog post`: http://www.guyrutenberg.com/2011/06/25/latex-for-tiddlywiki-a-mathjax-plugin/

Installation
============
Create a new tiddler named ``MathJaxPlugin`` and tag it with
``systemConfig``. Copy the contents of the file ``tiddlywiki-mathjax.js``
into it.

Usage
-----

Any text in your tiddlers surrounded by ``$$..$$`` (or ``\(..\)``) will be
rendered as inline equation. Text surrounded by ``\[..\]`` will be
rendered as displayed equation.

The actual code as a small demo section you can see once you install the
plugin.

Changelog
=========

1.0.1 (Feb 11, 2012)
--------------------
 * Fixed interoperability with TiddlerBarPlugin
