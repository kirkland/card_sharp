requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'vendor/jquery-1.11.3',
    jquery_ui: 'vendor/jquery-ui-1.11.4',
  }
});

requirejs(['app/zoom', 'app/drag', 'app/edit']);
