import type {Config} from 'jest'

const config: Config = {
    roots: ['./src'],
    collectCoverageFrom: ['./src/**/*.ts'],
    coveragePathIgnorePatterns: [
        "^.+\\.request\\.ts$",
        "./src/infra/config",
        "./src/infra/http",
        "./src/infra/routes",
        "./src/infra/queue",
        "./src/infra/adapter/framework",
        "./src/infra/data/migrations",
    ],
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    transformIgnorePatterns: ['node_modules',],

    transform: {
        '.+\\.ts$': 'ts-jest'

    },
}
export default config
