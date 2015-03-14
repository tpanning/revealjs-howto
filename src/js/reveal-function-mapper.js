/* The MIT License (MIT)
 *
 * Copyright (c) 2014 Pablo Tamarit, http://ptamarit.com
 * Copyright (c) 2015 Tom Panning
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
*/

// This code was adapted from Pablo Tamarit's presentation at https://github.com/ptamarit/slides-data-viz-web-d3
// It makes it easy to have a JavaScript function called when a particular slide or fragment is
// shown. To use it, give a slide an id, and then add an object to the global pt object. For
// example:
//     <slide id="some-id">
//         ...
//     </slide>
//     var pt = pt || {};
//     pt.slideIdToFunctions = pt.slideIdToFunctions || {};
//     pt.slideIdToFunctions['some-id'] = {
//         init: function() {
//             // This will be called one time, before the slide or any of its fragments is shown
//             // for the first time
//         },
//         '-1': function() {
//             // This will be called before the slide is shown without any fragments
//         },
//         '0': function() {
//             // This will be called before the first fragment is shown
//         },
//         '1': function() {
//             // This will be called before the second fragment is shown
//         }
//     };


var pt = pt || {};

pt.handleEvent = function(isSlideEvent) {
  'use strict';

  var currentSlideId = Reveal.getCurrentSlide().id;
  var currentFragment = Reveal.getIndices().f;

  // Don't go any further if the slide has no ID (i.e. the string is empty).
  if (!currentSlideId) {
    return;
  }

  // If there is no entry corresponding to the current slide in the map, don't go further.
  var functions = pt.slideIdToFunctions[currentSlideId];
  if (functions == null) {
    return;
  }

  // Call the init function when arriving on a slide for the first time.
  if (isSlideEvent) {
    var initFunction = functions.init;
    if (initFunction != null) {
      initFunction();
      // Make sure we don't call the init function again.
      functions.init = null;
    }
  }

  var fragmentFunction = functions[currentFragment];
  if (fragmentFunction != null) {
    fragmentFunction();
  }
};

pt.handleSlideEvent = function() {
  'use strict';
  pt.handleEvent(true);
};

pt.handleFragmentEvent = function() {
  'use strict';
  pt.handleEvent(false);
};

Reveal.addEventListener('slidechanged', pt.handleSlideEvent);

Reveal.addEventListener('fragmentshown', pt.handleFragmentEvent);

Reveal.addEventListener('fragmenthidden', pt.handleFragmentEvent);
