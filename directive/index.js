'use strict';

const Base = require('yeoman-generator').Base;
const DirectiveSubGenerator = require('../_ng/client/sub_generators_directive').DirectiveSubGenerator;

module.exports = class DirectiveGenerator extends Base {
  constructor(args, options, config) {
    super(args, options, config);

    this.generator = new DirectiveSubGenerator(this);
  }

  initializing() {
    this.generator.initializing();
  }

  writing() {
    this.generator.writing();
  }
};
