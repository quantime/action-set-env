import { setSecret } from '@actions/core';
import { parse } from 'yaml';

export const loadSecret = (envName: string, secretName: string) => {
  const rawVal = process.env[secretName]
  if (!rawVal) {
    throw new Error(`No environment variable set for ${secretName}`)
  }

  let envMap
  try {
    envMap = parse(rawVal)
  } catch (e) {
    throw new Error(`Error parsing yaml for ${secretName}: ${e}`)
  }

  const val = envMap[envName]
  if (!val) {
    throw new Error(`Mssing entry for ${envName} in ${secretName} env map`)
  }

  setSecret(val);
  return val
}
