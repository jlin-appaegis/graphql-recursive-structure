###
Run server

```shell
node index.js
```

###
Sample query

```graphql
{
    user(id: "2") {
        id
        name
        friends {
            id
            name
            friends {
                id
            }
        }
    }
}
```
