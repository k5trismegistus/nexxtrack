import * as cdk from 'aws-cdk-lib'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { TracksApi } from './tracks'
import { RecommendsApi } from './recommends'

export interface RootApiProps {
  table: dynamodb.Table
}

export class RootApi extends Construct {
  public readonly table: dynamodb.Table
  public readonly api: apigw.RestApi

  constructor(scope: Construct, id: string, props: RootApiProps) {
    super(scope, id)

    this.table = props.table
    this.api = new apigw.RestApi(this, 'RootApi', {
      restApiName: 'nexxtrack-api',
      deployOptions: { stageName: 'v1' },
    })

    const tracks = new TracksApi(this, 'tracks-api', {
      rootApi: this.api,
      table: this.table,
    })
    const recommends = new RecommendsApi(this, 'recommends-api', {
      rootApi: this.api,
      table: this.table,
    })
  }
}
