import * as cdk from 'aws-cdk-lib'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

export interface NexxtrackDbProps {}

export class NexxtrackDb extends Construct {
  public readonly table: dynamodb.Table
  constructor(scope: Construct, id: string, props: NexxtrackDbProps) {
    super(scope, id)

    const table = new dynamodb.Table(this, 'NexxtrackDb', {
      partitionKey: { name: 'HASH', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'RANGE', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    table.addLocalSecondaryIndex({
      indexName: 'primaryNameLsi',
      sortKey: {
        name: 'primaryString',
        type: dynamodb.AttributeType.STRING,
      },
    })
    table.addLocalSecondaryIndex({
      indexName: 'secondaryNameLsi',
      sortKey: {
        name: 'secondaryString',
        type: dynamodb.AttributeType.STRING,
      },
    })
    table.addLocalSecondaryIndex({
      indexName: 'primaryNumberLsi',
      sortKey: {
        name: 'primaryNumber',
        type: dynamodb.AttributeType.NUMBER,
      },
    })

    this.table = table
  }
}
