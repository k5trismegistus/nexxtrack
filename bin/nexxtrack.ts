#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { NexxtrackStack } from '../lib/nexxtrack-stack'

const getEnv = () => {
  if (process.env.NODE_ENV === 'staging') return 'staging'
  if (process.env.NODE_ENV === 'production') return 'production'

  throw Error('Unsupported NODE_ENV')
}

const NODE_ENV: 'staging' | 'production' = getEnv()

const app = new cdk.App()
new NexxtrackStack(app, `NexxtrackStack-${NODE_ENV}`, {
  nodeEnv: NODE_ENV,
  tags: {
    application: 'nexxtrack',
  },
})
