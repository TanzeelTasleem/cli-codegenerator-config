"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appsync = void 0;
const core_1 = require("@yellicode/core");
const typescript_1 = require("@yellicode/typescript");
class Appsync extends core_1.CodeWriter {
    constructor() {
        super(...arguments);
        this.apiName = "appsync_api";
        this.ds = "ds_";
        // public lambdaDataSourceResolverMutation(value: string) {
        //   this.writeLineIndented(` lambdaDs.createResolver({
        //     typeName: "Mutation",
        //     fieldName: "${value}",
        //   });`);
        // }
    }
    importAppsync(output) {
        const ts = new typescript_1.TypeScriptWriter(output);
        ts.writeImports("aws-cdk-lib", ["aws_appsync as appsync"]);
    }
    initializeAppsyncApi(name, output, authenticationType) {
        this.apiName = name;
        const ts = new typescript_1.TypeScriptWriter(output);
        ts.writeVariableDeclaration({
            name: `${this.apiName}_appsync`,
            typeName: "appsync.CfnGraphQLApi",
            initializer: () => {
                ts.writeLine(`new appsync.CfnGraphQLApi(this,'${this.apiName}',{
          authenticationType:'API_KEY',
          name: '${this.apiName}',
        })`);
            },
        }, "const");
    }
    initializeAppsyncSchema(schema, output) {
        const ts = new typescript_1.TypeScriptWriter(output);
        const gqlSchema = "`" + schema + "`";
        ts.writeVariableDeclaration({
            name: `${this.apiName}_schema`,
            typeName: "appsync.CfnGraphQLSchema",
            initializer: () => {
                ts.writeLine(`new appsync.CfnGraphQLSchema(this,'${this.apiName}Schema',{
            apiId: ${this.apiName}_appsync.attrApiId,
            definition:${gqlSchema}
          })`);
            },
        }, "const");
    }
    initializeApiKeyForAppsync(apiName) {
        this.writeLine(`new appsync.CfnApiKey(this,"apiKey",{
        apiId:${apiName}_appsync.attrApiId
      })`);
    }
    appsyncDataSource(output, dataSourceName, serviceRole) {
        const ts = new typescript_1.TypeScriptWriter(output);
        this.ds = `ds_${dataSourceName}`;
        ts.writeVariableDeclaration({
            name: `ds_${dataSourceName}`,
            typeName: "appsync.CfnDataSource",
            initializer: () => {
                ts.writeLine(`new appsync.CfnDataSource(this,'${this.apiName + "dataSourceGraphql"}',{
          name: '${this.apiName + dataSourceName}',
          apiId: ${this.apiName}_appsync.attrApiId,
          type:"AWS_LAMBDA",
          lambdaConfig: {lambdaFunctionArn:${this.apiName}_lambdaFn.functionArn},
          serviceRoleArn:${serviceRole}_servRole.roleArn
         })`);
            },
        }, "const");
    }
    lambdaDataSourceResolver(fieldName, typeName, dataSourceName) {
        this.writeLineIndented(`new appsync.CfnResolver(this,'${fieldName}_resolver',{
      apiId: ${this.apiName}_appsync.attrApiId,
      typeName: "${typeName}",
      fieldName: "${fieldName}",
      dataSourceName: ${this.ds}.name
    })`);
    }
}
exports.Appsync = Appsync;
