import * as cdk from 'aws-cdk-lib'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as alias from 'aws-cdk-lib/aws-route53-targets'
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager'
import { Construct } from 'constructs'
import { RootApi } from '../api/root'

import { NexxtrackDb } from '../dynamodb/nexxtrackDb'

const getHostedZoneAttributes = (stage: 'production' | 'staging') => {
  if (stage === 'production') {
    return {
      hostedZoneId: process.env.HOSTED_ZONE_ID_PRODUCTION!,
      apiDomain: 'api.nexxtrack.club',
      zoneName: 'nexxtrack.club',
    }
  }
  return {
    hostedZoneId: process.env.HOSTED_ZONE_ID_STAGING!,
    apiDomain: 'api.stage.nexxtrack.club',
    zoneName: 'stage.nexxtrack.club',
  }
}
const getCertificateArn = (stage: 'production' | 'staging'): string => {
  if (stage === 'production') {
    return process.env.CERTIFICATE_ARN_PRODUCTION!
  }
  return process.env.CERTIFICATE_ARN_STAGING!
}

export interface NexxtrackStackProps extends cdk.StackProps {
  nodeEnv: 'production' | 'staging'
}

export class NexxtrackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: NexxtrackStackProps) {
    super(scope, id, props)

    const nexxtrackDb = new NexxtrackDb(this, 'NexxtrackDb', {})

    const { hostedZoneId, apiDomain, zoneName } = getHostedZoneAttributes(
      props.nodeEnv
    )

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      'HostedZoneForApi',
      {
        hostedZoneId,
        zoneName,
      }
    )

    const certificateArn = getCertificateArn(props.nodeEnv)
    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      'Certificate',
      certificateArn
    )

    // const customDomain = new apigw.DomainName(this, 'CustomDomain', {
    //   domainName: apiDomain,
    //   securityPolicy: apigw.SecurityPolicy.TLS_1_2,
    //   endpointType: apigw.EndpointType.REGIONAL,
    //   certificate: certificate,
    // })

    const api = new RootApi(this, 'root-api', {
      table: nexxtrackDb.table,
      apiDomain: apiDomain,
      certificate: certificate,
    })
    // customDomain.addBasePathMapping(api.api, {})

    // new route53.ARecord(this, 'ARecordForApi', {
    //   zone: hostedZone,
    //   recordName: apiDomain,
    //   target: route53.RecordTarget.fromAlias(new alias.ApiGateway(api.api)),
    // }).applyRemovalPolicy(cdk.RemovalPolicy.RETAIN)
  }
}
