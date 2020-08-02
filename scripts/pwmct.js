/*
 * pwmct.js                             // person woman man camera tv
 *
 * Define two functions: onLoad() and show(message, id).
 * - onLoad() collects anchor and image information, shuffles it, and rewrites
 *   it so there will be a different 'acuity' test each time.
 * - show(message, id) sets the innerHTML of element matching id to message.
 */

/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) 
 * Shuffle. See https://github.com/coolaj86/knuth-shuffle.
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* Collect elements of selector that match <article id= children as follows:
 *  <a href=
 *  <a title=
 *  <img src=
 *  <img alt=
 * ...then shuffle them and rewrite them in order of article ids.
 *
 * The format of an example article question is:
    <article id="whatever-it-is">
      <div>
        <!-- div contains multiple choices... -->
      </div>
      <a href="./doc/pwmct.pdf" title="PERSON WOMAN MAN CAMERA TV">
        <img src="./images/wtf.png" alt="WTF?!">
      </a>
    </article>
 */
function onLoad() {
    let article = 'article', ids = new Array(), questions = new Array();

    /* Collect id and then information from children of article. */
    for (let node of document.querySelectorAll(article)) {
        if (!node.id) continue;         // article must have id
        ids.push(node.id);              // save article ids in order
        let question = new Object();    // create new question object
        question.id = node.id;
        /* Get <a href= for question.id. */
        selector = `#${node.id} a`;
        if (document.querySelector(selector))
            question.href = document.querySelector(selector).href;
        /* Get <a title= for question.id. */
        selector = `#${node.id} a`;
        if (document.querySelector(selector))
            question.title = document.querySelector(selector).title;
        /* Get <img src= for question.id. */
        selector = `#${node.id} img`;
        if (document.querySelector(selector))
            question.src = document.querySelector(selector).src;
        /* Get <img alt= for question.id. */
        selector = `#${node.id} img`;
        if (document.querySelector(selector))
            question.alt = document.querySelector(selector).alt;
        questions.push(question);       // save question in questions
    }

    console.log(shuffle(questions));    // shuffle questions in place

    /* Rewrite information from children of article in new order. */
    for (let [index, id] of ids.entries()) {
        /* Set <a href= for question.id. */
        selector = `#${id} a`;
        if (document.querySelector(selector))
            document.querySelector(selector).href
                = questions[index].href;
        /* Set <a title= for question.id. */
        selector = `#${id} a`;
        if (document.querySelector(selector))
            document.querySelector(selector).title
                = questions[index].title;
        /* Set <img src= for question.id. */
        selector = `#${id} img`;
        if (document.querySelector(selector))
            document.querySelector(selector).src
                = questions[index].src;
        /* Set <img alt= for question.id. */
        selector = `#${id} img`;
        if (document.querySelector(selector))
            document.querySelector(selector).alt
                = questions[index].alt;
    }

    /* Set body { display: block; } */
    document.querySelector('body').style.display = 'block';
    return false;
}

/* Set innerHTML of id to message.
 */
function show(message, id) {
    let selector = `#${id}`;
    if (document.querySelector(selector))
        document.querySelector(selector).innerHTML = message;
    console.log(`selector "${selector}" has innerHTML "${message}"`);
    return false;
}

/* Log innerHTML for selector.
 *
 * TODO: NOT USED
 */
function logHTML(selector) {
    let node = document.querySelector(selector);
    if (node) {
        console.log(`querySelector('${selector}')
            .innerHTML="${node.innerHTML}"`);
    }
}

/* Replace HTML characters w/ their character entities.
 * https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
 *
 * TODO: NOT USED
 */
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\|/g,'&vert;');
}
