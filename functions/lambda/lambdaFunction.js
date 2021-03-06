"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaFunction = void 0;
const core_1 = require("@yellicode/core");
const typescript_1 = require("@yellicode/typescript");
class LambdaFunction extends core_1.CodeWriter {
    initializeLambdaFunction(content, output) {
        const ts = new typescript_1.TypeScriptWriter(output);
        ts.writeLine(`exports.handler = async (event:Event) => {`);
        ts.writeLine(`switch (event.info.fieldName) {`);
        ts.writeLine();
        content();
        ts.writeLine();
        ts.writeLine(`}`);
        ts.writeLine(`}`);
    }
    importIndividualFunction(output, name, path) {
        const ts = new typescript_1.TypeScriptWriter(output);
        ts.writeImports(path, [name]);
    }
    helloWorldFunction(name) {
        this.writeLineIndented(`
    const AWS = require('aws-sdk');
    
    export const ${name} = async() => {
      // write your code here
    }
    `);
    }
}
exports.LambdaFunction = LambdaFunction;
