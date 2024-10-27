import { execSync } from 'child_process';
import packageJson from '../../package.json';

const VERCEL_GIT_COMMIT_SHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

export const getCommitHash = () => {
    if (VERCEL_GIT_COMMIT_SHA !== undefined) {
        return VERCEL_GIT_COMMIT_SHA;
    }

    const localCommitHash = execSync('git rev-parse HEAD').toString().trim();
    return localCommitHash;
};

export const getEnvironmentInfo = () => {
    const commitHash = getCommitHash();
    return {
        semver: packageJson.version,
        commitFull: commitHash,
        commitShort: commitHash.substring(0, 8),
    };
};
