import { TextWriter } from "@yellicode/core";
import { Generator } from "@yellicode/templating";
import { LambdaFunction } from "../../functions/lambda/lambdaFunction";
const jsonObj = require(`../../model.json`);
const { USER_WORKING_DIRECTORY } = jsonObj;

if (jsonObj?.type?.Query) {
  Object.keys(jsonObj.type.Query).forEach((key) => {
    Generator.generate(
      { outputFile: `../../../${USER_WORKING_DIRECTORY}/lambda-fns/${key}.ts` },
      (writer: TextWriter) => {
        const lambda = new LambdaFunction(writer);
        lambda.helloWorldFunction(key);
      }
    );
  });
}

if (jsonObj.type.Mutation) {
  Object.keys(jsonObj.type.Mutation).forEach((key) => {
    Generator.generate(
      { outputFile: `../../../${USER_WORKING_DIRECTORY}/lambda-fns/${key}.ts` },
      (writer: TextWriter) => {
        const lambda = new LambdaFunction(writer);
        lambda.helloWorldFunction(key);
      }
    );
  });
}
