import { makeSchema, asNexusMethod, connectionPlugin } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { createContext, Context } from './context'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { permissions } from './permissions'
import { applyMiddleware } from 'graphql-middleware'
import * as types from './types'

export const schema = applyMiddleware(
  makeSchema({
    types,
    plugins: [
      nexusPrisma({
        experimentalCRUD: true,

        prismaClient: (ctx: Context) => ctx.prisma,
      }),
      connectionPlugin(),
    ],
    outputs: {
      schema: __dirname + '/../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
      module: require.resolve('./context'),
      export: 'createContext',
    },
    sourceTypes: {
      modules: [
        {
          module: '@prisma/client',
          alias: 'prisma',
        },
      ],
    },
  }),
  permissions,
)
