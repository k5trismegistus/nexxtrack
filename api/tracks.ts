import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

export interface TracksApiProps {
  table: dynamodb.Table
  rootApi: apigw.RestApi
}

export class TracksApi extends Construct {
  public readonly rootApi: apigw.RestApi
  public readonly handler: lambda.Function
  public readonly table: dynamodb.Table

  constructor(scope: Construct, id: string, props: TracksApiProps) {
    super(scope, id)

    this.rootApi = props.rootApi
    this.table = props.table
    this.handler = new NodejsFunction(this, 'searchTrackHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: 'lambda/searchTrack.ts',
      handler: 'handler',
      environment: {
        TABLE_NAME: this.table.tableName,
      },
    })

    this.table.grantReadData(this.handler)

    const trackResource = this.rootApi.root.addResource('tracks')
    trackResource.addMethod('GET', new apigw.LambdaIntegration(this.handler))
  }
}
