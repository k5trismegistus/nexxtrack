import { Stack, StackProps, RemovalPolicy, Duration } from 'aws-cdk-lib'

import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'
// import * as alias from 'aws-cdk-lib/aws-route53-targets'
// import * as apigw from 'aws-cdk-lib/aws-apigateway'
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

export interface NexxtrackStackProps extends StackProps {
  nodeEnv: 'production' | 'staging'
}

export class NexxtrackStack extends Stack {
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
      nodeEnv: props.nodeEnv,
    })
    // customDomain.addBasePathMapping(api.api, {})

    // new route53.ARecord(this, 'ARecordForApi', {
    //   zone: hostedZone,
    //   recordName: apiDomain,
    //   target: route53.RecordTarget.fromAlias(new alias.ApiGateway(api.api)),
    // }).applyRemovalPolicy(cdk.RemovalPolicy.RETAIN)

    const frontendBucket = new s3.Bucket(
      this,
      `nexxtrack-frontend-bucket-${props.nodeEnv}`,
      {
        removalPolicy: RemovalPolicy.DESTROY,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      }
    )

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      'OriginAccessIdentity',
      {
        comment: 'website-distribution-originAccessIdentity',
      }
    )

    const frontendBucketPolicyStatement = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      effect: iam.Effect.ALLOW,
      principals: [
        new iam.CanonicalUserPrincipal(
          originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
      resources: [`${frontendBucket.bucketArn}/*`],
    })

    frontendBucket.addToResourcePolicy(frontendBucketPolicyStatement)

    const distribution = new cloudfront.Distribution(
      this,
      `nexxtrack-frontend-distribution-${props.nodeEnv}`,
      {
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            ttl: Duration.seconds(300),
            httpStatus: 403,
            responseHttpStatus: 403,
            responsePagePath: '/error.html',
          },
          {
            ttl: Duration.seconds(300),
            httpStatus: 404,
            responseHttpStatus: 404,
            responsePagePath: '/error.html',
          },
        ],
        defaultBehavior: {
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          origin: new S3Origin(frontendBucket, {
            originAccessIdentity,
            originPath: '/current',
          }),
        },
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      }
    )
  }
}
