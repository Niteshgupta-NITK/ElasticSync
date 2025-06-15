# ElasticSync
ElasticSync is a real-time Change Data Capture (CDC) pipeline that streams Postgres database changes into Elasticsearch using Node.js, Kafka, and Debezium. Designed with an event-driven architecture, it ensures low-latency search, analytics, and fault-tolerant syncing between relational and NoSQL systems.

# Architecture
```mermaid
graph TD
    %% Nodes
    PG[PostgreSQL DB]
    DBZ[Debezium Connector]
    KFK[Kafka Broker]
    APP[Node.js Consumer App]
    ES[Elasticsearch Cluster]
    RETRY[Retry Queue]
    MON[Monitoring & Alerts]

    %% Subgraphs for clarity
    subgraph Source Systems
      PG
    end

    subgraph CDC Pipeline
      DBZ
      KFK
      RETRY
    end

    subgraph Consumers
      APP
      ES
    end

    subgraph Observability
      MON
    end

    %% Connections with labels
    PG -->|WAL Logs| DBZ
    DBZ -->|CDC Events| KFK
    KFK -->|Stream Events| APP
    APP -->|Index Data| ES

    %% Fault tolerance loop
    KFK -->|Failures| RETRY
    RETRY -->|Retry Events| KFK

    %% Monitoring links
    DBZ --> MON
    KFK --> MON
    APP --> MON

    %% Class definitions: muted, professional colors
    classDef source fill:#e0e7ff,stroke:#1e3a8a,stroke-width:1.5px,color:#1e3a8a;
    classDef pipeline fill:#e0f2f1,stroke:#00695c,stroke-width:1.5px,color:#004d40;
    classDef consumers fill:#ede7f6,stroke:#4527a0,stroke-width:1.5px,color:#311b92;
    classDef observability fill:#f3e5f5,stroke:#6a1b9a,stroke-width:1.5px,color:#4a148c;

    %% Apply classes
    class PG source
    class DBZ,KFK,RETRY pipeline
    class APP,ES consumers
    class MON observability
