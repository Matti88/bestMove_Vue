# bestMove App

This App is intended as analysis tool to enable an household to identify the best place to move to

This is an MVP including the following features:
- Load of a list of houses into the app
- Insertion of APIary access key
- research and print of isochrone areas with various options
- filtering houses on hose characteristics and by isochronous

```mermaid
sequenceDiagram
alt Simple User

    UserMngmt->>LocalBE: POST /user + payload 
        Note over UserMngmt,LocalBE: Payload w/o Signing + User ACTIVE
    LocalBE-->>UserMngmt: _

else Disposer

    UserMngmt->>LocalBE: POST /user + payload
    Note over UserMngmt,LocalBE: Payload w/ Signing + User INTERMEDIATE
    LocalBE-->>UserMngmt: _

    UserMngmt->>LocalBE: PUT /user/sign 
    Note over UserMngmt,LocalBE: signin needed
    LocalBE-->>UserMngmt: _
END
```

## Example 1
![](/public/appBestMove1.png)

## Example 2
![](/public/appBestMove2.png)

## TO Add
![](/public/appMetric.png)
 

