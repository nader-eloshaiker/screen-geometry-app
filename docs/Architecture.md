# Architecture

This app generally follows a typical SPA (single page application) and access data from a backend using REST. However, given the simplicity of the app and its purpose, it does not require a fully fledged backend. This has lead to some unique design decisions.

- API calls are made for typical CRUD operations for all the user generated content.
- API calls are intercepted and routed to a frontend mock service that runs in the browser as part of the WebApp using a [Mock Service Worker](https://mswjs.io/).
- The mock accesses the browser's IndexedDB to persist the data and an in-browser search engine.

This approach literally is a **Serverless implementation** but also allows for a future enhancement to implement a real server to search and persist the user data without a major refactor of the frontend architecture.

Refer to the diagram below for a visual representation.

```mermaid
graph TB
subgraph sub1[Static Asset Host]
sub1A("WebApp")
end

subgraph sub2[Web Browser]
sub2A{User}
sub2B[(IndexedDB)]
sub2C(Search Engine)
end

subgraph sub3[Local WebApp]
sub3A(HTML/JavaScript)
sub3B(API)
sub3C(HTTP Client)
sub3D(Mock Service Worker)
sub3E(Mock)
end

sub1A -- Download--> sub3A

sub3A --> sub2A
sub2A --> sub3A

sub3A -.- sub3B
sub3B -.- sub3C
sub3C -.- sub3D
sub3D -.- sub3E

sub3E --Query--> sub2C
sub3E --Store--> sub2B
sub2B --Retrieve--> sub3E
sub2C --Hits--> sub3E
```
