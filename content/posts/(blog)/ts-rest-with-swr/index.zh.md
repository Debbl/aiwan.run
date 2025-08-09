---
title: ts-rest 集成 swr
description: 深入探讨如何将 ts-rest 与 SWR 集成，实现端到端类型安全的 API 调用，包括自定义 hooks 开发、错误处理和中间件配置
date: 2025-06-14T11:36:46.272Z
duration: 5min
keywords:
  - ts-rest
  - swr
  - react-query
  - ai-sdk
  - ai
  - orpc
  - 类型安全
  - 中间件
  - 请求
  - 响应
---

## 为什么选择 ts-rest

最近在写一个 ai 集成应用，起初用的 [tRPC](https://github.com/trpc/trpc) 和 [ai-sdk](https://github.com/vercel/ai) 来实现，但是发现 tRPC 无法很好的与 ai-sdk 结合，其返回的类型必须要经过其内部的序列化，无法单独的返回 ai-sdk 返回的 [response](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-text#steps.step-result.response) 类型

最终选择了 [ts-rest](https://github.com/ts-rest/ts-rest)，可以非常灵活的定义返回的类型，而且可以与 ai-sdk 很好的结合。完美的实现我的需求

- 端到端类型安全
- 灵活的控制各种请求和响应的类型
- 统一的中间件管理

## 使用 swr

ts-rest 推荐使用的是 [react-query](https://ts-rest.com/client/react-query-v4)，但是个人比较喜欢的还是 [swr](https://github.com/vercel/swr) 比较的简单

下面是我最初的使用方式

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

可以发现非常的繁琐，比如这个响应在非 200 的情况下，几乎每个请求都要做类似的处理

## ts-rest 与 swr 集成使用

参考了 tRPC 与 React Query 的集成方案 [trpc-with-react-query](https://trpc.io/docs/client/react/setup) 最终实现的效果类似这样

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

返回的 `values` 的 `data` 只有 `200` 时的类型，可以通过 `enabled` 控制时候发送请求，整体的实现也比较简单，类型推导方面可能会比较的复杂，下面是具体的实现，参考了 ts-rest 的 [initClient](https://github.com/ts-rest/ts-rest/blob/main/libs/ts-rest/core/src/lib/client.ts#L465) 的实现

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

以上的实现可以自由的在 `getSWRRouteQuery` 和 `getSWRRouteMutation` 中添加中间件，比如添加错误处理并全局提示等
