import * as cdk from 'aws-cdk-lib'
import { ApiGateway } from 'aws-cdk-lib/aws-events-targets'
import { Construct } from 'constructs'
import { RootApi } from '../api/root'

import { NexxtrackDb } from '../dynamodb/nexxtrackDb'

export class NexxtrackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const nexxtrackDb = new NexxtrackDb(this, 'NexxtrackDb', {})

    const api = new RootApi(this, 'root-api', { table: nexxtrackDb.table })
  }
}
