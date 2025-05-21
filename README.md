# ElasticSync
ElasticSync is a real-time Change Data Capture (CDC) pipeline that streams Postgres database changes into Elasticsearch using Node.js, Kafka, and Debezium. Designed with an event-driven architecture, it ensures low-latency search, analytics, and fault-tolerant syncing between relational and NoSQL systems.

# Architecture
graph TD;
    PG[PostgreSQL DB] -->|WAL Logs| DBZ[Debezium Connector]
    DBZ -->|CDC Events| KFK[Kafka Broker]
    KFK -->|Consume Events| APP[Node.js Consumer App]
    APP -->|Index Data| ES[Elasticsearch Cluster]

    subgraph Source
        PG
    end

    subgraph Pipeline
        DBZ
        KFK
        APP
    end

    subgraph Destination
        ES
    end
