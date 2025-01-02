# Architecture

This app generally follows a typical SPA (single page application) and access data from a backend using REST. However, given the simplicity of the app and its purpose, it does not require a fully fledged backend. This has lead to some unique design decisions.

- API calls are made for typical CRUD operations for all the user generated content.
- API calls are intercepted and routed to a frontend mock service that runs in the browser as part of the WebApp using a [Mock Service Worker](https://mswjs.io/).
- The mock accesses the browser's IndexedDB to persist the data and an in-browser search engine.

This approach literally is a **Serverless implementation** but also allows for a future enhancement to implement a real server to search and persist the user data without a major refactor of the frontend architecture.

Refer to the diagram below for a visual representation.

```mermaid
flowchart LR
 subgraph sub2["Local Server"]
        sub2A[("API Server")]
        sub2B[("IndexedDB")]
        sub2C("Search Engine")
  end
 subgraph sub3["Local WebApp"]
        sub3A("HTML/JavaScript")
        sub3B("API")
        sub3C("HTTP Client")
        sub3D("Mock Service Worker")
  end
 subgraph sub1["Web Browser"]
        sub1A("User")
        sub2
        sub3
  end
    sub1A == Download ==> sub3A
    sub3A <==> sub3B
    sub3B <==> sub3C
    sub3C <==> sub3D
    sub2A == Query ==> sub2C
    sub2A == Store ==> sub2B
    sub2B == Retrieve ==> sub2A
    sub2C == Hits ==> sub2A
    sub2A == Response ==> sub3D
    sub3D == Request ==> sub2A

    style sub2 fill:#999999
    style sub3 fill:#999999
    style sub1 fill:#777777
    linkStyle 0 stroke:#000000
    linkStyle 1 stroke:#000000
    linkStyle 2 stroke:#000000
    linkStyle 3 stroke:#000000
    linkStyle 4 stroke:#000000
    linkStyle 5 stroke:#000000
    linkStyle 6 stroke:#000000
    linkStyle 7 stroke:#000000
    linkStyle 8 stroke:#000000
    linkStyle 9 stroke:#000000


```
