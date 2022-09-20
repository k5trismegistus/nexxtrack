import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

import { NexxtrackDb } from '../dynamodb/nexxtrackDb'

export class NexxtrackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const nexxtrackDb = new NexxtrackDb(this, 'NexxtrackDb', {})
  }
}
