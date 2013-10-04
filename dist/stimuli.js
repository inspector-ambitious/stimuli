/*! stimuli - v0.0.1 - 2013-10-04 */
'use strict';

// Source: lib/sizzle/sizzle.js
/*!
 * Sizzle CSS Selector Engine v1.10.9
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-09-12
 */
(function( window ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

// EXPOSE
if ( typeof define === "function" && define.amd ) {
	define(function() { return Sizzle; });
// Sizzle requires that there be a global window in Common-JS like environments
} else if ( typeof module !== "undefined" && module.exports ) {
	module.exports = Sizzle;
} else {
	window.Sizzle = Sizzle;
}
// EXPOSE

})( window );


// Source: src/stimuli.js

/**
 * @class Stimuli
 * This class stimulates your browser! it's the entry point of all the framework.
 * @constructor
 * @param {Object} options
 */

var Stimuli = function() {
    var self = this;

    self.context = new Stimuli.shared.Context();

    self.browser = new Stimuli.virtual.Browser(self.context);

    self.viewport = new Stimuli.shared.Viewport(self.context);

    self.mouse = new Stimuli.virtual.Mouse(self.viewport);

    self.recorder = new Stimuli.shared.Recorder();

    self.synchronize(self.recorder);

    self.synchronize(self.browser);

    self.synchronize(self.mouse);

    function mix(obj) {
        obj.browser = self.browser;
        obj.mouse = self.mouse;
        obj.recorder = self.recorder;
    }

    mix(self.browser);

    mix(self.mouse);

    mix(self.recorder);

};

// Namespaces declaration

Stimuli.core = {};
Stimuli.shared = {};
Stimuli.event = {
    synthetizer: {}
};


Stimuli.virtual = {
    mouse: {},
    keyboard: {},
    touch:{}
};

Stimuli.browser = {};

Stimuli.mouse = {};

(function() {
    var els = document.getElementsByTagName("script");
    var str = "";
    for(var i = 0; i < els.length; i++) {
        var src = els[i].src;
        if(/stimuli.js/.test(src)) {
            Stimuli.blankPage = src.replace('stimuli.js', 'blank.html');
        }
    }
})();
/**
 * Destroy the stimuli instance
 * @param {Object} options
 */
Stimuli.prototype.destroy = function(callback) {
    return this.browser.destroy(callback);
};

/**
 * Finds the dom element matching the css selector in the current virtual browser viewport.
 * @param {Object} options
 * @return {HTMLElement} The element.
 */
Stimuli.prototype.$ = function(selector) {
    return this.viewport.$(selector);
};

/**
 * Returns the current virtual browser window object.
 * @return {Window}
 */
Stimuli.prototype.getWindow = function() {
    return this.context.getWindow();
};

/**
 * Returns the current virtual browser document object.
 * @return {Object}
 */
Stimuli.prototype.getDocument = function() {
    return this.viewport.getDocument();
};


// Source: src/core/support.js

/**
 * @class Stimuli.core.Support
 * @singleton
 * This class detects supported browser features.
 */

(function() {

    var isIE = false,
        IEVersion = 0,
        jscriptMap = {
            "5.8": 8,
            "9": 9,
            "10": 10
        },
        jscriptVersion = 'none';

    /*@cc_on
     jscriptVersion = @_jscript_version;
     @*/
    IEVersion = jscriptMap[jscriptVersion];
   if (IEVersion) {
       isIE = true;

   }
Stimuli.core.Support = {

    /**
     * @property {Boolean}
     * Is true if document supports addEventListener method
     */
    documentAddEventListener: typeof document.addEventListener === 'function',

    /**
     * @property {Boolean}
     * Is true if window supports MouseEvent class (Firefox, Chrome)
     */
    windowMouseEvent: typeof MouseEvent === 'function',


    /**
     * @property {Boolean}
     * Is true if document supports createEvent method (IE9, IE10, IE11, Safari, PhantomJS)
     */
    documentCreateEvent: typeof document.createEvent === 'function',

    
    /**
     * @property {Boolean}
     * Is true if document supports createEventObject method. (IE8, IE9, IE10)
     */
    documentCreateEventObject: typeof document.createEventObject === 'function',


    /**
     * @property {Boolean}
     * Is true if browser is ie8
     */
    isIE8: isIE && IEVersion === 8,

    /**
     * @property {Boolean}
     * Is true if browser is ie9
     */
    isIE9: isIE && IEVersion === 9,

    /**
     * @property {Boolean}
     * Is true if browser is ie10
     */
    isIE10: isIE && IEVersion === 10,

    /**
     * @property {Boolean}
     * Is true if browser is IOS
     */
    isIOS:  /(iPad|iPhone|iPod)/g.test( navigator.userAgent )

};

})();

// Source: src/core/object.js

/**
 * @class Stimuli.core.Object
 * @singleton
 * A set of useful methods to deal with objects.
 */
(function() {

    Stimuli.core.Object = {

        /**
         * Merge objects properties.
         * @param {Object} dest The destination object
         * @param {Object=} src The source object
         * @return {Object} dest
         */
        merge: function(dest, src) {
            if (!src) {
                return dest;
            }
            for (var prop in src) {
                if (src.hasOwnProperty(prop)) {
                    dest[prop] = src[prop];
                }
            }

            return dest;
        }

    };

})();

// Source: src/core/class.js

/**
 * @class Stimuli.core.Class
 * @singleton
 * This singleton provide utilities to deal with classes inheritance and mixins.
 */
Stimuli.core.Class = {

    /**
     * Creates a class which has inherited constructor and prototype from another one.
     * @param {Mixed} clsSource The class to inherit from.
     * @return {Mixed} The subclass.
     */
    inherit: function(clsSource) {
        var cls = function() {
            return clsSource.apply(this, arguments);
        };

        Stimuli.core.Object.merge(cls.prototype, clsSource.prototype);

        return cls;
    },

    /**
     * Applies a mixin to a class prototype.
     * @param {Mixed} cls The destination class.
     * @param {Mixed} mixin The applied mixin.
     */
    mix: function(cls, mixin) {
        Stimuli.core.Object.merge(cls.prototype, mixin);
    }

};


// Source: src/core/observable.js

/**
 * @class Stimuli.core.Observable
 * @singleton
 * This mixin provides a common interface to publish and to listen to events on objects.
 */
Stimuli.core.Observable = {

    /**
     * Publishes an event, which will result in a call to all suscribed listeners.
     * @param {String} eventName The event name.
     * @param {Mixed} [data] the data to be emitted.
     */
    publish: function(eventName) {
        var self = this;
        if (!self.listeners || !self.listeners[eventName]) {
            return;
        }

        var args = Array.prototype.slice.call(arguments, 1),
            listeners = self.listeners[eventName].slice(0),
            length = listeners.length,
            i = 0,
            listener;

        for (; i < length; i++) {
            listener = listeners[i];
            listener.fn.apply(listener.scope, args);
        }

    },

    /**
     * Attaches a listener to an event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to attach.
     * @param {Object=} scope The listener execution scope.
     * @param {Boolean=} sneak If true the listener will be called first.
     */
    subscribe: function(eventName, fn, scope, sneak) {
        var self = this,
            options;

        scope = scope || self;

        self.listeners = self.listeners || {};

        self.listeners[eventName] = self.listeners[eventName] || [];

        options = {

            fn: fn,

            scope: scope

        };

        if (sneak) {
            self.listeners[eventName].splice(0, 0, options);
        } else {
            self.listeners[eventName].push(options);
        }

    },

    /**
     * Attaches a listener to an event, but it will be called only once.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to attach.
     * @param {Object=} scope The listener execution scope.
     * @param {Boolean=} sneak If true the listener will be called first.
     */
    once: function(eventName, fn, scope, sneak) {
        var self = this;

        function fnWrap() {
            self.unsubscribe(eventName, fnWrap);
            fn.apply(scope, arguments);
        }

        self.subscribe(eventName, fnWrap, scope, sneak);
    },

    /**
     * Detaches a listener on a specifi event.
     * @param {String} eventName The event name.
     * @param {Function} fn The listener to detach.
     */
    unsubscribe: function(eventName, fn) {
        var listeners = this.listeners[eventName],
            length = listeners.length,
            i = 0,
            listener;

        for (; i < length; i++) {
            listener = listeners[i];
            if (listeners[i].fn === fn) {
                listeners.splice(i, 1);
                break;
            }
        }

    }
};

Stimuli.core.Class.mix(Stimuli, Stimuli.core.Observable);

// Source: src/core/scheduler.js

/**
 * @class Stimuli.core.Scheduler
 * @mixins Stimuli.core.Observable
 * Provides a convenient way to "buffer" data.
 * @cfg {Number} speed The emission speed.
 * @cfg {Number} delay The emission delay in ms.
 * @constructor
 * @param {Object} config The config object
 */
(function() {

    Stimuli.core.Scheduler = function(options) {
        var self = this;
        options = options || {};
        self.delay = !isNaN(options.delay) ? options.delay : 1;
        self.speed = !isNaN(options.speed) ? options.speed : 1;
        self.scope = options.scope || self;
        self.queue = [];
        self.locked = false;
    };

    var Scheduler = Stimuli.core.Scheduler;

    // Applies Observable mixin
    Stimuli.core.Class.mix(Stimuli.core.Scheduler, Stimuli.core.Observable);

    /**
     * Schedules data
     * @param {Mixed} data The data to schedule.
     * @param {Function} callback The function to call when the data is ready.
     */
    Scheduler.prototype.schedule = function(data, callback, options, position) {
        var self = this,
            frame = {data: data, callback: callback, options: options};

        if (typeof position === 'undefined') {
            self.queue.push(frame);
        } else {
            self.queue.splice(position, 0, frame);
        }
        self.next();

    };


    /**
     * Calculates the timeout for asynchronous event publishing.
     */
    Scheduler.prototype.calculateTimeout = function(options) {
        var delay, speed;


        delay = !isNaN(options.delay) ? options.delay: this.delay;
        speed = !isNaN(options.speed) ? options.speed: this.speed;


        return delay/speed;
    };

    /**
     * Unlocks the execution flow.
     */
    Scheduler.prototype.unlock = function() {
        this.locked = false;
    };

    /**
     * Locks the execution flow.
     */
    Scheduler.prototype.lock = function() {
        this.locked = true;
    };

    /**
     * Tries to immediately publish the data. If it's not possible it returns immediately.
     */
    Scheduler.prototype.next = function() {
        var self = this;

        if (self.locked || self.queue.length === 0) {
            return;
        }

        self.lock();

        var frame = self.queue.shift(),
            options = frame.options || {},
            data = frame.data,
            fn = frame.callback || function() {},
            scope = options.scope || self.scope;

        var callback = function() {
            var args = Array.prototype.slice.call(arguments, 0);

            // asynchronous action callback
            if (fn.length > args.length) {
                // adding a function as last argument to allow the execution
                // of the next device action
                args.push(function() {
                    self.unlock();
                    self.next();
                });

                fn.apply(scope, args);
                // synchronous action callback
            } else {
                fn.apply(scope, args);
                self.unlock();
                self.next();
            }

        };

        var timeout = self.calculateTimeout(options);

        if (timeout) {
            setTimeout(function() {
                self.publish('event', data, callback, options);
            }, timeout);
        } else {
            self.publish('event', data, callback, options);
        }


    };

})();

// Source: src/core/chainable.js

/**
 * @class Stimuli.core.Chainable
 * @singleton
 * This mixin provides asynchronous function queueing (a bit like promises)
 */
(function() {

    Stimuli.core.Chainable = {

        /**
         * Initializes the functions queue.
         * @param {Object=} options
         * @param {Number} [options.delay=0] The default delay before executing a function.
         * @param {Mixed} [options.scope=this] The scope used for calling asynchronous functions.
         */
        initScheduler: function(options) {
            var self = this;
            options = options || {};
            options.delay = !isNaN(options.delay) ? options.delay : 0;
            options.scope = options.scope || self;

            self.scheduler = new Stimuli.core.Scheduler(options);

            var error = null;

            self.scheduler.subscribe('event', function(fn, callback) {
                fn.call(options.scope, callback);
            });

        },

        /**
         * @chainable
         * Adds an asynchronous function at the top of the queue.
         * @param {Function} fn The asynchronous function.
         * @param {Function} callback The asynchronous function callback.
         * @param {Object} options
         * @param {Number} options.delay The default delay before executing a function.
         */
        sneak: function(fn, callback, options) {
            var self = this;
            fn = fn || function(done) {done();};

            if (!self.scheduler) {
                self.initScheduler();
            }

            self.scheduler.schedule(fn, callback, options, 0);
            return self;
        },

        /**
         * @chainable
         * Adds an asynchronous function and it's callback at the bottom of the queue.
         * @param {Function} fn The asynchronous function.
         * @param {Function} callback The asynchronous function callback.
         * @param {Object} options
         * @param {Number} options.delay The default delay before executing a function.
         */
        defer: function(fn, callback, options) {
            var self = this;
            fn = fn || function(done) {done();};

            if (!self.scheduler) {
                self.initScheduler();
            }

            self.scheduler.schedule(fn, callback, options);
            return self;
        },

        /**
         * @chainable
         * Adds a function at the bottom of the queue.
         * @param {Function} callback The function.
         */

        then: function(callback) {
            return this.defer(null, callback);
        },

        /**
         * @chainable
         * Sleeps for the specified amount of time.
         * @param {Number} delay The sleeping delay in ms.
         */
        sleep: function(delay) {
            return this.defer(null, null, {delay: delay});
        },

        /**
         * Synchronizes another instance with this one.
         * @param {Object} instance.
         */
        synchronize: function(instance) {
            var self = this;
            if (!self.scheduler) {
                self.initScheduler();
            }
            instance.scheduler = this.scheduler;
        }

    };

})();

// Dependencies
Stimuli.core.Class.mix(Stimuli, Stimuli.core.Chainable);


// Source: src/core/ajax.js

/**
 * @class Stimuli.core.Ajax
 * @singleton
 * This singleton provides communications with a remote server. Requests are asynchronous, and will return immediately.
 */
(function() {
    var xhr;

    try {
        xhr = new XMLHttpRequest();
    } catch (ex) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    Stimuli.core.Ajax = {

        /**
         * Sends a HTTP GET requests to a remote server.
         * @param {String} url The remote server url.
         * @param {Function} callback The function to call when the request is complete.
         */
        get: function(url, callback) {

            if (Stimuli.core.Support.isIE8)  {
                xhr.onreadystatechange = function() {
                    if(xhr.readyState === 4){
                        xhr.onreadystatechange = null;
                        callback(this.responseText, this.status, this.statusText);
                    }
                };
            } else {
                xhr.onload = function() {
                    xhr.onload = null;
                    callback(this.responseText, this.status, this.statusText);
                };
            }


            xhr.open('get', url, true);

            xhr.send();
        }

    };

})();

// Source: src/event/emitter.js

/**
 * @class Stimuli.event.Emitter
 * @singleton
 * Provides an abstraction layer to routes events to their corresponding synthetizers.
 */
(function() {
    
    var synthetizer = Stimuli.event.synthetizer;

    Stimuli.event.Emitter = {

        /**
         * Determines if an event is a mouse event
         * @param {String} eventType The event type
         * @return {Boolean} True if it's a mouse event
         */
        isMouseEvent: function(eventType) {
            return {
                click: true,
                mousedown: true,
                mouseup: true,
                dblclick: true,
                mouseover: true,
                mousemove: true,
                mouseout: true,
                mouseleave: true,
                mouseenter: true,
                contextmenu: true
            }[eventType] || false;
        },

        /**
         * Emits the event and call the callback function
         * @param {Object} data The event configuration
         * @param {Function} callback The callback function to be called after the invent is injected.
         */
        emit: function(data, callback) {
            var result;

            if (this.isMouseEvent(data.type)) {
                result = synthetizer.Mouse.inject(data);
            }

            callback(result.event, result.canceled);
        }

    };


})();

// Source: src/event/observer.js

/**
 * @class Stimuli.event.Observer
 * This class makes a the events on a target observable, and event target could be a dom element, the browser window,
 * an ajax request etc...
 * @constructor
 * @param {Mixed} eventTarget The event target
 */

(function() {

    Stimuli.event.Observer = function(eventTarget) {

        this.eventTarget = eventTarget;

        this.listeners = {};
    };

    var Observer = Stimuli.event.Observer;

    /**
     * Attaches a listener to an event.
     * @param {String} type The event type.
     * @param {Function} listener The listener to attach.
     * @param {Object=} scope The listener execution scope.
     */
    Observer.prototype.subscribe = function(type, listener, scope) {
        var self = this;

        scope = scope || self;

        function wrappedListener() {
            listener.apply(scope, arguments);
        }

        if (Stimuli.core.Support.documentAddEventListener) {
            self.eventTarget.addEventListener(type, wrappedListener, false);
        } else {
            self.eventTarget.attachEvent('on' + type, wrappedListener);
        }

        if (!self.listeners[type]) {
            self.listeners[type] = [];
        }

        self.listeners[type].push({
            type: type,
            listener: listener,
            wrappedListener: wrappedListener
        });
    };

    /**
     * Attaches a listener to an event, but it will be called only once.
     * @param {String} type The event type.
     * @param {Function} listener The listener to attach.
     * @param {Object=} scope The listener execution scope.
     */
    Observer.prototype.once = function(type, listener, scope) {
        var self = this;

        function listenerWrap() {
            self.unsubscribe(type, listenerWrap);
            listener.apply(scope, arguments);
        }

        self.subscribe(type, listenerWrap, scope);
    };

    /**
     * Detaches a listener on a specific event.
     * @param {String} type The event type.
     * @param {Function} listener The listener to detach.
     */
    Observer.prototype.unsubscribe = function(type, listener) {
        var self = this,
            listeners = self.listeners[type],
            length = listeners.length,
            i = 0,
            wrappedListener;

        for (; i < length; i++) {
            if (listeners[i].listener === listener) {
                wrappedListener = listeners[i].wrappedListener;
                listeners.splice(i, 1);
                break;
            }
        }

        if (Stimuli.core.Support.documentAddEventListener) {
            self.eventTarget.removeEventListener(type, wrappedListener, false);
        } else {
            self.eventTarget.detachEvent('on' + type, wrappedListener);
        }
    };

    /**
     * Detaches all listeners on all observed events.
     */
    Observer.prototype.unsubscribeAll = function() {
        var self = this,
            type,
            listeners;

        for (type in self.listeners) {
            if (self.listeners.hasOwnProperty(type)) {
                listeners = self.listeners[type];
                while (listeners[0]) {
                    self.unsubscribe(type, listeners[0].listener);
                }
            }
        }

    };

})();

// Source: src/event/synthetizer/mouse.js

/**
 * @class Stimuli.event.synthetizer.Mouse
 * @singleton
 * Abstraction layer for cross-browsers synthetic mouse events injection. 
 */
(function() {

    var forceEventProperty = function(event, property, val) {
        var value = val;
        Object.defineProperty(event, property, {
            get: function() {
                return value;
            },
            set: function(v) {
                value = v;
            }
        });
    };

    Stimuli.event.synthetizer.Mouse = {
 
        /**
         * Injects an a synthetic mouse event into the dom.
         * @param {Object} eventConfig The mouse event configuration
         */

        inject: function(eventConfig) {
            var event,
                canceled;

            if (Stimuli.core.Support.documentCreateEvent) { // IE9+, Safari, PhantomJS, Firefox, Chrome
                
                event = eventConfig.view.document.createEvent('MouseEvents');

                event.initMouseEvent(
                    eventConfig.type,
                    eventConfig.bubbles,
                    eventConfig.cancelable,
                    eventConfig.view,
                    eventConfig.detail,
                    eventConfig.screenX,
                    eventConfig.screenY,
                    eventConfig.clientX,
                    eventConfig.clientY,
                    eventConfig.ctrlKey,
                    eventConfig.altKey,
                    eventConfig.shiftKey,
                    eventConfig.metaKey,
                    eventConfig.button,
                    eventConfig.relatedTarget || null //IE 9 throw and "Invalid Argument" Error if this property is undefined so just in case
                );

                canceled = !eventConfig.target.dispatchEvent(event);
            
            } else { //IE8
                
                var eventName = 'on' + eventConfig.type;

                // Regardless of their values specified in the event object,
                // cancelBubble is automatically initialized by fireEvent. 
                // (see http://msdn.microsoft.com/en-us/library/ie/ms536423(v=vs.85).aspx)
                // So to bypass this limitation we create a listener which will be binded expando style,
                // this way it will be fired before any other listener and the cancelBubble can be fixed.
            
                var currentListener = eventConfig.target[eventName];

                eventConfig.target[eventName] = function() {
                    var e = eventConfig.view.event;

                    e.cancelBubble = !eventConfig.bubbles;

                    // A possible hack to force an event to not be cancelable
                    // we could set the returnValue to readonly...
                    // But don't think it's a good idea to do that. 
                    // Leaving this commented code for now.
                    // if (!eventConfig.cancelable) {
                    //     Object.defineProperty( e, 'returnValue', {
                    //         get: function () {
                    //             return undefined;
                    //         }
                    //     });
                    // }

                    if (currentListener) {
                        currentListener.apply(this);
                    } else {
                        eventConfig.target[eventName] = null;
                    }
                };
    
                event = eventConfig.view.document.createEventObject();
                event.detail = eventConfig.detail;
                event.screenX = eventConfig.screenX;
                event.screenY = eventConfig.screenY;
                event.clientX = eventConfig.clientX;
                event.clientY = eventConfig.clientY;
                event.ctrlKey = eventConfig.ctrlKey;
                event.altKey = eventConfig.altKey;
                event.shiftKey = eventConfig.shiftKey;
                event.metaKey = eventConfig.metaKey;
                event.button = eventConfig.button;

                // TODO: the real event flow should be investigated
                // see http://www.quirksmode.org/js/events_mouse.html#relatedtarget
                if (eventConfig.relatedTarget) {
                    if (eventName === 'onmouseover') {
                        event.fromElement = eventConfig.relatedTarget;
                        event.toElement = eventConfig.target;
                    }

                    if (eventName === 'onmouseout') {
                        event.fromElement = eventConfig.target;
                        event.toElement = eventConfig.relatedTarget;
                    }

                }

                eventConfig.target.fireEvent(eventName, event);
                canceled = event.returnValue === false;
            }
            
            return {
                event: event,
                canceled: canceled
            };
        }
    };

})();


// Source: src/shared/recorder.js

/**
 * @class Stimuli.shared.Recorder
 * @mixins Stimuli.core.Chainable
 * This class provides a pretty convenient way to record and replay stimuli flows.
 * @constructor
 */
(function() {

    Stimuli.shared.Recorder = function() {
        var self = this;
        self.savedSessions = {};
        self.openedSessions = {};
        self.initialized = false;
    };

    var Recorder = Stimuli.shared.Recorder;

    Stimuli.core.Class.mix(Recorder, Stimuli.core.Chainable);

    /**
     * Initializes scheduler observation.
     */
    Recorder.prototype.init = function() {
        var self = this;

        self.scheduler.subscribe('event', function(fn, callback, options) {
            if (!options.recorder) {
                var sessions = this.openedSessions,
                    name;

                for (name in sessions) {
                    if (sessions.hasOwnProperty(name) && sessions[name]) {
                        sessions[name].push({
                            fn: fn,
                            callback: callback,
                            options: options
                        });
                    }
                }
            }

        }, self, true);

        self.initialized = true;
    };

    /**
     * @chainable
     * Starts recording stimuli.
     * @param {String} name The name referencing the session to record.
     */
    Recorder.prototype.start = function(name) {
        var self = this;
        if (!self.initialized) {
            self.init();
        }
        return self.defer(null, function() {
            self.openedSessions[name] = [];
        }, {recorder: true});
    };

    /**
     * @chainable
     * Stops recording stimuli.
     * @param {String} name The name referencing the currently recording session.
     */
    Recorder.prototype.stop = function(name) {
        var self = this;
        return self.defer(null, function() {
            self.savedSessions[name] = self.openedSessions[name];
            delete self.openedSessions[name];
        }, {recorder: true});
    };

    /**
     * @chainable
     * Replays a previously recorded stimuli sequence.
     * @param {String} name The name referencing the recorded session.
     * @param {Number=} [times=1] The number of type to replay the recorded sessions.
     */
    Recorder.prototype.replay = function(name, times) {
        var self = this;

        return self.defer(null, function() {
            var sessions = self.savedSessions[name],
                length = sessions.length,
                i,
                session;

            times = times || 1;

            while(times--) {
                for (i = length - 1; i >= 0; i--) {
                    session = sessions[i];
                    self.sneak(session.fn, session.callback, session.options);
                }
            }
        }, {recorder: true});
    };

})();

// Source: src/shared/viewport.js

/**
 * @class Stimuli.shared.Viewport
 * A viewport abstraction layer to be used by virtual devices.
 * @cfg {Window=} view A window object 
 * @constructor
 * @param {Stimuli.shared.Context} context The current browser context this viewport depends on.
 */

(function() {

    Stimuli.shared.Viewport = function(context) {

        this.context = context || null;

    };

    var Viewport = Stimuli.shared.Viewport;

    /**
     * Returns the x coordinate of the window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenX = function() {
        var win = this.context.getWindow();
        return win.screenX || win.screenLeft;
    };

    /**
     * Returns the y coordinate of window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenY = function() {
        var win = this.context.getWindow();
        return win.screenY || win.screenTop;
    };

    /**
     * Returns a visible element at the specified coordinates.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {HTMLElement}
     */
    Viewport.prototype.getVisibleElementAt = function(x, y) {
        var context = this.context.getWindow(),
            doc = context.document;

        if (x < 0 || y < 0) {
            return null;
        }

        var ret = doc.elementFromPoint(x, y);


        // IE8 hack: Inside an iframe ie8 doesn't repaint properly inside an iframe, so before calling elementFromPoint
        // we trigger a reflow to force the layout to be recalculated
        // (Note: that was a tricky one it's 4:39AM)
        // see http://stackoverflow.com/questions/4444014/blank-iframe-in-ie
        if (Stimuli.core.Support.isIE8 &&
            ret === null &&
            context.parent !== context) { // iframe check
            doc.body.getBoundingClientRect();
            ret = doc.elementFromPoint(x, y);
        }

        return ret;
    };

    /**
     * Returns the current window.
     * @return {Window}
     */
    Viewport.prototype.getWindow = function() {
        return this.context.getWindow();
    };

    /**
     * Returns the current document.
     * @return {Object}
     */
    Viewport.prototype.getDocument = function() {
        return this.context.getWindow().document;
    };

    /**
     * Updates window hash.
     * @param {String} hash The new hash.
     */
    Viewport.prototype.updateHash = function(hash) {
        this.context.getWindow().location.hash = hash;
    };

    /**
     * Updates the current window url.
     * @param {String} url The new url.
     */
    Viewport.prototype.updateUrl = function(url) {
        this.context.getWindow().location = url;
    };

    /**
     * Waits for the viewport to be ready, it allows to block while a stimulus caused
     * a navigation to another page.
     * @param {Function} callback The function to call when the viewport is ready.
     */
    Viewport.prototype.waitForReady = function(callback) {
        this.context.waitForReady(callback);
    };


    /**
     * Returns the first {HTMLElement} matching the css selector.
     * @param {string} selector The css selector (see http://sizzlejs.com/)
     * @param {Boolean=} all If set to True all elements matching the css selector will be returned in an {Array}. 
     * @return {Mixed}
     */
    Viewport.prototype.$ = function(selector, all) {
        var elements = Sizzle(selector, this.context.getWindow().document);
        if (all) {
            return elements;
        } else {
            return elements[0];
        }
    };

    
})();

// Source: src/shared/context.js

/**
 * @class Stimuli.shared.Context
 * @mixins Stimuli.core.Observable
 * This class provides an abstraction layer to manage a {Stimuli.virtual.Browser} execution contexts.
 */
(function() {

    Stimuli.shared.Context = function() {
        this.win = null;
        this.loading = false;
    };

    var Context = Stimuli.shared.Context;

    Stimuli.core.Class.mix(Context, Stimuli.core.Observable);

    /**
     * Sets a new context.
     * @param {Window} win The window object used as a context.
     */
    Context.prototype.setNew = function(win) {
        var self = this;
        // TODO: (yhwh) reroute onerror, alert to current window etc...
        self.win = win;
        self.loading = false;
        self.publish('new');
    };

    /**
     * Returns the current browser window.
     * @return {Window} The current window.
     */
    Context.prototype.getWindow = function() {
        return this.win;
    };

    /**
     * Sets the context in a loading state.
     */
    Context.prototype.setLoading = function() {
        var self = this;
        self.loading = true;
        self.win = null;
        self.publish('loading');
    };

    /**
     * Waits for the context to be ready (generally used after a navigation change).
     * @param {Function} callback The function to call when the context is ready.
     */
    Context.prototype.waitForReady = function(callback) {
        var self = this;

        // since there is no beforeunload on IOS, the only method i found to wait enough to check if a navigation is
        // occuring in the stimuli window is to create an iframe wait for it to be loaded (it will always fire after
        // the stimuli iframe unload).
        if (Stimuli.core.Support.isIOS) {

            var doc = window.document,
                iframe = doc.createElement('iframe');

            iframe.src = Stimuli.blankPage || '/';

            iframe.style.display = 'none';

            iframe.onload = function() {
                iframe.onload = null;
                doc.body.removeChild(iframe);

                var waitForLoad = function() {

                    if (self.loading === false) {
                        callback();
                    } else {
                        setTimeout(waitForLoad, 1);
                    }
                };

                setTimeout(waitForLoad, 1);
            };

            doc.body.appendChild(iframe);

        // And now the "classic" navigation detection ^^
        } else {
            var tmp = [],
                waitForLoad = function () {

                    tmp.push(self.loading);
                    // some browsers kicks the beforeunload right away, others do it on the next tick (setTimeout, 1)
                    // so we need to be sure to have at least two consecutives loading === false before returning.
                    if (tmp.length < 2 ||
                        (tmp[tmp.length - 1] || tmp[tmp.length -2])) {
                        setTimeout(waitForLoad, 1);
                        return;
                    }
                    tmp = null;
                    callback();
                };

            waitForLoad();
        }

    };


    /**
     * Destroys the current context.
     */
    Context.prototype.destroy = function() {
        this.win = null;
    };

})();

// Source: src/shared/command.js

/**
 * @class Stimuli.shared.Command
 * @mixins Stimuli.core.Chainable
 * Command device implementation.
 * @constructor
 * @param {Stimuli.shared.Viewport} viewport The viewport to which is the device attached.
 * @param {Object} options The device options if any.
 */
(function() {
    
    Stimuli.shared.Command = function(viewport, args) {
        var self = this;
        self.args = args;
        self.viewport = viewport;
    };

    var Command = Stimuli.shared.Command;

    Stimuli.core.Class.mix(Command, Stimuli.core.Chainable);

    Command.prototype.configure = Command.prototype.then;

    /**
     * @chainable
     * Injects the configured event into the dom.
     * @param {Function} generateEventConfig The event configuration to generate.
     * @param {Number=} delay The delay before in injection in ms
     */
    Command.prototype.inject = function(generateEventConfig, delay) {
        var self = this,
            callback = function(event, canceled) {
                if (!self.events) {
                    self.events = [];
                }
                self.events.push({
                    src: event,
                    canceled: canceled
                });
            },
            options;

        if (!isNaN(delay)) {
            options = {delay: delay};
        }

        return self.defer(function(next) {
            var eventConfig = generateEventConfig();
            eventConfig.view = self.viewport.getWindow();
            Stimuli.event.Emitter.emit(eventConfig, next);
        }, callback, options);

    };

})();

// Source: src/virtual/browser.js

/**
 * @class Stimuli.virtual.Browser
 * @mixins Stimuli.core.Chainable
 * A virtual browser implementation.
 * @constructor
 * @param {Stimuli.shared.Context} context The browser context.
 * @param {Object=} options
 * @param {Number/String} options.width The iframe width in px (Number) or in % (String)
 * @param {Number/String} options.height The iframe height in px (Number) or in % (String)
 */
(function() {
    
    Stimuli.virtual.Browser = function(context, options) {
        var self = this;

        self.context = context;

        self.options = options || {};

        self.iframe = self.options.iframe || new Stimuli.browser.Iframe(context, self.options);

        self.history = self.options.history || new Stimuli.browser.History(context);

    };

    var Browser = Stimuli.virtual.Browser;

    Stimuli.core.Class.mix(Browser, Stimuli.core.Chainable);

    /**
     * @chainable
     * Navigates to the specified url.
     * @param {String} url The page url to load.
     */
    Browser.prototype.navigateTo = function(url) {
        var self = this;

        return self.then(function(done) {
            self.iframe.load(url, done);
        });

    };

    /**
     * @chainable
     * Goes back to the previously visited page.
     */
    Browser.prototype.back = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(-1, done);
        });
    };

    /**
     * @chainable
     * Goes forward a page, if you have gone back first.
     */
    Browser.prototype.forward = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(1, done);
        });
    };

    /**
     * @chainable
     * Reloads current page.
     */
    Browser.prototype.reload = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(0, done);
        });
    };

    /**
     * @chainable
     * Destroys the virtual browser.
     */
    Browser.prototype.destroy = function(callback) {
        var self = this;
        return self.defer(function(done) {

            var history = self.history;
            if (history) {
                history.destroy();
            }

            var iframe = self.iframe;
            if (iframe) {
                iframe.destroy(done);
            }
        }, callback);
    };

})();

// Source: src/browser/iframe.js

/**
 * @class Stimuli.browser.Iframe
 * @mixins Stimuli.core.Chainable
 * This class wraps an iframe element for the {Stimuli.virtual.Browser}.
 * @constructor
 * @param {Stimuli.shared.Context} The browser context.
 * @param {Object=} options
 * @param {Number/String} options.width The iframe width in px (Number) or in % (String)
 * @param {Number/String} options.height The iframe height in px (Number) or in % (String)
 */
(function() {
    
    Stimuli.browser.Iframe = function(context, options) {
        var self = this;
        self.options = options || {};
        self.context = context;
    };

    var Iframe = Stimuli.browser.Iframe;

    Stimuli.core.Class.mix(Iframe, Stimuli.core.Chainable);

    /**
     * Initializes the iframe element.
     */
    Iframe.prototype.initIframe = function() {
        var self = this,
            wrap = self.getRootDocument().createElement('div'),
            iframe = self.getRootDocument().createElement('iframe'),
            options = self.options,
            wstyle = wrap.style,
            istyle = iframe.style;

        wstyle.position = 'absolute';
        wstyle.top = 0;
        wstyle.left = 0;
        wstyle.border = 0;
        wstyle.margin = 0;
        wstyle.padding = 0;
        wstyle.width =  options.width ? options.width + 'px' : '100%';
        wstyle.height =  options.height ? options.height + 'px' : '100%';

        istyle.position = 'relative';
        istyle.width = '100%';
        istyle.height = '100%';
        istyle.border = 0;
        istyle.margin = 0;
        istyle.padding = 0;
        iframe.frameBorder = 0;

        // ie8 hack: iframe src must be set see http://aspnetresources.com/blog/always_set_iframe_source
        if (Stimuli.core.Support.isIE8) {
            iframe.src = 'about:blank';
        }

        self.iframeEl = iframe;
        self.iframeObserver = new Stimuli.event.Observer(self.iframeEl);
        self.iframeObserver.subscribe('load', self.onIframeLoad, self);

        self.wrapEl = self.getRootDocument().body.appendChild(wrap);

        wrap.appendChild(iframe);

    };

    Iframe.prototype.onIframeLoad = function() {
        var self = this,
            win = self.iframeEl.contentWindow;

            // by default ie and firefox fires load on about:blank so we skip this window to keep consistenty with other
            // browsers
            if ((win.location + '') !== 'about:blank') {
                // IE hack: onload event is not extremely reliable so we need to do an additional check here to ensure
                // the document is truly ready.
                var checkDocReadyState = function() {
                    var doc, readyTest;
                    try {
                        doc = win.document;
                        readyTest = doc && doc.body && doc.readyState === 'complete';
                    } catch(e) {}
                    if (readyTest) {
                        // IE10 hack: forcing iframe reflow, because the iframe could be loaded but not yet painted !
                        if (Stimuli.core.Support.isIE10) {
                            self.iframeEl.getBoundingClientRect();
                        }
                        var winObserver = new Stimuli.event.Observer(win),
                            onNavigate = function() {
                                winObserver.unsubscribeAll();
                                self.context.setLoading();
                                winObserver = null;
                            };

                        // there is no beforeunload event on IOS (see the Context waitForReady method)
                        if (Stimuli.core.Support.isIOS) {
                            winObserver.once('unload', onNavigate);
                        }

                        winObserver.once('beforeunload', onNavigate);



                        self.context.setNew(win);

                    } else {
                        setTimeout(checkDocReadyState, 20);
                    }
                };

                // Let's clear the call stack to prevent errors to be thrown in the top most window context.
                setTimeout(checkDocReadyState, 1);
            }
    };
    /**
     * Returns the root window.
     */
    Iframe.prototype.getRootWindow = function() {
        var win = window;

        while(win.parent && win.parent !== win) {
            win = win.parent;
        }

        return win;
    };

    /**
     * Returns the root document to avoid iframe nesting as much as possible, which can cause repaint issues with IE.
     */
    Iframe.prototype.getRootDocument = function() {
        return this.getRootWindow().document;
    };

    /**
     * @chainable
     * Loads the page at the specified url
     * @param {String} url The page url.
     * @param {Function} callback The function to call when the page is fully loaded.
     */
    Iframe.prototype.load = function(url, callback) {
        var self = this;

        if (!self.iframeEl) {
            self.initIframe();
        }
        return self.defer(function(done) {
            Stimuli.core.Ajax.get(url, function(response, status, statusText) {

                if (status !== 200) {
                    throw new Error('Stimuli.browser.Iframe: Failed to load url (' + status + ' ' + statusText +')');
                }

                self.context.once('new', done);

                self.iframeEl.src = url;

            });

        }, callback);

    };

    /**
     * @chainable
     * Destroys the iframe from the dom and remove all the attached listeners.
     * @param {Function} callback The callback function.
     */
    Iframe.prototype.destroy = function(callback) {
        var self = this;

        return self.defer(function(done) {
            if (self.iframeObserver) {
                self.iframeObserver.unsubscribeAll();
            }

            if (self.iframeEl) {
                self.iframeEl.parentNode.removeChild(self.iframeEl);
                self.iframeEl = null;
            }

            if (self.wrapEl) {
                self.wrapEl.parentNode.removeChild(self.wrapEl);
                self.wrapEl = null;
            }

            self.context.destroy();
            done();
        }, callback);
    };

})();

// Source: src/browser/history.js

/**
 * @class Stimuli.browser.History
 * @mixins Stimuli.core.Chainable
 * This class provides an abstraction layer to handle {Stimuli.virtual.Browser} History.
 * @constructor
 * @param {Stimuli.shared.Context} The browser context.
 */
(function() {

    Stimuli.browser.History = function(context) {
        var self = this;
        self.backwardPagesList = [];
        self.forwardPagesList = [];
        self.context = context;
        self.context.subscribe('new', self.updateBackwardPagesList, self, true);
    };

    var History = Stimuli.browser.History;

    Stimuli.core.Class.mix(History, Stimuli.core.Chainable);

    /**
     * Called each time the context is updated to update the backward pages list.
     */
    History.prototype.updateBackwardPagesList = function() {
        this.backwardPagesList.push(this.context.getWindow().location + '');
    };

    /**
     * @chainable
     * Navigates to a specified index in history (0 reload, -n backward, +n forward).
     * @param {Number} index The history index.
     * @param {Function} callback The function to call after the navigation has occured (block until page is fully
     * loaded).
     */
    History.prototype.go = function(index, callback) {
        var self = this;

        return self.defer(function(done) {
            var url;
            if (index < 0) { // back
                url = self.backwardPagesList[self.backwardPagesList.length + index - 1]; // -1 to remove current url
                if (!url) {
                    throw new Error('Stimuli.browser.History: Can\'t go back.');
                }
                while(0 > index++) {
                    self.forwardPagesList.push(self.backwardPagesList.pop());
                }
            } else if (index > 0) { // forward
                url = self.forwardPagesList[self.forwardPagesList.length - index];
                if (!url) {
                    throw new Error('Stimuli.browser.History: Can\'t go forward.');
                }
                while(0 < index--) {
                    self.backwardPagesList.push(self.forwardPagesList.pop());
                }

            } else {
                url = self.context.getWindow().location.href;
            }
            self.context.unsubscribe('new', self.updateBackwardPagesList);

            // the global history.go doesn't work on firefox inside an iframe
            self.context.getWindow().location = url;

            self.context.waitForReady(function() {
                self.context.subscribe('new', self.updateBackwardPagesList, self);
                done();
            });
        }, callback);

    };

    /**
     * @chainable
     * Destroys the saved history.
     * @param {Function} callback The function to call after history is destroyed.
     */
    History.prototype.destroy = function(callback) {
        var self = this;

        return self.defer(function(done) {
            self.backwardPagesList = [];
            self.forwardPagesList = [];
            done();
        }, callback);

    };

})();

// Source: src/virtual/mouse.js

/**
 * @class Stimuli.virtual.Mouse
 * @alternateClassName Stimuli.Mouse
 * @mixins Stimuli.core.Chainable
 * The virtual mouse interface.
 * @cfg {Stimuli.virtual.Browser} browser The browser to which the mouse is attached to.
 * @constructor
 * @param {Object} The config object
 */

(function() {

    Stimuli.virtual.Mouse = function(viewport) {
        this.viewport = viewport;
    };
    
    var Mouse = Stimuli.virtual.Mouse;

    Stimuli.core.Class.mix(Mouse, Stimuli.core.Chainable);

    /**
     * Executes a simple click.
     */
    Mouse.prototype.click = function() {
        return this.then(this.generateCommand('Click', arguments));
    };

    /**
     * Executes a double click.
     */
    Mouse.prototype.dblclick = function() {
        return this.then(this.generateCommand('DblClick', arguments));
    };

    /**
     * Executes a right click.
     */
    Mouse.prototype.contextmenu = function() {
        return this.then(this.generateCommand('ContextMenu', arguments));
    };

    /**
     * Presses a mouse button.
     */
    Mouse.prototype.down = function() {
        return this.then(this.generateCommand('Down', arguments));
    };

    /**
     * Releases a mouse button.
     */
    Mouse.prototype.up = function() {
        return this.then(this.generateCommand('Up', arguments));
    };

    /**
     * Abstract method to generate the corresponding mouse command.
     * @param {String} commandName The command name
     * @param options
     * @returns {Function}
     */
    Mouse.prototype.generateCommand = function(commandName, args) {
        var self = this;
        return function(done) {
            var command = new Stimuli.mouse[commandName](self.viewport, args);
            command.execute(done);
        };
    };

})();

// Source: src/mouse/helper.js

(function() {

    Stimuli.mouse.Helper = {

        parseOptions: function() {
            var self = this,
                args = self.args;
            self.options = {};
            if (typeof args[0] === 'string') {
                self.options.target = args[0];
            } else {
                var i = 0,
                    length = args.length,
                    prop, arg;

                for (i = 0; i < length; i++) {
                    Stimuli.core.Object.merge(self.options, args[i]);
                }
            }
        },

        getTarget: function() {
            var viewport = this.viewport,
                target = this.options.target;

            if (target) {
                if (typeof target === 'function') {
                    return target() || null;
                } else if (typeof target === 'string') {
                    return viewport.$(target) || null;
                } else if (target.nodeType === 1) { // is an HTMLElement ?
                    return target || null;
                } else if (!isNaN(target.x) && !isNaN(target.y)) {
                    return viewport.getVisibleElementAt(target.x, target.y);
                }
            }

            return null;
        },

        handleClick: function(element) {
            var searchForm = false,
                win = this.viewport.getWindow(),
                tagName = null,
                action = null,
                href = null,
                hash = null,
                form = null,
                type = null;

            while(element !== win.document.body) {
                href = element.getAttribute('href');
                tagName = element.tagName.toLowerCase();
                type = element.getAttribute('type');
                action = element.getAttribute('action');
                if (searchForm && tagName === 'form' && action) {
                    form = element;
                    break;
                }
                if (href) {
                    hash = href.split('#')[1];
                    break;
                }
                if (tagName === 'input' && type === 'submit') {
                    searchForm = true;
                }
                element = element.parentNode;
            }

            if (href || hash || form) {
                // click doesn't fire on the window in ie8 but on the document.
                var isIE8 = Stimuli.core.Support.isIE8,
                    isIE9 = Stimuli.core.Support.isIE9,
                    isIE10 = Stimuli.core.Support.isIE10,
                    observer = new Stimuli.event.Observer(isIE8 ? win.document : win);

                observer.subscribe('click', function(e) {
                    observer.unsubscribeAll();
                    var canceled = isIE8 ? e.returnValue === false : e.defaultPrevented;

                    if (!canceled) {
                        if (hash) {
                            win.location.hash = hash;
                        } else if (href) {
                            if (!isIE8 && !isIE9 && !isIE10) {
                                win.location.href = href;
                            } else {
                                // ie8-10 don't handle relative href passed to window.location let's forge it
                                var match = win.location.href.match(/[^\/]*$/),
                                    prefix = '';
                                if (!/:\/\//.test(href)) {
                                    prefix =  win.location.href;
                                }
                                if (match) {
                                    prefix = prefix.replace(match[0], '');
                                }

                                win.location.href = prefix + href;
                            }
                        } else if (form) {
                            form.submit();
                        }

                        if (!isIE8) { // ie8 does not trigger automatically a link load
                            e.preventDefault();
                        }  else {
                            e.returnValue = false;
                        }
                    }
                });
            }
        },

        getButton: function() {
                
            var isIE8 = Stimuli.core.Support.isIE8,
                buttonsMap = {
                left: isIE8 ? 0 : 1,
                middle: isIE8 ? 1 : 4,
                right: 2,
                none: undefined
            };

            return buttonsMap[this.options.button || 'left']; // Default left button

        },

        isElementVisibleAt: function(element, x, y) {
            return this.viewport.getVisibleElementAt(x, y) === element;
        },

        calculateViewportCoordinates: function(element, offset) {
            var viewport = this.viewport,
                coordinates, boundingRectangle, origin, right, left, top, bottom, x, y;

            offset = offset || {};

            boundingRectangle = element.getBoundingClientRect();
            right = boundingRectangle.right;
            left = boundingRectangle.left;
            top = boundingRectangle.top;
            bottom = boundingRectangle.bottom;

            // the x offset was a percentage
            if (typeof offset.x === 'string') {
                offset.x = Math.round((right - left - 1) * (parseInt(offset.x, 10)/100));

            }
            // the y offset was a percentage
            if (typeof offset.y === 'string') {
                offset.y = Math.round((bottom - top - 1)  * (parseInt(offset.y, 10)/100));
                
            }

            // tries to find a correct x offset if it wasn't specified
            if (isNaN(offset.x)) {
                for (x = left; x < right && isNaN(offset.x); x++) {
                    for (y = top; y < bottom && isNaN(offset.x); y++) {
                        if (viewport.getVisibleElementAt(x, y)) {
                            offset.x = x - left;
                            offset.y = offset.y || (y - top);
                        }
                    }
                }
            }

            // tries to find a valid y offset if it wasn't specified
            if (isNaN(offset.y)) {
                for (y = top; y < bottom && isNaN(offset.y); y++) {
                    for (x = left; x < right && isNaN(offset.y); x++) {
                        if (viewport.getVisibleElementAt(x, y)) {
                            offset.y = y - top;
                        }
                    }
                }
            }

            // translates origin of offset coordinates to the top left corner
            if (offset.origin) {
                switch(offset.origin) {
                    case 'bl':
                        offset = {
                            x: offset.x,
                            y: (bottom - top - 1) + offset.y
                        };
                        break;
                    case 'tr':
                        offset = {
                            x: (right - left - 1) + offset.x,
                            y: offset.y
                        };
                        break;
                    case 'br':
                        offset = {
                            x: (right - left - 1) + offset.x,
                            y: (bottom - top - 1) + offset.y
                        };
                        break;
                }
            }
            
            coordinates = {
                clientX: left + offset.x,
                clientY: top + offset.y,
            };

            coordinates.screenX = viewport.getScreenX() + coordinates.clientX;
            coordinates.screenY = viewport.getScreenY() + coordinates.clientY;

            // the coordinates is outside the targeted element
            if (viewport.getVisibleElementAt(coordinates.clientX, coordinates.clientY) !== element) {
                return null;
            }

            return coordinates;

        }
        
    };

    Stimuli.core.Object.merge(Stimuli.mouse.Helper, Stimuli.core.Chainable);
})();


// Source: src/mouse/click.js

(function() {

    Stimuli.mouse.Click = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var Click = Stimuli.mouse.Click;

    Stimuli.core.Class.mix(Click, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Click, Stimuli.mouse.Helper);

    Click.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            defaultConf,
            target, position;

        return self

        .configure(function() {

            self.options.button = 'left';

            target = self.getTarget();

            if (target === null) {
                throw new Error('Stimuli.mouse.click: invalid target.');
            }

            position = self.calculateViewportCoordinates(target, self.options);

            if (position === null) {
                throw new Error('Stimuli.mouse.click: invalid position.');
            }

            defaultConf = {
                button: self.getButton(),
                bubbles: true,
                cancelable: true,
                altKey: self.options.alt,
                ctrlKey: self.options.ctrl,
                shiftKey: self.options.shift,
                metaKey: self.options.meta,
                target: target,
                details: 1,
                clientX: position.clientX,
                clientY: position.clientY,
                screenX: position.screenX,
                screenY: position.screenY
            };

        })

        .inject(function() {

            return Obj.merge({type: 'mousedown'}, defaultConf);

         })

        .then(function() {
            if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                throw 'Stimuli.mouse.click: target disappeared on mousedown.';
            }
        })

        .inject(function() {

            return Obj.merge({type: 'mouseup'}, defaultConf);

        }, 100)

        .then(function() {
            if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                throw 'Stimuli.mouse.click: target disappeared on mouseup.';
            }
            self.handleClick(target);
        })

        .inject(function() {

            return Obj.merge({type: 'click'}, defaultConf);

        }, 1)

        .then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();

// Source: src/mouse/context_menu.js

(function() {

    Stimuli.mouse.ContextMenu = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var ContextMenu = Stimuli.mouse.ContextMenu;

    Stimuli.core.Class.mix(ContextMenu, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(ContextMenu, Stimuli.mouse.Helper);

    ContextMenu.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            defaultConf,
            target, position;

        return self

            .configure(function() {

                self.options.button = 'right';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.contextmenu: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.contextmenu: invalid position.');
                }

                defaultConf = {
                    button: self.getButton(),
                    bubbles: true,
                    cancelable: true,
                    altKey: self.options.alt,
                    ctrlKey: self.options.ctrl,
                    shiftKey: self.options.shift,
                    metaKey: self.options.meta,
                    target: target,
                    details: 1,
                    clientX: position.clientX,
                    clientY: position.clientY,
                    screenX: position.screenX,
                    screenY: position.screenY
                };

            })

            .inject(function() {

                return Obj.merge({type: 'mousedown'}, defaultConf);

            })

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.contextmenu: target disappeared on mousedown.';
                }
            })

            .inject(function() {

                return Obj.merge({type: 'mouseup'}, defaultConf);

            }, 100)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.contextmenu: target disappeared on mouseup.';
                }
            })

            .inject(function() {

                return Obj.merge({type: 'contextmenu'}, defaultConf);

            }, 1)

            .then(function() {
                self.viewport.waitForReady(done);
            });

    };

})();

// Source: src/mouse/dblclick.js

(function() {

    Stimuli.mouse.DblClick = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var DblClick = Stimuli.mouse.DblClick;

    Stimuli.core.Class.mix(DblClick, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(DblClick, Stimuli.mouse.Helper);

    DblClick.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            defaultConf,
            target, position;

        return self

            .configure(function() {

                self.options.button = 'left';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.dblclick: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.dblclick: invalid position.');
                }

                defaultConf = {
                    button: self.getButton(),
                    bubbles: true,
                    cancelable: true,
                    altKey: self.options.alt,
                    ctrlKey: self.options.ctrl,
                    shiftKey: self.options.shift,
                    metaKey: self.options.meta,
                    target: target,
                    clientX: position.clientX,
                    clientY: position.clientY,
                    screenX: position.screenX,
                    screenY: position.screenY
                };

            })

            .inject(function() {

                return Obj.merge({
                    type: 'mousedown',
                    detail: 1
                }, defaultConf);

            })

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mousedown.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'mouseup',
                    detail: 1
                }, defaultConf);

            }, 100)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mouseup.';
                }

                self.handleClick(target);

            })

            .inject(function() {

                return Obj.merge({
                    type: 'click',
                    detail: 1
                }, defaultConf);

            }, 1)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on click.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'mousedown',
                    detail: 2
                }, defaultConf);

            })

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mousedown.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'mouseup',
                    detail: 2
                }, defaultConf);

            }, 100)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mouseup.';
                }

                self.handleClick(target);

            })

            .inject(function() {

                return Obj.merge({
                    type: 'click',
                    detail: 2
                }, defaultConf);

            }, 1)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on click.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'dblclick',
                    detail: 2
                }, defaultConf);

            }, 1)

            .then(function() {
                self.viewport.waitForReady(done);
            });

    };
})();

// Source: src/mouse/up.js

(function() {

    Stimuli.mouse.Up = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var Up = Stimuli.mouse.Up;

    Stimuli.core.Class.mix(Up, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Up, Stimuli.mouse.Helper);

    Up.prototype.execute = function(done) {

        var self = this,
            target, position;

        return self

            .configure(function() {

                self.options.button = self.options.button || 'left';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.up: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.up: invalid position.');
                }

            })

            .inject(function() {

                return {
                    type: 'mouseup',
                    button: self.getButton(),
                    bubbles: true,
                    cancelable: true,
                    altKey: self.options.alt,
                    ctrlKey: self.options.ctrl,
                    shiftKey: self.options.shift,
                    metaKey: self.options.meta,
                    target: target,
                    details: 1,
                    clientX: position.clientX,
                    clientY: position.clientY,
                    screenX: position.screenX,
                    screenY: position.screenY
                };

            })

            .then(function() {
                self.viewport.waitForReady(done);
            });

    };

})();

// Source: src/mouse/down.js

(function() {

    Stimuli.mouse.Down = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var Down = Stimuli.mouse.Down;

    Stimuli.core.Class.mix(Down, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Down, Stimuli.mouse.Helper);

    Down.prototype.execute = function(done) {

        var self = this,
            target, position;

        return self

            .configure(function() {

                self.options.button = self.options.button || 'left';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.down: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.down: invalid position.');
                }

            })

            .inject(function() {

                return {
                    type: 'mousedown',
                    button: self.getButton(),
                    bubbles: true,
                    cancelable: true,
                    altKey: self.options.alt,
                    ctrlKey: self.options.ctrl,
                    shiftKey: self.options.shift,
                    metaKey: self.options.meta,
                    target: target,
                    details: 1,
                    clientX: position.clientX,
                    clientY: position.clientY,
                    screenX: position.screenX,
                    screenY: position.screenY
                };

            })

            .then(function() {
                self.viewport.waitForReady(done);
            });

    };

})();