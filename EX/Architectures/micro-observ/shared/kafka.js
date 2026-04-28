const { Kafka } = require('kafkajs');

// Configuration du client Kafka
// Il pointe vers le broker Kafka défini dans le docker-compose.yml
const kafka = new Kafka({
  clientId: 'cantine-app',
  brokers: ['localhost:9092'],
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
});

module.exports = kafka;
