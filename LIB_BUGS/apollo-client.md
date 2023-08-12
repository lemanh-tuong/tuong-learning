### 1. "prevFetchResult" always empty object when ran "fetchMore"

##### Solution 1

`Check "cache" property. It's should be defined InMemoryCache`

##### Solution 2

```
fetchPolicy: 'cache-and-network'
nextFetchPolicy: 'cache-first'
```
