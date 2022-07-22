import { error, exportVariable } from '@actions/core';
import {
  getBranchMap,
  getVarNames,
} from './inputs';
import { loadSecret } from './secrets';

async function run() {
  const branchMap = getBranchMap()
  const vars = getVarNames()

  const branch = process.env['GITHUB_REF'].replace('refs/heads/', '')
  const env = branchMap[branch]
  if (!env) {
    error(`Branch ${branch} does not exist in branch map: ${JSON.stringify(branchMap)}`)
    throw Error('')
  }

  vars.forEach((v) => {
    const s = loadSecret(env, v)
    console.log(`Setting $${v} for environment: ${env}`)
    exportVariable(v, s)
  })

  exportVariable('QT_ENVIRONMENT', env)
  exportVariable('QT_DEPLOY_BRANCH', branch)
}

run()
