import * as cdk from 'aws-cdk-lib'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'

import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { TracksApi } from './tracks'
import { RecommendsApi } from './recommends'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'

export interface RootApiProps {
  table: dynamodb.Table
  apiDomain: string
  certificate: ICertificate
  nodeEnv: 'production' | 'staging'
}

export class RootApi extends Construct {
  public readonly table: dynamodb.Table
  public readonly api: apigw.RestApi

  constructor(scope: Construct, id: string, props: RootApiProps) {
    super(scope, id)

    const origins =
      props.nodeEnv === 'production'
        ? ['https://nexxtrack.club']
        : ['https://stage.nexxtrack.club', 'http://lvh.me:3000']

    this.table = props.table
    this.api = new apigw.RestApi(this, 'RootApi', {
      domainName: {
        domainName: props.apiDomain,
        certificate: props.certificate,
      },
      restApiName: 'nexxtrack-api',
      deployOptions: { stageName: 'v1' },
      defaultCorsPreflightOptions: {
        allowOrigins: origins,
        allowMethods: ['GET'],
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
        statusCode: 200,
      },
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
