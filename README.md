# ElasticSync
ElasticSync is your real-time data superhero 🦸‍♂️—capturing every change in your Postgres database 🐘 and zooming it straight into Elasticsearch ⚡ using Node.js 🟩, Kafka 🧩, and Debezium 🛠️.
Built on an event-driven heartbeat 💓, it guarantees lightning-fast search and analytics ⚡⚡ while keeping your data synced and safe — no matter what chaos your systems throw at it! 🔄🔥


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

    %% Styling for emphasis
    classDef source fill:#f9f,stroke:#333,stroke-width:2px,color:#000;
    classDef pipeline fill:#bbf,stroke:#333,stroke-width:2px,color:#000;
    classDef consumers fill:#bfb,stroke:#333,stroke-width:2px,color:#000;
    classDef observability fill:#fee,stroke:#333,stroke-width:2px,color:#000;

    class PG source
    class DBZ,KFK,RETRY pipeline
    class APP,ES consumers
    class MON observability
