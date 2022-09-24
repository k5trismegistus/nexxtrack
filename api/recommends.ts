import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

export interface RecommendsApiProps {
  table: dynamodb.Table
  rootApi: apigw.RestApi
}

export class RecommendsApi extends Construct {
  public readonly rootApi: apigw.RestApi
  public readonly handler: lambda.Function
  public readonly table: dynamodb.Table

  constructor(scope: Construct, id: string, props: RecommendsApiProps) {
    super(scope, id)

    this.rootApi = props.rootApi
    this.table = props.table
    this.handler = new NodejsFunction(this, 'getRecommendedTrackHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: 'lambda/recommendedTracks.ts',
      handler: 'handler',
      environment: {
        TABLE_NAME: this.table.tableName,
      },
    })

    this.table.grantReadData(this.handler)

    const recommendsResource = this.rootApi.root.addResource('recommends')
    recommendsResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(this.handler)
    )
  }
}
