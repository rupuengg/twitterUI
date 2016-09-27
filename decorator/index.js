'use strict';

const Base = require('yeoman-generator').Base;
const DecoratorSubGenerator = require('../_ng/client/sub_generators_decorator').DecoratorSubGenerator;

module.exports = class DecoratorGenerator extends Base {
  constructor(args, options, config) {
    super(args, options, config);

    this.generator = new DecoratorSubGenerator(this);
  }

  initializing() {
    this.generator.initializing();
  }

  writing() {
    this.generator.writing();
  }
};
