const { Kafka } = require('kafkajs')

const { Client } = require('@elastic/elasticsearch')

// Kafka Consumer
const kafka = new Kafka({ brokers: ['kafka:9092'] })
const consumer = kafka.consumer({ groupId: 'elasticsync-group' })

const esClient = new Client({ node: 'http://elasticsearch:9200' })

async function consumeAndIndex () {
  await consumer.connect()
  await consumer.subscribe({
    topic: 'dbserver.public.example-table',
    fromBeginning: true
  })

  console.log('Consuming messages from Kafka.')

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString()) // Change event format per your Debezium configuration

      console.log('Received event from Kafka.', event)

      // Index into Elasticsearch
      await esClient.index({
        index: 'example-table',
        body: event.payload
      })

      console.log('Indexed into Elasticsearch.')
    }
  })
}

consumeAndIndex().catch(err => console.error(err))
