#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { NexxtrackStack } from '../lib/nexxtrack-stack'

const app = new cdk.App()
new NexxtrackStack(app, 'NexxtrackStack', {
  tags: {
    application: 'nexxtrack',
  },
})
