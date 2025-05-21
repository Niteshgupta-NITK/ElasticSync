# ElasticSync
ElasticSync is a real-time Change Data Capture (CDC) pipeline that streams Postgres database changes into Elasticsearch using Node.js, Kafka, and Debezium. Designed with an event-driven architecture, it ensures low-latency search, analytics, and fault-tolerant syncing between relational and NoSQL systems.

# Architecture

flowchart LR
  subgraph Postgres
    PG[(PostgreSQL DB)]
  end

  subgraph Debezium
    DBZ[Debezium Connector]
  end

  subgraph Kafka
    KFK[Kafka Broker]
  end

  subgraph NodeJS
    APP[Node.js Consumer App]
  end

  subgraph Elasticsearch
    ES[(Elasticsearch Cluster)]
  end

  PG --> DBZ --> KFK --> APP --> ES
