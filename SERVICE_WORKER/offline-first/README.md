# Queue request

#### Quan tâm đến hành động và lịch sử

    - Ưu điểm:
        + Đơn giản
        + Chỉ cần FE implement
        + Với trường hợp các request có webhook thì sẽ ok. Ví dụ khi thêm record cần bắn mail, ...

    - Nhược điểm
        + Nhiều request xếp hàng => Dễ lỗi
        + Nếu không có các nghiệp vụ liên quan đến từng request thì sẽ thừa request nếu tạo item và xoá item vừa tạo đó

# Sync table

#### Quan tâm đến dữ liệu

    - Nhược điểm:
        + Khó hơn
        + Table và logic nghiệp vụ cần giống nhau giữa FE và BE
        + Mỗi request cần thực hiện một cái khác thì sao ?

    - Ưu điểm:
        + Ít request
        + Dữ liệu đồng bộ

# Offline-First Implementation Strategies

## 1. Queue All Requests

### Pros

- **Simplicity**: Queuing requests is relatively straightforward to implement. You can maintain a queue of API requests and process them when the connection is restored.
- **Guaranteed Data Integrity**: Since the requests are queued locally, you have better control over data integrity. You can ensure that data is not lost, duplicated, or corrupted during synchronization.
- **Optimized Network Usage**: When the connection is restored, the queued requests can be sent in a batch, reducing the number of individual network calls and optimizing network usage.
- **Immediate Feedback**: Users receive immediate feedback as the app can queue actions even if the network is temporarily unavailable.

### Cons

- **Limited Functionality**: This approach is suitable for simpler use cases where user actions can be easily queued and processed.
- **Complex Conflict Resolution**: Handling conflicts that arise due to changes made offline and online can be complex. For instance, if two users modify the same piece of data while offline, resolving the conflict requires careful consideration.
- **Queue Management**: Managing the queue can become complicated, especially as the app grows. Handling edge cases, errors, and retries can lead to additional complexity.

## 2. Create Local DB and Business Logic

### Pros

- **Full Functionality Offline**: This approach allows the application to offer almost full functionality offline, as it stores data and business logic locally.
- **Complex Offline Interactions**: It's suitable for applications that require complex interactions and offer a wide range of features offline.
- **Better Conflict Resolution**: With a local database, you can implement more sophisticated conflict resolution strategies, which is critical for applications where data consistency is paramount.
- **Performance**: By having a local database, data retrieval and manipulation can be faster compared to processing API responses.

### Cons

- **Complex Implementation**: Building a local database with business logic can be significantly more complex and time-consuming than queuing requests.
- **Storage Management**: Managing the local database, especially for large datasets, can be challenging. It requires handling storage limitations and potential performance issues.
- **Initial Sync**: Synchronizing data between the local database and the server when the connection is restored can be tricky, especially if there are a lot of changes on both ends.
