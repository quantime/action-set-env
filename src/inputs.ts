import { getMultilineInput } from '@actions/core';

type BranchMap = {[key: string]: string }

const DEFAULT_BRANCH_MAP: BranchMap = {
  development: 'dev',
  master: 'production',
}

export const getBranchMap = (): BranchMap => {
  const branchStrs = getMultilineInput('branchMap')
  if (!branchStrs.length) {
    return DEFAULT_BRANCH_MAP
  }

  return branchStrs.reduce((acc, curr) => {
    const [branch, env] = curr.split('=')
    acc[branch] = env
    return acc
  }, {} as BranchMap)
}

export const getVarNames = () => {
  return getMultilineInput('varNames')
}
