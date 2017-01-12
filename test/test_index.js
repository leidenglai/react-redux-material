const context = require.context('.', true, /.test\.js$|.helper\.js$/);
context.keys().forEach(context);