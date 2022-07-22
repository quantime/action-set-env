import { error, exportVariable } from '@actions/core';
import {
  getBranchMap,
  getVarNames,
} from './inputs';
import { loadSecret } from './secrets';

async function run() {
  const branchMap = getBranchMap()
  const vars = getVarNames()

  const ref = process.env['GITHUB_REF']
  const env = branchMap[ref]
  if (!env) {
    error(`Branch ${ref} does not exist in branch map: ${JSON.stringify(branchMap)}`)
    throw Error('')
  }

  vars.forEach((v) => {
    const s = loadSecret(env, v)
    console.log(`Setting $${v} for environment: ${env}`)
    exportVariable(v, s)
  })
}

run()
