
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GithubData
 * 
 */
export type GithubData = $Result.DefaultSelection<Prisma.$GithubDataPayload>
/**
 * Model GithubRepo
 * 
 */
export type GithubRepo = $Result.DefaultSelection<Prisma.$GithubRepoPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.githubData`: Exposes CRUD operations for the **GithubData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GithubData
    * const githubData = await prisma.githubData.findMany()
    * ```
    */
  get githubData(): Prisma.GithubDataDelegate<ExtArgs>;

  /**
   * `prisma.githubRepo`: Exposes CRUD operations for the **GithubRepo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GithubRepos
    * const githubRepos = await prisma.githubRepo.findMany()
    * ```
    */
  get githubRepo(): Prisma.GithubRepoDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    GithubData: 'GithubData',
    GithubRepo: 'GithubRepo'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "githubData" | "githubRepo"
      txIsolationLevel: never
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GithubData: {
        payload: Prisma.$GithubDataPayload<ExtArgs>
        fields: Prisma.GithubDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GithubDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GithubDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload>
          }
          findFirst: {
            args: Prisma.GithubDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GithubDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload>
          }
          findMany: {
            args: Prisma.GithubDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload>[]
          }
          create: {
            args: Prisma.GithubDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload>
          }
          createMany: {
            args: Prisma.GithubDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GithubDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload>
          }
          update: {
            args: Prisma.GithubDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload>
          }
          deleteMany: {
            args: Prisma.GithubDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GithubDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GithubDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubDataPayload>
          }
          aggregate: {
            args: Prisma.GithubDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGithubData>
          }
          groupBy: {
            args: Prisma.GithubDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<GithubDataGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.GithubDataFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.GithubDataAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.GithubDataCountArgs<ExtArgs>
            result: $Utils.Optional<GithubDataCountAggregateOutputType> | number
          }
        }
      }
      GithubRepo: {
        payload: Prisma.$GithubRepoPayload<ExtArgs>
        fields: Prisma.GithubRepoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GithubRepoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GithubRepoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload>
          }
          findFirst: {
            args: Prisma.GithubRepoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GithubRepoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload>
          }
          findMany: {
            args: Prisma.GithubRepoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload>[]
          }
          create: {
            args: Prisma.GithubRepoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload>
          }
          createMany: {
            args: Prisma.GithubRepoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GithubRepoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload>
          }
          update: {
            args: Prisma.GithubRepoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload>
          }
          deleteMany: {
            args: Prisma.GithubRepoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GithubRepoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GithubRepoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubRepoPayload>
          }
          aggregate: {
            args: Prisma.GithubRepoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGithubRepo>
          }
          groupBy: {
            args: Prisma.GithubRepoGroupByArgs<ExtArgs>
            result: $Utils.Optional<GithubRepoGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.GithubRepoFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.GithubRepoAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.GithubRepoCountArgs<ExtArgs>
            result: $Utils.Optional<GithubRepoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GithubDataCountOutputType
   */

  export type GithubDataCountOutputType = {
    repos: number
  }

  export type GithubDataCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repos?: boolean | GithubDataCountOutputTypeCountReposArgs
  }

  // Custom InputTypes
  /**
   * GithubDataCountOutputType without action
   */
  export type GithubDataCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubDataCountOutputType
     */
    select?: GithubDataCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GithubDataCountOutputType without action
   */
  export type GithubDataCountOutputTypeCountReposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubRepoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    verified: boolean | null
    otp: string | null
    passwordlessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    verified: boolean | null
    otp: string | null
    passwordlessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    verified: number
    otp: number
    passwordlessToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    verified?: true
    otp?: true
    passwordlessToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    verified?: true
    otp?: true
    passwordlessToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    verified?: true
    otp?: true
    passwordlessToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string
    password: string
    verified: boolean
    otp: string | null
    passwordlessToken: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    verified?: boolean
    otp?: boolean
    passwordlessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    github?: boolean | User$githubArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    verified?: boolean
    otp?: boolean
    passwordlessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    github?: boolean | User$githubArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      github: Prisma.$GithubDataPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      password: string
      verified: boolean
      otp: string | null
      passwordlessToken: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    github<T extends User$githubArgs<ExtArgs> = {}>(args?: Subset<T, User$githubArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly verified: FieldRef<"User", 'Boolean'>
    readonly otp: FieldRef<"User", 'String'>
    readonly passwordlessToken: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.github
   */
  export type User$githubArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    where?: GithubDataWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model GithubData
   */

  export type AggregateGithubData = {
    _count: GithubDataCountAggregateOutputType | null
    _min: GithubDataMinAggregateOutputType | null
    _max: GithubDataMaxAggregateOutputType | null
  }

  export type GithubDataMinAggregateOutputType = {
    id: string | null
    userId: string | null
    githubId: string | null
    login: string | null
    name: string | null
    avatarUrl: string | null
    bio: string | null
    fetchedAt: Date | null
  }

  export type GithubDataMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    githubId: string | null
    login: string | null
    name: string | null
    avatarUrl: string | null
    bio: string | null
    fetchedAt: Date | null
  }

  export type GithubDataCountAggregateOutputType = {
    id: number
    userId: number
    githubId: number
    login: number
    name: number
    avatarUrl: number
    bio: number
    fetchedAt: number
    _all: number
  }


  export type GithubDataMinAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    login?: true
    name?: true
    avatarUrl?: true
    bio?: true
    fetchedAt?: true
  }

  export type GithubDataMaxAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    login?: true
    name?: true
    avatarUrl?: true
    bio?: true
    fetchedAt?: true
  }

  export type GithubDataCountAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    login?: true
    name?: true
    avatarUrl?: true
    bio?: true
    fetchedAt?: true
    _all?: true
  }

  export type GithubDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubData to aggregate.
     */
    where?: GithubDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubData to fetch.
     */
    orderBy?: GithubDataOrderByWithRelationInput | GithubDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GithubDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GithubData
    **/
    _count?: true | GithubDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GithubDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GithubDataMaxAggregateInputType
  }

  export type GetGithubDataAggregateType<T extends GithubDataAggregateArgs> = {
        [P in keyof T & keyof AggregateGithubData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGithubData[P]>
      : GetScalarType<T[P], AggregateGithubData[P]>
  }




  export type GithubDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubDataWhereInput
    orderBy?: GithubDataOrderByWithAggregationInput | GithubDataOrderByWithAggregationInput[]
    by: GithubDataScalarFieldEnum[] | GithubDataScalarFieldEnum
    having?: GithubDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GithubDataCountAggregateInputType | true
    _min?: GithubDataMinAggregateInputType
    _max?: GithubDataMaxAggregateInputType
  }

  export type GithubDataGroupByOutputType = {
    id: string
    userId: string
    githubId: string
    login: string
    name: string | null
    avatarUrl: string | null
    bio: string | null
    fetchedAt: Date
    _count: GithubDataCountAggregateOutputType | null
    _min: GithubDataMinAggregateOutputType | null
    _max: GithubDataMaxAggregateOutputType | null
  }

  type GetGithubDataGroupByPayload<T extends GithubDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GithubDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GithubDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GithubDataGroupByOutputType[P]>
            : GetScalarType<T[P], GithubDataGroupByOutputType[P]>
        }
      >
    >


  export type GithubDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubId?: boolean
    login?: boolean
    name?: boolean
    avatarUrl?: boolean
    bio?: boolean
    fetchedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    repos?: boolean | GithubData$reposArgs<ExtArgs>
    _count?: boolean | GithubDataCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubData"]>


  export type GithubDataSelectScalar = {
    id?: boolean
    userId?: boolean
    githubId?: boolean
    login?: boolean
    name?: boolean
    avatarUrl?: boolean
    bio?: boolean
    fetchedAt?: boolean
  }

  export type GithubDataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    repos?: boolean | GithubData$reposArgs<ExtArgs>
    _count?: boolean | GithubDataCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GithubDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GithubData"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      repos: Prisma.$GithubRepoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      githubId: string
      login: string
      name: string | null
      avatarUrl: string | null
      bio: string | null
      fetchedAt: Date
    }, ExtArgs["result"]["githubData"]>
    composites: {}
  }

  type GithubDataGetPayload<S extends boolean | null | undefined | GithubDataDefaultArgs> = $Result.GetResult<Prisma.$GithubDataPayload, S>

  type GithubDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GithubDataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GithubDataCountAggregateInputType | true
    }

  export interface GithubDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GithubData'], meta: { name: 'GithubData' } }
    /**
     * Find zero or one GithubData that matches the filter.
     * @param {GithubDataFindUniqueArgs} args - Arguments to find a GithubData
     * @example
     * // Get one GithubData
     * const githubData = await prisma.githubData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GithubDataFindUniqueArgs>(args: SelectSubset<T, GithubDataFindUniqueArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GithubData that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GithubDataFindUniqueOrThrowArgs} args - Arguments to find a GithubData
     * @example
     * // Get one GithubData
     * const githubData = await prisma.githubData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GithubDataFindUniqueOrThrowArgs>(args: SelectSubset<T, GithubDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GithubData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubDataFindFirstArgs} args - Arguments to find a GithubData
     * @example
     * // Get one GithubData
     * const githubData = await prisma.githubData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GithubDataFindFirstArgs>(args?: SelectSubset<T, GithubDataFindFirstArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GithubData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubDataFindFirstOrThrowArgs} args - Arguments to find a GithubData
     * @example
     * // Get one GithubData
     * const githubData = await prisma.githubData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GithubDataFindFirstOrThrowArgs>(args?: SelectSubset<T, GithubDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GithubData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GithubData
     * const githubData = await prisma.githubData.findMany()
     * 
     * // Get first 10 GithubData
     * const githubData = await prisma.githubData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const githubDataWithIdOnly = await prisma.githubData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GithubDataFindManyArgs>(args?: SelectSubset<T, GithubDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GithubData.
     * @param {GithubDataCreateArgs} args - Arguments to create a GithubData.
     * @example
     * // Create one GithubData
     * const GithubData = await prisma.githubData.create({
     *   data: {
     *     // ... data to create a GithubData
     *   }
     * })
     * 
     */
    create<T extends GithubDataCreateArgs>(args: SelectSubset<T, GithubDataCreateArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GithubData.
     * @param {GithubDataCreateManyArgs} args - Arguments to create many GithubData.
     * @example
     * // Create many GithubData
     * const githubData = await prisma.githubData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GithubDataCreateManyArgs>(args?: SelectSubset<T, GithubDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GithubData.
     * @param {GithubDataDeleteArgs} args - Arguments to delete one GithubData.
     * @example
     * // Delete one GithubData
     * const GithubData = await prisma.githubData.delete({
     *   where: {
     *     // ... filter to delete one GithubData
     *   }
     * })
     * 
     */
    delete<T extends GithubDataDeleteArgs>(args: SelectSubset<T, GithubDataDeleteArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GithubData.
     * @param {GithubDataUpdateArgs} args - Arguments to update one GithubData.
     * @example
     * // Update one GithubData
     * const githubData = await prisma.githubData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GithubDataUpdateArgs>(args: SelectSubset<T, GithubDataUpdateArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GithubData.
     * @param {GithubDataDeleteManyArgs} args - Arguments to filter GithubData to delete.
     * @example
     * // Delete a few GithubData
     * const { count } = await prisma.githubData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GithubDataDeleteManyArgs>(args?: SelectSubset<T, GithubDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GithubData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GithubData
     * const githubData = await prisma.githubData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GithubDataUpdateManyArgs>(args: SelectSubset<T, GithubDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GithubData.
     * @param {GithubDataUpsertArgs} args - Arguments to update or create a GithubData.
     * @example
     * // Update or create a GithubData
     * const githubData = await prisma.githubData.upsert({
     *   create: {
     *     // ... data to create a GithubData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GithubData we want to update
     *   }
     * })
     */
    upsert<T extends GithubDataUpsertArgs>(args: SelectSubset<T, GithubDataUpsertArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more GithubData that matches the filter.
     * @param {GithubDataFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const githubData = await prisma.githubData.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: GithubDataFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a GithubData.
     * @param {GithubDataAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const githubData = await prisma.githubData.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: GithubDataAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of GithubData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubDataCountArgs} args - Arguments to filter GithubData to count.
     * @example
     * // Count the number of GithubData
     * const count = await prisma.githubData.count({
     *   where: {
     *     // ... the filter for the GithubData we want to count
     *   }
     * })
    **/
    count<T extends GithubDataCountArgs>(
      args?: Subset<T, GithubDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GithubDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GithubData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GithubDataAggregateArgs>(args: Subset<T, GithubDataAggregateArgs>): Prisma.PrismaPromise<GetGithubDataAggregateType<T>>

    /**
     * Group by GithubData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GithubDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GithubDataGroupByArgs['orderBy'] }
        : { orderBy?: GithubDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GithubDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGithubDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GithubData model
   */
  readonly fields: GithubDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GithubData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GithubDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    repos<T extends GithubData$reposArgs<ExtArgs> = {}>(args?: Subset<T, GithubData$reposArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GithubData model
   */ 
  interface GithubDataFieldRefs {
    readonly id: FieldRef<"GithubData", 'String'>
    readonly userId: FieldRef<"GithubData", 'String'>
    readonly githubId: FieldRef<"GithubData", 'String'>
    readonly login: FieldRef<"GithubData", 'String'>
    readonly name: FieldRef<"GithubData", 'String'>
    readonly avatarUrl: FieldRef<"GithubData", 'String'>
    readonly bio: FieldRef<"GithubData", 'String'>
    readonly fetchedAt: FieldRef<"GithubData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GithubData findUnique
   */
  export type GithubDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * Filter, which GithubData to fetch.
     */
    where: GithubDataWhereUniqueInput
  }

  /**
   * GithubData findUniqueOrThrow
   */
  export type GithubDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * Filter, which GithubData to fetch.
     */
    where: GithubDataWhereUniqueInput
  }

  /**
   * GithubData findFirst
   */
  export type GithubDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * Filter, which GithubData to fetch.
     */
    where?: GithubDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubData to fetch.
     */
    orderBy?: GithubDataOrderByWithRelationInput | GithubDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubData.
     */
    cursor?: GithubDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubData.
     */
    distinct?: GithubDataScalarFieldEnum | GithubDataScalarFieldEnum[]
  }

  /**
   * GithubData findFirstOrThrow
   */
  export type GithubDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * Filter, which GithubData to fetch.
     */
    where?: GithubDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubData to fetch.
     */
    orderBy?: GithubDataOrderByWithRelationInput | GithubDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubData.
     */
    cursor?: GithubDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubData.
     */
    distinct?: GithubDataScalarFieldEnum | GithubDataScalarFieldEnum[]
  }

  /**
   * GithubData findMany
   */
  export type GithubDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * Filter, which GithubData to fetch.
     */
    where?: GithubDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubData to fetch.
     */
    orderBy?: GithubDataOrderByWithRelationInput | GithubDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GithubData.
     */
    cursor?: GithubDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubData.
     */
    skip?: number
    distinct?: GithubDataScalarFieldEnum | GithubDataScalarFieldEnum[]
  }

  /**
   * GithubData create
   */
  export type GithubDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * The data needed to create a GithubData.
     */
    data: XOR<GithubDataCreateInput, GithubDataUncheckedCreateInput>
  }

  /**
   * GithubData createMany
   */
  export type GithubDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GithubData.
     */
    data: GithubDataCreateManyInput | GithubDataCreateManyInput[]
  }

  /**
   * GithubData update
   */
  export type GithubDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * The data needed to update a GithubData.
     */
    data: XOR<GithubDataUpdateInput, GithubDataUncheckedUpdateInput>
    /**
     * Choose, which GithubData to update.
     */
    where: GithubDataWhereUniqueInput
  }

  /**
   * GithubData updateMany
   */
  export type GithubDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GithubData.
     */
    data: XOR<GithubDataUpdateManyMutationInput, GithubDataUncheckedUpdateManyInput>
    /**
     * Filter which GithubData to update
     */
    where?: GithubDataWhereInput
  }

  /**
   * GithubData upsert
   */
  export type GithubDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * The filter to search for the GithubData to update in case it exists.
     */
    where: GithubDataWhereUniqueInput
    /**
     * In case the GithubData found by the `where` argument doesn't exist, create a new GithubData with this data.
     */
    create: XOR<GithubDataCreateInput, GithubDataUncheckedCreateInput>
    /**
     * In case the GithubData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GithubDataUpdateInput, GithubDataUncheckedUpdateInput>
  }

  /**
   * GithubData delete
   */
  export type GithubDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
    /**
     * Filter which GithubData to delete.
     */
    where: GithubDataWhereUniqueInput
  }

  /**
   * GithubData deleteMany
   */
  export type GithubDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubData to delete
     */
    where?: GithubDataWhereInput
  }

  /**
   * GithubData findRaw
   */
  export type GithubDataFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * GithubData aggregateRaw
   */
  export type GithubDataAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * GithubData.repos
   */
  export type GithubData$reposArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    where?: GithubRepoWhereInput
    orderBy?: GithubRepoOrderByWithRelationInput | GithubRepoOrderByWithRelationInput[]
    cursor?: GithubRepoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GithubRepoScalarFieldEnum | GithubRepoScalarFieldEnum[]
  }

  /**
   * GithubData without action
   */
  export type GithubDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubData
     */
    select?: GithubDataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubDataInclude<ExtArgs> | null
  }


  /**
   * Model GithubRepo
   */

  export type AggregateGithubRepo = {
    _count: GithubRepoCountAggregateOutputType | null
    _avg: GithubRepoAvgAggregateOutputType | null
    _sum: GithubRepoSumAggregateOutputType | null
    _min: GithubRepoMinAggregateOutputType | null
    _max: GithubRepoMaxAggregateOutputType | null
  }

  export type GithubRepoAvgAggregateOutputType = {
    stargazersCount: number | null
    forksCount: number | null
  }

  export type GithubRepoSumAggregateOutputType = {
    stargazersCount: number | null
    forksCount: number | null
  }

  export type GithubRepoMinAggregateOutputType = {
    id: string | null
    githubDataId: string | null
    repoId: string | null
    name: string | null
    htmlUrl: string | null
    description: string | null
    language: string | null
    stargazersCount: number | null
    forksCount: number | null
    updatedAt: Date | null
  }

  export type GithubRepoMaxAggregateOutputType = {
    id: string | null
    githubDataId: string | null
    repoId: string | null
    name: string | null
    htmlUrl: string | null
    description: string | null
    language: string | null
    stargazersCount: number | null
    forksCount: number | null
    updatedAt: Date | null
  }

  export type GithubRepoCountAggregateOutputType = {
    id: number
    githubDataId: number
    repoId: number
    name: number
    htmlUrl: number
    description: number
    language: number
    stargazersCount: number
    forksCount: number
    updatedAt: number
    _all: number
  }


  export type GithubRepoAvgAggregateInputType = {
    stargazersCount?: true
    forksCount?: true
  }

  export type GithubRepoSumAggregateInputType = {
    stargazersCount?: true
    forksCount?: true
  }

  export type GithubRepoMinAggregateInputType = {
    id?: true
    githubDataId?: true
    repoId?: true
    name?: true
    htmlUrl?: true
    description?: true
    language?: true
    stargazersCount?: true
    forksCount?: true
    updatedAt?: true
  }

  export type GithubRepoMaxAggregateInputType = {
    id?: true
    githubDataId?: true
    repoId?: true
    name?: true
    htmlUrl?: true
    description?: true
    language?: true
    stargazersCount?: true
    forksCount?: true
    updatedAt?: true
  }

  export type GithubRepoCountAggregateInputType = {
    id?: true
    githubDataId?: true
    repoId?: true
    name?: true
    htmlUrl?: true
    description?: true
    language?: true
    stargazersCount?: true
    forksCount?: true
    updatedAt?: true
    _all?: true
  }

  export type GithubRepoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubRepo to aggregate.
     */
    where?: GithubRepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubRepos to fetch.
     */
    orderBy?: GithubRepoOrderByWithRelationInput | GithubRepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GithubRepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubRepos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubRepos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GithubRepos
    **/
    _count?: true | GithubRepoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GithubRepoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GithubRepoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GithubRepoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GithubRepoMaxAggregateInputType
  }

  export type GetGithubRepoAggregateType<T extends GithubRepoAggregateArgs> = {
        [P in keyof T & keyof AggregateGithubRepo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGithubRepo[P]>
      : GetScalarType<T[P], AggregateGithubRepo[P]>
  }




  export type GithubRepoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubRepoWhereInput
    orderBy?: GithubRepoOrderByWithAggregationInput | GithubRepoOrderByWithAggregationInput[]
    by: GithubRepoScalarFieldEnum[] | GithubRepoScalarFieldEnum
    having?: GithubRepoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GithubRepoCountAggregateInputType | true
    _avg?: GithubRepoAvgAggregateInputType
    _sum?: GithubRepoSumAggregateInputType
    _min?: GithubRepoMinAggregateInputType
    _max?: GithubRepoMaxAggregateInputType
  }

  export type GithubRepoGroupByOutputType = {
    id: string
    githubDataId: string
    repoId: string
    name: string
    htmlUrl: string
    description: string | null
    language: string | null
    stargazersCount: number | null
    forksCount: number | null
    updatedAt: Date | null
    _count: GithubRepoCountAggregateOutputType | null
    _avg: GithubRepoAvgAggregateOutputType | null
    _sum: GithubRepoSumAggregateOutputType | null
    _min: GithubRepoMinAggregateOutputType | null
    _max: GithubRepoMaxAggregateOutputType | null
  }

  type GetGithubRepoGroupByPayload<T extends GithubRepoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GithubRepoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GithubRepoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GithubRepoGroupByOutputType[P]>
            : GetScalarType<T[P], GithubRepoGroupByOutputType[P]>
        }
      >
    >


  export type GithubRepoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubDataId?: boolean
    repoId?: boolean
    name?: boolean
    htmlUrl?: boolean
    description?: boolean
    language?: boolean
    stargazersCount?: boolean
    forksCount?: boolean
    updatedAt?: boolean
    githubData?: boolean | GithubDataDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubRepo"]>


  export type GithubRepoSelectScalar = {
    id?: boolean
    githubDataId?: boolean
    repoId?: boolean
    name?: boolean
    htmlUrl?: boolean
    description?: boolean
    language?: boolean
    stargazersCount?: boolean
    forksCount?: boolean
    updatedAt?: boolean
  }

  export type GithubRepoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    githubData?: boolean | GithubDataDefaultArgs<ExtArgs>
  }

  export type $GithubRepoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GithubRepo"
    objects: {
      githubData: Prisma.$GithubDataPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      githubDataId: string
      repoId: string
      name: string
      htmlUrl: string
      description: string | null
      language: string | null
      stargazersCount: number | null
      forksCount: number | null
      updatedAt: Date | null
    }, ExtArgs["result"]["githubRepo"]>
    composites: {}
  }

  type GithubRepoGetPayload<S extends boolean | null | undefined | GithubRepoDefaultArgs> = $Result.GetResult<Prisma.$GithubRepoPayload, S>

  type GithubRepoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GithubRepoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GithubRepoCountAggregateInputType | true
    }

  export interface GithubRepoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GithubRepo'], meta: { name: 'GithubRepo' } }
    /**
     * Find zero or one GithubRepo that matches the filter.
     * @param {GithubRepoFindUniqueArgs} args - Arguments to find a GithubRepo
     * @example
     * // Get one GithubRepo
     * const githubRepo = await prisma.githubRepo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GithubRepoFindUniqueArgs>(args: SelectSubset<T, GithubRepoFindUniqueArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GithubRepo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GithubRepoFindUniqueOrThrowArgs} args - Arguments to find a GithubRepo
     * @example
     * // Get one GithubRepo
     * const githubRepo = await prisma.githubRepo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GithubRepoFindUniqueOrThrowArgs>(args: SelectSubset<T, GithubRepoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GithubRepo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubRepoFindFirstArgs} args - Arguments to find a GithubRepo
     * @example
     * // Get one GithubRepo
     * const githubRepo = await prisma.githubRepo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GithubRepoFindFirstArgs>(args?: SelectSubset<T, GithubRepoFindFirstArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GithubRepo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubRepoFindFirstOrThrowArgs} args - Arguments to find a GithubRepo
     * @example
     * // Get one GithubRepo
     * const githubRepo = await prisma.githubRepo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GithubRepoFindFirstOrThrowArgs>(args?: SelectSubset<T, GithubRepoFindFirstOrThrowArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GithubRepos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubRepoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GithubRepos
     * const githubRepos = await prisma.githubRepo.findMany()
     * 
     * // Get first 10 GithubRepos
     * const githubRepos = await prisma.githubRepo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const githubRepoWithIdOnly = await prisma.githubRepo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GithubRepoFindManyArgs>(args?: SelectSubset<T, GithubRepoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GithubRepo.
     * @param {GithubRepoCreateArgs} args - Arguments to create a GithubRepo.
     * @example
     * // Create one GithubRepo
     * const GithubRepo = await prisma.githubRepo.create({
     *   data: {
     *     // ... data to create a GithubRepo
     *   }
     * })
     * 
     */
    create<T extends GithubRepoCreateArgs>(args: SelectSubset<T, GithubRepoCreateArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GithubRepos.
     * @param {GithubRepoCreateManyArgs} args - Arguments to create many GithubRepos.
     * @example
     * // Create many GithubRepos
     * const githubRepo = await prisma.githubRepo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GithubRepoCreateManyArgs>(args?: SelectSubset<T, GithubRepoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GithubRepo.
     * @param {GithubRepoDeleteArgs} args - Arguments to delete one GithubRepo.
     * @example
     * // Delete one GithubRepo
     * const GithubRepo = await prisma.githubRepo.delete({
     *   where: {
     *     // ... filter to delete one GithubRepo
     *   }
     * })
     * 
     */
    delete<T extends GithubRepoDeleteArgs>(args: SelectSubset<T, GithubRepoDeleteArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GithubRepo.
     * @param {GithubRepoUpdateArgs} args - Arguments to update one GithubRepo.
     * @example
     * // Update one GithubRepo
     * const githubRepo = await prisma.githubRepo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GithubRepoUpdateArgs>(args: SelectSubset<T, GithubRepoUpdateArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GithubRepos.
     * @param {GithubRepoDeleteManyArgs} args - Arguments to filter GithubRepos to delete.
     * @example
     * // Delete a few GithubRepos
     * const { count } = await prisma.githubRepo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GithubRepoDeleteManyArgs>(args?: SelectSubset<T, GithubRepoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GithubRepos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubRepoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GithubRepos
     * const githubRepo = await prisma.githubRepo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GithubRepoUpdateManyArgs>(args: SelectSubset<T, GithubRepoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GithubRepo.
     * @param {GithubRepoUpsertArgs} args - Arguments to update or create a GithubRepo.
     * @example
     * // Update or create a GithubRepo
     * const githubRepo = await prisma.githubRepo.upsert({
     *   create: {
     *     // ... data to create a GithubRepo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GithubRepo we want to update
     *   }
     * })
     */
    upsert<T extends GithubRepoUpsertArgs>(args: SelectSubset<T, GithubRepoUpsertArgs<ExtArgs>>): Prisma__GithubRepoClient<$Result.GetResult<Prisma.$GithubRepoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more GithubRepos that matches the filter.
     * @param {GithubRepoFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const githubRepo = await prisma.githubRepo.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: GithubRepoFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a GithubRepo.
     * @param {GithubRepoAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const githubRepo = await prisma.githubRepo.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: GithubRepoAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of GithubRepos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubRepoCountArgs} args - Arguments to filter GithubRepos to count.
     * @example
     * // Count the number of GithubRepos
     * const count = await prisma.githubRepo.count({
     *   where: {
     *     // ... the filter for the GithubRepos we want to count
     *   }
     * })
    **/
    count<T extends GithubRepoCountArgs>(
      args?: Subset<T, GithubRepoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GithubRepoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GithubRepo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubRepoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GithubRepoAggregateArgs>(args: Subset<T, GithubRepoAggregateArgs>): Prisma.PrismaPromise<GetGithubRepoAggregateType<T>>

    /**
     * Group by GithubRepo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubRepoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GithubRepoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GithubRepoGroupByArgs['orderBy'] }
        : { orderBy?: GithubRepoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GithubRepoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGithubRepoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GithubRepo model
   */
  readonly fields: GithubRepoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GithubRepo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GithubRepoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    githubData<T extends GithubDataDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GithubDataDefaultArgs<ExtArgs>>): Prisma__GithubDataClient<$Result.GetResult<Prisma.$GithubDataPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GithubRepo model
   */ 
  interface GithubRepoFieldRefs {
    readonly id: FieldRef<"GithubRepo", 'String'>
    readonly githubDataId: FieldRef<"GithubRepo", 'String'>
    readonly repoId: FieldRef<"GithubRepo", 'String'>
    readonly name: FieldRef<"GithubRepo", 'String'>
    readonly htmlUrl: FieldRef<"GithubRepo", 'String'>
    readonly description: FieldRef<"GithubRepo", 'String'>
    readonly language: FieldRef<"GithubRepo", 'String'>
    readonly stargazersCount: FieldRef<"GithubRepo", 'Int'>
    readonly forksCount: FieldRef<"GithubRepo", 'Int'>
    readonly updatedAt: FieldRef<"GithubRepo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GithubRepo findUnique
   */
  export type GithubRepoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * Filter, which GithubRepo to fetch.
     */
    where: GithubRepoWhereUniqueInput
  }

  /**
   * GithubRepo findUniqueOrThrow
   */
  export type GithubRepoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * Filter, which GithubRepo to fetch.
     */
    where: GithubRepoWhereUniqueInput
  }

  /**
   * GithubRepo findFirst
   */
  export type GithubRepoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * Filter, which GithubRepo to fetch.
     */
    where?: GithubRepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubRepos to fetch.
     */
    orderBy?: GithubRepoOrderByWithRelationInput | GithubRepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubRepos.
     */
    cursor?: GithubRepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubRepos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubRepos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubRepos.
     */
    distinct?: GithubRepoScalarFieldEnum | GithubRepoScalarFieldEnum[]
  }

  /**
   * GithubRepo findFirstOrThrow
   */
  export type GithubRepoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * Filter, which GithubRepo to fetch.
     */
    where?: GithubRepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubRepos to fetch.
     */
    orderBy?: GithubRepoOrderByWithRelationInput | GithubRepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubRepos.
     */
    cursor?: GithubRepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubRepos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubRepos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubRepos.
     */
    distinct?: GithubRepoScalarFieldEnum | GithubRepoScalarFieldEnum[]
  }

  /**
   * GithubRepo findMany
   */
  export type GithubRepoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * Filter, which GithubRepos to fetch.
     */
    where?: GithubRepoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubRepos to fetch.
     */
    orderBy?: GithubRepoOrderByWithRelationInput | GithubRepoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GithubRepos.
     */
    cursor?: GithubRepoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubRepos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubRepos.
     */
    skip?: number
    distinct?: GithubRepoScalarFieldEnum | GithubRepoScalarFieldEnum[]
  }

  /**
   * GithubRepo create
   */
  export type GithubRepoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * The data needed to create a GithubRepo.
     */
    data: XOR<GithubRepoCreateInput, GithubRepoUncheckedCreateInput>
  }

  /**
   * GithubRepo createMany
   */
  export type GithubRepoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GithubRepos.
     */
    data: GithubRepoCreateManyInput | GithubRepoCreateManyInput[]
  }

  /**
   * GithubRepo update
   */
  export type GithubRepoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * The data needed to update a GithubRepo.
     */
    data: XOR<GithubRepoUpdateInput, GithubRepoUncheckedUpdateInput>
    /**
     * Choose, which GithubRepo to update.
     */
    where: GithubRepoWhereUniqueInput
  }

  /**
   * GithubRepo updateMany
   */
  export type GithubRepoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GithubRepos.
     */
    data: XOR<GithubRepoUpdateManyMutationInput, GithubRepoUncheckedUpdateManyInput>
    /**
     * Filter which GithubRepos to update
     */
    where?: GithubRepoWhereInput
  }

  /**
   * GithubRepo upsert
   */
  export type GithubRepoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * The filter to search for the GithubRepo to update in case it exists.
     */
    where: GithubRepoWhereUniqueInput
    /**
     * In case the GithubRepo found by the `where` argument doesn't exist, create a new GithubRepo with this data.
     */
    create: XOR<GithubRepoCreateInput, GithubRepoUncheckedCreateInput>
    /**
     * In case the GithubRepo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GithubRepoUpdateInput, GithubRepoUncheckedUpdateInput>
  }

  /**
   * GithubRepo delete
   */
  export type GithubRepoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
    /**
     * Filter which GithubRepo to delete.
     */
    where: GithubRepoWhereUniqueInput
  }

  /**
   * GithubRepo deleteMany
   */
  export type GithubRepoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubRepos to delete
     */
    where?: GithubRepoWhereInput
  }

  /**
   * GithubRepo findRaw
   */
  export type GithubRepoFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * GithubRepo aggregateRaw
   */
  export type GithubRepoAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * GithubRepo without action
   */
  export type GithubRepoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubRepo
     */
    select?: GithubRepoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubRepoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    verified: 'verified',
    otp: 'otp',
    passwordlessToken: 'passwordlessToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GithubDataScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    githubId: 'githubId',
    login: 'login',
    name: 'name',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    fetchedAt: 'fetchedAt'
  };

  export type GithubDataScalarFieldEnum = (typeof GithubDataScalarFieldEnum)[keyof typeof GithubDataScalarFieldEnum]


  export const GithubRepoScalarFieldEnum: {
    id: 'id',
    githubDataId: 'githubDataId',
    repoId: 'repoId',
    name: 'name',
    htmlUrl: 'htmlUrl',
    description: 'description',
    language: 'language',
    stargazersCount: 'stargazersCount',
    forksCount: 'forksCount',
    updatedAt: 'updatedAt'
  };

  export type GithubRepoScalarFieldEnum = (typeof GithubRepoScalarFieldEnum)[keyof typeof GithubRepoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    verified?: BoolFilter<"User"> | boolean
    otp?: StringNullableFilter<"User"> | string | null
    passwordlessToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    github?: XOR<GithubDataNullableRelationFilter, GithubDataWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    otp?: SortOrder
    passwordlessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    github?: GithubDataOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    verified?: BoolFilter<"User"> | boolean
    otp?: StringNullableFilter<"User"> | string | null
    passwordlessToken?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    github?: XOR<GithubDataNullableRelationFilter, GithubDataWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    otp?: SortOrder
    passwordlessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    verified?: BoolWithAggregatesFilter<"User"> | boolean
    otp?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordlessToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GithubDataWhereInput = {
    AND?: GithubDataWhereInput | GithubDataWhereInput[]
    OR?: GithubDataWhereInput[]
    NOT?: GithubDataWhereInput | GithubDataWhereInput[]
    id?: StringFilter<"GithubData"> | string
    userId?: StringFilter<"GithubData"> | string
    githubId?: StringFilter<"GithubData"> | string
    login?: StringFilter<"GithubData"> | string
    name?: StringNullableFilter<"GithubData"> | string | null
    avatarUrl?: StringNullableFilter<"GithubData"> | string | null
    bio?: StringNullableFilter<"GithubData"> | string | null
    fetchedAt?: DateTimeFilter<"GithubData"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    repos?: GithubRepoListRelationFilter
  }

  export type GithubDataOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    fetchedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    repos?: GithubRepoOrderByRelationAggregateInput
  }

  export type GithubDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: GithubDataWhereInput | GithubDataWhereInput[]
    OR?: GithubDataWhereInput[]
    NOT?: GithubDataWhereInput | GithubDataWhereInput[]
    githubId?: StringFilter<"GithubData"> | string
    login?: StringFilter<"GithubData"> | string
    name?: StringNullableFilter<"GithubData"> | string | null
    avatarUrl?: StringNullableFilter<"GithubData"> | string | null
    bio?: StringNullableFilter<"GithubData"> | string | null
    fetchedAt?: DateTimeFilter<"GithubData"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    repos?: GithubRepoListRelationFilter
  }, "id" | "userId">

  export type GithubDataOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    fetchedAt?: SortOrder
    _count?: GithubDataCountOrderByAggregateInput
    _max?: GithubDataMaxOrderByAggregateInput
    _min?: GithubDataMinOrderByAggregateInput
  }

  export type GithubDataScalarWhereWithAggregatesInput = {
    AND?: GithubDataScalarWhereWithAggregatesInput | GithubDataScalarWhereWithAggregatesInput[]
    OR?: GithubDataScalarWhereWithAggregatesInput[]
    NOT?: GithubDataScalarWhereWithAggregatesInput | GithubDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GithubData"> | string
    userId?: StringWithAggregatesFilter<"GithubData"> | string
    githubId?: StringWithAggregatesFilter<"GithubData"> | string
    login?: StringWithAggregatesFilter<"GithubData"> | string
    name?: StringNullableWithAggregatesFilter<"GithubData"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"GithubData"> | string | null
    bio?: StringNullableWithAggregatesFilter<"GithubData"> | string | null
    fetchedAt?: DateTimeWithAggregatesFilter<"GithubData"> | Date | string
  }

  export type GithubRepoWhereInput = {
    AND?: GithubRepoWhereInput | GithubRepoWhereInput[]
    OR?: GithubRepoWhereInput[]
    NOT?: GithubRepoWhereInput | GithubRepoWhereInput[]
    id?: StringFilter<"GithubRepo"> | string
    githubDataId?: StringFilter<"GithubRepo"> | string
    repoId?: StringFilter<"GithubRepo"> | string
    name?: StringFilter<"GithubRepo"> | string
    htmlUrl?: StringFilter<"GithubRepo"> | string
    description?: StringNullableFilter<"GithubRepo"> | string | null
    language?: StringNullableFilter<"GithubRepo"> | string | null
    stargazersCount?: IntNullableFilter<"GithubRepo"> | number | null
    forksCount?: IntNullableFilter<"GithubRepo"> | number | null
    updatedAt?: DateTimeNullableFilter<"GithubRepo"> | Date | string | null
    githubData?: XOR<GithubDataRelationFilter, GithubDataWhereInput>
  }

  export type GithubRepoOrderByWithRelationInput = {
    id?: SortOrder
    githubDataId?: SortOrder
    repoId?: SortOrder
    name?: SortOrder
    htmlUrl?: SortOrder
    description?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    updatedAt?: SortOrder
    githubData?: GithubDataOrderByWithRelationInput
  }

  export type GithubRepoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GithubRepoWhereInput | GithubRepoWhereInput[]
    OR?: GithubRepoWhereInput[]
    NOT?: GithubRepoWhereInput | GithubRepoWhereInput[]
    githubDataId?: StringFilter<"GithubRepo"> | string
    repoId?: StringFilter<"GithubRepo"> | string
    name?: StringFilter<"GithubRepo"> | string
    htmlUrl?: StringFilter<"GithubRepo"> | string
    description?: StringNullableFilter<"GithubRepo"> | string | null
    language?: StringNullableFilter<"GithubRepo"> | string | null
    stargazersCount?: IntNullableFilter<"GithubRepo"> | number | null
    forksCount?: IntNullableFilter<"GithubRepo"> | number | null
    updatedAt?: DateTimeNullableFilter<"GithubRepo"> | Date | string | null
    githubData?: XOR<GithubDataRelationFilter, GithubDataWhereInput>
  }, "id">

  export type GithubRepoOrderByWithAggregationInput = {
    id?: SortOrder
    githubDataId?: SortOrder
    repoId?: SortOrder
    name?: SortOrder
    htmlUrl?: SortOrder
    description?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    updatedAt?: SortOrder
    _count?: GithubRepoCountOrderByAggregateInput
    _avg?: GithubRepoAvgOrderByAggregateInput
    _max?: GithubRepoMaxOrderByAggregateInput
    _min?: GithubRepoMinOrderByAggregateInput
    _sum?: GithubRepoSumOrderByAggregateInput
  }

  export type GithubRepoScalarWhereWithAggregatesInput = {
    AND?: GithubRepoScalarWhereWithAggregatesInput | GithubRepoScalarWhereWithAggregatesInput[]
    OR?: GithubRepoScalarWhereWithAggregatesInput[]
    NOT?: GithubRepoScalarWhereWithAggregatesInput | GithubRepoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GithubRepo"> | string
    githubDataId?: StringWithAggregatesFilter<"GithubRepo"> | string
    repoId?: StringWithAggregatesFilter<"GithubRepo"> | string
    name?: StringWithAggregatesFilter<"GithubRepo"> | string
    htmlUrl?: StringWithAggregatesFilter<"GithubRepo"> | string
    description?: StringNullableWithAggregatesFilter<"GithubRepo"> | string | null
    language?: StringNullableWithAggregatesFilter<"GithubRepo"> | string | null
    stargazersCount?: IntNullableWithAggregatesFilter<"GithubRepo"> | number | null
    forksCount?: IntNullableWithAggregatesFilter<"GithubRepo"> | number | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"GithubRepo"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    verified?: boolean
    otp?: string | null
    passwordlessToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    github?: GithubDataCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    verified?: boolean
    otp?: string | null
    passwordlessToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    github?: GithubDataUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordlessToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    github?: GithubDataUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordlessToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    github?: GithubDataUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username: string
    password: string
    verified?: boolean
    otp?: string | null
    passwordlessToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordlessToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordlessToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubDataCreateInput = {
    id?: string
    githubId: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    bio?: string | null
    fetchedAt?: Date | string
    user: UserCreateNestedOneWithoutGithubInput
    repos?: GithubRepoCreateNestedManyWithoutGithubDataInput
  }

  export type GithubDataUncheckedCreateInput = {
    id?: string
    userId: string
    githubId: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    bio?: string | null
    fetchedAt?: Date | string
    repos?: GithubRepoUncheckedCreateNestedManyWithoutGithubDataInput
  }

  export type GithubDataUpdateInput = {
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGithubNestedInput
    repos?: GithubRepoUpdateManyWithoutGithubDataNestedInput
  }

  export type GithubDataUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repos?: GithubRepoUncheckedUpdateManyWithoutGithubDataNestedInput
  }

  export type GithubDataCreateManyInput = {
    id?: string
    userId: string
    githubId: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    bio?: string | null
    fetchedAt?: Date | string
  }

  export type GithubDataUpdateManyMutationInput = {
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubDataUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubRepoCreateInput = {
    id?: string
    repoId: string
    name: string
    htmlUrl: string
    description?: string | null
    language?: string | null
    stargazersCount?: number | null
    forksCount?: number | null
    updatedAt?: Date | string | null
    githubData: GithubDataCreateNestedOneWithoutReposInput
  }

  export type GithubRepoUncheckedCreateInput = {
    id?: string
    githubDataId: string
    repoId: string
    name: string
    htmlUrl: string
    description?: string | null
    language?: string | null
    stargazersCount?: number | null
    forksCount?: number | null
    updatedAt?: Date | string | null
  }

  export type GithubRepoUpdateInput = {
    repoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    htmlUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: NullableIntFieldUpdateOperationsInput | number | null
    forksCount?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    githubData?: GithubDataUpdateOneRequiredWithoutReposNestedInput
  }

  export type GithubRepoUncheckedUpdateInput = {
    githubDataId?: StringFieldUpdateOperationsInput | string
    repoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    htmlUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: NullableIntFieldUpdateOperationsInput | number | null
    forksCount?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GithubRepoCreateManyInput = {
    id?: string
    githubDataId: string
    repoId: string
    name: string
    htmlUrl: string
    description?: string | null
    language?: string | null
    stargazersCount?: number | null
    forksCount?: number | null
    updatedAt?: Date | string | null
  }

  export type GithubRepoUpdateManyMutationInput = {
    repoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    htmlUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: NullableIntFieldUpdateOperationsInput | number | null
    forksCount?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GithubRepoUncheckedUpdateManyInput = {
    githubDataId?: StringFieldUpdateOperationsInput | string
    repoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    htmlUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: NullableIntFieldUpdateOperationsInput | number | null
    forksCount?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GithubDataNullableRelationFilter = {
    is?: GithubDataWhereInput | null
    isNot?: GithubDataWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    otp?: SortOrder
    passwordlessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    otp?: SortOrder
    passwordlessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    verified?: SortOrder
    otp?: SortOrder
    passwordlessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GithubRepoListRelationFilter = {
    every?: GithubRepoWhereInput
    some?: GithubRepoWhereInput
    none?: GithubRepoWhereInput
  }

  export type GithubRepoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GithubDataCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    fetchedAt?: SortOrder
  }

  export type GithubDataMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    fetchedAt?: SortOrder
  }

  export type GithubDataMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    fetchedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type GithubDataRelationFilter = {
    is?: GithubDataWhereInput
    isNot?: GithubDataWhereInput
  }

  export type GithubRepoCountOrderByAggregateInput = {
    id?: SortOrder
    githubDataId?: SortOrder
    repoId?: SortOrder
    name?: SortOrder
    htmlUrl?: SortOrder
    description?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubRepoAvgOrderByAggregateInput = {
    stargazersCount?: SortOrder
    forksCount?: SortOrder
  }

  export type GithubRepoMaxOrderByAggregateInput = {
    id?: SortOrder
    githubDataId?: SortOrder
    repoId?: SortOrder
    name?: SortOrder
    htmlUrl?: SortOrder
    description?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubRepoMinOrderByAggregateInput = {
    id?: SortOrder
    githubDataId?: SortOrder
    repoId?: SortOrder
    name?: SortOrder
    htmlUrl?: SortOrder
    description?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    updatedAt?: SortOrder
  }

  export type GithubRepoSumOrderByAggregateInput = {
    stargazersCount?: SortOrder
    forksCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type GithubDataCreateNestedOneWithoutUserInput = {
    create?: XOR<GithubDataCreateWithoutUserInput, GithubDataUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubDataCreateOrConnectWithoutUserInput
    connect?: GithubDataWhereUniqueInput
  }

  export type GithubDataUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<GithubDataCreateWithoutUserInput, GithubDataUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubDataCreateOrConnectWithoutUserInput
    connect?: GithubDataWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GithubDataUpdateOneWithoutUserNestedInput = {
    create?: XOR<GithubDataCreateWithoutUserInput, GithubDataUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubDataCreateOrConnectWithoutUserInput
    upsert?: GithubDataUpsertWithoutUserInput
    disconnect?: GithubDataWhereInput | boolean
    delete?: GithubDataWhereInput | boolean
    connect?: GithubDataWhereUniqueInput
    update?: XOR<XOR<GithubDataUpdateToOneWithWhereWithoutUserInput, GithubDataUpdateWithoutUserInput>, GithubDataUncheckedUpdateWithoutUserInput>
  }

  export type GithubDataUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<GithubDataCreateWithoutUserInput, GithubDataUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubDataCreateOrConnectWithoutUserInput
    upsert?: GithubDataUpsertWithoutUserInput
    disconnect?: GithubDataWhereInput | boolean
    delete?: GithubDataWhereInput | boolean
    connect?: GithubDataWhereUniqueInput
    update?: XOR<XOR<GithubDataUpdateToOneWithWhereWithoutUserInput, GithubDataUpdateWithoutUserInput>, GithubDataUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutGithubInput = {
    create?: XOR<UserCreateWithoutGithubInput, UserUncheckedCreateWithoutGithubInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubInput
    connect?: UserWhereUniqueInput
  }

  export type GithubRepoCreateNestedManyWithoutGithubDataInput = {
    create?: XOR<GithubRepoCreateWithoutGithubDataInput, GithubRepoUncheckedCreateWithoutGithubDataInput> | GithubRepoCreateWithoutGithubDataInput[] | GithubRepoUncheckedCreateWithoutGithubDataInput[]
    connectOrCreate?: GithubRepoCreateOrConnectWithoutGithubDataInput | GithubRepoCreateOrConnectWithoutGithubDataInput[]
    createMany?: GithubRepoCreateManyGithubDataInputEnvelope
    connect?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
  }

  export type GithubRepoUncheckedCreateNestedManyWithoutGithubDataInput = {
    create?: XOR<GithubRepoCreateWithoutGithubDataInput, GithubRepoUncheckedCreateWithoutGithubDataInput> | GithubRepoCreateWithoutGithubDataInput[] | GithubRepoUncheckedCreateWithoutGithubDataInput[]
    connectOrCreate?: GithubRepoCreateOrConnectWithoutGithubDataInput | GithubRepoCreateOrConnectWithoutGithubDataInput[]
    createMany?: GithubRepoCreateManyGithubDataInputEnvelope
    connect?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutGithubNestedInput = {
    create?: XOR<UserCreateWithoutGithubInput, UserUncheckedCreateWithoutGithubInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubInput
    upsert?: UserUpsertWithoutGithubInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGithubInput, UserUpdateWithoutGithubInput>, UserUncheckedUpdateWithoutGithubInput>
  }

  export type GithubRepoUpdateManyWithoutGithubDataNestedInput = {
    create?: XOR<GithubRepoCreateWithoutGithubDataInput, GithubRepoUncheckedCreateWithoutGithubDataInput> | GithubRepoCreateWithoutGithubDataInput[] | GithubRepoUncheckedCreateWithoutGithubDataInput[]
    connectOrCreate?: GithubRepoCreateOrConnectWithoutGithubDataInput | GithubRepoCreateOrConnectWithoutGithubDataInput[]
    upsert?: GithubRepoUpsertWithWhereUniqueWithoutGithubDataInput | GithubRepoUpsertWithWhereUniqueWithoutGithubDataInput[]
    createMany?: GithubRepoCreateManyGithubDataInputEnvelope
    set?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    disconnect?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    delete?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    connect?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    update?: GithubRepoUpdateWithWhereUniqueWithoutGithubDataInput | GithubRepoUpdateWithWhereUniqueWithoutGithubDataInput[]
    updateMany?: GithubRepoUpdateManyWithWhereWithoutGithubDataInput | GithubRepoUpdateManyWithWhereWithoutGithubDataInput[]
    deleteMany?: GithubRepoScalarWhereInput | GithubRepoScalarWhereInput[]
  }

  export type GithubRepoUncheckedUpdateManyWithoutGithubDataNestedInput = {
    create?: XOR<GithubRepoCreateWithoutGithubDataInput, GithubRepoUncheckedCreateWithoutGithubDataInput> | GithubRepoCreateWithoutGithubDataInput[] | GithubRepoUncheckedCreateWithoutGithubDataInput[]
    connectOrCreate?: GithubRepoCreateOrConnectWithoutGithubDataInput | GithubRepoCreateOrConnectWithoutGithubDataInput[]
    upsert?: GithubRepoUpsertWithWhereUniqueWithoutGithubDataInput | GithubRepoUpsertWithWhereUniqueWithoutGithubDataInput[]
    createMany?: GithubRepoCreateManyGithubDataInputEnvelope
    set?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    disconnect?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    delete?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    connect?: GithubRepoWhereUniqueInput | GithubRepoWhereUniqueInput[]
    update?: GithubRepoUpdateWithWhereUniqueWithoutGithubDataInput | GithubRepoUpdateWithWhereUniqueWithoutGithubDataInput[]
    updateMany?: GithubRepoUpdateManyWithWhereWithoutGithubDataInput | GithubRepoUpdateManyWithWhereWithoutGithubDataInput[]
    deleteMany?: GithubRepoScalarWhereInput | GithubRepoScalarWhereInput[]
  }

  export type GithubDataCreateNestedOneWithoutReposInput = {
    create?: XOR<GithubDataCreateWithoutReposInput, GithubDataUncheckedCreateWithoutReposInput>
    connectOrCreate?: GithubDataCreateOrConnectWithoutReposInput
    connect?: GithubDataWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type GithubDataUpdateOneRequiredWithoutReposNestedInput = {
    create?: XOR<GithubDataCreateWithoutReposInput, GithubDataUncheckedCreateWithoutReposInput>
    connectOrCreate?: GithubDataCreateOrConnectWithoutReposInput
    upsert?: GithubDataUpsertWithoutReposInput
    connect?: GithubDataWhereUniqueInput
    update?: XOR<XOR<GithubDataUpdateToOneWithWhereWithoutReposInput, GithubDataUpdateWithoutReposInput>, GithubDataUncheckedUpdateWithoutReposInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type GithubDataCreateWithoutUserInput = {
    id?: string
    githubId: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    bio?: string | null
    fetchedAt?: Date | string
    repos?: GithubRepoCreateNestedManyWithoutGithubDataInput
  }

  export type GithubDataUncheckedCreateWithoutUserInput = {
    id?: string
    githubId: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    bio?: string | null
    fetchedAt?: Date | string
    repos?: GithubRepoUncheckedCreateNestedManyWithoutGithubDataInput
  }

  export type GithubDataCreateOrConnectWithoutUserInput = {
    where: GithubDataWhereUniqueInput
    create: XOR<GithubDataCreateWithoutUserInput, GithubDataUncheckedCreateWithoutUserInput>
  }

  export type GithubDataUpsertWithoutUserInput = {
    update: XOR<GithubDataUpdateWithoutUserInput, GithubDataUncheckedUpdateWithoutUserInput>
    create: XOR<GithubDataCreateWithoutUserInput, GithubDataUncheckedCreateWithoutUserInput>
    where?: GithubDataWhereInput
  }

  export type GithubDataUpdateToOneWithWhereWithoutUserInput = {
    where?: GithubDataWhereInput
    data: XOR<GithubDataUpdateWithoutUserInput, GithubDataUncheckedUpdateWithoutUserInput>
  }

  export type GithubDataUpdateWithoutUserInput = {
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repos?: GithubRepoUpdateManyWithoutGithubDataNestedInput
  }

  export type GithubDataUncheckedUpdateWithoutUserInput = {
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repos?: GithubRepoUncheckedUpdateManyWithoutGithubDataNestedInput
  }

  export type UserCreateWithoutGithubInput = {
    id?: string
    email: string
    username: string
    password: string
    verified?: boolean
    otp?: string | null
    passwordlessToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutGithubInput = {
    id?: string
    email: string
    username: string
    password: string
    verified?: boolean
    otp?: string | null
    passwordlessToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutGithubInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGithubInput, UserUncheckedCreateWithoutGithubInput>
  }

  export type GithubRepoCreateWithoutGithubDataInput = {
    id?: string
    repoId: string
    name: string
    htmlUrl: string
    description?: string | null
    language?: string | null
    stargazersCount?: number | null
    forksCount?: number | null
    updatedAt?: Date | string | null
  }

  export type GithubRepoUncheckedCreateWithoutGithubDataInput = {
    id?: string
    repoId: string
    name: string
    htmlUrl: string
    description?: string | null
    language?: string | null
    stargazersCount?: number | null
    forksCount?: number | null
    updatedAt?: Date | string | null
  }

  export type GithubRepoCreateOrConnectWithoutGithubDataInput = {
    where: GithubRepoWhereUniqueInput
    create: XOR<GithubRepoCreateWithoutGithubDataInput, GithubRepoUncheckedCreateWithoutGithubDataInput>
  }

  export type GithubRepoCreateManyGithubDataInputEnvelope = {
    data: GithubRepoCreateManyGithubDataInput | GithubRepoCreateManyGithubDataInput[]
  }

  export type UserUpsertWithoutGithubInput = {
    update: XOR<UserUpdateWithoutGithubInput, UserUncheckedUpdateWithoutGithubInput>
    create: XOR<UserCreateWithoutGithubInput, UserUncheckedCreateWithoutGithubInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGithubInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGithubInput, UserUncheckedUpdateWithoutGithubInput>
  }

  export type UserUpdateWithoutGithubInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordlessToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutGithubInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordlessToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubRepoUpsertWithWhereUniqueWithoutGithubDataInput = {
    where: GithubRepoWhereUniqueInput
    update: XOR<GithubRepoUpdateWithoutGithubDataInput, GithubRepoUncheckedUpdateWithoutGithubDataInput>
    create: XOR<GithubRepoCreateWithoutGithubDataInput, GithubRepoUncheckedCreateWithoutGithubDataInput>
  }

  export type GithubRepoUpdateWithWhereUniqueWithoutGithubDataInput = {
    where: GithubRepoWhereUniqueInput
    data: XOR<GithubRepoUpdateWithoutGithubDataInput, GithubRepoUncheckedUpdateWithoutGithubDataInput>
  }

  export type GithubRepoUpdateManyWithWhereWithoutGithubDataInput = {
    where: GithubRepoScalarWhereInput
    data: XOR<GithubRepoUpdateManyMutationInput, GithubRepoUncheckedUpdateManyWithoutGithubDataInput>
  }

  export type GithubRepoScalarWhereInput = {
    AND?: GithubRepoScalarWhereInput | GithubRepoScalarWhereInput[]
    OR?: GithubRepoScalarWhereInput[]
    NOT?: GithubRepoScalarWhereInput | GithubRepoScalarWhereInput[]
    id?: StringFilter<"GithubRepo"> | string
    githubDataId?: StringFilter<"GithubRepo"> | string
    repoId?: StringFilter<"GithubRepo"> | string
    name?: StringFilter<"GithubRepo"> | string
    htmlUrl?: StringFilter<"GithubRepo"> | string
    description?: StringNullableFilter<"GithubRepo"> | string | null
    language?: StringNullableFilter<"GithubRepo"> | string | null
    stargazersCount?: IntNullableFilter<"GithubRepo"> | number | null
    forksCount?: IntNullableFilter<"GithubRepo"> | number | null
    updatedAt?: DateTimeNullableFilter<"GithubRepo"> | Date | string | null
  }

  export type GithubDataCreateWithoutReposInput = {
    id?: string
    githubId: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    bio?: string | null
    fetchedAt?: Date | string
    user: UserCreateNestedOneWithoutGithubInput
  }

  export type GithubDataUncheckedCreateWithoutReposInput = {
    id?: string
    userId: string
    githubId: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    bio?: string | null
    fetchedAt?: Date | string
  }

  export type GithubDataCreateOrConnectWithoutReposInput = {
    where: GithubDataWhereUniqueInput
    create: XOR<GithubDataCreateWithoutReposInput, GithubDataUncheckedCreateWithoutReposInput>
  }

  export type GithubDataUpsertWithoutReposInput = {
    update: XOR<GithubDataUpdateWithoutReposInput, GithubDataUncheckedUpdateWithoutReposInput>
    create: XOR<GithubDataCreateWithoutReposInput, GithubDataUncheckedCreateWithoutReposInput>
    where?: GithubDataWhereInput
  }

  export type GithubDataUpdateToOneWithWhereWithoutReposInput = {
    where?: GithubDataWhereInput
    data: XOR<GithubDataUpdateWithoutReposInput, GithubDataUncheckedUpdateWithoutReposInput>
  }

  export type GithubDataUpdateWithoutReposInput = {
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGithubNestedInput
  }

  export type GithubDataUncheckedUpdateWithoutReposInput = {
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GithubRepoCreateManyGithubDataInput = {
    id?: string
    repoId: string
    name: string
    htmlUrl: string
    description?: string | null
    language?: string | null
    stargazersCount?: number | null
    forksCount?: number | null
    updatedAt?: Date | string | null
  }

  export type GithubRepoUpdateWithoutGithubDataInput = {
    repoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    htmlUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: NullableIntFieldUpdateOperationsInput | number | null
    forksCount?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GithubRepoUncheckedUpdateWithoutGithubDataInput = {
    repoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    htmlUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: NullableIntFieldUpdateOperationsInput | number | null
    forksCount?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GithubRepoUncheckedUpdateManyWithoutGithubDataInput = {
    repoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    htmlUrl?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: NullableIntFieldUpdateOperationsInput | number | null
    forksCount?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use GithubDataCountOutputTypeDefaultArgs instead
     */
    export type GithubDataCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GithubDataCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GithubDataDefaultArgs instead
     */
    export type GithubDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GithubDataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GithubRepoDefaultArgs instead
     */
    export type GithubRepoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GithubRepoDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}