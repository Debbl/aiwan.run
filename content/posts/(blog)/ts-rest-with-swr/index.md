---
title: ts-rest with swr
description: Deeply explore how to integrate ts-rest with SWR to achieve end-to-end type-safe API calls, including custom hooks development, error handling, and middleware configuration.
date: 2025-06-14T11:36:46.272Z
duration: 5min
keywords:
  - ts-rest
  - swr
  - react-query
  - ai-sdk
  - ai
  - orpc
  - Type Safety
  - Middleware
  - Request
  - Response
---

## Why choose ts-rest

Recently, I was writing an ai integration application, initially using [tRPC](https://github.com/trpc/trpc) and [ai-sdk](https://github.com/vercel/ai) to implement it, but I found that tRPC cannot combine with ai-sdk well, its return type must go through its internal serialization, and cannot return the [response](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text#steps.step-result.response) type returned by ai-sdk alone.

Finally, I chose [ts-rest](https://github.com/ts-rest/ts-rest), which can very flexibly define the return type, and can combine with ai-sdk very well. Perfectly implement my needs

- End-to-end type safety
- Flexible control of various request and response types
- Unified middleware management

## Use swr

ts-rest recommends using [react-query](https://ts-rest.com/client/react-query-v4), but I personally prefer [swr](https://github.com/vercel/swr) which is simpler.

Here is my initial usage.

```tsx
const values = useSWR(
  data?.user.id ? [contract.getCredits.path, data?.user.id] : null,
  async ([_, id]) => {
    const res = await api.getCredits({
      query: {
        userId: id,
      },
    })

    if (res.status !== 200) {
      return null
    }

    return res.body
  },
)
```

It can be found that it is very cumbersome, for example, this response in the case of non-200, almost every request has to do similar processing

## ts-rest with swr integration

Refer to the integration scheme of tRPC and React Query [trpc-with-react-query](https://trpc.io/docs/client/react/setup) The final effect is similar to this

```ts
const values = api.getCredits.useSWR(
  {
    query: {
      userId: data?.user.id || '',
    },
  },
  {
    enabled: !!data?.user.id,
  },
)
```

The `data` type of the returned `values` is only when `200`, the request can be sent by controlling `enabled`, the overall implementation is also relatively simple, the type inference may be relatively complex, the following is the specific implementation, refer to the implementation of ts-rest [initClient](https://github.com/ts-rest/ts-rest/blob/main/libs/ts-rest/core/src/lib/client.ts#L465)

```ts title="create-api.ts"
import {
  getRouteQuery,
  initClient,
  isAppRoute,
  isAppRouteQuery,
} from '@ts-rest/core'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import type {
  AppRoute,
  AppRouteDeleteNoBody,
  AppRouteMutation,
  AppRouteQuery,
  AppRouter,
  AreAllPropertiesOptional,
  ClientArgs,
  ClientInferRequest,
  ClientInferResponseBody,
  ClientInferResponses,
  InitClientArgs,
  PartialClientInferRequest,
  Prettify,
} from '@ts-rest/core'
import type { SWRConfiguration, SWRResponse } from 'swr'
import type {
  SWRMutationConfiguration,
  SWRMutationResponse,
} from 'swr/mutation'

function getSWRRouteQuery(route: AppRouteQuery, clientArgs: InitClientArgs) {
  const queryFn = getRouteQuery(route, clientArgs)

  return {
    useSWR: (
      args: ClientInferRequest<AppRouteMutation, ClientArgs>,
      options: {
        enabled?: boolean
      } & SWRConfiguration = {},
    ) => {
      const { enabled = true, ...SWROptions } = options

      const values = useSWR(
        enabled ? [route.path, args] : null,
        async () => {
          const res = await queryFn(args)
          if (res.status !== 200) {
            throw new Error('error')
          }

          return res.body
        },
        SWROptions,
      )

      return values
    },
  }
}

function getSWRRouteMutation(
  route: AppRouteMutation | AppRouteDeleteNoBody,
  clientArgs: InitClientArgs,
) {
  const mutationFn = getRouteQuery(route, clientArgs)

  return {
    useSWRMutation: (options: SWRMutationConfiguration<any, any, any> = {}) => {
      const values = useSWRMutation(
        [route.path],
        async (_url: string, { arg }: { arg: any }) => {
          const res = await mutationFn(arg)

          if (res.status !== 200) {
            throw new Error('error')
          }

          return res.body
        },
        options,
      )

      return values
    },
  }
}

type AppSWRRouteFunction<
  TRoute extends AppRoute,
  TClientArgs extends ClientArgs,
  TArgs = PartialClientInferRequest<TRoute, TClientArgs>,
> =
  AreAllPropertiesOptional<TArgs> extends true
    ? (
        args?: Prettify<TArgs>,
      ) => Promise<Prettify<ClientInferResponses<TRoute>>>
    : TRoute extends AppRouteQuery
      ? {
          useSWR: <Data = Prettify<ClientInferResponseBody<TRoute, 200>>>(
            args?: Prettify<TArgs>,
            options?: {
              enabled?: boolean
            } & SWRConfiguration<Data>,
          ) => SWRResponse<Data>
        }
      : TRoute extends AppRouteMutation | AppRouteDeleteNoBody
        ? {
            useSWRMutation: <
              Data = Prettify<ClientInferResponseBody<TRoute, 200>>,
              ExtraArg = Prettify<TArgs>,
            >(
              options?: SWRMutationConfiguration<Data, any, any, ExtraArg>,
            ) => SWRMutationResponse<Data, any, any, ExtraArg>
          }
        : (
            args: Prettify<TArgs>,
          ) => Promise<Prettify<ClientInferResponses<TRoute>>>

type RecursiveProxyObj<T extends AppRouter, TClientArgs extends ClientArgs> = {
  [TKey in keyof T]: T[TKey] extends AppRoute
    ? AppSWRRouteFunction<T[TKey], TClientArgs>
    : T[TKey] extends AppRouter
      ? RecursiveProxyObj<T[TKey], TClientArgs>
      : never
}

export type InitClientReturn<
  T extends AppRouter,
  TClientArgs extends ClientArgs,
> = RecursiveProxyObj<T, TClientArgs>

export function createApi<
  T extends AppRouter,
  TClientArgs extends InitClientArgs,
>(router: T, args: TClientArgs): InitClientReturn<T, TClientArgs> {
  const api = Object.fromEntries(
    Object.entries(router).map(([key, subRouter]) => {
      if (isAppRoute(subRouter)) {
        if (isAppRouteQuery(subRouter)) {
          return [key, getSWRRouteQuery(subRouter, args)]
        }

        return [key, getSWRRouteMutation(subRouter, args)]
      } else {
        return [key, initClient(subRouter, args)]
      }
    }),
  )

  return api
}

export const api = createApi(contract, {
  baseUrl: '.',
  baseHeaders: {},
  throwOnUnknownStatus: true,
})

```

The above implementation can freely add middleware in `getSWRRouteQuery` and `getSWRRouteMutation`, for example, add error handling and global prompt.
