var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var fs = require('fs');

var root = YAML.safeLoad(fs.readFileSync('docs/index.yaml').toString());
var options = {
  filter        : ['relative', 'remote'],
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.safeLoad(res.text));
    }
  }
};

resolve(root, options).then(function (results) {
  fs.writeFile("public/output.yaml", YAML.safeDump(results.resolved), function(err) {
    if (err) {
      return console.log(err);
    }
  });
});
