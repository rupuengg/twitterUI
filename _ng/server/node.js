"use strict";

const knownPaths = require('../utils/known_paths');
const yoUtils = require('../utils/yeoman-utils');

const basePath = (generator) => {
  return {
    route: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/routes/${generator.name}-route`,
    controller: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/controller/${generator.name}-controller`,
    dao: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/dao/${generator.name}-dao`,
    model: `${knownPaths.PATH_SERVER_FEATURES + generator.feature}/model/${generator.name}-model`,
    test: `${knownPaths.PATH_SERVER_FEATURES_TEST + generator.feature}/dao/${generator.name}-dao_test`
  }
}

class NodeStandard {
  constructor(generator) {
    this.wrapper = generator;
  }

  copyFiles() {
    let gen = basePath(this.wrapper);

    this.wrapper.template('node/no_transpiler/endpoint.route.js', `${gen.route}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/no_transpiler/endpoint.controller.js', `${gen.controller}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/no_transpiler/endpoint.dao.js', `${gen.dao}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/no_transpiler/endpoint.model.js', `${gen.model}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/no_transpiler/endpoint.dao_test.js', `${gen.test}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      feature: this.wrapper.feature
    });
  }

  copyForMainGenerator() {
    this.wrapper.differentStaticServer = !!this.wrapper.differentStaticServer || (this.wrapper.stack === "server");

    this.wrapper.template('index_node.js', 'index.js');
    this.wrapper.directory('tasks/server', 'tasks/server');
    this.wrapper.directory('tests/server', 'tests/server');

    if (this.wrapper.secure) {
      this.wrapper.template('server_node/server_https.js', 'server/server.js', {
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }
    else {
      this.wrapper.template('server_node/server.js', 'server/server.js', {
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }

    let _paths = [
      ['server_node/routes/index.js', 'server/routes/index.js'],
      ['server_node/constants/db.json', 'server/constants/db.json'],
      ['server_node/config/db.conf.js', 'server/config/db.conf.js'],
      ['server_node/config/routes.conf.js', 'server/config/routes.conf.js'],
      ['server_node/auth/local/index.js', 'server/auth/local/index.js'],
      ['server_node/api/todo/controller/todo-controller.js', 'server/api/todo/controller/todo-controller.js'],
      ['server_node/api/todo/dao/todo-dao.js', 'server/api/todo/dao/todo-dao.js'],
      ['server_node/api/todo/model/todo-model.js', 'server/api/todo/model/todo-model.js'],
      ['server_node/api/todo/routes/todo-routes.js', 'server/api/todo/routes/todo-routes.js']
    ]

    if (!this.wrapper.differentStaticServer) {
      _paths.push(['server_node/commons/static/index.js', 'server/commons/static/index.js']);
    }

    yoUtils.directory(this.wrapper, _paths, {
      appName: this.wrapper.appName,
      differentStaticServer: !!this.wrapper.differentStaticServer
    });
  }
}

class NodeBabel {
  constructor(generator) {
    this.wrapper = generator;
  }

  copyFiles() {
    let gen = basePath(this.wrapper);

    this.wrapper.template('node/babel/endpoint.route.js', `${gen.route}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/babel/endpoint.controller.js', `${gen.controller}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/babel/endpoint.dao.js', `${gen.dao}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/babel/endpoint.model.js', `${gen.model}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/babel/endpoint.dao_test.js', `${gen.test}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      feature: this.wrapper.feature
    });
  }

  copyForMainGenerator() {
    this.wrapper.differentStaticServer = !!this.wrapper.differentStaticServer || (this.wrapper.stack === "server");

    this.wrapper.template('index_babel.js', 'index.js');
    this.wrapper.directory('tasks/server', 'tasks/server');
    this.wrapper.directory('tests/server', 'tests/server');

    if (this.wrapper.secure) {
      this.wrapper.template('server_node_babel/server_https.js', 'server/server.js', {
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }
    else {
      this.wrapper.template('server_node_babel/server.js', 'server/server.js', {
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }

    let _paths = [
      ['server_node_babel/routes/index.js', 'server/routes/index.js'],
      ['server_node_babel/constants/db.json', 'server/constants/db.json'],
      ['server_node_babel/config/db.conf.js', 'server/config/db.conf.js'],
      ['server_node_babel/config/routes.conf.js', 'server/config/routes.conf.js'],
      ['server_node_babel/auth/local/index.js', 'server/auth/local/index.js'],
      ['server_node_babel/api/todo/controller/todo-controller.js', 'server/api/todo/controller/todo-controller.js'],
      ['server_node_babel/api/todo/dao/todo-dao.js', 'server/api/todo/dao/todo-dao.js'],
      ['server_node_babel/api/todo/model/todo-model.js', 'server/api/todo/model/todo-model.js'],
      ['server_node_babel/api/todo/routes/todo-routes.js', 'server/api/todo/routes/todo-routes.js']
    ]

    if (!this.wrapper.differentStaticServer) {
      _paths.push(['server_node_babel/commons/static/index.js', 'server/commons/static/index.js']);
    }

    yoUtils.directory(this.wrapper, _paths, {
      appName: this.wrapper.appName,
      differentStaticServer: !!this.wrapper.differentStaticServer
    });
  }
}

class NodeTypescript {
  constructor(generator) {
    this.wrapper = generator;
  }

  copyFiles() {
    let gen = basePath(this.wrapper);

    this.wrapper.template('node/typescript/endpoint.route.ts', `${gen.route}.ts`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/typescript/endpoint.controller.ts', `${gen.controller}.ts`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/typescript/endpoint.dao.ts', `${gen.dao}.ts`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/typescript/endpoint.model.ts', `${gen.model}.ts`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase()
    });

    this.wrapper.template('node/typescript/endpoint.dao_test.js', `${gen.test}.js`, {
      name: this.wrapper.name,
      nameLowerCase: this.wrapper.name.toLowerCase(),
      feature: this.wrapper.feature
    });
  }

  copyForMainGenerator() {
    this.wrapper.differentStaticServer = !!this.wrapper.differentStaticServer || (this.wrapper.stack === "server");

    this.wrapper.template('index_tsc.js', 'index.js');
    this.wrapper.template('_tsconfig.json', 'tsconfig.json');
    this.wrapper.template('_typings_ng2_and_tsc_server.json', 'typings.json');
    this.wrapper.directory('tasks/server', 'tasks/server');
    this.wrapper.directory('tests/server', 'tests/server');

    if (this.wrapper.secure) {
      this.wrapper.template('server_node_typescript/server_https.ts', 'server/server.ts', {
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }
    else {
      this.wrapper.template('server_node_typescript/server.ts', 'server/server.ts', {
        differentStaticServer: !!this.wrapper.differentStaticServer
      });
    }

    let _paths = [
      ['server_node_typescript/routes/index.ts', 'server/routes/index.ts'],
      ['server_node_typescript/constants/db.json', 'server/constants/db.json'],
      ['server_node_typescript/config/db.conf.ts', 'server/config/db.conf.ts'],
      ['server_node_typescript/config/routes.conf.ts', 'server/config/routes.conf.ts'],
      ['server_node_typescript/auth/local/index.ts', 'server/auth/local/index.ts'],
      ['server_node_typescript/api/todo/controller/todo-controller.ts', 'server/api/todo/controller/todo-controller.ts'],
      ['server_node_typescript/api/todo/dao/todo-dao.ts', 'server/api/todo/dao/todo-dao.ts'],
      ['server_node_typescript/api/todo/model/todo-model.ts', 'server/api/todo/model/todo-model.ts'],
      ['server_node_typescript/api/todo/routes/todo-routes.ts', 'server/api/todo/routes/todo-routes.ts']
    ]

    if (!this.wrapper.differentStaticServer) {
      _paths.push(['server_node_typescript/commons/static/index.ts', 'server/commons/static/index.ts']);
    }

    yoUtils.directory(this.wrapper, _paths, {
      appName: this.wrapper.appName,
      differentStaticServer: !!this.wrapper.differentStaticServer
    });
  }
}

class NodeFactory {
  static tokens() {
    return {
      NODE: "node",
      NODE_BABEL: "babel",
      NODE_TYPESCRIPT: "typescript"
    }
  }

  static build(generator) {
    switch(generator.transpilerServer) {
      case NodeFactory.tokens().NODE: return new NodeStandard(generator);
      case NodeFactory.tokens().NODE_BABEL: return new NodeBabel(generator);
      case NodeFactory.tokens().NODE_TYPESCRIPT: return new NodeTypescript(generator);
    }
  }
}

exports.NodeBabel = NodeBabel;
exports.NodeTypescript = NodeTypescript;
exports.NodeStandard = NodeStandard;
exports.NodeFactory = NodeFactory;
