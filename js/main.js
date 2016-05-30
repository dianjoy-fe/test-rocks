'use strict';

Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  
  theme: Reveal.getQueryHash().theme,
  transition: Reveal.getQueryHash().transition || 'default',
  
  dependencies: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js',
      condition: function () {
        return !!document.querySelector('[data-markdown]');
      }
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.3.0/plugin/markdown/markdown.min.js',
      condition: function () {
        return !!document.querySelector('[data-markdown]');
      }
    }
  ]
});